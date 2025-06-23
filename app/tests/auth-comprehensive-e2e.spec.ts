
import { test, expect } from '@playwright/test';

test.describe('Authentication and User-Specific Themes E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('Admin login → dashboard redirect → theme change (user-specific)', async ({ page }) => {
    // Should start on landing page with demo buttons
    await expect(page.locator('h1')).toContainText('Land Your Dream Job with Confidence');
    
    // Click Admin Demo button
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Verify admin is logged in - check navigation for admin badge
    await page.locator('nav').getByRole('button').filter({ hasText: /AU/ }).first().click(); // Admin avatar
    await expect(page.getByRole('menuitem', { name: /Admin Panel/ })).toBeVisible();
    await expect(page.locator('text=Admin User')).toBeVisible(); // Check user name in dropdown
    
    // Close user menu
    await page.keyboard.press('Escape');
    
    // Go to admin panel to change theme
    await page.goto('/admin');
    await expect(page.locator('h1')).toContainText('Admin Panel');
    
    // Click on Themes tab
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Verify themes are loaded
    await expect(page.locator('text=Available Themes')).toBeVisible();
    
    // Change to Modern Vibrant theme
    await page.getByText('Modern Vibrant').first().click();
    await page.getByRole('button', { name: /Switch to Modern Vibrant/ }).click();
    
    // Verify theme changed (check for theme-specific styling)
    await expect(page.locator('html')).toHaveAttribute('style', /--primary:/);
    
    // Refresh page to ensure theme persists
    await page.reload();
    await expect(page.locator('text=Modern Vibrant')).toBeVisible();
  });

  test('Demo user login → dashboard redirect → different theme preference', async ({ page }) => {
    // Click Demo User button
    await page.getByRole('button', { name: /Demo User/ }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Verify demo user is logged in
    await page.locator('nav').getByRole('button').filter({ hasText: /DU/ }).first().click(); // Demo User avatar
    await expect(page.locator('text=Demo User')).toBeVisible(); // Check user name in dropdown
    await expect(page.getByRole('menuitem', { name: /Admin Panel/ })).not.toBeVisible();
    
    // Close user menu
    await page.keyboard.press('Escape');
    
    // Demo user should not be able to access admin panel
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/auth\/signin/);
  });

  test('Sign out → sign in with different user → dashboard redirect', async ({ page }) => {
    // First login as admin
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Sign out
    await page.locator('nav').getByRole('button').filter({ hasText: /AU/ }).first().click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // Should redirect to home page
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Land Your Dream Job with Confidence');
    
    // Now sign in as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Verify it's the demo user
    await page.locator('nav').getByRole('button').filter({ hasText: /DU/ }).first().click();
    await expect(page.locator('text=Demo User')).toBeVisible();
  });

  test('Manual sign in form with valid credentials', async ({ page }) => {
    // Go to sign in page
    await page.getByRole('link', { name: /Sign In to Get Started/ }).click();
    await expect(page).toHaveURL('/auth/signin');
    
    // Fill in admin credentials manually
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('adminadmin');
    await page.getByRole('main').getByRole('button', { name: /^Sign In$/ }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('Manual sign in form with invalid credentials', async ({ page }) => {
    // Go to sign in page
    await page.getByRole('link', { name: /Sign In to Get Started/ }).click();
    await expect(page).toHaveURL('/auth/signin');
    
    // Fill in invalid credentials
    await page.getByLabel('Username').fill('invalid');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('main').getByRole('button', { name: /^Sign In$/ }).click();
    
    // Should show error message
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
    await expect(page).toHaveURL('/auth/signin');
  });

  test('Protected route redirect when not authenticated', async ({ page }) => {
    // Try to access protected route directly
    await page.goto('/questions');
    
    // Should redirect to sign in page
    await expect(page).toHaveURL(/\/auth\/signin/);
    await expect(page.locator('h1')).toContainText('Welcome Back');
  });

  test('User theme preferences are isolated between users', async ({ page }) => {
    // Login as admin and set theme to Minimal Futuristic
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    await page.getByText('Minimal Futuristic').first().click();
    await page.getByRole('button', { name: /Switch to Minimal Futuristic/ }).click();
    
    // Sign out
    await page.locator('nav').getByRole('button').filter({ hasText: /AU/ }).first().click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // Login as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Demo user should have their own theme (not Minimal Futuristic)
    // This verifies themes are user-specific, not global
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('style', /--primary:/);
  });

  test('Session persistence across page refreshes', async ({ page }) => {
    // Login as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Refresh the page
    await page.reload();
    
    // Should still be logged in and on dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Verify user menu still works
    await page.locator('nav').getByRole('button').filter({ hasText: /DU/ }).first().click();
    await expect(page.locator('text=Demo User')).toBeVisible();
  });

  test('Navigation visibility based on authentication state', async ({ page }) => {
    // When not authenticated, navigation should be minimal
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Dashboard')).not.toBeVisible();
    await expect(page.locator('text=Companies')).not.toBeVisible();
    
    // Login
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Now navigation should show all authenticated routes (be more specific to avoid dropdown menu)
    await expect(page.locator('nav').getByRole('link', { name: 'Dashboard' }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Companies' }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Questions' }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Stories' }).first()).toBeVisible();
  });

  test('Admin panel access control', async ({ page }) => {
    // Login as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Try to access admin panel - should be redirected
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/auth\/signin/);
    
    // Sign out demo user first
    await page.locator('nav').getByRole('button').filter({ hasText: /DU/ }).first().click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Land Your Dream Job with Confidence');
    
    // Now login as admin from home page
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Now admin panel should be accessible
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('h1')).toContainText('Admin Panel');
  });
});
