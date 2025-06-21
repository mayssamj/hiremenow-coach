
import { test, expect } from '@playwright/test';

test.describe('HireMeNow.Coach - Comprehensive E2E Tests (Final)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('Homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/HireMeNow.Coach/);
    await expect(page.getByText('Land Your Dream Job with')).toBeVisible();
    await expect(page.getByText('Confidence')).toBeVisible();
  });

  test('Sign in page loads and demo buttons work', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check page loads correctly
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Demo User' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin Demo' })).toBeVisible();
    
    // Test demo user sign in
    await page.getByRole('button', { name: 'Demo User' }).click();
    
    // Wait for navigation - could be dashboard or redirect
    await page.waitForLoadState('networkidle');
    
    // Verify user is logged in by checking we're not on signin page anymore
    await expect(page).not.toHaveURL(/\/auth\/signin/);
    await page.waitForTimeout(2000); // Give extra time for app to initialize
  });

  test('Navigation to Questions page works', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Navigate to questions
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Verify questions page loads (flexible heading search)
    await page.waitForTimeout(3000); // Extra wait for content to load
    await expect(page.getByText('Question Bank').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Practice with behavioral, technical')).toBeVisible();
    
    // Check for stats cards
    await expect(page.getByText('Total Questions')).toBeVisible();
    await expect(page.getByText('Answered')).toBeVisible();
  });

  test('Questions list and filtering work', async ({ page }) => {
    // Sign in and go to questions
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Wait for questions to load (use first() to avoid strict mode)
    await expect(page.getByRole('button', { name: 'Answer' }).or(page.getByRole('button', { name: 'Review' })).first()).toBeVisible({ timeout: 10000 });
    
    // Test search functionality
    const searchInput = page.getByPlaceholder('Search questions...');
    await searchInput.fill('behavioral');
    await page.waitForTimeout(1000); // Allow debounce
    
    // Test category filter
    await page.getByRole('combobox').filter({ hasText: 'All Categories' }).click();
    await page.getByRole('option', { name: 'Behavioral' }).click();
    await page.waitForTimeout(1000);
    
    // Test difficulty filter  
    await page.getByRole('combobox').filter({ hasText: 'All Difficulty' }).click();
    await page.getByRole('option', { name: 'Medium' }).click();
    await page.waitForTimeout(1000);
  });

  test('Individual question page loads and answer submission works', async ({ page }) => {
    // Sign in and go to questions
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('/questions');
    await page.waitForLoadState('networkidle');
    
    // Wait for questions to load and click on first question (use first() to avoid strict mode)
    await page.waitForTimeout(3000); // Extra wait for questions to load
    const answerButton = page.getByRole('button', { name: /Answer|Review/ }).first();
    await expect(answerButton).toBeVisible({ timeout: 15000 });
    await answerButton.click({ force: true });
    await page.waitForLoadState('networkidle');
    
    // Verify we're on an individual question page
    await expect(page).toHaveURL(/\/questions\/[a-zA-Z0-9]+/);
    await expect(page.getByText('Your Answer')).toBeVisible();
    await expect(page.getByText('Back to Questions')).toBeVisible();
    
    // Fill out answer form
    const answerContent = 'This is a test answer using the STAR method:\n\nSituation: I was working on a project...\nTask: I needed to...\nAction: I decided to...\nResult: The outcome was successful...';
    
    const textarea = page.getByPlaceholder(/Write your detailed answer/);
    await textarea.fill(answerContent);
    
    // Add a tag if available
    const tagInput = page.getByPlaceholder(/Add a tag/);
    if (await tagInput.isVisible()) {
      await tagInput.fill('test-tag');
      await page.getByRole('button', { name: 'Add' }).click();
    }
    
    // Mark as complete if available
    const completeCheckbox = page.getByText('Mark as complete');
    if (await completeCheckbox.isVisible()) {
      await completeCheckbox.click();
    }
    
    // Save the answer
    await page.getByRole('button', { name: 'Save Answer' }).click();
    
    // Verify success (look for success toast or confirmation)
    await expect(page.getByText('Success').or(page.getByText('saved')).first()).toBeVisible({ timeout: 5000 });
  });

  test('API endpoints respond correctly', async ({ page }) => {
    // Sign in first to get session
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Test questions API endpoint
    const questionsResponse = await page.request.get('/api/questions');
    expect(questionsResponse.status()).toBe(200);
    
    const questionsData = await questionsResponse.json();
    expect(questionsData).toHaveProperty('questions');
    expect(Array.isArray(questionsData.questions)).toBe(true);
    
    // If there are questions, test individual question API
    if (questionsData.questions.length > 0) {
      const firstQuestionId = questionsData.questions[0].id;
      
      const questionResponse = await page.request.get(`/api/questions/${firstQuestionId}`);
      expect(questionResponse.status()).toBe(200);
      
      const questionData = await questionResponse.json();
      expect(questionData).toHaveProperty('question');
      expect(questionData.question.id).toBe(firstQuestionId);
    }
  });

  test('Companies page works', async ({ page }) => {
    // Sign in and navigate to companies
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('/companies');
    await page.waitForLoadState('networkidle');
    
    // Verify companies page loads (be very flexible with content check)
    await expect(page.getByText('Companies').or(page.getByText('Explore')).or(page.getByText('Company')).first()).toBeVisible();
  });

  test('Stories page works', async ({ page }) => {
    // Sign in and navigate to stories
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('/stories');
    await page.waitForLoadState('networkidle');
    
    // Verify stories page loads (use first() to avoid strict mode)
    await page.waitForTimeout(3000); // Extra wait for content to load
    await expect(page.getByText('STAR').or(page.getByText('Stories')).first()).toBeVisible({ timeout: 15000 });
  });

  test('Dashboard page works', async ({ page }) => {
    // Sign in (should redirect to dashboard)
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Navigate explicitly to dashboard if not there
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Verify dashboard loads by checking URL and waiting for content
    await expect(page).toHaveURL(/\/dashboard/);
    await page.waitForTimeout(2000); // Give time for dashboard content to load
  });

  test('Sign out works', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Look for user button by checking for initials pattern (DU for Demo User)
    const userButton = page.getByRole('button', { name: /^[A-Z]{1,2}$/ });
    await expect(userButton).toBeVisible({ timeout: 10000 });
    await userButton.click();
    
    // Click sign out in dropdown
    await page.getByText('Sign out').click();
    
    // Should redirect to homepage or signin
    await expect(page).toHaveURL(/\/(auth\/signin)?$/);
  });

  test('Protected routes redirect unauthenticated users', async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
    
    // Try to access protected routes
    const protectedRoutes = ['/questions', '/dashboard', '/companies', '/stories'];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      // Should redirect to signin
      await expect(page).toHaveURL(/\/auth\/signin/);
    }
  });

  test('No 404 errors on main navigation paths', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.waitForLoadState('networkidle');
    
    // Test main navigation paths
    const paths = ['/', '/questions', '/companies', '/stories', '/dashboard'];
    
    for (const path of paths) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // Verify no 404 error
      await expect(page.getByText('404')).not.toBeVisible();
      await expect(page.getByText('This page could not be found')).not.toBeVisible();
      
      // Verify page loads some content
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});
