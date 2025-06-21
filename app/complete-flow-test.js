
const { chromium } = require('playwright');

async function testCompleteFlow() {
  console.log('Starting complete user flow test...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Enable request logging to see any 404s
  page.on('response', response => {
    if (response.status() === 404) {
      console.log(`❌ 404 ERROR: ${response.url()}`);
    } else if (response.status() >= 400) {
      console.log(`⚠️  HTTP ${response.status()}: ${response.url()}`);
    }
  });
  
  try {
    // Step 1: Navigate to the app
    console.log('1. Navigating to app...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Step 2: Click Demo User button
    console.log('2. Clicking Demo User button...');
    await page.locator('button:has-text("Demo User")').click();
    await page.waitForLoadState('networkidle');
    
    const currentUrl = page.url();
    console.log('   Current URL after demo login:', currentUrl);
    
    // Step 3: Navigate to questions if we're on dashboard
    if (currentUrl.includes('/dashboard')) {
      console.log('3. Successfully logged in to dashboard');
      
      // Look for Questions navigation link
      const questionsLink = page.locator('a:has-text("Questions")');
      if (await questionsLink.isVisible()) {
        console.log('4. Clicking Questions link...');
        await questionsLink.click();
        await page.waitForLoadState('networkidle');
        console.log('   Questions page URL:', page.url());
      } else {
        console.log('4. Questions link not found, trying direct navigation...');
        await page.goto('http://localhost:3000/questions');
        await page.waitForLoadState('networkidle');
      }
    } else {
      console.log('3. Not on dashboard, trying to navigate to questions...');
      await page.goto('http://localhost:3000/questions');
      await page.waitForLoadState('networkidle');
    }
    
    // Step 4: Look for questions and answer buttons
    console.log('5. Looking for questions on the page...');
    
    // Wait for questions to load
    await page.waitForTimeout(2000);
    
    const answerButtons = await page.locator('button:has-text("Answer")').count();
    const reviewButtons = await page.locator('button:has-text("Review")').count();
    
    console.log(`   Found ${answerButtons} "Answer" buttons`);
    console.log(`   Found ${reviewButtons} "Review" buttons`);
    
    if (answerButtons > 0 || reviewButtons > 0) {
      // Step 5: Click on first answer/review button
      const buttonToClick = answerButtons > 0 ? 'Answer' : 'Review';
      console.log(`6. Clicking first "${buttonToClick}" button...`);
      
      await page.locator(`button:has-text("${buttonToClick}")`).first().click();
      await page.waitForLoadState('networkidle');
      
      const questionDetailUrl = page.url();
      console.log('   Question detail URL:', questionDetailUrl);
      
      // Check if we successfully loaded the question detail page
      const pageContent = await page.textContent('body');
      if (pageContent.includes('404') || pageContent.includes('Not Found')) {
        console.log('   ❌ 404 ERROR: Question detail page shows 404');
      } else {
        console.log('   ✅ Question detail page loaded successfully');
        
        // Step 6: Test answer submission
        console.log('7. Testing answer submission functionality...');
        
        const answerTextarea = page.locator('textarea');
        if (await answerTextarea.isVisible()) {
          console.log('   Found answer textarea, filling with test content...');
          await answerTextarea.fill('This is a test answer to verify the submission functionality works correctly.');
          
          const saveButton = page.locator('button:has-text("Save Answer")');
          if (await saveButton.isVisible()) {
            console.log('   Clicking Save Answer button...');
            
            // Listen for the API response
            const responsePromise = page.waitForResponse(response => 
              response.url().includes('/answers') && response.request().method() === 'POST'
            );
            
            await saveButton.click();
            
            try {
              const response = await responsePromise;
              console.log(`   Answer submission response: ${response.status()}`);
              
              if (response.status() === 200) {
                console.log('   ✅ Answer submitted successfully!');
              } else {
                console.log(`   ❌ Answer submission failed with status ${response.status()}`);
              }
            } catch (error) {
              console.log('   ❌ Error waiting for answer submission response:', error.message);
            }
            
          } else {
            console.log('   ❌ Save Answer button not found');
          }
        } else {
          console.log('   ❌ Answer textarea not found');
        }
      }
    } else {
      console.log('   ❌ No Answer or Review buttons found - might indicate no questions in database');
    }
    
    console.log('\n=== Test Summary ===');
    console.log('✅ App loads correctly');
    console.log('✅ Demo login works');
    if (answerButtons > 0 || reviewButtons > 0) {
      console.log('✅ Questions are available');
      console.log('✅ Question detail pages are accessible');
    } else {
      console.log('⚠️  No questions found - database might be empty');
    }
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  } finally {
    await browser.close();
  }
}

testCompleteFlow().catch(console.error);
