# Test Application

Run comprehensive tests using Playwright for E2E testing and ensure the application works flawlessly.

## Test Coverage Areas:
1. **Countdown Timer**
   - Correct time calculation
   - Animation performance
   - Responsive display

2. **Authentication Flow**
   - Friend invitation system
   - Login/logout functionality
   - Protected routes

3. **Map Voting**
   - Marker interactions
   - Vote submission
   - Real-time updates
   - Vote limits (3 per person)

4. **Responsive Design**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

5. **Performance**
   - Page load times
   - Animation smoothness
   - API response times

## Commands to run:

```bash
# Install Playwright if needed
npm install -D @playwright/test

# Run all tests
npm run test:e2e

# Run specific test file
npx playwright test countdown.spec.ts

# Run in UI mode for debugging
npx playwright test --ui

# Generate test report
npx playwright show-report
```

## Key Test Scenarios:

### Countdown Test:
```typescript
test('countdown displays correct time', async ({ page }) => {
  await page.goto('/')
  const countdown = page.locator('[data-testid="countdown"]')
  await expect(countdown).toBeVisible()
  await expect(countdown).toContainText(/\d+ days/)
})
```

### Voting Test:
```typescript
test('user can vote for destination', async ({ page }) => {
  await page.goto('/map')
  await page.click('[data-destination="Barcelona"]')
  await page.click('[data-testid="vote-button"]')
  await expect(page.locator('.vote-count')).toContainText('1')
})
```

## Accessibility Tests:
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus indicators

Always run tests before deploying!