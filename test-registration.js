const { chromium } = require('playwright');

async function testRegistrationFlow() {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🧪 Testing registration flow...');
  
  try {
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    
    // Scroll to account section
    await page.locator('#account-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    console.log('📝 Testing form interactions...');
    
    // Test name dropdown
    const nameSelect = page.locator('#name-select');
    await nameSelect.click();
    await page.waitForTimeout(500);
    await nameSelect.selectOption('Ronald');
    console.log('✅ Selected name: Ronald');
    
    // Test email field
    const emailInput = page.locator('#email-input');
    await emailInput.click();
    await emailInput.fill('ronald@test.nl');
    console.log('✅ Entered email: ronald@test.nl');
    
    // Test password field
    const passwordInput = page.locator('#password-input');
    await passwordInput.click();
    await passwordInput.fill('testpassword123');
    console.log('✅ Entered password');
    
    // Take screenshot before submission
    await page.screenshot({ path: 'analysis-screenshots/09-form-filled.png' });
    
    // Test form validation by clearing a field
    await emailInput.clear();
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Wait for error message
    await page.waitForTimeout(1000);
    const errorMessage = await page.locator('.text-red-400').textContent();
    console.log('❌ Error message:', errorMessage);
    
    // Take screenshot of error state
    await page.screenshot({ path: 'analysis-screenshots/10-form-error.png' });
    
    // Fill email again and test successful submission
    await emailInput.fill('ronald@test.nl');
    await submitButton.click();
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check if success message appears
    const successCheck = page.locator('.text-green-400');
    if (await successCheck.isVisible()) {
      console.log('✅ Success state reached');
      await page.screenshot({ path: 'analysis-screenshots/11-form-success.png' });
    } else {
      console.log('❌ Success state not reached');
      const errorState = await page.locator('.text-red-400').textContent();
      console.log('Error:', errorState);
      await page.screenshot({ path: 'analysis-screenshots/11-form-failed.png' });
    }
    
    // Test mobile view of form
    console.log('📱 Testing mobile form...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.locator('#account-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'analysis-screenshots/12-mobile-form-complete.png' });
    
    // Test focus states on mobile
    await page.locator('#name-select').click();
    await page.screenshot({ path: 'analysis-screenshots/13-mobile-name-focus.png' });
    
    await page.locator('#email-input').click();
    await page.screenshot({ path: 'analysis-screenshots/14-mobile-email-focus.png' });
    
    console.log('✅ Registration flow testing complete');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
}

testRegistrationFlow().catch(console.error);