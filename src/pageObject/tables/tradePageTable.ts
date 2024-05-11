import { Page } from "@playwright/test"
import PositionsTab from "../tabs/tradePageTable/positionsTab";

export default class TradePageTable {
    
    positionsTab: PositionsTab;

    constructor(public page: Page) {
        this.page = page;
        this.positionsTab = new PositionsTab(this.page);
    }

    // locators
    positionsTabButton = () => this.page.locator('[data-test-id="positions-tab"]');

    ordersTabButton = () => this.page.locator('[data-test-id="orders-tab"]');

    historyTabButton = () => this.page.locator('[data-test-id="history-tab"]');

    priceAlertsTabButton = () => this.page.locator('[data-test-id="price-alerts-tab"]');

    transactionsTabButton = () => this.page.locator('[data-test-id="transactions-tab"]');


}