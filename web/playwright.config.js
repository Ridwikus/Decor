import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  use: { baseURL: 'http://localhost:8000' },
  webServer: {
    command: 'php -S localhost:8000 -t public',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
  },
});
