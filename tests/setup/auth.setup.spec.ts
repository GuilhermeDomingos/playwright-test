import {test as setup} from '@playwright/test';
import { env } from '../../src/utils/env';
import {LoginPage} from '../../src/pages/LoginPage';

setup('Setup Auth', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await page.context().storageState({ path: 'storage/auth.json' });
})
