import { Page } from "@playwright/test"

export default class MarketOrderTab {

    constructor(public page: Page) {
        this.page = page;
    }

    // locators (ограниченное число, не стану сильно параметризировать метод ставки, разумеется, при необходимости нужно описать все локаторы)
    dialogWrapper = () => this.page.getByTestId('trade-dialog'); // в целом, можно не повторять и вынести в абстракцию, но пока не имеет смысла - увеличит количество кода

    dealTypeSellButton = () => this.dialogWrapper().locator('[data-test-id="trade-side-button"]', {hasText: 'Sell'});

    dealTypeBuyButton = () => this.dialogWrapper().locator('[data-test-id="trade-side-button"]',  {hasText: 'Buy'});

    selectCurrency = () => this.dialogWrapper().getByTestId('trade-dialog-symbol-select');

    selectCurrencyPanelWrapper = () => this.page.getByTestId('trade-dialog-symbol-select-panel');

    currencyInCurrencyList = (currency: string) => this.selectCurrencyPanelWrapper().locator('[data-test-id="symbol"] [data-test-id="info-tooltip"]', {hasText: currency});

    quantityInput = () => this.dialogWrapper().getByTestId('size-select').locator('input'); // здесь мы можем взаимодействовать как с выпадающим списком, так и с инпутом. Выбрал инпут для ускорения процесса

    submitButton = () => this.dialogWrapper().getByTestId('new-position-submit-control');

    okButtonForClose = () => this.dialogWrapper().getByTestId('ok-button');

    
    async setCurrencyWithoutSearch(currency: string) { // я бы добавил разумеется отдельный метод с поисковой строкой для упрощения работы, но дополнительное время
        await this.selectCurrency().click();
        await this.currencyInCurrencyList(currency).click();
    }
}

