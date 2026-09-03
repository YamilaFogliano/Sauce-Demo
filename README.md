# 🚀 SauceDemo Test Automation Suite (E2E)

Framework de automatización de pruebas **End-to-End (E2E)** sobre la plataforma de comercio electrónico **SauceDemo**, desarrollado con **Playwright**, **TypeScript** y el patrón **Page Object Model (POM)**.

---

## 📌 Sobre SauceDemo

**SauceDemo** es una aplicación web diseñada para probar funcionalidades críticas de comercio electrónico como autenticación por roles, navegación, gestión de carrito y procesos de compra. Su propósito principal es simular escenarios de prueba reales y evaluar el comportamiento del sistema ante diferentes perfiles de usuario.

### Características Principales:
* **Múltiples Usuarios de Prueba:** Soporta credenciales predefinidas (`standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, etc.) para validar flujos exitosos y restricciones de acceso.
* **Simulación E2E de E-Commerce:** Permite explorar el catálogo, aplicar filtros, gestionar el carrito de compras, completar formularios de envío y procesar transacciones.
* **Descarga de Comprobantes:** Generación dinámica y comprobación de la descarga de orden de compra en formato **PDF**.
* **Entorno Controlado:** Incorpora errores intencionales (imágenes rotas, delays o fallos en botones) para practicar la detección y aserción de anomalías en UI.

---

## 🛠️ Tech Stack & Herramientas

* **Lenguaje:** TypeScript
* **Herramienta E2E:** Playwright Test
* **Patrón de Diseño:** Page Object Model (POM)
* **Reportes:** Allure Report & Playwright HTML Report
* **Gestión de Entorno:** `.env` (`dotenv`)

---

## 📌 Resumen Técnico & Buenas Prácticas

* **Page Object Model (POM):** Separación clara entre la localización/interacción con elementos (`pages/`) y la lógica de validación (`tests/`).
* **Manejo de Precisión Numérica:** Sumatoria dinámica de precios e impuestos redondeada a dos decimales con `Number((...).toFixed(2))` para evitar fallos de punto flotante en JavaScript.
* **Aserción de Descarga de Archivos:** Captura nativa de eventos del navegador con `waitForEvent('download')` para validar la emisión de comprobantes PDF.
* **Manejo de Popups & Pestañas:** Control de enlaces externos (redes sociales) utilizando `Promise.all` y `page.waitForEvent('popup')`.
* **Pruebas de Usuarios Problemáticos:** Uso de `test.fail()` e inspección de atributos de red/imágenes para certificar fallos esperados en perfiles como `problem_user`.

---

## 🧪 Cobertura de Pruebas

### 🌐 Navegación y Elementos Principales (`navigation-items.spec.ts`)
* **Menú Lateral (Side Panel):** Navegación a *All Items*, redirección a *About*, cierre de sesión (*Logout*) y reinicio de estado (*Reset App State*).
* **Filtros y Ordenamiento:** Cambio de criterios de búsqueda (A-Z, Z-A, Precio Bajo-Alto, Precio Alto-Bajo) y validación de selectores.
* **Redes Sociales:** Apertura y verificación de URLs externas en nuevas pestañas (Twitter/X, Facebook, LinkedIn).
* **Gestión de Catálogo:** Agregado y eliminación de productos desde el inventario, persistencia de estado (*Remove* / *Add to cart*) al navegar al detalle del producto.
* **Análisis de Usuarios Problemáticos (`problem_user`):** Detección de imágenes rotas o recursos erróneos (`sl-404`).

### 🛒 Ciclo de Compra End-to-End (`e2eShoppingCycle.spec.ts`)
* **Gestión del Carrito:** Selección individual y múltiple de ítems con actualización dinámica del contador (`shopping_cart_badge`).
* **Checkout (Your Information):** Relleno de formulario de envío, navegación interactiva (*Cancel* / *Continue*).
* **Checkout (Overview):** 
  * Validación de datos de pago y método de envío.
  * Cálculo dinámico del subtotal según la cantidad de productos seleccionados.
  * Sumatoria exacta de impuestos (*Tax*) y cálculo del *Total* final.
* **Checkout (Complete):** Descarga y verificación del comprobante de orden en formato PDF y retorno seguro al catálogo.

---

## 🏗️ Estructura del Proyecto

```text
SauceDemo-Project/
├── .auth/                  # Estados de autenticación guardados
├── .github/                # Workflows de CI/CD (GitHub Actions)
├── pages/                  # Page Object Models
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── FilterPanel.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── SidePanel.ts
├── tests/                  # Suites de prueba E2E
│   ├── auth.setup.ts       # Configuración inicial de autenticación
│   ├── e2eShoppingCycle.spec.ts
│   ├── login.spec.ts
│   └── navigation-items.spec.ts
├── utils/                  # Utilidades y configuración de entorno
├── .env                    # Variables de entorno locales
├── playwright.config.ts    # Configuración principal de Playwright
└── package.json