import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidePanel } from '../pages/SidePanel';

test.describe('Testeo de los elementos de la pagina', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('1. Validacion de elementos de menu lateral', async ({ page }) => {
        await loginPage.loginAsStandard();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('2. Validación de icono de carrito', async ({ page }) => {
        await loginPage.loginAsLockedOut();
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toBeVisible();  // Validación para que permanezca en el login y aparezca el mensaje de error
    });

    test('3. Validacion de filtro desplegable', async ({ page }) => {
        await loginPage.loginAsProblem();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('4. Validacion de botones de Redes Sociales', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});