
import { test, expect } from '@playwright/test';

test.describe('Simple Manual Tests (Fixed)', () => {
  
  test('Demo login and question page test', async ({ page }) => {
    // Navigate to signin page
    await page.goto('/auth/signin');
    
    // Check signin page loads
    await expect(page.getByText('Welcome back')).toBeVisible();
    
    // Click Demo User button
    await page.getByRole('button', { name: 'Demo User' }).click();
    
    // Wait for redirect and check we're logged in
    await page.waitForLoadState('networkidle');
    
    // Should be on dashboard or redirected page
    console.log('Current URL after login:', page.url());
    
    // Navigate to questions page
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Check if questions page loads
    const questionBankVisible = await page.getByRole('heading', { name: 'Question Bank' }).isVisible().catch(() => false);
    console.log('Question Bank visible:', questionBankVisible);
    
    // Look for any questions on the page
    const answerButtons = await page.getByRole('button', { name: 'Answer' }).count();
    const reviewButtons = await page.getByRole('button', { name: 'Review' }).count();
    console.log('Answer buttons found:', answerButtons);
    console.log('Review buttons found:', reviewButtons);
    
    // If we have questions, try clicking one
    if (answerButtons > 0 || reviewButtons > 0) {
      const buttonToClick = answerButtons > 0 
        ? page.getByRole('button', { name: 'Answer' }).first()
        : page.getByRole('button', { name: 'Review' }).first();
      
      await buttonToClick.click();
      await page.waitForLoadState('networkidle');
      
      console.log('URL after clicking question:', page.url());
      
      // Check if we're on a question detail page
      const yourAnswerVisible = await page.getByText('Your Answer').isVisible().catch(() => false);
      console.log('Your Answer section visible:', yourAnswerVisible);
      
      // Check for 404 errors
      const has404 = await page.getByText('404').isVisible().catch(() => false);
      const hasNotFound = await page.getByText('This page could not be found').isVisible().catch(() => false);
      console.log('Has 404 error:', has404);
      console.log('Has not found error:', hasNotFound);
      
      expect(has404).toBe(false);
      expect(hasNotFound).toBe(false);
    }
  });

  test('API endpoints basic test', async ({ page }) => {
    // Login first
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Test questions API using page.request (which maintains the session)
    const response = await page.request.get('/api/questions');
    
    console.log('Questions API response status:', response.status());
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    console.log('Questions API response data:', data);
    expect(data).toHaveProperty('questions');
  });
});
