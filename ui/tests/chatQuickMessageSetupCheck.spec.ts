import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/loginPage';
import { ChatPage } from '../common/pages/chatPage';
import { SettingPage } from '../common/pages/settingPage';
import {Url} from '../common/constants/url';
import {USER_EXPERT} from "../common/constants/user";


test('Chat Quick Message Setup Check', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const chatPage = new ChatPage(page);
  const settingPage = new SettingPage(page);
  let numberOfScripts;
  const QuickScript = 'Test Group'

  await test.step("Go to Login page and Log In", async () => {
      await loginPage.goto(Url.ExpertLogin);
      await loginPage.loginSubmitButton.waitFor({state: "visible", timeout: 15000});
      await expect(loginPage.loginPasswordField).toBeVisible();
      await expect(loginPage.loginSubmitButton).toBeVisible();

      await loginPage.loginEmailField.fill(USER_EXPERT.email);
      await loginPage.loginPasswordField.fill(USER_EXPERT.password);
      await loginPage.loginSubmitButton.click();

      await page.waitForURL(Url.ChatPage);
      await expect(chatPage.chatListSection).toBeVisible();

      //.first() because number of items can be more than 1, in the next steps we will use this first item
      await chatPage.chatListItem.first().waitFor({state: "visible", timeout: 15000});
      await expect(chatPage.headerSection).toBeVisible();
  });

    //I want to add this step to keep track of how many Test Group scripts have already been in the chat.
    await test.step("Check Quick message scripts in first item", async () => {
        await chatPage.chatListItem.first().click();
        await expect(chatPage.chatContainer).toBeVisible();
        await expect(chatPage.chatHeader).toBeVisible();
        await expect(chatPage.chatMessageSection).toBeVisible();
        await expect(chatPage.chatMessageField).toBeVisible();
        await expect(chatPage.chatQuickMessageContainer).toBeVisible();

        numberOfScripts = await chatPage.chatQuickMessageItem(QuickScript).elementHandles();
        numberOfScripts = numberOfScripts.length;
    });

    await test.step("Go to User Settings", async () => {
        await chatPage.headerSettingDropdown.click();
        await chatPage.headerSettingButton.waitFor({state: "visible", timeout: 15000});
        await chatPage.headerSettingButton.click();

        await page.waitForURL(Url.SettingQuickMessage);
        await settingPage.scriptGroupsSection.waitFor({state: "visible", timeout: 15000});
        await expect(settingPage.scriptGroupsItem.first()).toBeVisible();
        await expect(settingPage.scriptGroupsAddGroupButton).toBeVisible();
        await expect(settingPage.scriptGroupsCustomizeButton).toBeVisible();

        await expect(settingPage.newGroupTitleField).not.toBeVisible(); //check that new group section is not displayed
    });

    await test.step("Add new Script Group", async () => {
        await settingPage.scriptGroupsAddGroupButton.click();
        await settingPage.newGroupTitleField.waitFor({state: "visible", timeout: 15000});
        await expect(settingPage.newGroupScriptField).toBeVisible();
        await expect(settingPage.requiredFieldErrorMessage).toBeVisible();
        await expect(settingPage.newGroupSaveButton).toBeVisible();

        await settingPage.newGroupTitleField.fill(QuickScript);
        await settingPage.newGroupScriptField.fill('test script');

        await expect(settingPage.requiredFieldErrorMessage).not.toBeVisible();
        await settingPage.newGroupSaveButton.click();
        await settingPage.newGroupScriptField.waitFor({state: "hidden", timeout: 15000});
    });

    await test.step("Go to Chat page and check that script is displayed correctly", async () => {
        await settingPage.headerHamburgerMenuButton.click();
        await settingPage.headerHamburgerMenuChatButton.waitFor({state: "visible", timeout: 15000});
        await settingPage.headerHamburgerMenuChatButton.click();

        await page.waitForURL(Url.ChatPage);
        await chatPage.chatListItem.first().waitFor({state: "visible", timeout: 15000});

        await chatPage.chatListItem.first().click();

        let numberOfScriptsAfter:any = await chatPage.chatQuickMessageItem(QuickScript).elementHandles();
        numberOfScriptsAfter = numberOfScriptsAfter.length;
        await expect(numberOfScripts+1).toEqual(numberOfScriptsAfter);
    });

});

