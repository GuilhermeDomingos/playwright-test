import { test, expect } from '../../../src/fixtures/test-fixtures';
import { env } from '../../../src/utils/env';


test('should login successfully with valid credentials @ui @regression @login', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
});


test('should show error message with invalid credentials @ui @regression @login', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(env.BASE_URL);
});
