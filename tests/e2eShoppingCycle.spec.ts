import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Testeo del proceso de compras End To End', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('1. Seleccion de un solo item y agregado al carrito', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsStandard();

        await expect(page.locator('.inventory_item').first()).toBeVisible();

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProduct();

        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    });

    test('2. Seleccion de multiples items y agregado al carrito', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsStandard();

        await expect(page.locator('.inventory_item').first()).toBeVisible();

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addProductToCart(0);
        await inventoryPage.addProductToCart(1);
        await inventoryPage.addProductToCart(2);
        await inventoryPage.addProductToCart(3);
        await inventoryPage.addProductToCart(4);
        await inventoryPage.addProductToCart(5);

        const cantidadEsperada = '6';
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(cantidadEsperada);
    });

    test('3. Flujo completo de compra feliz (Login -> Carrito -> Checkout -> Confirmación)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsStandard();

        console.log('✅ Agregando productos al carrito')
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addProductToCart(0);
        await inventoryPage.addProductToCart(1);
        await inventoryPage.addProductToCart(2);

        const cantidadEsperada = '3';
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(cantidadEsperada);

        console.log('✅ Redireccionando al carrito')
        await page.locator('a.shopping_cart_link').click();

        console.log('✅ Validando botones en seccion de Carrito: Remove, Continue Shopping y CheckOut')
        const cartPage = new CartPage(page);
        // Validacion de boton "Remove"
        await cartPage.removeFirtsItem();
        await expect(cartPage.cartItems).toHaveCount(2);
        await expect(cartBadge).toHaveText('2');

        // Validacion de boton "Continue Shopping"
        await cartPage.clickContinueShopping();
        await expect(page).toHaveURL('/inventory.html')
        await page.goBack();

        // Validacion de boton "CheckOut"
        await cartPage.clickCheckout();
        await expect(page).toHaveURL('/checkout-step-one.html')

        console.log('✅ Validacion de seccion CheckOut(Your Information): Relleno de formulario y testeo de botones(Cancel y Continue)')
        // Relleno de datos en formulario: Nombre, Apellido, Codigo Postal
        const checkoutInfoPage = new CheckoutInfoPage(page);
        await checkoutInfoPage.fillForm('María Yamila', 'Fogliano', 'ABC1234');

        // Validacion de boton "Cancel" en Information Page
        await checkoutInfoPage.clickCancel();
        await expect(page).toHaveURL('/cart.html')
        await page.goBack();

        // Nuevo relleno de formulario y validacion de boton "Continue"
        await checkoutInfoPage.fillShoppingInfoAndContinue('María Yamila', 'Fogliano', 'ABC1234');
        await expect(page).toHaveURL('/checkout-step-two.html')

        console.log('✅ Validacion de seccion CheckOut(Overview): Comprobacion de datos y testeo de botones(Cancel y Finish)')
        // Validacion de productos en Carrito: Comprobacion de que sea la misma cantidad de items en todo el flujo.
        await expect(cartPage.cartItems).toHaveCount(2);
        await expect(cartBadge).toHaveText('2');

        // Validacion de datos del usuario: Informacion de pago, envío y precio total.
        // A. Validar Informacion de Pago y Envio.
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await expect(checkoutOverviewPage.paymentInfo).toContainText('SauceCard #31337');
        await expect(checkoutOverviewPage.shippingInfo).toContainText('Free Pony Express Delivery!');

        // B. Sumatoria y comprobacion de precios.
        const listaPreciosTextos = await checkoutOverviewPage.itemPrices.allInnerTexts();
        let sumaTotal = 0;

        for (const precioTexto of listaPreciosTextos) {
            sumaTotal += parseFloat(precioTexto.replace('$', ''));
        }

        const subtotalText = await checkoutOverviewPage.subtotalLabel.innerText();
        const subtotalPantalla = parseFloat(subtotalText.replace('Item total: $', ''));

        expect(sumaTotal).toEqual(subtotalPantalla);

        // Agregamos y calculamos el valor del impuesto al total de los productos
        const taxText = await checkoutOverviewPage.taxLabel.innerText();
        const taxPantalla = parseFloat(taxText.replace('Tax: $', ''));

        const totalText = await checkoutOverviewPage.totalLabel.innerText();
        const totalPantalla = parseFloat(totalText.replace('Total: $', ''));
        const sumaConTax = Number((sumaTotal + taxPantalla).toFixed(2));

        expect(sumaConTax).toEqual(totalPantalla);

        // Validacion de boton "Cancel" en Overview Page
        await checkoutOverviewPage.clickCancelOrder();
        await expect(page).toHaveURL('/inventory.html')
        await page.goBack();

        // Validacion de boton "Finish"
        await checkoutOverviewPage.finishOrder();
        await expect(page).toHaveURL('/checkout-complete.html');

        console.log('✅ Validacion de seccion CheckOut(Complete): Testeo de botones(Back Home y Generate  PDF Order)')
        // Validacion de boton "Generate PDF Order" y confirmacion de descarga de comprobante.
        const filename = await checkoutOverviewPage.generatePdfAndVerifyDownload();
        expect(filename).toContain('.pdf');

        // Validacion de boton " Back Home"
        await checkoutOverviewPage.clickBackHome();
        await expect(page).toHaveURL('/inventory.html')
    });
});

