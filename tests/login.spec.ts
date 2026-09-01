import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Pruebas de Autenticación en SauceDemo', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('1. Login exitoso con Standard User', async ({ page }) => {
        await loginPage.loginAsStandard();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('2. Validación de usuario bloqueado con Locked Out User', async ({ page }, testInfo) => {
        await loginPage.loginAsLockedOut();
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toBeVisible();  // Validación para que permanezca en el login y aparezca el mensaje de error

        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach('Evidencia LockOut user', {
            body: screenshot,
            contentType: 'image/png',
        });
    });

    test('3. Login exitoso con Problem User', async ({ page }) => {
        await loginPage.loginAsProblem();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('4. Login exitoso con Performance Glitch User', async ({ page }) => {
        await loginPage.loginAsPerformanceGlitch();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('5. Login exitoso con Error User', async ({ page }) => {
        await loginPage.loginAsError();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('6. Login exitoso con Visual User', async ({ page }) => {
        await loginPage.loginAsVisual();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});