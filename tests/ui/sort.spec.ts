import { test, expect } from '../../fixtures/pageFixture';
import { users } from '../../test-data/users';
import { Constants } from '../../utils/constants';

test.describe('Product Sorting', () => {
  test('should display the lowest priced product first when sorted low to high', async ({
    loginPage,
    productsPage
  }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);

    await productsPage.sortByLowToHigh();

    await expect(
      productsPage.inventoryItems
        .first()
        .getByTestId('inventory-item-name')
    ).toHaveText(Constants.products.onesie);
  });
});