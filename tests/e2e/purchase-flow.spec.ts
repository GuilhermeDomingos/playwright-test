import { test, expect } from '../../src/fixtures/test-fixtures';
import { env } from '../../src/utils/env';
import { generateCheckoutFormData } from '../../src/utils/dataGenerator';

test.describe('Purchase Flow', () => {
    test('should complete a purchase successfully @e2e @regression @checkout @cart', async ({
        loginPage,
        inventoryPage,
        cartPage,
        checkoutInformationPage,
        checkoutOverviewPage,
        checkoutCompletePage,
        page,
    }) => {
        const checkoutData = generateCheckoutFormData();

        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');

        await inventoryPage.addBackpackToCart();
        await inventoryPage.clickOnCartLink();

        await expect(page).toHaveURL(/cart/);
        await expect(cartPage.nameProduct).toHaveText('Sauce Labs Backpack');

        await cartPage.clickBtnCheckout();
        await expect(page).toHaveURL(/checkout-step-one/);

        await checkoutInformationPage.fillCheckoutInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode,
        );
        await checkoutInformationPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(checkoutOverviewPage.productName).toHaveText('Sauce Labs Backpack');
        await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
        await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');

        await checkoutOverviewPage.clickFinish();

        await expect(page).toHaveURL(/checkout-complete/);
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });

    test('should cancel checkout from overview and return to inventory @e2e @regression @checkout @cart @inventory', async ({
        loginPage,
        inventoryPage,
        cartPage,
        checkoutInformationPage,
        checkoutOverviewPage,
        page,
    }) => {
        const checkoutData = generateCheckoutFormData();

        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);
        await inventoryPage.addBackpackToCart();
        await inventoryPage.clickOnCartLink();
        await cartPage.clickBtnCheckout();
        await checkoutInformationPage.fillCheckoutInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode,
        );
        await checkoutInformationPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);

        await checkoutOverviewPage.clickCancel();

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('should return home after completing purchase @e2e @regression @checkout @cart @inventory', async ({
        loginPage,
        inventoryPage,
        cartPage,
        checkoutInformationPage,
        checkoutOverviewPage,
        checkoutCompletePage,
        page,
    }) => {
        const checkoutData = generateCheckoutFormData();

        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);
        await inventoryPage.addBackpackToCart();
        await inventoryPage.clickOnCartLink();
        await cartPage.clickBtnCheckout();
        await checkoutInformationPage.fillCheckoutInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode,
        );
        await checkoutInformationPage.clickContinue();
        await checkoutOverviewPage.clickFinish();

        await expect(page).toHaveURL(/checkout-complete/);

        await checkoutCompletePage.clickBackHome();

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });
});
