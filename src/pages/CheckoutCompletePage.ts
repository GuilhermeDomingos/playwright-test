import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class CheckoutCompletePage extends BasePage {
    readonly title: Locator;
    readonly completeIcon: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly btnBackHome: Locator;
    readonly btnGeneratePdfOrder: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.locator('[data-test="title"]');
        this.completeIcon = this.locator('[data-test="pony-express"]');
        this.completeHeader = this.locator('[data-test="complete-header"]');
        this.completeText = this.locator('[data-test="complete-text"]');
        this.btnBackHome = this.locator('[data-test="back-to-products"]');
        this.btnGeneratePdfOrder = this.locator('[data-test="download-pdf"]').or(
            page.getByRole('button', {name: 'Generate PDF order'}),
        );
        this.cartLink = this.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = this.locator('[data-test="shopping-cart-badge"]');
    }

    async clickBackHome(): Promise<void> {
        await this.btnBackHome.click();
    }

    async clickGeneratePdfOrder(): Promise<void> {
        await this.btnGeneratePdfOrder.click();
    }

    async clickCartLink(): Promise<void> {
        await this.cartLink.click();
    }
}
