
import { test, expect } from '@playwright/test';

test.describe('Simple Manual Tests', () => {
  
  test('Demo login and question page test', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');
    
    // Check signin page loads
    await expect(page.locator('text=Welcome back')).toBeVisible();
    
    // Click Demo User button
    await page.click('button:has-text("Demo User")');
    
    // Wait for redirect and check we're logged in
    await page.waitForTimeout(3000);
    
    // Should be on dashboard or redirected page
    console.log('Current URL after login:', page.url());
    
    // Navigate to questions page
    await page.goto('/questions');
    await page.waitForTimeout(2000);
    
    // Check if questions page loads
    const questionBankVisible = await page.locator('h1:has-text("Question Bank")').isVisible().catch(() => false);
    console.log('Question Bank visible:', questionBankVisible);
    
    // Look for any questions on the page
    const answerButtons = await page.locator('button:has-text("Answer")').count();
    const reviewButtons = await page.locator('button:has-text("Review")').count();
    console.log('Answer buttons found:', answerButtons);
    console.log('Review buttons found:', reviewButtons);
    
    // If we have questions, try clicking one
    if (answerButtons > 0 || reviewButtons > 0) {
      const buttonToClick = answerButtons > 0 ? 'button:has-text("Answer")' : 'button:has-text("Review")';
      await page.click(buttonToClick + ' >> nth=0');
      
      await page.waitForTimeout(2000);
      console.log('URL after clicking question:', page.url());
      
      // Check if we're on a question detail page
      const yourAnswerVisible = await page.locator('text=Your Answer').isVisible().catch(() => false);
      console.log('Your Answer section visible:', yourAnswerVisible);
      
      // Check for 404 errors
      const has404 = await page.locator('text=404').isVisible().catch(() => false);
      const hasNotFound = await page.locator('text=This page could not be found').isVisible().catch(() => false);
      console.log('Has 404 error:', has404);
      console.log('Has not found error:', hasNotFound);
      
      expect(has404).toBe(false);
      expect(hasNotFound).toBe(false);
    }
  });

  test('API endpoints basic test', async ({ page }) => {
    // Login first
    await page.goto('/auth/signin');
    await page.click('button:has-text("Demo User")');
    await page.waitForTimeout(3000);
    
    // Test questions API
    const response = await page.evaluate(async () => {
      try {
        const res = await fetch('/api/questions');
        return {
          status: res.status,
          ok: res.ok,
          data: res.ok ? await res.json() : null
        };
      } catch (error) {
        return { error: (error as Error).message };
      }
    });
    
    console.log('Questions API response:', response);
    expect(response.status).toBe(200);
  });
});
