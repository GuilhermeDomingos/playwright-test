import {test, expect} from '../../../src/fixtures/test-fixtures';
import {env} from '../../../src/utils/env';
import {generateCheckoutFormData} from '../../../src/utils/dataGenerator';

test.describe('Checkout Complete', () => {
    test.beforeEach(async ({
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
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    });

    test('should display checkout complete page @ui @regression @checkout', async ({checkoutCompletePage, page}) => {
        await expect(page).toHaveURL(/checkout-complete/);
        await expect(checkoutCompletePage.title).toBeVisible();
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.completeIcon).toBeVisible();
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
        await expect(checkoutCompletePage.completeText).toHaveText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        );
        await expect(checkoutCompletePage.btnBackHome).toBeVisible();
        await expect(checkoutCompletePage.btnBackHome).toHaveText('Back Home');
        await expect(checkoutCompletePage.btnGeneratePdfOrder).toBeVisible();
        await expect(checkoutCompletePage.btnGeneratePdfOrder).toHaveText('Generate PDF order');
    });

    test('should return to inventory when back home is clicked @ui @regression @checkout @inventory', async ({
        checkoutCompletePage,
        inventoryPage,
        page,
    }) => {
        await checkoutCompletePage.clickBackHome();

        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('should keep cart empty after order is completed @ui @regression @checkout @cart', async ({checkoutCompletePage, cartPage}) => {
        await expect(checkoutCompletePage.cartBadge).not.toBeVisible();

        await checkoutCompletePage.clickCartLink();

        await expect(cartPage.titleCart).toHaveText('Your Cart');
        await expect(cartPage.nameProduct).not.toBeVisible();
        await expect(cartPage.itemQuantity).toHaveCount(0);
    });

    test('should keep generate pdf order button available @ui @regression @checkout', async ({checkoutCompletePage}) => {
        await expect(checkoutCompletePage.btnGeneratePdfOrder).toBeVisible();
        await expect(checkoutCompletePage.btnGeneratePdfOrder).toHaveText('Generate PDF order');
        await expect(checkoutCompletePage.btnGeneratePdfOrder).toBeEnabled();
    });
});
