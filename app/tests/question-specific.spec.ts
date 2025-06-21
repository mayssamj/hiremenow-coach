
import { test, expect } from '@playwright/test';

test.describe('Question-Specific 404 Fix Tests', () => {
  
  test('Question with specific ID loads without 404', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Get a real question ID from the API
    const questionsResponse = await page.request.get('/api/questions');
    const questionsData = await questionsResponse.json();
    
    if (questionsData.questions && questionsData.questions.length > 0) {
      const questionId = questionsData.questions[0].id;
      
      // Navigate to the specific question URL
      await page.goto(`/questions/${questionId}`);
      
      // Verify it loads without 404
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=This page could not be found')).not.toBeVisible();
      await expect(page.locator('text=Question Not Found')).not.toBeVisible();
      
      // Verify question content loads
      await expect(page.locator('text=Your Answer')).toBeVisible();
      await expect(page.locator('text=Back to Questions')).toBeVisible();
      
      // Verify question text is visible
      await expect(page.locator('[data-testid="question-text"], .question-text, .card-title').first()).toBeVisible();
    }
  });

  test('Answer submission API works correctly', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Get a real question ID from the API
    const questionsResponse = await page.request.get('/api/questions');
    const questionsData = await questionsResponse.json();
    
    if (questionsData.questions && questionsData.questions.length > 0) {
      const questionId = questionsData.questions[0].id;
      
      // Test answer submission API directly
      const answerResponse = await page.request.post(`/api/questions/${questionId}/answers`, {
        data: {
          content: 'Test answer content for E2E testing',
          isComplete: true,
          tags: ['e2e-test'],
          timeSpent: 300
        }
      });
      
      expect(answerResponse.status()).toBe(200);
      
      const answerData = await answerResponse.json();
      expect(answerData).toHaveProperty('answer');
      expect(answerData.answer.content).toContain('Test answer content');
    }
  });

  test('Question navigation from list works', async ({ page }) => {
    // Sign in and go to questions list
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    await page.goto('/questions');
    
    // Wait for questions to load
    await page.waitForSelector('text=Answer, text=Review', { timeout: 10000 });
    
    // Get the href of the first question link
    const firstQuestionLink = page.locator('a:has-text("Answer"), a:has-text("Review")').first();
    const href = await firstQuestionLink.getAttribute('href');
    
    if (href) {
      // Click the link
      await firstQuestionLink.click();
      
      // Verify we navigated correctly
      await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      
      // Verify no 404
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=This page could not be found')).not.toBeVisible();
      
      // Verify question page content
      await expect(page.locator('text=Your Answer')).toBeVisible();
    }
  });

  test('Invalid question ID shows proper error', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Try to access an invalid question ID
    await page.goto('/questions/invalid-question-id-12345');
    
    // Should show a proper error message, not a 404
    await expect(page.locator('text=Question Not Found, text=Question doesn\'t exist')).toBeVisible();
    await expect(page.locator('text=Back to Questions')).toBeVisible();
  });
});
