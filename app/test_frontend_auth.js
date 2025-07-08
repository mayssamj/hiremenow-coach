
// Test script to verify frontend authentication flow
const puppeteer = require('puppeteer');

async function testFrontendAuth() {
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Navigate to login page
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/login');
    
    // Fill in login form
    console.log('Filling login form...');
    await page.type('input[type="text"]', 'admin');
    await page.type('input[type="password"]', 'AdminAdmin');
    
    // Submit form
    console.log('Submitting login form...');
    await page.click('button[type="submit"]');
    
    // Wait for navigation
    await page.waitForNavigation();
    
    // Check if we're on the home page
    const url = page.url();
    console.log('Current URL:', url);
    
    // Check if companies are loading
    await page.waitForTimeout(2000);
    const companiesText = await page.$eval('.text-sm', el => el.textContent);
    console.log('Companies text:', companiesText);
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testFrontendAuth();
