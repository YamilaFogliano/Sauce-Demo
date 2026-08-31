import { Page, Locator } from '@playwright/test';

export interface CartProductDetails {
  name: string;
  description: string;
  price: string;
}

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getCartProductDetails(index = 0): Promise<CartProductDetails> {
    const item = this.cartItems.nth(index);

    const [name, description, price] = await Promise.all([
      item.locator('[data-test="inventory-item-name"]').innerText(),
      item.locator('[data-test="inventory-item-desc"]').innerText(),
      item.locator('[data-test="inventory-item-price"]').innerText(),
    ]);

    return { name, description, price };
  }
}
