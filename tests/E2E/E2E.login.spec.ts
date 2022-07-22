import {test , expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage';

test.describe("Login/logout flow", () =>{

    let loginpage: LoginPage;

    test.beforeEach( async ({page}) =>{

        loginpage = new LoginPage(page);
        await loginpage.landOnHomePage();
    })

    test("invalid login", async ({page}) =>{

        await loginpage.selectSignInOption();
        await loginpage.loginFunction("invalidname","wroingpassword");
       await loginpage.assertErrorMsgVisible();
        await loginpage.assertInvalidLoginMsg();

    })
    test("Valid Login scenario with logout", async ( {page}) => {

        await loginpage.selectSignInOption();
         await loginpage.loginFunction("username","password");
         await page.goto("http://zero.webappsecurity.com/index.html");
         await loginpage.assertValidLogin();
         await loginpage.logOut();
         await loginpage.assertValidLogout();

    })


})
