import { test, Page } from '@playwright/test';
import UnauthorizedTradePage from '../../pageObject/pages/unauthorized/unauthorizedTradePage';

export default class UnauthorizedMainPageSteps {
    unauthorizedTradePage: UnauthorizedTradePage;

    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.unauthorizedTradePage = new UnauthorizedTradePage(page);
    }

    async authorizeOnTradePage(email: string, password: string, keepMeLoggedIn: boolean = true): Promise<void> {
        await test.step("Auth on TradeView Page", async () => {
            await this.unauthorizedTradePage.authorizeOnTradePage(email, password, keepMeLoggedIn);
        });
    }
}
