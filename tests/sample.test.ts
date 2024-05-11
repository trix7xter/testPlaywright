import { expect, test } from "../src/pomFixture/pomFixtureWithAuthorisation";

test('Create market order test', async ({ authorizedTradePageSteps }) => {
  // шаги вынесены в степы для создания абстракции над page и assertions = при желании могу убрать абстракцию шагов, но на больших проектах, как мне кажется, best practice
  // шаги служат надобстракцией над действиями и ассертами, чтобы лишний раз не создавать assertions класс (и вообще не создавать классы в тесте, а лишь работать с фикстурой)
  await authorizedTradePageSteps.goToBasePage();
  await authorizedTradePageSteps.openCreateOrderWindow();
  await authorizedTradePageSteps.openMarketOrderTabInCreateOrderWindow();
  await authorizedTradePageSteps.createMarketOrder('BTCUSD', 1, true);
  await authorizedTradePageSteps.clickOnOkAfterCreatingOrder();
  await authorizedTradePageSteps.openPositionsTabInTable();

  // здесь тест с высокой вероятностью упадет, так как там ещё одна позиция висит, я бы предложил проверить количество позиции в таблице до созднания позиции и после
  // но не стану этого делать, так как сделано для примера в соответстии с заданием. Также могу добавить много методов для работы с таблицами (показывал на собеседовании, по имени, 
  // по порядковому номеру и любому полю можно искать строку)
  await authorizedTradePageSteps.authorizedTradePageAssertions.checkCountInPositionsTable(1);
});
