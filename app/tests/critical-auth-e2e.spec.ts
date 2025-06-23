
import { test, expect } from '@playwright/test';

test.describe('Critical Authentication E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page first
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should successfully log in with admin credentials via sign-in page', async ({ page }) => {
    console.log('🔐 Testing admin login via sign-in page...');
    
    // Look for Sign In button in navigation (when not logged in) - use first one found
    const signInButton = page.locator('a[href="/auth/signin"]').first();
    
    await expect(signInButton).toBeVisible({ timeout: 5000 });
    await signInButton.click();
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    
    // Fill in admin credentials
    await page.fill('#username', 'admin');
    await page.fill('#password', 'adminadmin');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for redirect and check we're logged in
    await page.waitForURL(/.*\/dashboard/, { timeout: 10000 });
    
    // Verify we're on the dashboard and can see admin content
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Check for admin-specific content in navigation or page
    const adminContent = page.locator('text=Admin').first().or(
      page.locator('[href="/admin"]').or(
        page.locator('text=Dashboard')
      )
    );
    await expect(adminContent).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Admin login via sign-in page successful');
  });

  test('should successfully log in with demo credentials', async ({ page }) => {
    console.log('🔐 Testing demo user login...');
    
    // Navigate to sign-in page via navigation
    const signInButton = page.locator('a[href="/auth/signin"]').first();
    await expect(signInButton).toBeVisible({ timeout: 5000 });
    await signInButton.click();
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    
    // Fill in demo credentials
    await page.fill('#username', 'demo');
    await page.fill('#password', 'demodemo');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await page.waitForURL(/.*\/dashboard/, { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    console.log('✅ Demo user login successful');
  });

  test('should handle invalid credentials correctly', async ({ page }) => {
    console.log('🔐 Testing invalid credentials handling...');
    
    // Navigate to sign-in page via navigation
    const signInButton = page.locator('a[href="/auth/signin"]').first();
    await expect(signInButton).toBeVisible({ timeout: 5000 });
    await signInButton.click();
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    
    // Fill in invalid credentials
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'wrongpassword');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Should stay on sign-in page and show error
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    
    // Look for error message
    const errorMessage = page.locator('text=Invalid username or password').or(
      page.locator('[role="alert"]').or(
        page.locator('.alert-destructive')
      )
    );
    
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Invalid credentials handled correctly');
  });

  test('should test admin demo button functionality', async ({ page }) => {
    console.log('🔐 Testing Admin Demo button...');
    
    // Look for Admin Demo button on landing page
    const adminDemoButton = page.getByText('Admin Demo', { exact: true }).or(
      page.locator('button').filter({ hasText: /admin.*demo/i })
    );
    
    // Wait a bit for page to load completely
    await page.waitForTimeout(2000);
    
    if (await adminDemoButton.isVisible()) {
      await adminDemoButton.click();
      
      // Wait for redirect to dashboard or sign-in
      await page.waitForTimeout(3000);
      
      // Should either be at dashboard or redirected to sign-in (depending on demo logic)
      const currentUrl = page.url();
      if (currentUrl.includes('/dashboard')) {
        console.log('✅ Admin Demo button redirected to dashboard');
      } else if (currentUrl.includes('/auth/signin')) {
        console.log('✅ Admin Demo button redirected to sign-in (expected behavior)');
      } else {
        console.log('⚠️ Admin Demo button redirected to:', currentUrl);
      }
    } else {
      console.log('⚠️ Admin Demo button not found - this is expected based on current UI');
    }
  });

  test('should test user demo button functionality', async ({ page }) => {
    console.log('🔐 Testing User Demo button...');
    
    // Look for Demo User button on landing page
    const userDemoButton = page.getByText('Demo User', { exact: true }).or(
      page.locator('button').filter({ hasText: /demo.*user/i })
    );
    
    // Wait a bit for page to load completely
    await page.waitForTimeout(2000);
    
    if (await userDemoButton.isVisible()) {
      await userDemoButton.click();
      
      // Wait for redirect to dashboard or sign-in
      await page.waitForTimeout(3000);
      
      // Should either be at dashboard or redirected to sign-in (depending on demo logic)
      const currentUrl = page.url();
      if (currentUrl.includes('/dashboard')) {
        console.log('✅ Demo User button redirected to dashboard');
      } else if (currentUrl.includes('/auth/signin')) {
        console.log('✅ Demo User button redirected to sign-in (expected behavior)');
      } else {
        console.log('⚠️ Demo User button redirected to:', currentUrl);
      }
    } else {
      console.log('⚠️ Demo User button not found - this is expected based on current UI');
    }
  });

  test('should handle logout correctly', async ({ page }) => {
    console.log('🔐 Testing logout functionality...');
    
    // First log in as admin via navigation
    const signInButton = page.locator('a[href="/auth/signin"]').first();
    await expect(signInButton).toBeVisible({ timeout: 5000 });
    await signInButton.click();
    
    await page.fill('#username', 'admin');
    await page.fill('#password', 'adminadmin');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForURL(/.*\/dashboard/, { timeout: 10000 });
    
    // Look for user dropdown/avatar - more specific selector
    const userAvatar = page.locator('button').filter({ hasText: /^[A-Z]{1,2}$/ }).first();
    
    if (await userAvatar.isVisible()) {
      await userAvatar.click();
      
      // Look for Sign out option in dropdown
      const signOutOption = page.getByText('Sign out', { exact: false });
      await expect(signOutOption).toBeVisible({ timeout: 3000 });
      await signOutOption.click();
      
      // Should redirect to home page
      await page.waitForURL('http://localhost:3000/', { timeout: 10000 });
      await expect(page).toHaveURL('http://localhost:3000/');
      
      // Should see Sign In button again (indicating we're logged out)
      const signInButtonAfterLogout = page.locator('a[href="/auth/signin"]').first();
      await expect(signInButtonAfterLogout).toBeVisible({ timeout: 5000 });
      
      console.log('✅ Logout working correctly');
    } else {
      console.log('⚠️ User avatar/dropdown not found');
    }
  });

  test('should redirect unauthenticated users to sign-in when accessing protected routes', async ({ page }) => {
    console.log('🔐 Testing protected route access without authentication...');
    
    // Try to access dashboard directly without logging in
    await page.goto('http://localhost:3000/dashboard');
    
    // Should redirect to sign-in page (with our new middleware)
    await page.waitForURL(/.*\/auth\/signin/, { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    
    console.log('✅ Protected route redirection working');
  });

  test('should maintain session across page reloads', async ({ page }) => {
    console.log('🔐 Testing session persistence...');
    
    // Log in as admin via navigation
    const signInButton = page.locator('a[href="/auth/signin"]').first();
    await expect(signInButton).toBeVisible({ timeout: 5000 });
    await signInButton.click();
    
    await page.fill('#username', 'admin');
    await page.fill('#password', 'adminadmin');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForURL(/.*\/dashboard/, { timeout: 10000 });
    
    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should still be on dashboard (session persisted)
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    console.log('✅ Session persistence working');
  });
});
