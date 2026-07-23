import {test, expect} from '../../../src/fixtures/test-fixtures';
import {env} from '../../../src/utils/env';


test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.clickOnCartLink();
  });

    test('should display cart page with added product @ui @regression @cart', async ({cartPage}) => {
        await expect(cartPage.titleCart).toBeVisible();
        await expect(cartPage.titleCart).toHaveText('Your Cart');
    })

    test('should validate product data in cart @ui @regression @cart', async ({cartPage}) => {
    await expect(cartPage.itemQuantity).toHaveText('1');
    await expect(cartPage.nameProduct).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.descriptionProduct).toHaveText('Description');
    await expect(cartPage.itemPrice).toHaveText('$29.99');
    await expect(cartPage.btnRemoveItem).toBeVisible();
  })

  test('should remove product from cart @ui @regression @cart', async ({cartPage}) => {
    await cartPage.removeItemFromCart();
    await expect(cartPage.btnRemoveItem).not.toBeVisible();
    await expect(cartPage.btnContinueShopping).toBeVisible();
    await expect(cartPage.nameProduct).not.toBeVisible();
    await expect(cartPage.itemQuantity).toHaveCount(0);
  });

  test('should continue shopping after adding product to cart @ui @regression @cart', async ({cartPage,inventoryPage, page}) => {
    await cartPage.btnContinueShopping.click();
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(page).toHaveURL(/inventory/);
  });

    test('should navigate to Checkout step @ui @regression @cart @checkout', async ({cartPage, page}) => {
    await expect(cartPage.btnCheckout).toBeVisible();
    await expect(cartPage.btnCheckout).toHaveText('Checkout');
    await cartPage.clickBtnCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  

});
