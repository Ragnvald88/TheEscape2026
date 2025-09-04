const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function analyzeWebsite() {
  const browser = await chromium.launch({ headless: false });
  const results = {
    screenshots: [],
    issues: [],
    performance: {},
    accessibility: [],
    content: {},
    interactions: {}
  };

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'analysis-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
  ];

  for (const viewport of viewports) {
    console.log(`\n=== Analyzing ${viewport.name} viewport (${viewport.width}x${viewport.height}) ===`);
    
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      // Performance timing
      const startTime = Date.now();
      await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;
      
      results.performance[viewport.name] = { loadTime };
      console.log(`Page load time: ${loadTime}ms`);

      // Wait for any animations to complete
      await page.waitForTimeout(3000);

      // Take full page screenshot
      const screenshotPath = path.join(screenshotsDir, `${viewport.name}-fullpage.png`);
      await page.screenshot({ 
        path: screenshotPath, 
        fullPage: true 
      });
      results.screenshots.push(`${viewport.name}-fullpage.png`);
      console.log(`Screenshot saved: ${viewport.name}-fullpage.png`);

      // Analyze content and structure
      if (viewport.name === 'desktop') {
        console.log('\n--- Content Analysis ---');
        
        // Check for Dutch translations
        const dutchElements = await page.locator('text=/Europa|Nederland|vrienden|vakantie|stemmen|reis|avontuur/i').count();
        console.log(`Dutch text elements found: ${dutchElements}`);
        
        // Check for placeholder text
        const placeholderText = await page.locator('text=/lorem ipsum|placeholder|todo|fixme/i').count();
        if (placeholderText > 0) {
          results.issues.push(`Found ${placeholderText} placeholder text elements`);
        }
        
        // Extract main headings
        const headings = await page.locator('h1, h2, h3').allTextContents();
        results.content.headings = headings;
        console.log('Main headings:', headings);
        
        // Check countdown timer
        const countdownExists = await page.locator('[data-testid="countdown"], .countdown, [class*="countdown"]').count() > 0;
        console.log(`Countdown timer present: ${countdownExists}`);
        
        // Check map existence
        const mapExists = await page.locator('.leaflet-container, [class*="map"], #map').count() > 0;
        console.log(`Map component present: ${mapExists}`);
      }

      // Test interactive elements
      console.log('\n--- Interactive Elements Test ---');
      
      // Find all buttons
      const buttons = await page.locator('button, [role="button"], a[class*="button"]').all();
      console.log(`Found ${buttons.length} interactive buttons`);
      
      for (let i = 0; i < Math.min(buttons.length, 5); i++) {
        try {
          const buttonText = await buttons[i].textContent();
          const isVisible = await buttons[i].isVisible();
          const isEnabled = await buttons[i].isEnabled();
          console.log(`Button "${buttonText}": visible=${isVisible}, enabled=${isEnabled}`);
          
          if (isVisible && isEnabled) {
            // Take screenshot before click
            await buttons[i].scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            
            // Check if it's clickable (not overlapped)
            const boundingBox = await buttons[i].boundingBox();
            if (boundingBox) {
              // Try to hover first
              await buttons[i].hover();
              await page.waitForTimeout(200);
            }
          }
        } catch (error) {
          console.log(`Error testing button ${i}: ${error.message}`);
        }
      }

      // Test scroll behavior
      console.log('\n--- Scroll Behavior Test ---');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(1000);
      
      // Take mid-scroll screenshot
      const midScrollPath = path.join(screenshotsDir, `${viewport.name}-midscroll.png`);
      await page.screenshot({ path: midScrollPath });
      results.screenshots.push(`${viewport.name}-midscroll.png`);
      
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Check for visual issues
      console.log('\n--- Visual Issues Check ---');
      
      // Check for text overflow
      const overflowElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const overflowing = [];
        elements.forEach(el => {
          if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              overflowing.push({
                tag: el.tagName,
                class: el.className,
                text: el.textContent?.substring(0, 50) + '...'
              });
            }
          }
        });
        return overflowing.slice(0, 10); // Limit results
      });
      
      if (overflowElements.length > 0) {
        results.issues.push(`${viewport.name}: Found ${overflowElements.length} elements with potential overflow`);
        console.log('Overflow elements:', overflowElements);
      }

      // Check for missing images
      const brokenImages = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const broken = [];
        images.forEach(img => {
          if (!img.complete || img.naturalHeight === 0) {
            broken.push(img.src || img.getAttribute('src') || 'unknown');
          }
        });
        return broken;
      });
      
      if (brokenImages.length > 0) {
        results.issues.push(`${viewport.name}: Found ${brokenImages.length} broken images`);
        console.log('Broken images:', brokenImages);
      }

      // Accessibility check
      console.log('\n--- Accessibility Check ---');
      
      // Check for alt text on images
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      if (imagesWithoutAlt > 0) {
        results.accessibility.push(`${viewport.name}: ${imagesWithoutAlt} images missing alt text`);
      }
      
      // Check for form labels
      const inputsWithoutLabels = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input, select, textarea');
        let count = 0;
        inputs.forEach(input => {
          const hasLabel = input.getAttribute('aria-label') || 
                          input.getAttribute('aria-labelledby') ||
                          document.querySelector(`label[for="${input.id}"]`) ||
                          input.closest('label');
          if (!hasLabel) count++;
        });
        return count;
      });
      
      if (inputsWithoutLabels > 0) {
        results.accessibility.push(`${viewport.name}: ${inputsWithoutLabels} form inputs missing proper labels`);
      }

      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      const focusedElement = await page.evaluate(() => {
        const focused = document.activeElement;
        return focused ? {
          tag: focused.tagName,
          class: focused.className,
          text: focused.textContent?.substring(0, 30)
        } : null;
      });
      
      if (focusedElement) {
        console.log('First focusable element:', focusedElement);
      } else {
        results.accessibility.push(`${viewport.name}: No focusable elements found with Tab key`);
      }

    } catch (error) {
      console.error(`Error analyzing ${viewport.name}:`, error.message);
      results.issues.push(`${viewport.name}: Analysis error - ${error.message}`);
    }

    await page.close();
  }

  await browser.close();

  // Generate report
  const reportPath = path.join(__dirname, 'website-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== ANALYSIS COMPLETE ===');
  console.log(`Report saved to: ${reportPath}`);
  console.log(`Screenshots saved to: ${screenshotsDir}`);
  
  return results;
}

// Run the analysis
analyzeWebsite().catch(console.error);