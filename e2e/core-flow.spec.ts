import { test, expect, Page } from '@playwright/test';

const TEST_PASSWORD = process.env.AUTH_PASSWORD || 'test-password-123';

/**
 * Helper: log in via the login page.
 */
async function login(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Password').fill(TEST_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  // After successful login the app redirects to /app
  await page.waitForURL('**/app**', { timeout: 15_000 });
}

/**
 * Mock all database-dependent server actions and AI routes so that
 * the tests are self-contained and do not require a real database or AI key.
 */
async function setupMocks(page: Page) {
  // Mock the AI study plan generation endpoint (streamed text)
  await page.route('**/api/generate-plan**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: JSON.stringify({
        title: 'AI Study Plan',
        description: 'Mocked AI study plan',
        days: [],
      }),
    });
  });

  // Mock the code evaluation endpoint
  await page.route('**/api/evaluate**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ output: 'Hello, World!', error: null, executionTime: 10 }),
    });
  });
}

test.describe('Core user flow', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
  });

  test('1 – Login page renders and shows the Sign In form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'InterviewForge' })).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('2 – Login with correct password redirects to /app dashboard', async ({ page }) => {
    await login(page);

    // Dashboard heading should be visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    // Quick action buttons present
    await expect(page.getByRole('link', { name: /Practice Questions/i })).toBeVisible();
  });

  test('3 – Navigate to Jobs page and see the create button', async ({ page }) => {
    await login(page);

    await page.getByRole('link', { name: /Job Applications/i }).first().click();
    await page.waitForURL('**/app/jobs**');

    // Page title
    await expect(page.getByRole('heading', { name: /Job/i })).toBeVisible();
    // Link/button to create a new job
    await expect(page.getByRole('link', { name: /New Job|Add Job|Create/i })).toBeVisible();
  });

  test('4 – Navigate to Topics page', async ({ page }) => {
    await login(page);

    await page.goto('/app/topics');
    await expect(page.getByRole('heading', { name: /Topics/i })).toBeVisible();
  });

  test('5 – Navigate to Questions page', async ({ page }) => {
    await login(page);

    await page.goto('/app/questions');
    await expect(page.getByRole('heading', { name: /Questions/i })).toBeVisible();
  });

  test('6 – Study Plans page shows create button', async ({ page }) => {
    await login(page);

    await page.goto('/app/plans');
    await expect(page.getByRole('heading', { name: /Study Plans|Plans/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /New Plan|Create/i })).toBeVisible();
  });

  test('7 – New Study Plan page renders the plan form', async ({ page }) => {
    await login(page);

    await page.goto('/app/plans/new');
    // The form should be present
    await expect(page.getByRole('heading', { name: /Create|New.*Plan|Study Plan/i })).toBeVisible();
  });

  test('8 – Progress dashboard page renders', async ({ page }) => {
    await login(page);

    await page.goto('/app/progress');
    await expect(page.getByRole('heading', { name: /Progress/i })).toBeVisible();
  });

  test('9 – Login with wrong password shows error message', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Password').fill('wrong-password-xyz');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should stay on login page and show an error
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(/Incorrect password/i)).toBeVisible();
  });
});
