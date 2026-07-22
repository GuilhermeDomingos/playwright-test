import { test, expect } from '../../../fixtures/test-fixtures';
import { env } from '../../../utils/env';


test('valid user should see inventory list', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
});