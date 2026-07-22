import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly inventoryItems: Locator;
    readonly cartlink: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.locator('[data-test="title"]');
        this.inventoryItems = this.locator('[data-test="inventory-item-name"]');
        this.cartlink = this.locator('[data-test="shopping-cart-link"]');
    }


    async addBackpackToCart(): Promise<void> {
        await this.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
}

