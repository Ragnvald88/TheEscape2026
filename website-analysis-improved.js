const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function analyzeWebsite() {
  console.log('Starting comprehensive website analysis...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = {
    screenshots: [],
    issues: [],
    performance: {},
    accessibility: [],
    content: {},
    interactions: {},
    visual: {},
    responsive: {}
  };

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'analysis-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const viewports = [
    { name: 'mobile', width: 375, height: 812, description: 'iPhone 12 Pro' },
    { name: 'tablet', width: 768, height: 1024, description: 'iPad Portrait' },
    { name: 'desktop', width: 1440, height: 900, description: 'Large Desktop' }
  ];

  for (const viewport of viewports) {
    console.log(`\n🔍 Analyzing ${viewport.name} (${viewport.width}x${viewport.height}) - ${viewport.description}`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    const page = await context.newPage();

    try {
      // Performance timing
      const performanceData = {};
      const startTime = Date.now();
      
      console.log('⏱️  Loading page...');
      await page.goto('http://localhost:3002', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      // Wait for initial render
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      const loadTime = Date.now() - startTime;
      performanceData.loadTime = loadTime;
      console.log(`   ✅ Page loaded in ${loadTime}ms`);

      // Check if page actually loaded or has errors
      const hasError = await page.locator('text=Error').count() > 0;
      const hasInternalError = await page.locator('text=Internal Server Error').count() > 0;
      
      if (hasError || hasInternalError) {
        results.issues.push(`${viewport.name}: Page shows error state`);
        console.log('   ❌ Page has errors - skipping detailed analysis');
        
        // Still take screenshot of error
        const errorScreenshot = path.join(screenshotsDir, `${viewport.name}-error.png`);
        await page.screenshot({ path: errorScreenshot, fullPage: true });
        results.screenshots.push(`${viewport.name}-error.png`);
        
        await context.close();
        continue;
      }

      // Wait for any animations/dynamic content
      await page.waitForTimeout(2000);

      // 📸 SCREENSHOTS
      console.log('📸 Taking screenshots...');
      
      // Full page screenshot
      const fullPagePath = path.join(screenshotsDir, `${viewport.name}-fullpage.png`);
      await page.screenshot({ path: fullPagePath, fullPage: true });
      results.screenshots.push(`${viewport.name}-fullpage.png`);
      
      // Above the fold screenshot
      const aboveFoldPath = path.join(screenshotsDir, `${viewport.name}-above-fold.png`);
      await page.screenshot({ path: aboveFoldPath });
      results.screenshots.push(`${viewport.name}-above-fold.png`);

      // 📝 CONTENT ANALYSIS
      if (viewport.name === 'desktop') {
        console.log('📝 Analyzing content...');
        
        // Get all text content
        const pageText = await page.textContent('body');
        results.content.totalLength = pageText?.length || 0;
        
        // Check for Dutch content
        const dutchPatterns = [
          /europa/i, /nederland/i, /vrienden/i, /vakantie/i, 
          /stemmen/i, /reis/i, /avontuur/i, /oktober/i, /juni/i
        ];
        
        const dutchCount = dutchPatterns.reduce((count, pattern) => {
          return count + (pageText?.match(pattern) || []).length;
        }, 0);
        
        results.content.dutchElements = dutchCount;
        console.log(`   Found ${dutchCount} Dutch language elements`);
        
        // Check for placeholder text
        const placeholderPatterns = [
          /lorem ipsum/i, /placeholder/i, /todo/i, /fixme/i, /\[.*\]/i
        ];
        
        const placeholderCount = placeholderPatterns.reduce((count, pattern) => {
          return count + (pageText?.match(pattern) || []).length;
        }, 0);
        
        if (placeholderCount > 0) {
          results.issues.push(`Found ${placeholderCount} placeholder text instances`);
          console.log(`   ⚠️  Found ${placeholderCount} placeholder text instances`);
        }
        
        // Get headings structure
        const headings = await page.evaluate(() => {
          const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          return Array.from(headingElements).map(h => ({
            level: h.tagName,
            text: h.textContent?.trim().substring(0, 100),
            hasId: !!h.id
          }));
        });
        
        results.content.headings = headings;
        console.log(`   Found ${headings.length} headings`);
        
        // Check for key components
        const components = await page.evaluate(() => {
          return {
            countdown: !!document.querySelector('[data-testid="countdown"], .countdown, [class*="countdown"]'),
            map: !!document.querySelector('.leaflet-container, [class*="map"], #map'),
            navigation: !!document.querySelector('nav, [role="navigation"]'),
            hero: !!document.querySelector('[class*="hero"], .hero'),
            footer: !!document.querySelector('footer, [role="contentinfo"]')
          };
        });
        
        results.content.components = components;
        console.log(`   Components found:`, Object.entries(components).filter(([k,v]) => v).map(([k]) => k).join(', '));
      }

      // 🎯 INTERACTIVE ELEMENTS
      console.log('🎯 Testing interactive elements...');
      
      const interactiveElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('button, [role="button"], a, input, select, textarea');
        return Array.from(elements).map((el, index) => ({
          index,
          tag: el.tagName,
          type: el.type || 'N/A',
          text: el.textContent?.trim().substring(0, 50) || '',
          hasHref: el.href ? true : false,
          isVisible: el.offsetWidth > 0 && el.offsetHeight > 0,
          classes: el.className
        }));
      });
      
      results.interactions[viewport.name] = {
        totalElements: interactiveElements.length,
        visibleElements: interactiveElements.filter(el => el.isVisible).length,
        elements: interactiveElements.slice(0, 10) // Limit for report
      };
      
      console.log(`   Found ${interactiveElements.length} interactive elements (${interactiveElements.filter(el => el.isVisible).length} visible)`);

      // Test first few interactive elements
      const visibleElements = interactiveElements.filter(el => el.isVisible).slice(0, 3);
      for (const element of visibleElements) {
        try {
          const locator = page.locator(`${element.tag}:nth-of-type(${element.index + 1})`);
          await locator.hover({ timeout: 1000 });
          console.log(`   ✅ Hover test passed for ${element.tag}: "${element.text}"`);
        } catch (error) {
          console.log(`   ⚠️  Hover test failed for element: ${element.text}`);
        }
      }

      // 📱 RESPONSIVE DESIGN
      console.log('📱 Checking responsive design...');
      
      const responsiveIssues = await page.evaluate((viewportWidth) => {
        const issues = [];
        
        // Check for horizontal overflow
        const bodyWidth = document.body.scrollWidth;
        if (bodyWidth > viewportWidth + 5) { // 5px tolerance
          issues.push(`Horizontal overflow detected: body width ${bodyWidth}px > viewport ${viewportWidth}px`);
        }
        
        // Check for tiny text on mobile
        if (viewportWidth <= 375) {
          const smallTexts = document.querySelectorAll('*');
          let tinyTextCount = 0;
          smallTexts.forEach(el => {
            const styles = window.getComputedStyle(el);
            const fontSize = parseFloat(styles.fontSize);
            if (fontSize < 12 && el.textContent && el.textContent.trim().length > 10) {
              tinyTextCount++;
            }
          });
          if (tinyTextCount > 0) {
            issues.push(`Found ${tinyTextCount} elements with text smaller than 12px`);
          }
        }
        
        // Check for overlapping elements
        const elements = document.querySelectorAll('*');
        let overlappingCount = 0;
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            // Simple overlap check with next sibling
            const next = el.nextElementSibling;
            if (next) {
              const nextRect = next.getBoundingClientRect();
              if (rect.bottom > nextRect.top + 5 && rect.right > nextRect.left + 5) {
                overlappingCount++;
              }
            }
          }
        });
        
        if (overlappingCount > 2) { // Some overlap is normal
          issues.push(`Potential element overlap detected (${overlappingCount} instances)`);
        }
        
        return issues;
      }, viewport.width);
      
      if (responsiveIssues.length > 0) {
        results.responsive[viewport.name] = responsiveIssues;
        console.log(`   ⚠️  Found ${responsiveIssues.length} responsive issues`);
        responsiveIssues.forEach(issue => console.log(`      - ${issue}`));
      } else {
        console.log(`   ✅ No major responsive issues found`);
      }

      // ♿ ACCESSIBILITY
      console.log('♿ Checking accessibility...');
      
      const accessibilityIssues = await page.evaluate(() => {
        const issues = [];
        
        // Images without alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]');
        if (imagesWithoutAlt.length > 0) {
          issues.push(`${imagesWithoutAlt.length} images missing meaningful alt text`);
        }
        
        // Form inputs without proper labels
        const inputs = document.querySelectorAll('input, select, textarea');
        let unlabeledInputs = 0;
        inputs.forEach(input => {
          const hasLabel = input.getAttribute('aria-label') || 
                          input.getAttribute('aria-labelledby') ||
                          document.querySelector(`label[for="${input.id}"]`) ||
                          input.closest('label');
          if (!hasLabel && input.type !== 'hidden') {
            unlabeledInputs++;
          }
        });
        
        if (unlabeledInputs > 0) {
          issues.push(`${unlabeledInputs} form inputs missing proper labels`);
        }
        
        // Headings structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
        
        if (headingLevels.length > 0) {
          // Should start with h1
          if (headingLevels[0] !== 1) {
            issues.push('Page should start with h1 heading');
          }
          
          // Check for skipped levels
          for (let i = 1; i < headingLevels.length; i++) {
            if (headingLevels[i] - headingLevels[i-1] > 1) {
              issues.push('Heading levels should not skip (e.g., h1 to h3)');
              break;
            }
          }
        }
        
        // Color contrast (basic check for very light text)
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        let lowContrastCount = 0;
        textElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;
          
          // Basic check for very light text (this is simplified)
          if (color && (color.includes('rgb(255') || color.includes('#fff') || color.includes('#f'))) {
            if (backgroundColor && (backgroundColor.includes('rgb(255') || backgroundColor === 'rgba(0, 0, 0, 0)')) {
              lowContrastCount++;
            }
          }
        });
        
        if (lowContrastCount > 0) {
          issues.push(`Potential low contrast text detected (${lowContrastCount} elements - needs manual review)`);
        }
        
        return issues;
      });
      
      if (accessibilityIssues.length > 0) {
        results.accessibility = results.accessibility.concat(
          accessibilityIssues.map(issue => `${viewport.name}: ${issue}`)
        );
        console.log(`   ⚠️  Found ${accessibilityIssues.length} accessibility issues`);
        accessibilityIssues.forEach(issue => console.log(`      - ${issue}`));
      } else {
        console.log(`   ✅ No major accessibility issues found`);
      }

      // Test keyboard navigation
      console.log('⌨️  Testing keyboard navigation...');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      
      const focusInfo = await page.evaluate(() => {
        const focused = document.activeElement;
        return focused ? {
          tag: focused.tagName,
          text: focused.textContent?.trim().substring(0, 30) || '',
          hasVisibleFocus: window.getComputedStyle(focused).outlineWidth !== '0px' || 
                          window.getComputedStyle(focused).outlineStyle !== 'none'
        } : null;
      });
      
      if (focusInfo) {
        console.log(`   ✅ Keyboard focus works: ${focusInfo.tag} "${focusInfo.text}"`);
        if (!focusInfo.hasVisibleFocus) {
          results.accessibility.push(`${viewport.name}: Focused element has no visible focus indicator`);
        }
      } else {
        results.accessibility.push(`${viewport.name}: No focusable elements found`);
        console.log(`   ⚠️  No focusable elements found`);
      }

      // 🎨 VISUAL CHECKS
      console.log('🎨 Checking visual elements...');
      
      const visualIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check for broken images
        const images = document.querySelectorAll('img');
        let brokenImages = 0;
        images.forEach(img => {
          if (!img.complete || img.naturalHeight === 0) {
            brokenImages++;
          }
        });
        
        if (brokenImages > 0) {
          issues.push(`${brokenImages} broken or loading images`);
        }
        
        // Check for missing background images
        const elementsWithBg = document.querySelectorAll('[style*="background-image"], [class*="bg-"]');
        let missingBgCount = 0;
        elementsWithBg.forEach(el => {
          const styles = window.getComputedStyle(el);
          const bgImage = styles.backgroundImage;
          if (bgImage && bgImage !== 'none' && !bgImage.includes('data:')) {
            // This would need actual HTTP requests to check properly
          }
        });
        
        // Check for empty content areas
        const contentAreas = document.querySelectorAll('section, article, main, div[class*="content"]');
        let emptyAreas = 0;
        contentAreas.forEach(area => {
          const text = area.textContent?.trim();
          const hasImages = area.querySelectorAll('img').length > 0;
          const hasInteractiveElements = area.querySelectorAll('button, a, input').length > 0;
          
          if (!text && !hasImages && !hasInteractiveElements && area.children.length === 0) {
            emptyAreas++;
          }
        });
        
        if (emptyAreas > 0) {
          issues.push(`${emptyAreas} potentially empty content areas`);
        }
        
        return issues;
      });
      
      if (visualIssues.length > 0) {
        results.visual[viewport.name] = visualIssues;
        console.log(`   ⚠️  Found ${visualIssues.length} visual issues`);
        visualIssues.forEach(issue => console.log(`      - ${issue}`));
      } else {
        console.log(`   ✅ No major visual issues found`);
      }

      // 🏃‍♂️ PERFORMANCE CHECKS
      console.log('🏃‍♂️ Checking performance...');
      
      const perfMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalElements: document.querySelectorAll('*').length,
          totalImages: document.querySelectorAll('img').length,
          totalScripts: document.querySelectorAll('script').length,
          totalStylesheets: document.querySelectorAll('link[rel="stylesheet"]').length
        };
      });
      
      results.performance[viewport.name] = {
        ...performanceData,
        ...perfMetrics,
        timestamp: new Date().toISOString()
      };
      
      console.log(`   DOM Elements: ${perfMetrics.totalElements}`);
      console.log(`   Images: ${perfMetrics.totalImages}`);
      console.log(`   Scripts: ${perfMetrics.totalScripts}`);
      console.log(`   Stylesheets: ${perfMetrics.totalStylesheets}`);

      // 📜 SCROLL TEST
      console.log('📜 Testing scroll behavior...');
      
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = viewport.height;
      
      if (scrollHeight > viewportHeight) {
        // Scroll to middle
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(1000);
        
        const midScrollPath = path.join(screenshotsDir, `${viewport.name}-mid-scroll.png`);
        await page.screenshot({ path: midScrollPath });
        results.screenshots.push(`${viewport.name}-mid-scroll.png`);
        
        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
        
        const bottomPath = path.join(screenshotsDir, `${viewport.name}-bottom.png`);
        await page.screenshot({ path: bottomPath });
        results.screenshots.push(`${viewport.name}-bottom.png`);
        
        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        
        console.log(`   ✅ Scroll test completed (${scrollHeight}px total height)`);
      } else {
        console.log(`   ℹ️  Page fits in viewport (${scrollHeight}px total height)`);
      }

      console.log(`✅ Analysis complete for ${viewport.name}`);

    } catch (error) {
      console.error(`❌ Error analyzing ${viewport.name}:`, error.message);
      results.issues.push(`${viewport.name}: Analysis error - ${error.message}`);
      
      // Try to take an error screenshot
      try {
        const errorPath = path.join(screenshotsDir, `${viewport.name}-error.png`);
        await page.screenshot({ path: errorPath });
        results.screenshots.push(`${viewport.name}-error.png`);
      } catch (screenshotError) {
        console.error('Could not take error screenshot:', screenshotError.message);
      }
    }

    await context.close();
  }

  await browser.close();

  // 📊 GENERATE COMPREHENSIVE REPORT
  console.log('\n📊 Generating comprehensive report...');
  
  const reportData = {
    ...results,
    summary: {
      totalScreenshots: results.screenshots.length,
      totalIssues: results.issues.length,
      accessibilityIssues: results.accessibility.length,
      analysisDate: new Date().toISOString(),
      viewportsTested: viewports.map(v => v.name)
    }
  };

  // Save detailed JSON report
  const reportPath = path.join(__dirname, 'website-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  // Generate human-readable report
  let readableReport = `
# Website Analysis Report - TheEscape2026
Generated: ${new Date().toLocaleString()}

## 📊 Summary
- Screenshots taken: ${results.screenshots.length}
- Issues found: ${results.issues.length}
- Accessibility concerns: ${results.accessibility.length}
- Viewports tested: ${viewports.map(v => `${v.name} (${v.width}x${v.height})`).join(', ')}

## 🔍 Detailed Findings

### Critical Issues
${results.issues.length > 0 ? results.issues.map(issue => `- ❌ ${issue}`).join('\n') : '- ✅ No critical issues found'}

### Accessibility Issues
${results.accessibility.length > 0 ? results.accessibility.map(issue => `- ♿ ${issue}`).join('\n') : '- ✅ No accessibility issues found'}

### Performance Summary
${Object.entries(results.performance).map(([viewport, data]) => 
  `**${viewport.charAt(0).toUpperCase() + viewport.slice(1)}:** ${data.loadTime}ms load time, ${data.totalElements || 'N/A'} DOM elements`
).join('\n')}

### Content Analysis
${results.content.headings ? `**Headings:** ${results.content.headings.length} found` : ''}
${results.content.dutchElements ? `**Dutch Content:** ${results.content.dutchElements} elements detected` : ''}
${results.content.components ? `**Key Components:** ${Object.entries(results.content.components).filter(([k,v]) => v).map(([k]) => k).join(', ')}` : ''}

### Screenshots Available
${results.screenshots.map(screenshot => `- 📸 ${screenshot}`).join('\n')}

## 📂 Files Generated
- Detailed report: website-analysis-report.json
- Screenshots: analysis-screenshots/ directory
- This summary: website-analysis-summary.md
`;

  const summaryPath = path.join(__dirname, 'website-analysis-summary.md');
  fs.writeFileSync(summaryPath, readableReport);

  console.log('\n🎉 ANALYSIS COMPLETE!');
  console.log(`📊 Detailed report: ${reportPath}`);
  console.log(`📝 Summary report: ${summaryPath}`);
  console.log(`📸 Screenshots: ${screenshotsDir}`);
  console.log(`\n📈 Results Summary:`);
  console.log(`   Screenshots: ${results.screenshots.length}`);
  console.log(`   Issues: ${results.issues.length}`);
  console.log(`   Accessibility concerns: ${results.accessibility.length}`);
  
  return reportData;
}

// Run the analysis
analyzeWebsite()
  .then(() => {
    console.log('\n✅ Analysis completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Analysis failed:', error);
    process.exit(1);
  });