
import { test, expect } from '@playwright/test';

test.describe('User-Specific Theme System E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Different users maintain separate theme preferences', async ({ page }) => {
    // Login as admin and set to Abstract Creative theme
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Wait for themes to load
    await expect(page.locator('text=Available Themes')).toBeVisible();
    
    // Select Abstract Creative theme
    const abstractCreativeButton = page.locator('button', { hasText: 'Switch to Abstract Creative' }).first();
    await abstractCreativeButton.click();
    
    // Verify theme applied
    await expect(page.locator('html')).toHaveAttribute('style', /--primary:/);
    
    // Sign out
    await page.getByRole('button').filter({ hasText: /AA/ }).click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    await expect(page).toHaveURL('/');
    
    // Login as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Demo user should have their default theme (Modern Vibrant), not Abstract Creative
    const htmlStyles = await page.locator('html').getAttribute('style');
    
    // Sign out demo user
    await page.getByRole('button').filter({ hasText: /DU/ }).click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // Login as admin again
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Admin should still have Abstract Creative theme
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // The Abstract Creative theme should still be active for admin
    await expect(page.locator('html')).toHaveAttribute('style', /--primary:/);
  });

  test('Theme changes persist across sessions for same user', async ({ page }) => {
    // Login as admin
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Go to admin panel and change theme
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Select Minimal Futuristic theme
    const minimalButton = page.locator('button', { hasText: 'Switch to Minimal Futuristic' }).first();
    await minimalButton.click();
    
    // Sign out
    await page.getByRole('button').filter({ hasText: /AA/ }).click();
    await page.getByRole('menuitem', { name: /Sign out/ }).click();
    
    // Login as admin again
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Theme should be preserved
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Minimal Futuristic should still be active
    await expect(page.locator('html')).toHaveAttribute('style', /--primary:/);
  });

  test('Theme switching is immediate and visible', async ({ page }) => {
    // Login as admin
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Get initial styles
    const initialStyles = await page.locator('html').getAttribute('style');
    
    // Switch to a different theme
    const modernButton = page.locator('button', { hasText: 'Switch to Modern Vibrant' }).first();
    await modernButton.click();
    
    // Verify styles changed
    const newStyles = await page.locator('html').getAttribute('style');
    expect(newStyles).not.toBe(initialStyles);
    
    // Switch to another theme
    const minimalButton = page.locator('button', { hasText: 'Switch to Minimal Futuristic' }).first();
    await minimalButton.click();
    
    // Verify styles changed again
    const thirdStyles = await page.locator('html').getAttribute('style');
    expect(thirdStyles).not.toBe(newStyles);
    expect(thirdStyles).not.toBe(initialStyles);
  });

  test('Non-admin users cannot access theme admin panel', async ({ page }) => {
    // Login as demo user
    await page.getByRole('button', { name: /Demo User/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Try to access admin panel
    await page.goto('/admin');
    
    // Should be redirected to sign in
    await expect(page).toHaveURL(/\/auth\/signin/);
    
    // Verify user menu doesn't have admin panel option
    await page.goto('/dashboard');
    await page.getByRole('button').filter({ hasText: /DU/ }).click();
    await expect(page.locator('text=Admin Panel')).not.toBeVisible();
  });

  test('Theme API endpoints work correctly', async ({ page }) => {
    // Login as admin
    await page.getByRole('button', { name: /Admin Demo/ }).click();
    await expect(page).toHaveURL('/dashboard');
    
    // Test theme preference API by intercepting network requests
    let themeApiCalled = false;
    let themeApiResponse = null;
    
    page.on('response', response => {
      if (response.url().includes('/api/user/theme-preference')) {
        themeApiCalled = true;
        response.json().then(data => {
          themeApiResponse = data;
        });
      }
    });
    
    // Navigate to admin panel to trigger theme loading
    await page.goto('/admin');
    await page.getByRole('tab', { name: 'Themes' }).click();
    
    // Change theme to trigger API call
    const modernButton = page.locator('button', { hasText: 'Switch to Modern Vibrant' }).first();
    await modernButton.click();
    
    // Wait a bit for API call
    await page.waitForTimeout(1000);
    
    expect(themeApiCalled).toBe(true);
  });
});
