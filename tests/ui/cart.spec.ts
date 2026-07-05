import { test, expect } from '../../fixtures/pageFixture';
import { users } from '../../test-data/users';
import { Constants } from '../../utils/constants';

test.describe('Shopping Cart', () => {
  test('should add two products to the cart and update the cart badge', async ({
    loginPage,
    productsPage
  }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);

    await productsPage.addProductsToCart([
        Constants.products.backpack,
        Constants.products.bikeLight
    ]);

    await expect(productsPage.cartBadge).toHaveText('2');
  });
});