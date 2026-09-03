import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly generatePdfBtn: Locator;
  readonly backHomeButton: Locator;
  readonly cancelOrder: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.generatePdfBtn = page.getByRole('button', { name: 'Generate PDF order' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.cancelOrder = page.getByRole('button', { name: 'Go back Cancel' });
    this.paymentInfo = page.locator('.summary_value_label').first();
    this.shippingInfo = page.locator('.summary_value_label').nth(1);
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancelOrder(): Promise<void> {
    await this.cancelOrder.click();
  }

  async clickGeneratePdf(): Promise<void> {
    await this.generatePdfBtn.click();
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  async generatePdfAndReturnHome(): Promise<void> {
    await this.clickGeneratePdf();
    await this.clickBackHome();
  }

  async generatePdfAndVerifyDownload(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.clickGeneratePdf();
    const download = await downloadPromise;
    return download.suggestedFilename();
  }
}
