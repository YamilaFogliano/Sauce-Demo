import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuOption, SidePanel } from '../pages/SidePanel';
import { InventoryPage } from '../pages/InventoryPage';
import { FilterPanel, FilterOption } from '../pages/FilterPanel';

test.describe('Testeo de los elementos de la pagina principal con Standard User', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.loginAsStandard();
    });

    test('1. Validacion de elementos de menu lateral: ALL ITEMS', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();
        await expect(page).toHaveURL(/.*inventory-item.html/);

        const sidePanel = new SidePanel(page);
        await expect(page.locator('div.bm-burger-button')).toBeVisible();
        await sidePanel.clickOnOption(SideMenuOption.ALL_ITEMS)

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('2. Validacion de elementos de menu lateral: ABOUT', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await expect(page.locator('div.bm-burger-button')).toBeVisible();
        await sidePanel.clickOnOption(SideMenuOption.ABOUT)

        await expect(page).toHaveURL('https://saucelabs.com/');
    });

    test('3. Validacion de elementos de menu lateral: LOGOUT', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await expect(page.locator('div.bm-burger-button')).toBeVisible();
        await sidePanel.clickOnOption(SideMenuOption.LOGOUT)
    });

    test('4. Validacion de elementos de menu lateral: RESET APP STATE @slow', async ({ page }) => {
        test.slow();

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProductToCart(1);

        const sidePanel = new SidePanel(page);
        await expect(page.locator('div.bm-burger-button')).toBeVisible();
        await sidePanel.clickOnOption(SideMenuOption.RESET_APP_STATE)

        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('5. Validación de icono de carrito', async ({ page }) => {
        await expect(page.locator('a.shopping_cart_link')).toBeVisible()

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProductToCart(2);

        await expect(page.locator('.shopping_cart_badge')).toBeVisible()
        await page.locator('a.shopping_cart_link').click()

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    });

    test('6. Validacion de filtro desplegable', async ({ page }) => {
        const filterPanel = new FilterPanel(page);

        await filterPanel.selectFilter(FilterOption.NAME_A_Z);
        await expect(filterPanel.filterSelect).toHaveValue('az');

        await filterPanel.selectFilter(FilterOption.NAME_Z_A);
        await expect(filterPanel.filterSelect).toHaveValue('za');

        await filterPanel.selectFilter(FilterOption.PRICE_LOW_HIGH);
        await expect(filterPanel.filterSelect).toHaveValue('lohi');

        await filterPanel.selectFilter(FilterOption.PRICE_HIGH_LOW);
        await expect(filterPanel.filterSelect).toHaveValue('hilo');
    });

    test('7. Validacion de botones de Redes Sociales', async ({ page }) => {
        const [twitterPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', { name: 'Twitter' }).click(),
        ]);
        await expect(twitterPage).toHaveURL(/.*x.com\/saucelabs/);
        await twitterPage.close();

        const [facebookPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', { name: 'Facebook' }).click(),
        ]);
        await expect(facebookPage).toHaveURL(/.*facebook.com\/saucelabs/);
        await facebookPage.close();

        const [linkedInPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', { name: 'LinkedIn' }).click(),
        ]);
        await expect(linkedInPage).toHaveURL(/.*linkedin.com\/company\/sauce-labs/);
        await linkedInPage.close();
    });

    test('8. Extraccion de la informacion de los productos: Nombre, Descripcion y Precio', async ({ page }) => {
        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProductToCart(0);

        await expect(page.locator('.inventory_item').first()).toBeVisible();

        const productValue = await page.locator('.inventory_item').allInnerTexts();

        console.log(`✅ Total de productos encontrados: ${productValue.length}`);

        productValue.forEach((producto, index) => {
            console.log(`🔸 --- Producto ${index + 1} --- 🔸`);
            console.log(producto);
        });
    });

    test('9. Validación de botón: Add To Cart', async ({ page }) => {
        await expect(page.locator('.inventory_item').first()).toBeVisible();

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProduct(3);

        await expect(page.locator('.shopping_cart_badge')).toBeVisible();

    });

    test('10. Validación de botón: Remove', async ({ page }) => {
        await expect(page.locator('a.shopping_cart_link')).toBeVisible()

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProduct(4);
        await inventorytPage.removeProduct(4);

        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    });

    test('11. Click en titulo del item para visualizar producto completo', async ({ page }) => {
        await expect(page.locator('.inventory_item').first()).toBeVisible();
        await page.locator('.inventory_item_name').first().click();

        await expect(page.getByRole('button', { name: 'Go back Back to products' })).toBeVisible();

    });

    test('12. Boton: Back to products - Volver al catalogo', async ({ page }) => {
        await expect(page.locator('.inventory_item').first()).toBeVisible();
        await page.locator('.inventory_item_name').first().click()

        await expect(page.getByRole('button', { name: 'Go back Back to products' })).toBeVisible();
        await page.getByRole('button', { name: 'Go back Back to products' }).click();

        await expect(page).toHaveURL('/inventory.html')
    });

    test('13. Persistencia de estado entre catálogo y detalle de producto', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addProductToCart(0);
        await page.locator('.inventory_item_name').first().click();

        const detailButton = page.locator('.btn_inventory');
        await expect(detailButton).toHaveText('Remove');

        await detailButton.click();
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });
});

test.describe('Testeo de los elementos de la pagina principal con Problem User', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsProblem();
    });

    test('1. Verificación de carga de imagenes con problem_user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsProblem();

        const firstImageSrc = await page.locator('.inventory_item_img img').first().getAttribute('src');
        expect(firstImageSrc).toContain('sl-404');
    });

    test('2. Validar comportamiento con problem_user (se espera fallo en imágenes)', async ({ page }) => {
        test.fail(true, 'Problem_user tiene las imágenes de productos incorrectas o rotas (sl-404)');

        const loginPage = new LoginPage(page);
        await loginPage.loginAsProblem();

        const firstImageSrc = await page.locator('.inventory_item_img img').first().getAttribute('src');

        expect(firstImageSrc).not.toContain('sl-404');
    });
});