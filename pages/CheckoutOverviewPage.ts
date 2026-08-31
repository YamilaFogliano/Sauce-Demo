import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly generatePdfBtn: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.generatePdfBtn = page.getByRole('button', { name: 'Generate PDF order' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
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
