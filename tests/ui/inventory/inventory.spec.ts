import { test, expect } from '../../../src/fixtures/test-fixtures';
import { env } from '../../../src/utils/env';


test('valid user should see inventory list @ui @regression @inventory', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await expect(inventoryPage.imageProduct).toBeVisible();
    await expect(inventoryPage.addToCartButtons.first()).toHaveText('Add to cart');
    await expect(inventoryPage.cartlink).toBeVisible();
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

});


