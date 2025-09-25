import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;

    readonly headerSection: Locator;

    readonly headerBusyButton: Locator;
    readonly headerStartButton: Locator;

    readonly headerNotificationButton: Locator;

    readonly headerSettingDropdown: Locator;
    readonly headerSettingButton: Locator;
    readonly headerLogoutButton: Locator;

    readonly headerHamburgerMenuButton: Locator;
    readonly headerHamburgerMenuChatButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headerSection = page.locator("header");

        this.headerBusyButton = this.headerSection.locator("[data-testid='busy-button']");
        this.headerStartButton = this.headerSection.locator("[data-testid='work-status-toggle']");

        this.headerNotificationButton = this.headerSection.locator("[data-testid='notification-center']");

        this.headerSettingDropdown = this.headerSection.locator("[data-testid='app-bar-open-popover']");
        this.headerSettingButton = this.headerSection.locator("[data-testid='app-bar-settings-button']");
        this.headerLogoutButton = this.headerSection.locator("[data-testid='app-bar-logout-button']");

        this.headerHamburgerMenuButton = this.headerSection.locator("[data-sentry-element='AppBarIconButton']");
        this.headerHamburgerMenuChatButton = this.headerSection.locator("[data-testid='drawer-navigation-list-item-link-chat']");
    }
}