import { Page, Locator } from '@playwright/test';
import { BasePage } from "./basePage";

export class ChatPage extends BasePage {
    readonly page: Page;

    readonly chatListSection: Locator;
    readonly chatListSearchField: Locator;
    readonly chatListSearchButton: Locator;
    readonly chatListItem: Locator;

    readonly chatContainer: Locator;
    readonly chatHeader: Locator;

    readonly chatMessageSection: Locator;
    readonly chatMessageFromClient: Locator;
    readonly chatMessageFromExpert: Locator;

    readonly chatMessageField: Locator;
    readonly chatMessageReportButton: Locator;
    readonly chatMessageSendButton: Locator;

    readonly chatQuickMessageContainer: Locator;
    readonly chatQuickMessageItem: (quickMessageText: string) => Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.chatListSection = page.locator("[data-testid='chat-list-section']");
        this.chatListSearchField = this.chatListSection.locator("[data-testid='chat-list-filter-search']");
        this.chatListSearchButton = this.chatListSection.locator("[data-testid='chat-list-filter-button']");
        this.chatListItem = this.chatListSection.locator("[data-testid='chat-list-item']");

        this.chatContainer = page.locator("[data-testid='chat-container']");
        this.chatHeader = this.chatContainer.locator("[data-sentry-component='ChatHeader']");

        this.chatMessageSection = this.chatContainer.locator("[data-testid='virtuoso-scroller']");
        this.chatMessageFromClient = this.chatMessageSection.locator("[data-testid='message-client-text']");
        this.chatMessageFromExpert = this.chatMessageSection.locator("[data-testid='message-expert-text']");

        this.chatMessageField = this.chatContainer.locator("[data-testid='chat-send-message-input']");
        this.chatMessageReportButton = this.chatContainer.locator("button:text-is('Report')");
        this.chatMessageSendButton = this.chatContainer.locator("button:text-is('Send')");

        this.chatQuickMessageContainer = this.chatContainer.locator("[data-testid='chat-quick-message-container']");
        this.chatQuickMessageItem = (quickMessageText) => this.chatQuickMessageContainer.locator(`button:text-is('${quickMessageText}')`);
    }
}