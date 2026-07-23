import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class CheckoutOverviewPage extends BasePage {
    readonly title: Locator;
    readonly itemQuantity: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly paymentInfoLabel: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoLabel: Locator;
    readonly shippingInfoValue: Locator;
    readonly priceTotalLabel: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly btnCancel: Locator;
    readonly btnFinish: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.locator('[data-test="title"]');
        this.itemQuantity = this.locator('[data-test="item-quantity"]');
        this.productName = this.locator('[data-test="inventory-item-name"]');
        this.productDescription = this.locator('[data-test="inventory-item-desc"]');
        this.productPrice = this.locator('[data-test="inventory-item-price"]');
        this.paymentInfoLabel = this.locator('[data-test="payment-info-label"]');
        this.paymentInfoValue = this.locator('[data-test="payment-info-value"]');
        this.shippingInfoLabel = this.locator('[data-test="shipping-info-label"]');
        this.shippingInfoValue = this.locator('[data-test="shipping-info-value"]');
        this.priceTotalLabel = this.locator('[data-test="total-info-label"]');
        this.itemTotal = this.locator('[data-test="subtotal-label"]');
        this.tax = this.locator('[data-test="tax-label"]');
        this.total = this.locator('[data-test="total-label"]');
        this.btnCancel = this.locator('[data-test="cancel"]');
        this.btnFinish = this.locator('[data-test="finish"]');
    }

    async clickCancel(): Promise<void> {
        await this.btnCancel.click();
    }

    async clickFinish(): Promise<void> {
        await this.btnFinish.click();
    }
}
