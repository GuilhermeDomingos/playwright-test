import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class CheckoutInformationPage extends BasePage {
    readonly title: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly btnCancel: Locator;
    readonly btnContinue: Locator;
    readonly cartBadge: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.locator('[data-test="title"]');
        this.firstNameField = this.locator('[data-test="firstName"]');
        this.lastNameField = this.locator('[data-test="lastName"]');
        this.postalCodeField = this.locator('[data-test="postalCode"]');
        this.btnCancel = this.locator('[data-test="cancel"]');
        this.btnContinue = this.locator('[data-test="continue"]');
        this.cartBadge = this.locator('[data-test="shopping-cart-badge"]');
        this.errorMessage = this.locator('[data-test="error"]');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async clickCancel(): Promise<void> {
        await this.btnCancel.click();
    }
}
