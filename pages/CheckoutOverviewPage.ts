import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly generatePdfBtn: Locator;
  readonly backHomeButton: Locator;
  readonly cancelOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.generatePdfBtn = page.getByRole('button', { name: 'Generate PDF order' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.cancelOrder = page.getByRole('button', {name: 'Go back Cancel'});
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancelOrder(): Promise<void>{
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
}
