import {test, expect} from '../../src/fixtures/test-fixtures';
import {env} from '../../src/utils/env';
import {generateCheckoutFormData} from '../../src/utils/dataGenerator';

test.describe('Smoke Tests', () => {
    test('should login successfully @smoke @login', async ({loginPage, inventoryPage, page}) => {
        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('should add product to cart @smoke @cart', async ({loginPage, inventoryPage, cartPage}) => {
        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);

        await inventoryPage.addBackpackToCart();

        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.clickOnCartLink();

        await expect(cartPage.nameProduct).toHaveText('Sauce Labs Backpack');
    });

    test('should complete checkout successfully @smoke @checkout', async ({
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

        await expect(page).toHaveURL(/checkout-step-two/);

        await checkoutOverviewPage.clickFinish();

        await expect(page).toHaveURL(/checkout-complete/);
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });
});
