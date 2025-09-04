import { test, expect } from '@playwright/test';

test.describe('TheEscape2026 Registration Flow', () => {
  test('Complete registration flow test', async ({ page }) => {
    // Step 1: Navigate to homepage and take screenshot
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true });
    
    // Verify we're on the correct page
    await expect(page).toHaveTitle(/De Ontsnapping 2026|TheEscape 2026/);
    
    // Step 2: Test Supabase connection button
    console.log('Looking for Supabase connection button...');
    
    // Look for the "Test Connectie" button - it might be in different locations
    const connectionButton = page.locator('text=Test Connectie').or(
      page.locator('[data-testid="test-connection"]')
    ).or(
      page.locator('button:has-text("Test Connectie")')
    ).or(
      page.locator('button:has-text("Connectie")')
    ).first();
    
    if (await connectionButton.isVisible()) {
      console.log('Found connection button, clicking...');
      await connectionButton.click();
      
      // Wait for response and take screenshot
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'test-results/02-connection-test.png', fullPage: true });
      
      // Check for any connection status messages
      const connectionStatus = await page.locator('text=/connected|success|error|failed/i').first();
      if (await connectionStatus.isVisible()) {
        const statusText = await connectionStatus.textContent();
        console.log('Connection status:', statusText);
      }
    } else {
      console.log('Connection button not found, taking screenshot anyway');
      await page.screenshot({ path: 'test-results/02-no-connection-button.png', fullPage: true });
    }
    
    // Step 3: Click on "Doe Mee Aan Het Avontuur" button
    console.log('Looking for adventure button...');
    
    const adventureButton = page.locator('text=Doe Mee Aan Het Avontuur').or(
      page.locator('[data-testid="join-adventure"]')
    ).or(
      page.locator('button:has-text("Doe Mee")')
    ).or(
      page.locator('a:has-text("Doe Mee")')
    ).first();
    
    if (await adventureButton.isVisible()) {
      console.log('Found adventure button, clicking...');
      await adventureButton.click();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/03-after-adventure-click.png', fullPage: true });
    } else {
      console.log('Adventure button not found, scrolling to find it...');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/03-scrolled-page.png', fullPage: true });
      
      // Try to find it again after scrolling
      if (await adventureButton.isVisible()) {
        await adventureButton.click();
        await page.waitForLoadState('networkidle');
      }
    }
    
    // Step 4: Scroll to registration form
    console.log('Looking for registration form...');
    
    // Look for form elements
    const nameField = page.locator('select[name="name"]').or(
      page.locator('[data-testid="name-select"]')
    ).or(
      page.locator('select:has(option:text("Ronald"))')
    ).first();
    
    const emailField = page.locator('input[name="email"]').or(
      page.locator('[data-testid="email-input"]')
    ).or(
      page.locator('input[type="email"]')
    ).first();
    
    const passwordField = page.locator('input[name="password"]').or(
      page.locator('[data-testid="password-input"]')
    ).or(
      page.locator('input[type="password"]')
    ).first();
    
    // Scroll to form if needed
    if (await nameField.isVisible() || await emailField.isVisible()) {
      await nameField.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'test-results/04-registration-form.png', fullPage: true });
    } else {
      // Scroll down to find form
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/04-scrolled-to-form.png', fullPage: true });
    }
    
    // Step 5: Test registration with valid data
    console.log('Testing registration with valid data...');
    
    if (await nameField.isVisible()) {
      // Select Ronald from dropdown
      await nameField.selectOption({ label: 'Ronald' });
      console.log('Selected Ronald from dropdown');
    } else {
      console.log('Name field not found');
    }
    
    if (await emailField.isVisible()) {
      await emailField.fill('test-ronald@theescape2026.nl');
      console.log('Filled email field');
    } else {
      console.log('Email field not found');
    }
    
    if (await passwordField.isVisible()) {
      await passwordField.fill('TestPassword123!');
      console.log('Filled password field');
    } else {
      console.log('Password field not found');
    }
    
    // Take screenshot after filling form
    await page.screenshot({ path: 'test-results/05-form-filled.png', fullPage: true });
    
    // Submit form
    const submitButton = page.locator('button[type="submit"]').or(
      page.locator('[data-testid="submit-button"]')
    ).or(
      page.locator('button:has-text("Registreer")')
    ).or(
      page.locator('button:has-text("Submit")')
    ).first();
    
    if (await submitButton.isVisible()) {
      console.log('Found submit button, clicking...');
      await submitButton.click();
      
      // Wait for response
      await page.waitForTimeout(3000);
      await page.screenshot({ path: 'test-results/06-after-submit.png', fullPage: true });
      
      // Check for success/error messages
      const successMessage = page.locator('text=/success|gelukt|welkom/i');
      const errorMessage = page.locator('text=/error|fout|mislukt/i');
      
      if (await successMessage.isVisible()) {
        const message = await successMessage.textContent();
        console.log('Success message:', message);
      } else if (await errorMessage.isVisible()) {
        const message = await errorMessage.textContent();
        console.log('Error message:', message);
      }
    } else {
      console.log('Submit button not found');
    }
    
    // Step 6: Test with invalid name
    console.log('Testing registration with invalid name...');
    
    // Clear and try with invalid name
    if (await nameField.isVisible()) {
      // If it's a select, we can't enter invalid values, so skip this test
      const fieldType = await nameField.evaluate(el => el.tagName.toLowerCase());
      if (fieldType === 'select') {
        console.log('Name field is a dropdown, cannot test invalid values');
      } else {
        await nameField.clear();
        await nameField.fill('InvalidName');
        
        if (await submitButton.isVisible()) {
          await submitButton.click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'test-results/07-invalid-name-test.png', fullPage: true });
          
          // Check for validation message
          const validationMessage = page.locator('text=/niet toegestaan|invalid|not allowed/i');
          if (await validationMessage.isVisible()) {
            const message = await validationMessage.textContent();
            console.log('Validation message:', message);
          }
        }
      }
    }
    
    // Capture any console errors
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`Console error: ${msg.text()}`);
      }
    });
    
    // Final screenshot
    await page.screenshot({ path: 'test-results/08-final-state.png', fullPage: true });
    
    // Log any console errors
    if (logs.length > 0) {
      console.log('Console errors found:', logs);
    }
  });
});