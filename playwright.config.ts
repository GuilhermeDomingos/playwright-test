import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5 * 1000,
    },

    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { open: 'never' }], ['allure-playwright']],

    use: {
        actionTimeout: 15_000,
        navigationTimeout: 20_000,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'env.BASE_URL',
        headless: env.HEADLESS,
        launchOptions: {
            slowMo: 100,
        }
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.spec\.ts/,
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'storage/auth.json',
            }

        },
    ],
    outputDir: 'test-results/',
});