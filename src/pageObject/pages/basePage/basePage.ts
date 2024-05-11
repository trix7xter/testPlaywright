import { Page } from "@playwright/test"

export default class BasePage {
    constructor(public page: Page) {
        this.page = page;
    }

    // Locators (Здесь базовые локаторы и методы вне зависимости от страницы, добавлять их пока не стану, так не знаю, что внутри проекта будет)

    async goToBasePage() {
        await this.page.goto(process.env.BASE_URL!, { timeout: 30000, waitUntil: 'load' });
    }
}