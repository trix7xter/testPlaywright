import AurhorizedTradePage from '../pageObject/pages/authorized/authorizedTradePage';
import { Page, expect } from '@playwright/test';


export default class AurhorizedTradePageAssertions {
    authorizedTradePage: AurhorizedTradePage;

    constructor(public page: Page, authorizedTradePage: AurhorizedTradePage) {
        this.authorizedTradePage = authorizedTradePage;
    }

    async checkCountInPositionsTable(count: number): Promise<void> {
        await expect(this.authorizedTradePage.tradePageTable.positionsTab.tableRow()).toHaveCount(count);
    }
}