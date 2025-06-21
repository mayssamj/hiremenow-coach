
const { chromium } = require('playwright');

async function debugPage() {
  console.log('Starting page debug...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the app
    console.log('Navigating to app...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Get page title and basic info
    const title = await page.title();
    console.log('Page title:', title);
    console.log('Current URL:', page.url());
    
    // Get all button text content
    const buttons = await page.locator('button').allTextContents();
    console.log('Buttons found:', buttons);
    
    // Get all link text content
    const links = await page.locator('a').allTextContents();
    console.log('Links found:', links);
    
    // Get page text content to see what's available
    const pageText = await page.textContent('body');
    console.log('Page contains "Demo":', pageText.includes('Demo'));
    console.log('Page contains "Demo User":', pageText.includes('Demo User'));
    console.log('Page contains "Admin Demo":', pageText.includes('Admin Demo'));
    
    // Take a screenshot for reference
    await page.screenshot({ path: 'debug-screenshot.png' });
    console.log('Screenshot saved as debug-screenshot.png');
    
  } catch (error) {
    console.log('Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

debugPage().catch(console.error);
