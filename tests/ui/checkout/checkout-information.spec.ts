import {test, expect} from '../../../src/fixtures/test-fixtures';
import {env} from '../../../src/utils/env';
import {generateCheckoutFormData} from '../../../src/utils/dataGenerator';

test.describe('Checkout Information', () => {
    test.beforeEach(async ({loginPage, inventoryPage, cartPage, checkoutInformationPage, page}) => {
        await loginPage.goto();
        await loginPage.login(env.USERNAME, env.PASSWORD);
        await inventoryPage.addBackpackToCart();
        await inventoryPage.clickOnCartLink();
        await cartPage.clickBtnCheckout();

        await expect(page).toHaveURL(/checkout-step-one/);
        await expect(checkoutInformationPage.title).toHaveText('Checkout: Your Information');
    });

    test('should display checkout information page @ui @regression @checkout', async ({checkoutInformationPage}) => {
        await expect(checkoutInformationPage.title).toBeVisible();
        await expect(checkoutInformationPage.title).toHaveText('Checkout: Your Information');
        await expect(checkoutInformationPage.firstNameField).toBeVisible();
        await expect(checkoutInformationPage.firstNameField).toHaveAttribute('placeholder', 'First Name');
        await expect(checkoutInformationPage.lastNameField).toBeVisible();
        await expect(checkoutInformationPage.lastNameField).toHaveAttribute('placeholder', 'Last Name');
        await expect(checkoutInformationPage.postalCodeField).toBeVisible();
        await expect(checkoutInformationPage.postalCodeField).toHaveAttribute('placeholder', 'Zip/Postal Code');
        await expect(checkoutInformationPage.btnCancel).toBeVisible();
        await expect(checkoutInformationPage.btnCancel).toHaveText('Cancel');
        await expect(checkoutInformationPage.btnContinue).toBeVisible();
        await expect(checkoutInformationPage.btnContinue).toHaveText('Continue');
        await expect(checkoutInformationPage.cartBadge).toHaveText('1');
    });

    test('should continue to checkout overview with valid information @ui @regression @checkout', async ({checkoutInformationPage, page}) => {
        const checkoutData = generateCheckoutFormData();

        await checkoutInformationPage.fillCheckoutInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode,
        );
        await checkoutInformationPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(checkoutInformationPage.title).toHaveText('Checkout: Overview');
    });

    test('should show error when first name is missing @ui @regression @checkout', async ({checkoutInformationPage}) => {
        const checkoutData = generateCheckoutFormData();

        await checkoutInformationPage.fillCheckoutInformation('', checkoutData.lastName, checkoutData.postalCode);
        await checkoutInformationPage.clickContinue();

        await expect(checkoutInformationPage.errorMessage).toBeVisible();
        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: First Name is required');
    });

    test('should show error when last name is missing @ui @regression @checkout', async ({checkoutInformationPage}) => {
        const checkoutData = generateCheckoutFormData();

        await checkoutInformationPage.fillCheckoutInformation(checkoutData.firstName, '', checkoutData.postalCode);
        await checkoutInformationPage.clickContinue();

        await expect(checkoutInformationPage.errorMessage).toBeVisible();
        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Last Name is required');
    });

    test('should show error when postal code is missing @ui @regression @checkout', async ({checkoutInformationPage}) => {
        const checkoutData = generateCheckoutFormData();

        await checkoutInformationPage.fillCheckoutInformation(checkoutData.firstName, checkoutData.lastName, '');
        await checkoutInformationPage.clickContinue();

        await expect(checkoutInformationPage.errorMessage).toBeVisible();
        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Postal Code is required');
    });

    test('should return to cart when cancel is clicked @ui @regression @checkout @cart', async ({checkoutInformationPage, cartPage, page}) => {
        await checkoutInformationPage.clickCancel();

        await expect(page).toHaveURL(/cart/);
        await expect(cartPage.titleCart).toHaveText('Your Cart');
        await expect(cartPage.nameProduct).toHaveText('Sauce Labs Backpack');
    });
});
