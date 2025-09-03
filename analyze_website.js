const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Analyzing TheEscape2026 website...\n');
    
    // Navigate to the local development server
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
    
    // Take initial full page screenshot
    await page.screenshot({ 
      path: 'analysis_full_page.png', 
      fullPage: true 
    });
    console.log('✅ Full page screenshot saved as analysis_full_page.png');
    
    // Take viewport screenshot
    await page.screenshot({ 
      path: 'analysis_viewport.png' 
    });
    console.log('✅ Viewport screenshot saved as analysis_viewport.png');
    
    // Get page dimensions and structure
    const pageInfo = await page.evaluate(() => {
      const getComputedStyles = (element) => {
        const styles = window.getComputedStyle(element);
        return {
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          padding: styles.padding,
          margin: styles.margin,
          lineHeight: styles.lineHeight
        };
      };
      
      return {
        title: document.title,
        url: window.location.href,
        bodyHeight: document.body.scrollHeight,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        
        // Check for map
        hasMap: !!document.querySelector('[data-testid="map"], .leaflet-container, #map, [class*="map"]'),
        mapElements: Array.from(document.querySelectorAll('[data-testid="map"], .leaflet-container, #map, [class*="map"]')).map(el => el.className),
        
        // Count elements
        sections: document.querySelectorAll('section, main, .section').length,
        images: document.querySelectorAll('img').length,
        buttons: document.querySelectorAll('button').length,
        
        // Headings analysis
        headings: {
          h1: Array.from(document.querySelectorAll('h1')).map(h => ({ text: h.textContent?.trim().substring(0, 50), styles: getComputedStyles(h) })),
          h2: Array.from(document.querySelectorAll('h2')).map(h => ({ text: h.textContent?.trim().substring(0, 50), styles: getComputedStyles(h) })),
          h3: Array.from(document.querySelectorAll('h3')).map(h => ({ text: h.textContent?.trim().substring(0, 50), styles: getComputedStyles(h) }))
        },
        
        // Typography analysis
        typography: {
          bodyStyles: getComputedStyles(document.body),
          uniqueFonts: Array.from(new Set(Array.from(document.querySelectorAll('*')).map(el => window.getComputedStyle(el).fontFamily))).filter(f => f !== 'inherit'),
          textElements: Array.from(document.querySelectorAll('p, span, div')).slice(0, 10).map(el => ({
            tag: el.tagName.toLowerCase(),
            text: el.textContent?.trim().substring(0, 30),
            styles: getComputedStyles(el)
          }))
        },
        
        // Layout analysis
        layout: {
          containerElements: Array.from(document.querySelectorAll('[class*="container"], [class*="wrapper"], [class*="layout"]')).map(el => el.className),
          flexElements: Array.from(document.querySelectorAll('*')).filter(el => window.getComputedStyle(el).display === 'flex').length,
          gridElements: Array.from(document.querySelectorAll('*')).filter(el => window.getComputedStyle(el).display === 'grid').length
        },
        
        // Color analysis
        colors: {
          backgroundColors: Array.from(new Set(Array.from(document.querySelectorAll('*')).map(el => window.getComputedStyle(el).backgroundColor).filter(bg => bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'))),
          textColors: Array.from(new Set(Array.from(document.querySelectorAll('*')).map(el => window.getComputedStyle(el).color)))
        },
        
        // Spacing analysis
        spacing: {
          elementsWithPadding: Array.from(document.querySelectorAll('*')).filter(el => window.getComputedStyle(el).padding !== '0px').length,
          elementsWithMargin: Array.from(document.querySelectorAll('*')).filter(el => window.getComputedStyle(el).margin !== '0px').length
        },
        
        // Accessibility issues
        accessibility: {
          missingAlts: Array.from(document.querySelectorAll('img:not([alt])')).length,
          emptyHeadings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(h => !h.textContent?.trim()).length,
          buttonsWithoutText: Array.from(document.querySelectorAll('button')).filter(b => !b.textContent?.trim() && !b.getAttribute('aria-label')).length
        },
        
        // Content structure
        content: {
          textNodes: Array.from(document.querySelectorAll('p, span, div')).filter(el => el.textContent?.trim()).length,
          emptyElements: Array.from(document.querySelectorAll('div, section, main')).filter(el => !el.textContent?.trim()).length
        }
      };
    });
    
    console.log('\n📊 PAGE ANALYSIS RESULTS:');
    console.log('=========================');
    console.log(`Title: ${pageInfo.title}`);
    console.log(`Dimensions: ${pageInfo.viewportWidth}x${pageInfo.viewportHeight} (viewport), ${pageInfo.bodyHeight}px height`);
    console.log(`Map present: ${pageInfo.hasMap ? '✅ Yes' : '❌ No'}`);
    if (pageInfo.mapElements.length > 0) {
      console.log(`Map elements found: ${pageInfo.mapElements.join(', ')}`);
    }
    
    console.log('\n🎨 TYPOGRAPHY ISSUES:');
    console.log(`- Unique fonts in use: ${pageInfo.typography.uniqueFonts.length}`);
    pageInfo.typography.uniqueFonts.forEach(font => console.log(`  • ${font}`));
    
    console.log('\n📱 STRUCTURE:');
    console.log(`- Sections: ${pageInfo.sections}`);
    console.log(`- H1 headings: ${pageInfo.headings.h1.length}`);
    console.log(`- H2 headings: ${pageInfo.headings.h2.length}`);
    console.log(`- H3 headings: ${pageInfo.headings.h3.length}`);
    
    if (pageInfo.headings.h1.length > 1) {
      console.log('⚠️  WARNING: Multiple H1 tags found (should be only 1)');
    }
    if (pageInfo.headings.h1.length === 0) {
      console.log('⚠️  WARNING: No H1 tag found');
    }
    
    console.log('\n🎨 DESIGN ELEMENTS:');
    console.log(`- Background colors in use: ${pageInfo.colors.backgroundColors.length}`);
    console.log(`- Text colors in use: ${pageInfo.colors.textColors.length}`);
    console.log(`- Flex layouts: ${pageInfo.layout.flexElements}`);
    console.log(`- Grid layouts: ${pageInfo.layout.gridElements}`);
    
    console.log('\n♿ ACCESSIBILITY ISSUES:');
    console.log(`- Images without alt text: ${pageInfo.accessibility.missingAlts}`);
    console.log(`- Empty headings: ${pageInfo.accessibility.emptyHeadings}`);
    console.log(`- Buttons without text/labels: ${pageInfo.accessibility.buttonsWithoutText}`);
    
    // Scroll through sections and take screenshots
    const scrollPositions = [0, 0.25, 0.5, 0.75, 1];
    for (let i = 0; i < scrollPositions.length; i++) {
      const position = scrollPositions[i];
      await page.evaluate((pos) => {
        window.scrollTo(0, document.body.scrollHeight * pos);
      }, position);
      
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: `analysis_section_${i + 1}.png` 
      });
      console.log(`✅ Section ${i + 1} screenshot saved`);
    }
    
    // Check for console errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text()
        });
      }
    });
    
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    if (consoleMessages.length > 0) {
      console.log('\n🚨 CONSOLE ERRORS:');
      consoleMessages.forEach(msg => console.log(`- ${msg.text}`));
    }
    
    // Mobile responsiveness check
    console.log('\n📱 MOBILE RESPONSIVENESS TEST:');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'analysis_mobile.png' 
    });
    console.log('✅ Mobile screenshot saved');
    
    // Tablet check
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'analysis_tablet.png' 
    });
    console.log('✅ Tablet screenshot saved');
    
  } catch (error) {
    console.error('❌ Error analyzing page:', error.message);
  } finally {
    await browser.close();
    console.log('\n🎉 Analysis complete! Check the generated screenshots.');
  }
})();