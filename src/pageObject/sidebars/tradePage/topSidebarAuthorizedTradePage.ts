import { Page} from "@playwright/test"


//здесь я бы сделал родительский топ сайдбар, и унаследовал authorized и unauthorized сайдбары, но нечего особо выносить в родительский класс, нет базовой обертки.
export default class TopSidebarAuthorizedTradePage {

    constructor(public page: Page) {
        this.page = page
    }
    
    sidebarWrapper = () => this.page.locator('[data-test-id="active-chart-toolbar"]');
    // Locators (Также было бы хорошо добавить базовую обертку-локатор для Sidebar, [data-test-id="queue-component"] не уникальная, можно использовать nth, но это крайний случай )
    newOrderButton = () => this.sidebarWrapper().locator('button', {hasText: 'New Order'});
}