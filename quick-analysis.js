const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Starting comprehensive website analysis...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const issues = [];
  const improvements = [];
  const positives = [];

  try {
    // Navigate to the page
    console.log('📱 Loading website...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // 1. Performance Analysis
    console.log('\n⚡ Performance Analysis:');
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
        loadComplete: nav.loadEventEnd - nav.loadEventStart,
        domInteractive: nav.domInteractive
      };
    });
    console.log(`  - DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  - Page Load Complete: ${metrics.loadComplete}ms`);
    
    if (metrics.loadComplete > 3000) {
      issues.push('Page load time exceeds 3 seconds');
      improvements.push('Implement lazy loading for images and code splitting');
    } else {
      positives.push(`Fast page load: ${metrics.loadComplete}ms`);
    }

    // 2. SEO Analysis
    console.log('\n🔍 SEO Analysis:');
    const seo = await page.evaluate(() => {
      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        h1Count: document.querySelectorAll('h1').length,
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      };
    });
    
    if (!seo.title) {
      issues.push('Missing page title');
      improvements.push('Add proper <title> tag in layout.tsx');
    }
    if (!seo.metaDescription) {
      issues.push('Missing meta description');
      improvements.push('Add meta description for better SEO');
    }
    if (seo.h1Count !== 1) {
      issues.push(`Incorrect H1 count: ${seo.h1Count} (should be 1)`);
    }
    if (!seo.ogImage) {
      improvements.push('Add Open Graph image for social sharing');
    }

    // 3. Accessibility Analysis
    console.log('\n♿ Accessibility Analysis:');
    const a11y = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const buttons = Array.from(document.querySelectorAll('button'));
      const inputs = Array.from(document.querySelectorAll('input, textarea'));
      
      return {
        imagesWithoutAlt: images.filter(img => !img.alt).length,
        totalImages: images.length,
        buttonsWithoutText: buttons.filter(btn => !btn.textContent?.trim() && !btn.getAttribute('aria-label')).length,
        inputsWithoutLabel: inputs.filter(input => {
          const id = input.id;
          return !id || !document.querySelector(`label[for="${id}"]`);
        }).length
      };
    });
    
    console.log(`  - Images without alt text: ${a11y.imagesWithoutAlt}/${a11y.totalImages}`);
    console.log(`  - Buttons without text/label: ${a11y.buttonsWithoutText}`);
    console.log(`  - Inputs without labels: ${a11y.inputsWithoutLabel}`);
    
    if (a11y.imagesWithoutAlt > 0) {
      issues.push(`${a11y.imagesWithoutAlt} images missing alt text`);
      improvements.push('Add descriptive alt text to all images');
    }
    if (a11y.buttonsWithoutText > 0) {
      issues.push(`${a11y.buttonsWithoutText} buttons without accessible text`);
    }
    if (a11y.inputsWithoutLabel > 0) {
      issues.push(`${a11y.inputsWithoutLabel} form inputs without labels`);
    }

    // 4. Mobile Responsiveness
    console.log('\n📱 Mobile Responsiveness:');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          issues.push(`Element overflows: ${el.tagName}.${el.className}`);
        }
      });
      
      return issues;
    });
    
    if (mobileIssues.length > 0) {
      issues.push('Mobile overflow issues detected');
      console.log('  - Overflow issues:', mobileIssues.slice(0, 3));
    } else {
      positives.push('Mobile responsive design working correctly');
    }

    // 5. Check for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    if (consoleErrors.length > 0) {
      issues.push(`${consoleErrors.length} console errors detected`);
      console.log('\n❌ Console Errors:', consoleErrors);
    }

    // 6. Network Analysis
    console.log('\n🌐 Network Analysis:');
    const resources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      let totalSize = 0;
      const large = [];
      
      resources.forEach(resource => {
        const size = resource.transferSize || 0;
        totalSize += size;
        if (size > 500000) { // 500KB
          large.push({ name: resource.name.split('/').pop(), size: Math.round(size / 1024) });
        }
      });
      
      return { 
        count: resources.length, 
        totalSize: Math.round(totalSize / 1024),
        largeFiles: large
      };
    });
    
    console.log(`  - Total resources: ${resources.count}`);
    console.log(`  - Total size: ${resources.totalSize}KB`);
    
    if (resources.largeFiles.length > 0) {
      issues.push(`${resources.largeFiles.length} large files detected (>500KB)`);
      improvements.push('Optimize large files: ' + resources.largeFiles.map(f => f.name).join(', '));
    }

    // 7. Feature Detection
    console.log('\n✨ Feature Analysis:');
    const features = await page.evaluate(() => {
      return {
        hasAuth: !!document.querySelector('input[type="email"]'),
        hasMap: !!document.querySelector('#map'),
        hasCountdown: !!document.querySelector('[class*="countdown"]'),
        hasAnimations: !!document.querySelector('[class*="animate"], [class*="transition"]'),
        hasSupabase: !!document.querySelector('[data-testid="supabase-status"]')
      };
    });
    
    console.log('  - Authentication:', features.hasAuth ? '✅' : '❌');
    console.log('  - Map Component:', features.hasMap ? '✅' : '❌');
    console.log('  - Countdown:', features.hasCountdown ? '✅' : '❌');
    console.log('  - Animations:', features.hasAnimations ? '✅' : '❌');
    console.log('  - Supabase Integration:', features.hasSupabase ? '✅' : '❌');

    // Take screenshots
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: 'analysis-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'analysis-mobile.png', fullPage: true });

  } catch (error) {
    console.error('Error during analysis:', error.message);
  } finally {
    await browser.close();
  }

  // Final Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 ANALYSIS SUMMARY');
  console.log('='.repeat(60));
  
  console.log('\n✅ Positives:');
  positives.forEach(p => console.log(`  - ${p}`));
  
  console.log('\n⚠️  Issues Found:');
  issues.forEach(issue => console.log(`  - ${issue}`));
  
  console.log('\n💡 Improvements:');
  improvements.forEach(imp => console.log(`  - ${imp}`));
  
  console.log('\n📈 Priority Actions:');
  console.log('  1. Add proper SEO meta tags');
  console.log('  2. Implement proper authentication flow');
  console.log('  3. Add loading states and error handling');
  console.log('  4. Optimize images and implement lazy loading');
  console.log('  5. Add proper TypeScript types throughout');
  
  console.log('\n✨ Next Steps:');
  console.log('  - Complete Supabase setup for authentication');
  console.log('  - Implement voting functionality with real-time updates');
  console.log('  - Add GSAP animations for countdown');
  console.log('  - Set up Cloudinary for image management');
  console.log('  - Create PWA manifest for mobile experience');
})();