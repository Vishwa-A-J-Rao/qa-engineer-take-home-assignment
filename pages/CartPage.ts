import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}