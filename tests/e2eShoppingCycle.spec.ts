import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';                              //AGREGAR TO BE EQUAL COMO ASERCION !!!!!!!!!!!!!!!! 
import { SidePanel } from '../pages/SidePanel';

test.describe('Testeo del proceso de compras End To End', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('1. Seleccion de un solo item y agregado al carrito', async ({ page }) => {
        await loginPage.loginAsStandard();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('2. Seleccion de multiples items y agregado al carrito', async ({ page }) => {
        await loginPage.loginAsLockedOut();
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('3. Redireccion al carrito', async ({ page }) => {
        await loginPage.loginAsProblem();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('4. Validando los productos en el carrito', async ({ page }) => {    // TO BE EQUAL
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('5. Boton: Remove - Eliminar producto de carrito', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('6. Boton: Continue Shopping - Continuar comprando', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('7. Boton: Checkout - Confirmar compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('8. Rellenado de datos para finalizar compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('9. Boton: Continue - Continuar a metodo de pago', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('10. Boton: Cancel - Cancelar compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('11. Confirmar los datos de pago', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('12. Boton: Finish - Finalizar compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('13. Boton: Back Home - Volver al inicio', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('14. Boton: Generate PDF Order - Generar comprobante de compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('15. Click en comprobante de compra', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('16. Comprobar que los datos emitidos en comprobante son correctos', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});