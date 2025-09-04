const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function analyzeWebsite() {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  console.log('🔍 Starting website analysis...');
  
  try {
    // Navigate to the website
    console.log('📍 Navigating to http://localhost:3002');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Take initial full page screenshot
    console.log('📸 Taking full page screenshot...');
    await page.screenshot({ 
      path: 'analysis-screenshots/01-full-page-desktop.png', 
      fullPage: true 
    });
    
    // Analyze the page structure
    console.log('🔍 Analyzing page structure...');
    const pageTitle = await page.title();
    const url = page.url();
    
    console.log(`Page Title: ${pageTitle}`);
    console.log(`URL: ${url}`);
    
    // Check for the account/registration section
    console.log('🔍 Looking for account/registration section...');
    const accountSection = await page.locator('[data-testid*="account"], [id*="account"], section:has-text("Account"), section:has-text("Registreer"), section:has-text("Register")').first();
    
    if (await accountSection.isVisible()) {
      console.log('✅ Found account/registration section');
      
      // Scroll to account section
      await accountSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // Screenshot of account section
      await accountSection.screenshot({ path: 'analysis-screenshots/02-account-section.png' });
      
      // Analyze form fields
      const formFields = await page.locator('input, textarea, select').all();
      console.log(`📝 Found ${formFields.length} form fields`);
      
      for (let i = 0; i < formFields.length; i++) {
        const field = formFields[i];
        const tagName = await field.evaluate(el => el.tagName.toLowerCase());
        const type = await field.getAttribute('type') || 'text';
        const placeholder = await field.getAttribute('placeholder') || '';
        const value = await field.inputValue();
        const id = await field.getAttribute('id') || '';
        const name = await field.getAttribute('name') || '';
        
        console.log(`Field ${i + 1}: ${tagName}[type="${type}"] - ID: "${id}", Name: "${name}", Placeholder: "${placeholder}", Value: "${value}"`);
        
        if (value && value.trim() !== '') {
          console.log(`⚠️  WARNING: Field ${i + 1} has pre-filled value: "${value}"`);
        }
      }
      
    } else {
      console.log('❌ Account/registration section not found');
    }
    
    // Check for hero section
    console.log('🔍 Looking for hero section...');
    const heroSection = await page.locator('section:first-of-type, [data-testid*="hero"], .hero, #hero').first();
    if (await heroSection.isVisible()) {
      console.log('✅ Found hero section');
      await heroSection.screenshot({ path: 'analysis-screenshots/03-hero-section.png' });
    }
    
    // Check countdown component
    console.log('🔍 Looking for countdown component...');
    const countdown = await page.locator('[data-testid*="countdown"], .countdown, #countdown, :has-text("dagen"), :has-text("days")').first();
    if (await countdown.isVisible()) {
      console.log('✅ Found countdown component');
      await countdown.screenshot({ path: 'analysis-screenshots/04-countdown.png' });
    }
    
    // Test mobile view
    console.log('📱 Testing mobile view...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'analysis-screenshots/05-mobile-full-page.png', 
      fullPage: true 
    });
    
    // Mobile account section
    if (await accountSection.isVisible()) {
      await accountSection.scrollIntoViewIfNeeded();
      await accountSection.screenshot({ path: 'analysis-screenshots/06-mobile-account-section.png' });
    }
    
    // Test tablet view
    console.log('💻 Testing tablet view...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'analysis-screenshots/07-tablet-full-page.png', 
      fullPage: true 
    });
    
    // Back to desktop for interaction testing
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    // Test form interactions
    console.log('🧪 Testing form interactions...');
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="password"], textarea').all();
    
    for (let i = 0; i < Math.min(inputs.length, 5); i++) {
      const input = inputs[i];
      try {
        await input.click();
        await page.waitForTimeout(500);
        
        // Check if field gets focus styles
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        console.log(`Field ${i + 1} focus test: ${focusedElement}`);
        
        // Test placeholder behavior
        await input.fill('test');
        await page.waitForTimeout(300);
        await input.clear();
        await page.waitForTimeout(300);
        
      } catch (error) {
        console.log(`❌ Error testing field ${i + 1}:`, error.message);
      }
    }
    
    // Test buttons and interactive elements
    console.log('🔘 Testing buttons and interactive elements...');
    const buttons = await page.locator('button, [role="button"], input[type="submit"]').all();
    
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const button = buttons[i];
      try {
        const text = await button.textContent();
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();
        
        console.log(`Button ${i + 1}: "${text}" - Visible: ${isVisible}, Enabled: ${isEnabled}`);
        
        if (isVisible && isEnabled) {
          // Test hover state
          await button.hover();
          await page.waitForTimeout(300);
          await button.screenshot({ path: `analysis-screenshots/08-button-${i + 1}-hover.png` });
        }
      } catch (error) {
        console.log(`❌ Error testing button ${i + 1}:`, error.message);
      }
    }
    
    // Check accessibility
    console.log('♿ Checking accessibility...');
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    console.log(`📋 Found ${headings.length} headings:`);
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const tagName = await heading.evaluate(el => el.tagName);
      const text = await heading.textContent();
      console.log(`  ${tagName}: "${text}"`);
    }
    
    // Check for alt texts on images
    const images = await page.locator('img').all();
    console.log(`🖼️  Found ${images.length} images:`);
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const alt = await img.getAttribute('alt') || '';
      const src = await img.getAttribute('src') || '';
      if (!alt) {
        console.log(`⚠️  Image missing alt text: ${src}`);
      } else {
        console.log(`✅ Image with alt: "${alt}"`);
      }
    }
    
    // Check for proper form labels
    const labels = await page.locator('label').all();
    const inputsWithoutLabels = await page.locator('input:not([id]), input[id]:not([id]:has(~ label[for], label:has(&)))').all();
    
    console.log(`🏷️  Found ${labels.length} labels`);
    if (inputsWithoutLabels.length > 0) {
      console.log(`⚠️  Found ${inputsWithoutLabels.length} inputs without proper labels`);
    }
    
    // Color contrast check (simplified)
    console.log('🎨 Checking color contrast...');
    const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6, button, a, label').all();
    
    for (let i = 0; i < Math.min(textElements.length, 10); i++) {
      const element = textElements[i];
      try {
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        if (styles.color && styles.backgroundColor && styles.color !== styles.backgroundColor) {
          console.log(`Text element ${i + 1}: Color ${styles.color} on ${styles.backgroundColor} (${styles.fontSize})`);
        }
      } catch (error) {
        // Skip elements that can't be analyzed
      }
    }
    
    console.log('✅ Analysis complete!');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error);
  } finally {
    await browser.close();
  }
}

// Create screenshots directory
const screenshotsDir = path.join(__dirname, 'analysis-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

analyzeWebsite().catch(console.error);