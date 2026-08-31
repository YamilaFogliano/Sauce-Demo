import { Locator, Page } from '@playwright/test';

export enum FilterOption {
    NAME_A_Z = 'Name (A to Z)',
    NAME_Z_A = 'Name (Z to A)',
    PRICE_LOW_HIGH = 'Price (low to high)',
    PRICE_HIGH_LOW = 'Price (high to low)',
}

export class FilterPanel {
    readonly page: Page;
    readonly filterSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterSelect = page.locator('[data-test="product-sort-container"]');
    }

    async selectFilter(option: FilterOption): Promise<void> {
        await this.filterSelect.selectOption({ label: option });
    }
}


/* const filterComponent = new FilterComponent(page);
await filterComponent.selectFilter(FilterOption.PRICE_LOW_HIGH); */