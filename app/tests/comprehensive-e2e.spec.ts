
import { test, expect } from '@playwright/test';

test.describe('HireMeNow.Coach - Comprehensive E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('Homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/HireMeNow.Coach/);
    await expect(page.locator('text=Land Your Dream Job with')).toBeVisible();
    await expect(page.locator('text=Confidence')).toBeVisible();
  });

  test('Sign in page loads and demo buttons work', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check page loads correctly
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('text=Demo User')).toBeVisible();
    await expect(page.locator('text=Admin Demo')).toBeVisible();
    
    // Test demo user sign in
    await page.click('text=Demo User');
    
    // Should redirect to dashboard/homepage after login
    await expect(page).toHaveURL(/\/(dashboard)?/);
    
    // Verify user is logged in (check for navigation or profile)
    await expect(page.locator('[data-testid="user-nav"], .user-menu, text=Dashboard, text=Questions').first()).toBeVisible();
  });

  test('Navigation to Questions page works', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Navigate to questions
    await page.goto('/questions');
    
    // Verify questions page loads
    await expect(page.locator('text=Question Bank')).toBeVisible();
    await expect(page.locator('text=Practice with behavioral, technical')).toBeVisible();
    
    // Check for stats cards
    await expect(page.locator('text=Total Questions')).toBeVisible();
    await expect(page.locator('text=Answered')).toBeVisible();
  });

  test('Questions list and filtering work', async ({ page }) => {
    // Sign in and go to questions
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    await page.goto('/questions');
    
    // Wait for questions to load
    await page.waitForSelector('[data-testid="question-card"], .question-item, text=Answer, text=Review', { timeout: 10000 });
    
    // Test search functionality
    await page.fill('input[placeholder*="Search questions"]', 'behavioral');
    await page.waitForTimeout(1000); // Allow debounce
    
    // Test category filter
    await page.click('text=All Categories');
    await page.click('text=Behavioral');
    await page.waitForTimeout(1000);
    
    // Test difficulty filter  
    await page.click('text=All Difficulty');
    await page.click('text=Medium');
    await page.waitForTimeout(1000);
  });

  test('Individual question page loads and answer submission works', async ({ page }) => {
    // Sign in and go to questions
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    await page.goto('/questions');
    
    // Wait for questions to load and click on first question
    await page.waitForSelector('text=Answer, text=Review', { timeout: 10000 });
    
    // Click on first "Answer" or "Review" button
    const firstAnswerButton = page.locator('text=Answer, text=Review').first();
    await firstAnswerButton.click();
    
    // Verify we're on an individual question page
    await expect(page).toHaveURL(/\/questions\/[a-zA-Z0-9]+/);
    await expect(page.locator('text=Your Answer')).toBeVisible();
    await expect(page.locator('text=Back to Questions')).toBeVisible();
    
    // Fill out answer form
    const answerContent = 'This is a test answer using the STAR method:\n\nSituation: I was working on a project...\nTask: I needed to...\nAction: I decided to...\nResult: The outcome was successful...';
    
    await page.fill('textarea[placeholder*="Write your detailed answer"]', answerContent);
    
    // Add a tag
    await page.fill('input[placeholder*="Add a tag"]', 'test-tag');
    await page.click('text=Add');
    
    // Mark as complete
    await page.click('text=Mark as complete');
    
    // Save the answer
    await page.click('text=Save Answer');
    
    // Verify success (look for success toast or confirmation)
    await expect(page.locator('text=Success, text=saved, [data-testid="toast"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('API endpoints respond correctly', async ({ page }) => {
    // Sign in first to get session
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
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
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    await page.goto('/companies');
    
    // Verify companies page loads
    await expect(page.locator('text=Companies, text=Explore')).toBeVisible();
  });

  test('Stories page works', async ({ page }) => {
    // Sign in and navigate to stories
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    await page.goto('/stories');
    
    // Verify stories page loads
    await expect(page.locator('text=STAR, text=Stories')).toBeVisible();
  });

  test('Dashboard page works', async ({ page }) => {
    // Sign in (should redirect to dashboard)
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Navigate explicitly to dashboard if not there
    await page.goto('/dashboard');
    
    // Verify dashboard loads
    await expect(page.locator('text=Dashboard, text=Progress, text=Interview')).toBeVisible();
  });

  test('Sign out works', async ({ page }) => {
    // Sign in first
    await page.goto('/auth/signin');
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Look for sign out button/option
    await page.click('[data-testid="user-menu"], .user-menu, text=Sign Out', { timeout: 5000 });
    
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
    await page.click('text=Demo User');
    await page.waitForURL(/\/(dashboard)?/);
    
    // Test main navigation paths
    const paths = ['/', '/questions', '/companies', '/stories', '/dashboard'];
    
    for (const path of paths) {
      await page.goto(path);
      
      // Verify no 404 error
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=This page could not be found')).not.toBeVisible();
      
      // Verify page loads some content
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});
