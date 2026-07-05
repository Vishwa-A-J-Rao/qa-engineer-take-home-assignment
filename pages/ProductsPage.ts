import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByTestId('title');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.inventoryPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page
      .locator('[data-test="inventory-item"]')
      .filter({
        has: this.page.getByText(productName, { exact: true })
      })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortByLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async getDisplayedProductPrices(): Promise<number[]> {
    const prices = await this.inventoryPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', '').trim())
    );
  }

  async getFirstDisplayedProductName(): Promise<string> {
    return (
      (await this.inventoryItems
        .first()
        .getByTestId('inventory-item-name')
        .textContent()) ?? ''
    );
  }

  async addProductsToCart(productNames: string[]): Promise<void> {
    for (const product of productNames) {
        await this.addProductToCart(product);
    }
  }
}