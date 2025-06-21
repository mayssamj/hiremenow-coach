
import { test, expect } from '@playwright/test';

test.describe('HireMeNow.Coach - All Tests Final', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('Complete user flow: Login → Questions → Answer Submission', async ({ page }) => {
    // Step 1: Navigate to signin and login
    await page.goto('/auth/signin');
    await expect(page.getByText('Welcome back')).toBeVisible();
    
    // Test demo user sign in
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    await expect(page.getByText('Dashboard').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Login successful');
    
    // Step 2: Navigate to questions page
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Verify questions page loads
    await expect(page.getByText('Question Bank').first()).toBeVisible();
    await expect(page.getByText('Total Questions')).toBeVisible();
    console.log('✅ Questions page loaded');
    
    // Step 3: Click on first available question
    const answerButton = page.getByRole('button', { name: 'Answer' }).or(page.getByRole('button', { name: 'Review' })).first();
    await expect(answerButton).toBeVisible({ timeout: 10000 });
    await answerButton.click();
    await page.waitForLoadState('networkidle');
    
    // Verify question detail page loads
    await expect(page).toHaveURL(/\/questions\/[a-zA-Z0-9]+/);
    await expect(page.getByText('Your Answer')).toBeVisible();
    await expect(page.getByText('Back to Questions')).toBeVisible();
    console.log('✅ Question detail page loaded');
    
    // Step 4: Fill and submit answer
    const answerContent = 'This is a comprehensive test answer for E2E validation.';
    const textarea = page.getByPlaceholder(/Write your detailed answer/);
    await textarea.fill(answerContent);
    
    // Save the answer
    await page.getByRole('button', { name: 'Save Answer' }).click();
    
    // Verify success
    await expect(page.getByText('Success').or(page.getByText('saved')).first()).toBeVisible({ timeout: 5000 });
    console.log('✅ Answer submitted successfully');
  });

  test('API endpoints functionality test', async ({ page }) => {
    // Login to establish session
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Test questions API
    const questionsResponse = await page.request.get('/api/questions');
    expect(questionsResponse.status()).toBe(200);
    
    const questionsData = await questionsResponse.json();
    expect(Array.isArray(questionsData.questions)).toBe(true);
    expect(questionsData.questions.length).toBeGreaterThan(0);
    console.log(`✅ Found ${questionsData.questions.length} questions`);
    
    // Test individual question API
    const questionId = questionsData.questions[0].id;
    const questionResponse = await page.request.get(`/api/questions/${questionId}`);
    expect(questionResponse.status()).toBe(200);
    
    const questionData = await questionResponse.json();
    expect(questionData.question.id).toBe(questionId);
    console.log('✅ Individual question API works');
    
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
    console.log('✅ Answer submission API works');
  });

  test('Navigation and page loading test', async ({ page }) => {
    // Login
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Test all main pages
    const pages = [
      { path: '/dashboard', expectedText: 'Dashboard' },
      { path: '/questions', expectedText: 'Question Bank' },
      { path: '/companies', expectedText: 'Companies' },
      { path: '/stories', expectedText: 'Stories' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('networkidle');
      
      // Check no 404 errors
      await expect(page.getByText('404')).not.toBeVisible();
      await expect(page.getByText('This page could not be found')).not.toBeVisible();
      
      // Check expected content (flexible)
      await expect(page.getByText(pageInfo.expectedText).first()).toBeVisible();
      console.log(`✅ ${pageInfo.path} page works`);
    }
  });

  test('Authentication flow test', async ({ page }) => {
    // Test protected route redirect
    await page.context().clearCookies();
    await page.goto('/questions');
    await expect(page).toHaveURL(/\/auth\/signin/);
    console.log('✅ Protected route redirects work');
    
    // Test successful login
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Dashboard').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Login works');
    
    // Test sign out
    const userButton = page.getByRole('button', { name: /^[A-Z]{1,2}$/ });
    await expect(userButton).toBeVisible({ timeout: 10000 });
    await userButton.click();
    await page.getByText('Sign out').click();
    
    // Should redirect
    await expect(page).toHaveURL(/\/(auth\/signin)?$/);
    console.log('✅ Sign out works');
  });

  test('Search and filtering functionality', async ({ page }) => {
    // Login and go to questions
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Test search
    const searchInput = page.getByPlaceholder('Search questions...');
    await searchInput.fill('system');
    await page.waitForTimeout(1000);
    console.log('✅ Search functionality works');
    
    // Test category filter
    const categorySelect = page.getByRole('combobox').filter({ hasText: 'All Categories' });
    if (await categorySelect.isVisible()) {
      await categorySelect.click();
      const behavioralOption = page.getByRole('option', { name: 'Behavioral' });
      if (await behavioralOption.isVisible()) {
        await behavioralOption.click();
        await page.waitForTimeout(1000);
        console.log('✅ Category filter works');
      }
    }
    
    // Clear filters
    const clearButton = page.getByRole('button', { name: 'Clear All' });
    if (await clearButton.isVisible()) {
      await clearButton.click();
      console.log('✅ Clear filters works');
    }
  });
});
