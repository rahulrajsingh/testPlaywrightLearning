import { expect , Page, Locator } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly linkSignIn: Locator;

    constructor(page: Page){
        this.page = page;
        this.linkSignIn = page.locator("#signin_button");
    }

    async landOnHomePage(){
        await this.page.goto("http://zero.webappsecurity.com");
    }

    async selectSignInOption(){
        await this.linkSignIn.click();
    }
}