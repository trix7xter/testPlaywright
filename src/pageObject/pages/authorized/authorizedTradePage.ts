import { Page } from "@playwright/test"
import BasePage from "../basePage/basePage";
import CreateOrderWindow from "../../windows/tradePage/createOrderWindow";
import TopSidebarAuthorizedTradePage from "../../sidebars/tradePage/topSidebarAuthorizedTradePage";
import TradePageTable from "../../tables/tradePageTable";

export default class AurhorizedTradePage extends BasePage{
    createOrderWindow: CreateOrderWindow;
    topSidebarAuthorizedTradePage: TopSidebarAuthorizedTradePage;
    tradePageTable: TradePageTable;

    constructor(public page: Page) {
        super(page);
        this.page = page;
        this.createOrderWindow = new CreateOrderWindow(this.page);
        this.topSidebarAuthorizedTradePage = new TopSidebarAuthorizedTradePage(this.page);
        this.tradePageTable = new TradePageTable(this.page);
    }
}