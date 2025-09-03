const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  try {
    console.log('📸 Taking screenshots of TheEscape2026...\n');
    
    // Go to the page with a longer timeout and less strict waiting
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Take desktop screenshot
    await page.screenshot({ 
      path: 'desktop_screenshot.png',
      fullPage: true
    });
    console.log('✅ Desktop screenshot saved');
    
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'mobile_screenshot.png',
      fullPage: true
    });
    console.log('✅ Mobile screenshot saved');
    
    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'tablet_screenshot.png',
      fullPage: true
    });
    console.log('✅ Tablet screenshot saved');
    
    // Back to desktop for analysis
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000);
    
    // Get page info
    const analysis = await page.evaluate(() => {
      const getElementInfo = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          text: el.textContent?.trim().substring(0, 50) || '',
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          width: rect.width,
          height: rect.height
        };
      };
      
      return {
        title: document.title,
        url: window.location.href,
        
        // Page structure
        hasH1: !!document.querySelector('h1'),
        h1Count: document.querySelectorAll('h1').length,
        h1Text: document.querySelector('h1')?.textContent?.trim() || 'None',
        h1Info: getElementInfo('h1'),
        
        // Typography issues
        uniqueFonts: Array.from(new Set(
          Array.from(document.querySelectorAll('*'))
            .map(el => window.getComputedStyle(el).fontFamily)
            .filter(font => font && font !== 'inherit')
        )),
        
        // Color palette
        backgroundColors: Array.from(new Set(
          Array.from(document.querySelectorAll('*'))
            .map(el => window.getComputedStyle(el).backgroundColor)
            .filter(bg => bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent')
        )).slice(0, 10),
        
        textColors: Array.from(new Set(
          Array.from(document.querySelectorAll('*'))
            .map(el => window.getComputedStyle(el).color)
        )).slice(0, 10),
        
        // Content analysis
        sections: document.querySelectorAll('section, .section, [class*="section"]').length,
        buttons: document.querySelectorAll('button').length,
        images: document.querySelectorAll('img').length,
        
        // Map analysis
        hasMap: !!document.querySelector('.leaflet-container, [class*="map"], svg'),
        mapElements: Array.from(document.querySelectorAll('.leaflet-container, [class*="map"], svg'))
          .map(el => el.className || el.tagName),
        
        // Spacing issues
        elementsWithInlineStyles: Array.from(document.querySelectorAll('[style]')).length,
        
        // Layout issues
        overflowElements: Array.from(document.querySelectorAll('*'))
          .filter(el => {
            const styles = window.getComputedStyle(el);
            return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
          }).length,
          
        // Accessibility
        missingAlts: Array.from(document.querySelectorAll('img:not([alt])')).length,
        
        // Performance indicators
        totalElements: document.querySelectorAll('*').length,
        scriptTags: document.querySelectorAll('script').length,
        styleTags: document.querySelectorAll('style, link[rel="stylesheet"]').length,
        
        // Specific design elements
        countdownInfo: getElementInfo('.countdown-container'),
        heroInfo: getElementInfo('h1'),
        cardElements: document.querySelectorAll('[class*="card"]').length,
        
        // Visual hierarchy
        headingHierarchy: {
          h1: Array.from(document.querySelectorAll('h1')).map(h => ({
            text: h.textContent?.trim().substring(0, 30),
            fontSize: window.getComputedStyle(h).fontSize
          })),
          h2: Array.from(document.querySelectorAll('h2')).map(h => ({
            text: h.textContent?.trim().substring(0, 30),
            fontSize: window.getComputedStyle(h).fontSize
          })),
          h3: Array.from(document.querySelectorAll('h3')).map(h => ({
            text: h.textContent?.trim().substring(0, 30),
            fontSize: window.getComputedStyle(h).fontSize
          }))
        }
      };
    });
    
    console.log('\n🔍 WEBSITE ANALYSIS RESULTS');
    console.log('============================');
    console.log(`Title: ${analysis.title}`);
    console.log(`URL: ${analysis.url}`);
    
    console.log('\n📝 CONTENT STRUCTURE:');
    console.log(`- H1 headings: ${analysis.h1Count} (${analysis.h1Text})`);
    console.log(`- Sections: ${analysis.sections}`);
    console.log(`- Buttons: ${analysis.buttons}`);
    console.log(`- Images: ${analysis.images}`);
    console.log(`- Total elements: ${analysis.totalElements}`);
    
    console.log('\n🎨 TYPOGRAPHY:');
    console.log(`- Unique fonts: ${analysis.uniqueFonts.length}`);
    analysis.uniqueFonts.slice(0, 3).forEach(font => console.log(`  • ${font}`));
    
    console.log('\n🗺️ MAP ELEMENTS:');
    console.log(`- Has map: ${analysis.hasMap ? '✅ Yes' : '❌ No'}`);
    if (analysis.mapElements.length > 0) {
      console.log(`- Map types: ${analysis.mapElements.join(', ')}`);
    }
    
    console.log('\n🎨 COLOR PALETTE:');
    console.log(`- Background colors: ${analysis.backgroundColors.length}`);
    console.log(`- Text colors: ${analysis.textColors.length}`);
    
    console.log('\n⚠️ POTENTIAL ISSUES:');
    if (analysis.h1Count === 0) console.log('- ❌ No H1 heading found');
    if (analysis.h1Count > 1) console.log('- ⚠️ Multiple H1 headings found');
    if (analysis.missingAlts > 0) console.log(`- ⚠️ ${analysis.missingAlts} images without alt text`);
    if (analysis.overflowElements > 0) console.log(`- ⚠️ ${analysis.overflowElements} elements with overflow`);
    if (analysis.elementsWithInlineStyles > 0) console.log(`- ⚠️ ${analysis.elementsWithInlineStyles} elements with inline styles`);
    
    console.log('\n✅ Screenshots saved successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();