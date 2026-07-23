import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly inventoryItems: Locator;
    readonly cartlink: Locator;
    readonly imageProduct: Locator;
    readonly addToCartButtons: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.locator('[data-test="title"]');
        this.inventoryItems = this.locator('[data-test="inventory-item-name"]');
        this.imageProduct = this.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
        this.addToCartButtons = this.locator('button[data-test^="add-to-cart"]');
        this.cartlink = this.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = this.locator('[data-test="shopping-cart-badge"]');
    }


    async addBackpackToCart(): Promise<void> {
        await this.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async clickOnCartLink(): Promise<void> {
        await this.cartlink.click();
    }
}