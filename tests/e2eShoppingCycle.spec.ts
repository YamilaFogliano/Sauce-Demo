import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';                              //AGREGAR TO BE EQUAL COMO ASERCION !!!!!!!!!!!!!!!! 
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Testeo del proceso de compras End To End', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('1. Seleccion de un solo item y agregado al carrito', async ({ page }) => { //listo
        const loginPage = new LoginPage(page);
        await loginPage.loginAsStandard();

        await expect(page.locator('.inventory_item').first()).toBeVisible();

        const inventorytPage = new InventoryPage(page);
        await inventorytPage.addProduct();

        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    });

    test('2. Seleccion de multiples items y agregado al carrito', async ({ page }) => { //listo
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


        // Validacion de boton "Cancel" en Overview Page
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.clickCancelOrder();
        await expect(page).toHaveURL('/inventory.html')
        await page.goBack();

        // Validacion de boton "Finish"
        await checkoutOverviewPage.finishOrder();
        await expect(page).toHaveURL('/checkout-complete.html');

        console.log('✅ Validacion de seccion CheckOut(Complete): Testeo de botones(Back Home y Generate  PDF Order)')

        // Validacion de mensaje de finalizacion de compra.
        // Validacion de boton " Back Home"
        // Validacion de boton "Generate PDF Order"

    });

    /*         test('7. Captura de montos totales en tabla @slow', async ({ page }) => {
            test.slow();
            await page.goto('/web/index.php/claim/viewAssignClaim');
    
            const table = page.getByRole('table');
            await expect(table).toBeVisible();
    
            const amountCells = table.getByRole('rowgroup').nth(1).locator('div[role="cell"]:nth-child(8), td:nth-child(8)');
    
            await expect(amountCells.first()).toBeVisible();
    
            const rawTexts = await amountCells.allTextContents();
    
            const amounts = rawTexts
                .map(text => parseFloat(text.replace(/,/g, '').trim()))
                .filter(num => !isNaN(num));
    
            const total = amounts.reduce((acc, curr) => acc + curr, 0);
    
            console.log('Cantidades:', amounts);
            console.log('El total es:', total);
        }); */


    test('10. Confirmar los datos de pago', async ({ page }) => {

    });

    test('12. Boton: Back Home - Volver al inicio', async ({ page }) => {

    });

    test('13. Boton: Generate PDF Order - Generar comprobante de compra', async ({ page }) => {
    });

    test('14. Click en comprobante de compra', async ({ page }) => {

    });

    test('15. Comprobar que los datos emitidos en comprobante son correctos', async ({ page }) => {

    });

});

/*     

test("Test extracc y mod como Postman", async ({ page }) => {

    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `

            {
                "books": [
                    {
                        "isbn": "9781449325862",
                        "title": "El libro de María Yamila",
                        "subTitle": "A Working Introduction",
                        "author": "Richard E. Silverman y Yamila",
                        "publish_date": "2020-06-04T08:48:39.000Z",
                        "publisher": "O'Reilly Media y Yamila",
                        "pages": 550,
                        "description": "Prueba de APIs extracción de info y modificacion de registros como en postman",
                        "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                    }
                ]
            }
            `
            })
        }
    );
*/