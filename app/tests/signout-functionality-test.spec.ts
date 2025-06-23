
import { test, expect } from '@playwright/test';

test.describe('Sign Out Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('Complete authentication flow: Sign in -> Verify session -> Sign out -> Verify signed out', async ({ page }) => {
    console.log('🔍 Testing complete authentication flow...');

    // Step 1: Verify we start logged out
    await expect(page.getByText('Sign In')).toBeVisible();
    await expect(page.getByText('Sign Up')).toBeVisible();
    console.log('✅ Step 1: Initially logged out - confirmed');

    // Step 2: Click Demo User button to sign in
    await page.getByText('Demo User').click();
    console.log('🔄 Step 2: Clicked Demo User button');

    // Step 3: Wait for authentication to complete and verify signed in state
    // Wait for navigation to dashboard or see user avatar
    await page.waitForLoadState('networkidle');
    
    // Wait for either dashboard navigation or user avatar to appear
    try {
      await page.waitForURL('**/dashboard', { timeout: 10000 });
      console.log('✅ Step 3: Redirected to dashboard after sign in');
    } catch {
      // If not redirected to dashboard, check for user avatar in navigation
      await expect(page.locator('[data-testid="user-avatar"]', '[role="button"]').first()).toBeVisible({ timeout: 10000 });
      console.log('✅ Step 3: User avatar visible in navigation');
    }

    // Step 4: Verify signed in state by checking for user menu
    const userMenuExists = await page.locator('button').filter({ hasText: /^[A-Z]{1,2}$/ }).first().isVisible();
    if (userMenuExists) {
      console.log('✅ Step 4: User menu button (avatar) found - user is signed in');
    } else {
      // Alternative check: look for dashboard navigation link
      const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
      await expect(dashboardLink).toBeVisible();
      console.log('✅ Step 4: Dashboard link visible - user is signed in');
    }

    // Step 5: Click on user avatar/menu to open dropdown
    const userButton = page.locator('button').filter({ hasText: /^[A-Z]{1,2}$/ }).first();
    if (await userButton.isVisible()) {
      await userButton.click();
      console.log('🔄 Step 5: Clicked user menu button');

      // Step 6: Click Sign out button
      await page.getByText('Sign out').click();
      console.log('🔄 Step 6: Clicked Sign out button');
    } else {
      // If no user menu, try to find sign out another way
      const signOutButton = page.getByText('Sign out');
      if (await signOutButton.isVisible()) {
        await signOutButton.click();
        console.log('🔄 Step 6: Clicked Sign out button (direct)');
      } else {
        throw new Error('Could not find sign out button');
      }
    }

    // Step 7: Wait for sign out to complete
    await page.waitForLoadState('networkidle');
    
    // Step 8: Verify we're signed out - should see Sign In/Sign Up buttons
    await expect(page.getByText('Sign In')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Sign Up')).toBeVisible({ timeout: 10000 });
    console.log('✅ Step 8: Sign In/Sign Up buttons visible - user is signed out');

    // Step 9: Verify we're on the homepage (not stuck on the same page)
    const currentUrl = page.url();
    expect(currentUrl).toBe('http://localhost:3000/');
    console.log('✅ Step 9: Redirected to homepage after sign out');

    // Step 10: Verify session is actually cleared by checking session endpoint
    const sessionResponse = await page.evaluate(async () => {
      const response = await fetch('/api/auth/session');
      return await response.json();
    });
    
    expect(sessionResponse).toEqual({});
    console.log('✅ Step 10: Session endpoint confirms user is signed out');

    console.log('🎉 Complete authentication flow test PASSED!');
  });

  test('Sign out button functionality - specific UI test', async ({ page }) => {
    console.log('🔍 Testing sign out button specifically...');

    // Sign in first
    await page.getByText('Demo User').click();
    await page.waitForLoadState('networkidle');

    // Check if we have user menu
    const userButton = page.locator('button').filter({ hasText: /^[A-Z]{1,2}$/ }).first();
    
    if (await userButton.isVisible()) {
      // Click user menu
      await userButton.click();
      
      // Verify sign out button exists
      const signOutButton = page.getByText('Sign out');
      await expect(signOutButton).toBeVisible();
      console.log('✅ Sign out button found in user menu');

      // Click sign out and verify redirect
      await signOutButton.click();
      
      // Verify redirect to homepage
      await page.waitForURL('http://localhost:3000/', { timeout: 10000 });
      console.log('✅ Sign out button redirects to homepage');

      // Verify signed out state
      await expect(page.getByText('Sign In')).toBeVisible();
      console.log('✅ Sign out button successfully signs out user');
    }
  });

  test('Multiple sign in/out cycles', async ({ page }) => {
    console.log('🔍 Testing multiple sign in/out cycles...');

    for (let i = 1; i <= 3; i++) {
      console.log(`🔄 Cycle ${i}: Sign in`);
      
      // Sign in
      await page.getByText('Demo User').click();
      await page.waitForLoadState('networkidle');
      
      // Verify signed in
      const userButton = page.locator('button').filter({ hasText: /^[A-Z]{1,2}$/ }).first();
      if (await userButton.isVisible()) {
        console.log(`✅ Cycle ${i}: Successfully signed in`);
        
        // Sign out
        await userButton.click();
        await page.getByText('Sign out').click();
        await page.waitForLoadState('networkidle');
        
        // Verify signed out
        await expect(page.getByText('Sign In')).toBeVisible();
        console.log(`✅ Cycle ${i}: Successfully signed out`);
      } else {
        throw new Error(`Cycle ${i}: Failed to sign in`);
      }
    }
    
    console.log('🎉 Multiple sign in/out cycles test PASSED!');
  });
});
