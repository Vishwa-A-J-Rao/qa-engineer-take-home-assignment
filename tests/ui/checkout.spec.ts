import { test, expect } from '../../fixtures/pageFixture';
import { users } from '../../test-data/users';
import { Constants } from '../../utils/constants';

test.describe('Checkout', () => {
  test('should complete the checkout flow successfully', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage
  }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);

    await productsPage.addProductToCart(Constants.products.backpack);
    await productsPage.addProductToCart(Constants.products.bikeLight);

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      Constants.checkout.firstName,
      Constants.checkout.lastName,
      Constants.checkout.postalCode
    );

    await checkoutPage.finishOrder();

    await expect(checkoutCompletePage.successMessage).toHaveText(
      Constants.successMessage
    );
  });
});