import { Locator, Page } from "@playwright/test";
import { Environment } from "../utils/Environment";

export class LoginPage {

    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async doLogin(username: string, password: string) {

        await this.page.goto('https://www.saucedemo.com/');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsStandard() {
        await this.doLogin(Environment.STANDARD_USERNAME, Environment.SD_PASSWORD)
    }

    async loginAsLockedOut() {
        await this.doLogin(Environment.LOCKOUT_USERNAME, Environment.SD_PASSWORD)
    }

    async loginAsProblem() {
        await this.doLogin(Environment.PROBLEM_USERNAME, Environment.SD_PASSWORD)
    }

    async loginAsPerformanceGlitch() {
        await this.doLogin(Environment.PERFORMANCE_GLITCH_USERNAME, Environment.SD_PASSWORD)
    }

    async loginAsError() {
        await this.doLogin(Environment.ERROR_USERNAME, Environment.SD_PASSWORD)
    }

    async loginAsVisual() {
        await this.doLogin(Environment.VISUAL_USERNAME, Environment.SD_PASSWORD)
    }

}