import { test, Page } from '@playwright/test';
import AuthorizedTradePage from '../../pageObject/pages/authorized/authorizedTradePage';
import AuthorizedTradePageAssertions from '../../assertions/authorizedTradePageAssertions';

export default class AuthorizedTradePageSteps {
    authorizedTradePage: AuthorizedTradePage;

    authorizedTradePageAssertions: AuthorizedTradePageAssertions;

    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.authorizedTradePage = new AuthorizedTradePage(page);
        this.authorizedTradePageAssertions = new AuthorizedTradePageAssertions(this.page, this.authorizedTradePage)
    }

    // здесь есть разные варианты на самом деле можно не пользоваться оберткой или создать базовые степы, на выбор.
    async goToBasePage() {
        await test.step("Go to base page", async () => {
            await this.authorizedTradePage.goToBasePage();
        })
    }

    async openCreateOrderWindow(): Promise<void> {
        await test.step("Open create order window", async () => {
            await this.authorizedTradePage.topSidebarAuthorizedTradePage.newOrderButton().click();
        });
    }

    async openMarketOrderTabInCreateOrderWindow(): Promise<void> {
        await test.step("Open market order tab", async () => {
            await this.authorizedTradePage.createOrderWindow.marketOrderLeftTabButton().click();
        });
    }

    // здесь можно по разному поработать с параметризацией Sell или Buy, вынести в отдельный метод, в enum, но я делаю упрощение, 
    // так как мало времени - просто тип сделки sell или нет.
    // также не стал добавлять стоплосы, тейкпрофиты и комментарии - это довольно просто реализовать при необходимости
    // в целом, можно степ разделить на меньше степов, я делаю как мне удобно.
    async createMarketOrder(currencyPair: string, volume: number, dealTypeSell: boolean): Promise<void> {
        await test.step("Create market order", async () => {
            await this.authorizedTradePage.createOrderWindow.marketOrderTab.setCurrencyWithoutSearch(currencyPair);
            await this.authorizedTradePage.createOrderWindow.marketOrderTab.quantityInput().fill(volume.toString());
            dealTypeSell === true ? await this.authorizedTradePage.createOrderWindow.marketOrderTab.dealTypeSellButton().click() : await this.authorizedTradePage.createOrderWindow.marketOrderTab.dealTypeBuyButton().click();
            await this.authorizedTradePage.createOrderWindow.marketOrderTab.submitButton().click();
        });
    }

    async clickOnOkAfterCreatingOrder(): Promise<void> {
        await test.step("Click on ok after creating order", async () => {
            await this.authorizedTradePage.createOrderWindow.marketOrderTab.okButtonForClose().click();
        })
    }

    async openPositionsTabInTable(): Promise<void> {
        await test.step("Open positions tab in table", async () => {
            await this.authorizedTradePage.tradePageTable.positionsTabButton().click();
        })
    }
}
