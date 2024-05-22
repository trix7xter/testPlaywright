import { expect, test } from "../src/pomFixture/pomFixtureWithAuthorisation";

test('Create market order test', async ({ authorizedTradePageSteps }) => {
  // шаги вынесены в степы для создания абстракции над page и assertions = при желании могу убрать абстракцию шагов, но на больших проектах, как мне кажется, best practice
  // шаги служат надобстракцией над действиями и ассертами, чтобы лишний раз не создавать assertions класс (и вообще не создавать классы в тесте, а лишь работать с фикстурой)
  await authorizedTradePageSteps.goToBasePage();
  await authorizedTradePageSteps.openPositionsTabInTable();
  const countOfPositons = await authorizedTradePageSteps.getCountOrdersInPositionsTable();
  await authorizedTradePageSteps.openCreateOrderWindow();
  await authorizedTradePageSteps.openMarketOrderTabInCreateOrderWindow();
  await authorizedTradePageSteps.createMarketOrder('BTCUSD', 1, true);
  await authorizedTradePageSteps.clickOnOkAfterCreatingOrder();
  await authorizedTradePageSteps.openPositionsTabInTable();
  // добавил проверку количества позиций в таблице до и после создания позиции
  await authorizedTradePageSteps.authorizedTradePageAssertions.checkCountInPositionsTable(countOfPositons + 1);
});
