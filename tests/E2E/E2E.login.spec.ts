import {test , expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage';
import {HomePage} from '../../page-objects/HomePage';
 const loginTestData = JSON.parse(JSON.stringify(require('../../testData/loginTestData.json')));

test.describe("Login/logout flow", () =>{

    let loginpage: LoginPage;
    let homepage: HomePage;

    test.beforeEach( async ({page}) =>{

        homepage = new HomePage(page);
        loginpage = new LoginPage(page);
        await homepage.landOnHomePage();
    })

    test("invalid login", async ({page}) =>{

        await homepage.selectSignInOption();
        await loginpage.loginFunction(loginTestData.wronguname,loginTestData.wrongpass);
       await loginpage.assertErrorMsgVisible();
        await loginpage.assertInvalidLoginMsg();

    })
    test("Valid Login scenario with logout", async ( {page}) => {

        await homepage.selectSignInOption();
         await loginpage.loginFunction(loginTestData.username,loginTestData.password);
        await page.goto(loginTestData.loginurl);
         await loginpage.assertValidLogin();
         await loginpage.logOut();
         await loginpage.assertValidLogout();
    })
})
