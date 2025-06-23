
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Complete user journey: landing → signin → dashboard → features → signout', async ({ page }) => {
    // 1. Landing page validation
    await expect(page.locator('h1')).toContainText('Land Your Dream Job with Confidence');
    await expect(page.getByRole('button', { name: /Demo User/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Admin Demo/ })).toBeVisible();
    
    // 2. Navigate to manual sign-in
    await page.getByRole('link', { name: /Sign In to Get Started/ }).click();
    await expect(page).toHaveURL('/auth/signin');
    await expect(page.locator('h1')).toContainText('Welcome Back');
    
    // 3. Use quick demo login from sign-in page
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // 4. Verify dashboard access and content
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('nav')).toBeVisible();
    
    // 5. Navigate through protected features
    await page.getByRole('link', { name: 'Companies' }).click();
    await expect(page).toHaveURL('/companies');
    
    await page.getByRole('link', { name: 'Questions' }).click();
    await expect(page).toHaveURL('/questions');
    
    await page.getByRole('link', { name: 'Stories' }).click();
    await expect(page).toHaveURL('/stories');
    
    // 6. Return to dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // 7. Sign out
    await page.getByRole('button').filter({ hasText: /DU/ }).click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // 8. Should return to landing page
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Land Your Dream Job with Confidence');
  });

  test('Admin user journey with admin panel access', async ({ page }) => {
    // 1. Login as admin
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // 2. Verify admin badge in user menu
    await page.getByRole('button').filter({ hasText: /AA/ }).click();
    await expect(page.locator('[role="menuitem"]')).toContainText('Admin');
    await expect(page.locator('[role="menuitem"]')).toContainText('Admin Panel');
    
    // Close menu
    await page.keyboard.press('Escape');
    
    // 3. Access admin panel
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('h1')).toContainText('Admin Panel');
    
    // 4. Test admin panel tabs
    await page.getByRole('tab', { name: 'Overview' }).click();
    await expect(page.locator('text=Overview')).toBeVisible();
    
    await page.getByRole('tab', { name: 'Database' }).click();
    await expect(page.locator('text=Database Management')).toBeVisible();
    
    await page.getByRole('tab', { name: 'Themes' }).click();
    await expect(page.locator('text=Available Themes')).toBeVisible();
    
    // 5. Return to regular app features
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('Session security and route protection', async ({ page }) => {
    // 1. Try accessing protected routes without authentication
    const protectedRoutes = ['/dashboard', '/questions', '/companies', '/stories', '/admin'];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/auth\/signin/);
    }
    
    // 2. Login and verify access
    await page.goto('/');
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // 3. Verify demo user cannot access admin routes
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/auth\/signin/);
    
    // 4. Verify regular routes are accessible
    const allowedRoutes = ['/dashboard', '/questions', '/companies', '/stories'];
    
    for (const route of allowedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(route);
    }
  });

  test('Cross-browser session consistency', async ({ page }) => {
    // Login
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate through app
    await page.goto('/questions');
    await expect(page).toHaveURL('/questions');
    
    // Open new tab/window simulation by navigating back to home and checking auth state
    await page.goto('/');
    // If authenticated, should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Sign out
    await page.getByRole('button').filter({ hasText: /DU/ }).click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // Verify sign out worked by trying to access protected route
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/auth\/signin/);
  });

  test('Error handling and recovery', async ({ page }) => {
    // 1. Test invalid login
    await page.getByRole('link', { name: /Sign In to Get Started/ }).click();
    await page.getByLabel('Username').fill('nonexistent');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: /^Sign In$/ }).click();
    
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
    
    // 2. Recover with valid login
    await page.getByLabel('Username').clear();
    await page.getByLabel('Username').fill('demo');
    await page.getByLabel('Password').clear();
    await page.getByLabel('Password').fill('demodemo');
    await page.getByRole('button', { name: /^Sign In$/ }).click();
    
    await expect(page).toHaveURL('/dashboard');
    
    // 3. Test navigation after error recovery
    await page.getByRole('link', { name: 'Companies' }).click();
    await expect(page).toHaveURL('/companies');
  });

  test('Responsive authentication UI', async ({ page }) => {
    // Test sign-in page on different viewport sizes
    await page.getByRole('link', { name: /Sign In to Get Started/ }).click();
    
    // Desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /Demo User/ })).toBeVisible();
    
    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /Demo User/ })).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /Demo User/ })).toBeVisible();
    
    // Test login on mobile
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Test mobile navigation
    await expect(page.locator('nav')).toBeVisible();
  });
});
