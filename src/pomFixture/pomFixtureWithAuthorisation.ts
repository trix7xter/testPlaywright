import { test as baseTest } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import AuthorizedTradePageSteps from '../steps/tradePages/authorizedTradePageSteps';
import UnauthorizedTradePageSteps from '../steps/tradePages/authorizedTradePageSteps';
import UnauthorizedTradePage from '../pageObject/pages/unauthorized/unauthorizedTradePage';
import AurhorizedTradePage from '../pageObject/pages/authorized/authorizedTradePage';

type pages = {
    unauthorizedTradePageSteps: UnauthorizedTradePageSteps;
    authorizedTradePageSteps: AuthorizedTradePageSteps;
}

// Я бы предпочел использовать авторизацию по API, но на то, чтобы разобраться с WSS (а авторизация, я так понял, тоже идет через WSS) уйдет время без доки.
// Если будет критично - переделаю авторизацию на апишную, если все остальное будет ок.
const allPages = baseTest.extend<pages, { workerStorageState: string }>({
    unauthorizedTradePageSteps: async ({ page }, use) => {
        await use(new UnauthorizedTradePageSteps(page));
    },

    authorizedTradePageSteps: async ({ page }, use) => {
        await use(new AuthorizedTradePageSteps(page));
    },

    storageState: ({ workerStorageState }, use) => use(workerStorageState),
    
    workerStorageState: [async ({ browser }, use) => {
        // Параллельный индекс для раннера
        const id = test.info().parallelIndex;
        const fileName = path.resolve(__dirname, `auth_temp/${id}.json`); // можно добавить столько пользователей, сколько максимально будет использоваться в потоках

        if (fs.existsSync(fileName)) {
            // Если контекст уже был сохранен можно использовать предыдущий контекст (после освобождения потока, что его использовал)
            await use(fileName);
            return;
        }

        const page = await browser.newPage({ storageState: undefined });
        const account = await acquireAccount(id); // получаем данные из свободного json-файла, соответствующего потоку

        // Переход на страницу, ожидание окна
        await page.goto(process.env.BASE_URL!, { timeout: 30000, waitUntil: 'load' });

        // Авторизация
        const unautrhorizedTradePage = new UnauthorizedTradePage(page); // используем напрямик класс с методами, а не с steps - степы не могут быть вызваны до теста
        await unautrhorizedTradePage.authorizeOnTradePage(account.username, account.password);
       
        await page.waitForLoadState('load');

        // Сохранение контекста страницы для тестов
        await page.context().storageState({ path: fileName });
        await page.close();
        await use(fileName);
    }, { scope: 'worker' }],
}
)

export const test = allPages;
export const expect = allPages.expect;


function acquireAccount(id: number) {
    const filePath = path.resolve(__dirname, `auth_data/dev/${id}.json`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Account file not found for id: ${id}`);
    }

    const accountData = fs.readFileSync(filePath, 'utf-8');
    const account = JSON.parse(accountData);

    return account;
}