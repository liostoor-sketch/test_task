import { Page, Locator } from '@playwright/test';
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    readonly page: Page;

    readonly loginEmailField: Locator;
    readonly loginPasswordField: Locator;
    readonly loginSubmitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.loginEmailField = page.locator("[data-testid='login-email-input'] input");
        this.loginPasswordField = page.locator("[data-testid='login-password-input'] input");
        this.loginSubmitButton = page.locator("[data-testid='login-submit-button']");
    }
}