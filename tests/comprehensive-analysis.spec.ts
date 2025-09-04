import { test, expect } from '@playwright/test';

test.describe('TheEscape2026 Comprehensive Analysis', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Core functionality and performance analysis', async ({ page }) => {
    // Performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });
    console.log('Performance Metrics:', performanceMetrics);

    // Check core sections
    const sections = ['hero', 'timeline', 'friends', 'map', 'memories', 'stories', 'account'];
    for (const section of sections) {
      const element = await page.locator(`#${section}`).isVisible();
      expect(element).toBeTruthy();
      console.log(`✓ Section ${section} is present`);
    }

    // Check navigation
    const nav = await page.locator('nav').isVisible();
    expect(nav).toBeTruthy();

    // Check Supabase connection
    const supabaseTest = await page.locator('[data-testid="supabase-status"]').textContent();
    console.log('Supabase Status:', supabaseTest);

    // Check responsive design
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      const isResponsive = await page.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).overflow !== 'hidden';
      });
      console.log(`${viewport.name} view (${viewport.width}x${viewport.height}): ${isResponsive ? '✓' : '✗'}`);
    }

    // Check for console errors
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });

    // Check accessibility
    const accessibilityIssues = await page.evaluate(() => {
      const issues: string[] = [];
      
      // Check for alt text on images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.alt) {
          issues.push(`Image missing alt text: ${img.src}`);
        }
      });

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        if (level - lastLevel > 1) {
          issues.push(`Heading hierarchy issue: ${heading.tagName} follows H${lastLevel}`);
        }
        lastLevel = level;
      });

      // Check for form labels
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const id = input.id;
        if (id && !document.querySelector(`label[for="${id}"]`)) {
          issues.push(`Input missing label: ${id || (input as HTMLInputElement).name || 'unnamed'}`);
        }
      });

      return issues;
    });

    if (accessibilityIssues.length > 0) {
      console.log('Accessibility Issues:', accessibilityIssues);
    }

    // Take screenshots for analysis
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: 'test-results/desktop-analysis.png', fullPage: true });
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'test-results/mobile-analysis.png', fullPage: true });

    // Check for broken links
    const links = await page.locator('a').all();
    const brokenLinks: string[] = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('http')) {
        const response = await fetch(href).catch(() => null);
        if (!response || response.status >= 400) {
          brokenLinks.push(href);
        }
      }
    }

    if (brokenLinks.length > 0) {
      console.log('Broken Links:', brokenLinks);
    }

    // Check loading states
    const loadingElements = await page.locator('[aria-busy="true"], .loading, .skeleton').all();
    console.log(`Loading elements found: ${loadingElements.length}`);

    // Network analysis
    const resourceTimings = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const summary = {
        totalResources: resources.length,
        totalSize: 0,
        slowResources: [] as string[],
        largeResources: [] as string[]
      };

      resources.forEach(resource => {
        const duration = resource.responseEnd - resource.startTime;
        const size = resource.transferSize || 0;
        
        summary.totalSize += size;
        
        if (duration > 1000) {
          summary.slowResources.push(`${resource.name} (${Math.round(duration)}ms)`);
        }
        
        if (size > 500000) { // 500KB
          summary.largeResources.push(`${resource.name} (${Math.round(size / 1024)}KB)`);
        }
      });

      return summary;
    });

    console.log('Network Analysis:', resourceTimings);

    // Check for memory leaks (simplified check)
    const memoryUsage = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    });

    if (memoryUsage) {
      console.log('Memory Usage:', {
        usedJSHeapSize: `${Math.round(memoryUsage.usedJSHeapSize / 1048576)}MB`,
        totalJSHeapSize: `${Math.round(memoryUsage.totalJSHeapSize / 1048576)}MB`
      });
    }

    // Final report
    console.log('\n=== ANALYSIS COMPLETE ===');
    console.log('Console Errors:', consoleMessages.length);
    console.log('Accessibility Issues:', accessibilityIssues.length);
    console.log('Broken Links:', brokenLinks.length);
  });

  test('Authentication flow analysis', async ({ page }) => {
    // Check if login/register forms exist
    const accountSection = await page.locator('#account');
    await accountSection.scrollIntoViewIfNeeded();
    
    // Check for auth elements
    const authElements = {
      emailInput: await page.locator('input[type="email"]').count(),
      passwordInput: await page.locator('input[type="password"]').count(),
      submitButton: await page.locator('button[type="submit"]').count()
    };

    console.log('Auth Elements Found:', authElements);

    // Check Supabase client initialization
    const supabaseInitialized = await page.evaluate(() => {
      return typeof (window as any).supabase !== 'undefined';
    });

    console.log('Supabase Client Initialized:', supabaseInitialized);
  });

  test('Interactive elements analysis', async ({ page }) => {
    // Check all buttons
    const buttons = await page.locator('button').all();
    console.log(`Total buttons found: ${buttons.length}`);

    // Check interactive elements
    const interactiveElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('button, a, input, textarea, select, [role="button"], [onclick], [tabindex="0"]');
      return elements.length;
    });

    console.log(`Total interactive elements: ${interactiveElements}`);

    // Check for animations
    const animatedElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('[class*="animate"], [class*="transition"], [data-gsap]');
      return elements.length;
    });

    console.log(`Animated elements: ${animatedElements}`);
  });
});