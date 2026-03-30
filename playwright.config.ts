import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.TEST_PORT || '3000';
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      AUTH_PASSWORD: process.env.AUTH_PASSWORD || 'test-password-123',
      SESSION_SECRET: process.env.SESSION_SECRET || 'test-session-secret-at-least-32-chars!!',
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://test:test@localhost/test',
    },
  },
});
