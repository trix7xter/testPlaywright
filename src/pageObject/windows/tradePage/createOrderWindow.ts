import { Page } from "@playwright/test"
import MarketOrderTab from "../../tabs/createOrderWindow/marketOrderTab";

export default class CreateOrderWindow {
    marketOrderTab: MarketOrderTab;

    constructor(public page: Page) {
        this.page = page;
        this.marketOrderTab = new MarketOrderTab(this.page);
    }

    // locators
    dialogWrapper = () => this.page.getByTestId('trade-dialog');

    marketOrderLeftTabButton = () => this.dialogWrapper().getByTestId('market-order');

    limitOrderLeftTabButton = () => this.dialogWrapper().getByTestId('limit-order');

    stopOrderLeftTabButton = () => this.dialogWrapper().getByTestId('stop-order');

    stopLimitOrderLeftTabButton = () => this.dialogWrapper().getByTestId('stop-limit-order');
}