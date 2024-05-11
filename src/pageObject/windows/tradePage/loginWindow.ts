import { Page } from "@playwright/test"

export default class LoginWindow {

    constructor(public page: Page) {
        this.page = page;
    }

    // locators (здесь css, так как окно используется в фикстуре, в фикстуре тест-локатор не инициализируется https://github.com/microsoft/playwright/issues/14895

    loginWindowDialogWrapper = () => this.page.locator('[data-test-id="dialog"]');

    signInTab = () => this.loginWindowDialogWrapper().locator('[data-test-id="signin-tab"]');

    emailInput = () => this.loginWindowDialogWrapper().locator('[data-test-id="email"] input'); // в зависимости от пожеланий к проекту могу использовать testId, css (в topSidebar использовал css), xpath (здесь не имеет особо смысла, но в некоторых ситуациях необходимо)
   
    passwordInput = () => this.loginWindowDialogWrapper().locator('[data-test-id="password"] input'); 

    keepMeLoggedInCheckbox = () => this.loginWindowDialogWrapper().locator('[data-test-id="keep-me-logged-in"]');

    loginButton = () => this.loginWindowDialogWrapper().locator('button[type="submit"]');

}