import { Page } from "@playwright/test"
import BasePage from "../basePage/basePage";
import TopSidebarUnauthorizedTradePage from "../../sidebars/tradePage/topSidebarUnauthorizedTradePage";
import LoginWindow from "../../windows/tradePage/loginWindow";

export default class UnauthorizedTradePage extends BasePage{
    topSidebarUnathorizedTradePage: TopSidebarUnauthorizedTradePage;
    loginWindow: LoginWindow;

    constructor(public page: Page) {
        super(page);
        this.page = page;
        this.topSidebarUnathorizedTradePage = new TopSidebarUnauthorizedTradePage(this.page);
        this.loginWindow = new LoginWindow(this.page);
    }

    async authorizeOnTradePage(email: string, password: string, keepMeLoggedIn: boolean = true) {
        await this.topSidebarUnathorizedTradePage.loginButton().click();
        await this.loginWindow.signInTab().click();
        await this.loginWindow.emailInput().fill(email);
        await this.loginWindow.passwordInput().fill(password);
        if (!keepMeLoggedIn) {
            await this.loginWindow.keepMeLoggedInCheckbox().uncheck();
        }
        await this.loginWindow.loginButton().click();
    }
}