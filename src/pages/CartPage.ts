import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class CartPage extends BasePage {
    readonly titleCart: Locator;
    readonly itemQuantity: Locator;
    readonly nameProduct: Locator;
    readonly descriptionProduct: Locator;
    readonly itemPrice: Locator;
    readonly btnRemoveItem: Locator;
    readonly btnContinueShopping: Locator;
    readonly btnCheckout: Locator;


    constructor(page: Page) {
        super(page);
        this.titleCart = this.locator('[data-test="title"]');
        this.itemQuantity = this.locator('[data-test="item-quantity"]');
        this.nameProduct = this.locator('[data-test="inventory-item-name"]');
        this.descriptionProduct = this.locator('[data-test="cart-desc-label"]');
        this.itemPrice = this.locator('[data-test="inventory-item-price"]');
        this.btnRemoveItem = this.locator('[data-test="remove-sauce-labs-backpack"]');
        this.btnContinueShopping = this.locator('[data-test="continue-shopping"]');
        this.btnCheckout = this.locator('[data-test="checkout"]');
    }

    async removeItemFromCart(): Promise<void> {
        await this.btnRemoveItem.click();
    }

    async clickBtnCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }
}