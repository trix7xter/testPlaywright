import { Page } from "@playwright/test"

export default class PositionsTab {

    constructor(public page: Page) {
        this.page = page;
    }

    // locators (ограниченное число, не стану сильно параметризировать метод ставки, разумеется, при необходимости нужно описать все локаторы)
    tableWrapper = () => this.page.getByTestId('table-context');

    tableRow = () => this.tableWrapper().getByTestId('table-row');

}

