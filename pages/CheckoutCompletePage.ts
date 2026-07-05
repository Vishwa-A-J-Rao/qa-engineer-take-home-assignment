import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.successMessage = page.getByTestId('complete-header');
  }
}