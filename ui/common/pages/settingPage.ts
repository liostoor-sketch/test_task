import { Page, Locator } from '@playwright/test';
import { BasePage } from "./basePage";

export class SettingPage extends BasePage {
    readonly page: Page;

    readonly scriptGroupsSection: Locator;
    readonly scriptGroupsItem: Locator;

    readonly scriptGroupsAddGroupButton: Locator;
    readonly scriptGroupsCustomizeButton: Locator;

    readonly newGroupTitleField: Locator;
    readonly newGroupScriptField: Locator;
    readonly requiredFieldErrorMessage: Locator;
    readonly newGroupSaveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.scriptGroupsSection = page.locator("[data-sentry-element='SettingsPageContainer']");
        this.scriptGroupsItem = this.scriptGroupsSection.locator("[data-sentry-element='QuickMessageFormHeaderContainerStyled']");

        this.scriptGroupsAddGroupButton = this.scriptGroupsSection.locator("button:text-is('Add group')");
        this.scriptGroupsCustomizeButton = this.scriptGroupsSection.locator("button:text-is('Customize')");

        this.newGroupTitleField = page.locator("input[name='title']");
        this.newGroupScriptField = page.locator("textarea[name='messages.0.message']");
        this.requiredFieldErrorMessage = page.locator("p:text-is('This field is required')");
        this.newGroupSaveButton = page.locator("button:text-is('Save')");
    }
}