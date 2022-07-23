import { expect , Page, Locator } from "@playwright/test";


export class LoginPage {

    readonly page: Page

    readonly linkSignIn: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly signInButtin: Locator;
    readonly errorMsg: Locator;
    readonly labelUserName: Locator;
    readonly logoutdrpdown: Locator;
    readonly logoutButton: Locator;


    constructor(page : Page){

        this.page = page;
        this.userName = page.locator("#user_login");
        this.linkSignIn = page.locator("#signin_button");
        this.password =page.locator("#user_password");
        this.signInButtin = page.locator("input.btn-primary");
        this.errorMsg = page.locator(".alert");
        this.labelUserName = page.locator("text=username");
        this.logoutdrpdown =  page.locator(".caret").last();
        this.logoutButton = page.locator("#logout_link");


    }

    async loginFunction(username:string , password:string){

       //await this.linkSignIn.click();
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInButtin.click();

    }

    async logOut(){
        await this.logoutdrpdown.click();
        await this.logoutButton.click();
    }

    async assertInvalidLoginMsg(){

        await expect(this.errorMsg).toContainText("Login and/or password are wrong.")
    }

    async assertErrorMsgVisible(){
        await expect(this.errorMsg).toBeVisible();
    }

    async assertValidLogin(){

        await expect(this.labelUserName).toBeVisible();
    }

  async assertValidLogout(){

    await expect(this.linkSignIn).toBeVisible();
        await expect(this.linkSignIn).toBeEnabled();
  }
}
