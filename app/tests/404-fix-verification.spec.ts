
import { test, expect } from '@playwright/test';

test.describe('404 Fix Verification', () => {
  
  test('Specific question URL works after login (original 404 issue)', async ({ page }) => {
    // Step 1: Login with demo user
    await page.goto('/auth/signin');
    await page.click('button:has-text("Demo User")');
    
    // Wait for successful login redirect
    await expect(page).toHaveURL(/\/dashboard/);
    console.log('✅ Successfully logged in and redirected to dashboard');
    
    // Step 2: Test the specific question URL that was causing 404
    await page.goto('/questions/cmc5dupt3003ntfm4hlx62p83');
    
    // Step 3: Verify it doesn't show 404 errors
    await expect(page.locator('text=404')).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=This page could not be found')).not.toBeVisible({ timeout: 5000 });
    
    console.log('✅ No 404 errors found');
    
    // Step 4: Verify question page content loads
    await expect(page.locator('text=Your Answer')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Back to Questions')).toBeVisible();
    
    console.log('✅ Question page content loaded successfully');
    
    // Step 5: Test answer submission (the core functionality that was broken)
    const answerText = 'Test answer for automated verification';
    await page.fill('textarea[placeholder*="Write your detailed answer"]', answerText);
    await page.click('button:has-text("Save Answer")');
    
    // Look for success indication
    await expect(page.locator('text=Success, text=saved')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Answer submission worked successfully');
  });

  test('Questions list navigation works without 404', async ({ page }) => {
    // Login
    await page.goto('/auth/signin');
    await page.click('button:has-text("Demo User")');
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Go to questions list
    await page.goto('/questions');
    await expect(page.locator('text=Question Bank')).toBeVisible();
    
    // Find a question link and get its href
    const questionLink = page.locator('a[href*="/questions/"]:has(text="Answer"), a[href*="/questions/"]:has(text="Review")').first();
    await expect(questionLink).toBeVisible({ timeout: 10000 });
    
    const href = await questionLink.getAttribute('href');
    console.log('Found question link:', href);
    
    // Navigate to the question
    await questionLink.click();
    
    // Verify we're on a question page without 404
    await expect(page).toHaveURL(/\/questions\/[a-zA-Z0-9]+/);
    await expect(page.locator('text=404')).not.toBeVisible();
    await expect(page.locator('text=Your Answer')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Question navigation from list works correctly');
  });

  test('API endpoints work correctly with authentication', async ({ page }) => {
    // Login to establish session
    await page.goto('/auth/signin');
    await page.click('button:has-text("Demo User")');
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Test API endpoints with proper session
    const questionsResponse = await page.request.get('/api/questions');
    expect(questionsResponse.status()).toBe(200);
    
    const questionsData = await questionsResponse.json();
    expect(Array.isArray(questionsData.questions)).toBe(true);
    
    if (questionsData.questions.length > 0) {
      const questionId = questionsData.questions[0].id;
      
      // Test individual question API
      const questionResponse = await page.request.get(`/api/questions/${questionId}`);
      expect(questionResponse.status()).toBe(200);
      
      const questionData = await questionResponse.json();
      expect(questionData.question.id).toBe(questionId);
      
      // Test answer submission API
      const answerResponse = await page.request.post(`/api/questions/${questionId}/answers`, {
        data: {
          content: 'Test API answer submission',
          isComplete: true,
          tags: ['api-test'],
          timeSpent: 120
        }
      });
      
      expect(answerResponse.status()).toBe(200);
      console.log('✅ All API endpoints work correctly');
    }
  });
});
