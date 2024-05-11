import { Page} from "@playwright/test"


//здесь я бы сделал родительский топ сайдбар, и унаследовал authorized и unauthorized сайдбары, но нечего особо выносить в родительский класс, нет базовой обертки.
export default class TopSidebarUnauthorizedTradePage {

    constructor(public page: Page) {
        this.page = page
    }
    
    // Locators (Также было бы хорошо добавить базовую обертку-локатор для Sidebar, [data-test-id="queue-component"] не уникальная, можно использовать nth, но это крайний случай )
    loginButton = () =>  this.page.locator('[data-test-id="queue-component"] button', {hasText: 'Войти'});
    newOrderButton = () => this.page.locator('[data-test-id="queue-component"] button', {hasText: 'Новый ордер'}); // присутствует и без авторизации, и с авторизацией. В целом, можно вынести в базовый сайдбар, но пока нет здесь смысла
}