
const { chromium } = require('playwright');

async function testUserFlow() {
  console.log('Starting user flow test...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Step 1: Navigate to the app
    console.log('1. Navigating to app...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Step 2: Login with demo user
    console.log('2. Clicking Demo User...');
    await page.click('text=Demo User');
    await page.waitForLoadState('networkidle');
    
    // Step 3: Navigate to questions
    console.log('3. Navigating to questions...');
    const currentUrl = page.url();
    console.log('   Current URL:', currentUrl);
    
    if (currentUrl.includes('/dashboard')) {
      // Click on questions link in navigation
      try {
        await page.click('text=Questions');
        await page.waitForLoadState('networkidle');
        console.log('   Successfully navigated to questions');
      } catch (error) {
        console.log('   Error clicking Questions link:', error.message);
      }
    }
    
    // Step 4: Try to click on a question
    console.log('4. Looking for questions...');
    const questionsUrl = page.url();
    console.log('   Questions page URL:', questionsUrl);
    
    // Look for answer buttons
    const answerButtons = await page.locator('text=Answer').count();
    const reviewButtons = await page.locator('text=Review').count();
    console.log(`   Found ${answerButtons} "Answer" buttons and ${reviewButtons} "Review" buttons`);
    
    if (answerButtons > 0) {
      console.log('5. Clicking first "Answer" button...');
      try {
        await page.click('text=Answer >> nth=0');
        await page.waitForLoadState('networkidle');
        const questionUrl = page.url();
        console.log('   Question detail URL:', questionUrl);
        
        // Check if we got a 404 or if the page loaded properly
        const pageTitle = await page.title();
        const pageContent = await page.textContent('body');
        
        if (pageContent.includes('404') || pageContent.includes('Not Found')) {
          console.log('   ❌ 404 ERROR FOUND on question detail page!');
        } else {
          console.log('   ✅ Question detail page loaded successfully');
          
          // Step 6: Try to submit an answer
          console.log('6. Testing answer submission...');
          const textarea = await page.locator('textarea').first();
          if (await textarea.isVisible()) {
            await textarea.fill('This is a test answer using the STAR++ method.');
            
            const saveButton = await page.locator('text=Save Answer');
            if (await saveButton.isVisible()) {
              console.log('   Clicking Save Answer...');
              await saveButton.click();
              await page.waitForTimeout(2000); // Wait for save
              console.log('   ✅ Answer submission attempted');
            } else {
              console.log('   ❌ Save Answer button not found');
            }
          } else {
            console.log('   ❌ Answer textarea not found');
          }
        }
      } catch (error) {
        console.log('   ❌ Error clicking answer button:', error.message);
      }
    } else if (reviewButtons > 0) {
      console.log('5. Clicking first "Review" button...');
      try {
        await page.click('text=Review >> nth=0');
        await page.waitForLoadState('networkidle');
        const questionUrl = page.url();
        console.log('   Question detail URL:', questionUrl);
        console.log('   ✅ Question detail page loaded successfully');
      } catch (error) {
        console.log('   ❌ Error clicking review button:', error.message);
      }
    } else {
      console.log('   ❌ No Answer or Review buttons found');
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testUserFlow().catch(console.error);
