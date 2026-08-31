import { Page, Locator } from '@playwright/test';

export interface ProductDetails {
    name: string;
    description: string;
    price: string;
}

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async addProductToCart(index = 0): Promise<ProductDetails> {
        const productoSeleccionado = this.inventoryItems.nth(index);

        const name = await productoSeleccionado.locator('.inventory_item_name').innerText();
        const description = await productoSeleccionado.locator('.inventory_item_desc').innerText();
        const price = await productoSeleccionado.locator('.inventory_item_price').innerText();

        await productoSeleccionado.getByRole('button', { name: 'Add to cart' }).click();

        return { name, description, price };
    }
}
