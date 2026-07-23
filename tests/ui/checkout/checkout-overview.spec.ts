import {test, expect} from '../../../src/fixtures/test-fixtures';
import {env} from '../../../src/utils/env';
import {generateCheckoutFormData} from '../../../src/utils/dataGenerator';

test.describe('Checkout Overview', () => {
    test.beforeEach(async ({
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
        await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
    });

    test('should display checkout overview page', async ({checkoutOverviewPage, page}) => {
        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(checkoutOverviewPage.title).toBeVisible();
        await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
        await expect(checkoutOverviewPage.btnCancel).toBeVisible();
        await expect(checkoutOverviewPage.btnCancel).toHaveText('Cancel');
        await expect(checkoutOverviewPage.btnFinish).toBeVisible();
        await expect(checkoutOverviewPage.btnFinish).toHaveText('Finish');
    });

    test('should validate product data in checkout overview', async ({checkoutOverviewPage}) => {
        await expect(checkoutOverviewPage.itemQuantity).toHaveText('1');
        await expect(checkoutOverviewPage.productName).toHaveText('Sauce Labs Backpack');
        await expect(checkoutOverviewPage.productDescription).toBeVisible();
        await expect(checkoutOverviewPage.productDescription).toHaveText(/\S+/);
        await expect(checkoutOverviewPage.productPrice).toHaveText('$29.99');
    });

    test('should validate payment and shipping information', async ({checkoutOverviewPage}) => {
        await expect(checkoutOverviewPage.paymentInfoLabel).toHaveText('Payment Information:');
        await expect(checkoutOverviewPage.paymentInfoValue).toHaveText('SauceCard #31337');
        await expect(checkoutOverviewPage.shippingInfoLabel).toHaveText('Shipping Information:');
        await expect(checkoutOverviewPage.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
    });

    test('should validate price total information', async ({checkoutOverviewPage}) => {
        await expect(checkoutOverviewPage.priceTotalLabel).toHaveText('Price Total');
        await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
        await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
        await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');
    });

    test('should return to inventory when cancel is clicked', async ({checkoutOverviewPage, inventoryPage, page}) => {
        await checkoutOverviewPage.clickCancel();

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('should finish checkout successfully', async ({checkoutOverviewPage, page}) => {
        await checkoutOverviewPage.clickFinish();

        await expect(page).toHaveURL(/checkout-complete/);
        await expect(checkoutOverviewPage.title).toHaveText('Checkout: Complete!');
    });
});
