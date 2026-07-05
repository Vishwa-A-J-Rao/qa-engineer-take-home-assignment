import { expect } from '@playwright/test';
import { test } from '../../fixtures/pageFixture';
import { users } from '../../test-data/users';
import { Constants } from '../../utils/constants';

test.describe('Login', () => {
  test('should allow a standard user to login successfully', async ({
    page,
    loginPage,
    productsPage
  }) => {
    await loginPage.navigate();

    await loginPage.loginAs(users.standard);

    await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
    await expect(productsPage.pageTitle).toHaveText(
      Constants.pageTitles.products
    );
  });

  test('should display an error for a locked out user', async ({
    page,
    loginPage
  }) => {
    await loginPage.navigate();

    await loginPage.loginAs(users.locked);

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toHaveText(
      Constants.lockedUserError
    );
  });
});