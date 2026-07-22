import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameField = this.locator('[data-test="username"]');
        this.passwordField = this.locator('[data-test="password"]');
        this.loginButton = this.locator('[data-test="login-button"]');
        this.errorMessage = this.locator('[data-test="error"]');
    }

    async goto(): Promise<void> {
        await super.open('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}