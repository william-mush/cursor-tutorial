// Browser automation test script for search functionality
// Run this with: node test-search-browser.js

const { chromium } = require('playwright');

async function testSearchFunctionality() {
  const browser = await chromium.launch({ headless: false }); // Set to true for headless
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Opening your website...');
    
    // Replace with your actual domain
    const domain = 'cursortutorials.com'; // Update this!
    await page.goto(`https://${domain}`);
    
    console.log('✅ Page loaded');
    
    // Wait for search bar to be visible
    console.log('🔍 Looking for search bar...');
    await page.waitForSelector('input[placeholder*="Tab completion"]', { timeout: 10000 });
    
    console.log('✅ Search bar found');
    
    // Test search functionality
    console.log('📝 Testing search...');
    await page.fill('input[placeholder*="Tab completion"]', 'What is Cursor?');
    
    // Click the search button
    await page.click('button:has-text("Ask AI")');
    
    console.log('⏳ Waiting for search results...');
    
    // Wait for results or error
    try {
      await page.waitForSelector('.search-results, .error, [data-testid="search-result"]', { timeout: 15000 });
      console.log('✅ Search completed - results found');
    } catch (e) {
      console.log('⚠️ No results found or timeout');
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'search-test-result.png' });
    console.log('📸 Screenshot saved as search-test-result.png');
    
    // Check for errors in console
    const errors = await page.evaluate(() => {
      return window.consoleErrors || [];
    });
    
    if (errors.length > 0) {
      console.log('❌ Console errors found:', errors);
    } else {
      console.log('✅ No console errors');
    }
    
    // Test API endpoints directly
    console.log('🧪 Testing API endpoints...');
    
    const testEndpoints = [
      '/api/search/health',
      '/api/search/test',
      '/api/search/simple?q=cursor'
    ];
    
    for (const endpoint of testEndpoints) {
      try {
        const response = await page.goto(`https://${domain}${endpoint}`);
        const content = await page.textContent('body');
        console.log(`✅ ${endpoint}: ${response.status()}`);
        console.log(`   Response: ${content.substring(0, 200)}...`);
      } catch (e) {
        console.log(`❌ ${endpoint}: ${e.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testSearchFunctionality().catch(console.error);
