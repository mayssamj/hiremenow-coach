
import { test, expect } from '@playwright/test';

test.describe('Admin Demo Button - Comprehensive Testing', () => {
  test('Admin Demo button should work completely', async ({ page }) => {
    console.log('🔬 Starting comprehensive admin demo test...');
    
    // Step 1: Navigate to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Homepage loaded');
    
    // Step 2: Wait for demo buttons to be visible
    await page.waitForSelector('text=Admin Demo', { timeout: 10000 });
    console.log('✅ Admin Demo button found');
    
    // Step 3: Check initial session (should be empty)
    const initialSessionResponse = await page.request.get('http://localhost:3000/api/auth/session');
    const initialSession = await initialSessionResponse.json();
    console.log('📋 Initial session:', initialSession);
    expect(initialSession).toEqual({});
    
    // Step 4: Set up console monitoring to catch any errors
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      console.log(`🖥️ Console ${msg.type()}: ${msg.text()}`);
    });
    
    // Step 5: Click Admin Demo button
    console.log('🔥 Clicking Admin Demo button...');
    await page.click('text=Admin Demo');
    
    // Step 6: Wait for authentication to process
    console.log('⏳ Waiting for authentication...');
    await page.waitForTimeout(3000);
    
    // Step 7: Check if session was created
    const sessionResponse = await page.request.get('http://localhost:3000/api/auth/session');
    const session = await sessionResponse.json();
    console.log('📋 Session after login attempt:', session);
    
    // Step 8: Check for any console errors
    const errors = consoleMessages.filter(msg => msg.startsWith('error:'));
    if (errors.length > 0) {
      console.log('❌ Console errors found:', errors);
    }
    
    // Step 9: Verify admin session was created
    if (session.user) {
      console.log('✅ Session created successfully!');
      expect(session.user.username).toBe('admin');
      expect(session.user.role).toBe('ADMIN');
      
      // Step 10: Check if page redirected or updated
      const currentUrl = page.url();
      console.log('📍 Current URL:', currentUrl);
      
      // Step 11: Test admin access
      const adminResponse = await page.request.get('http://localhost:3000/api/admin/database/stats');
      expect(adminResponse.status()).toBe(200);
      console.log('✅ Admin access verified');
      
    } else {
      console.log('❌ Session not created - Admin Demo button failed');
      
      // Debug: Check what happened
      console.log('🔍 Debug info:');
      console.log('- Console messages:', consoleMessages);
      console.log('- Current URL:', page.url());
      console.log('- Session response:', session);
      
      // Check if there are any visible error messages on the page
      const errorMessages = await page.$$eval('[role="alert"], .error, .alert', 
        elements => elements.map(el => el.textContent));
      if (errorMessages.length > 0) {
        console.log('🚨 Error messages on page:', errorMessages);
      }
      
      // Take a screenshot for debugging
      await page.screenshot({ path: 'admin-demo-failure.png' });
      
      throw new Error('Admin Demo button did not create a session');
    }
  });
  
  test('Compare with Demo User button (should work)', async ({ page }) => {
    console.log('🔬 Testing Demo User button for comparison...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Click Demo User button
    await page.click('text=Demo User');
    await page.waitForTimeout(3000);
    
    // Check session
    const sessionResponse = await page.request.get('http://localhost:3000/api/auth/session');
    const session = await sessionResponse.json();
    console.log('📋 Demo User session:', session);
    
    if (session.user) {
      expect(session.user.username).toBe('demo');
      expect(session.user.role).toBe('USER');
      console.log('✅ Demo User button works correctly');
    } else {
      console.log('❌ Demo User button also failed');
    }
  });
});
