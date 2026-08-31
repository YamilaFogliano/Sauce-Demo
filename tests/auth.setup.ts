import { test as setup, expect } from '@playwright/test';
import * as path from 'node:path';
import { LoginPage } from '../pages/LoginPage';

const AUTH_STATE_PATH = path.resolve(process.cwd(), '.auth', 'admin.json');

setup('Autenticación como Standart', async ({ page }) => {
    console.log('✅ Iniciando flujo de autenticación...');

    const loginPage = new LoginPage(page);
    await loginPage.loginAsStandard();

    await page.waitForURL('**/inventory.html');
    await expect(page.locator('div.inventory_container')).toBeVisible();

    await page.waitForLoadState('networkidle');

    await page.context().storageState({ path: AUTH_STATE_PATH });

    console.log('✅ Estado de autenticación guardado correctamente.');
});
