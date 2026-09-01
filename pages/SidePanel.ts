import { Locator, Page } from '@playwright/test';


export enum SideMenuOption {
    ALL_ITEMS = 'All Items',
    ABOUT = 'About',
    LOGOUT = 'Logout',
    RESET_APP_STATE = 'Reset App State',
}

export class SidePanel {
    readonly page: Page;
    readonly menuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    }

    private menuOption(option: SideMenuOption): Locator {
        return this.page.getByRole('link', { name: option });
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async clickOnOption(option: SideMenuOption): Promise<void> {
        await this.openMenu();
        await this.menuOption(option).click();
    }
}
