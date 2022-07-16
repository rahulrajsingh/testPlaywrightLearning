import {test , expect} from '@playwright/test'

test.describe("Login/logout flow", () =>{

    test.beforeEach( async ({page}) =>{

        await page.goto("http://zero.webappsecurity.com");
    })

    test("invalid login", async ({page}) =>{

        //testing build pipeline with each commit and this is failing right now
        await page.click("#signin_button");
        await page.type("#user_login", "invalidname");
        await page.type("#user_password", "invalidpassword");
        await page.click("input.btn-primary");
        //await page.goto("http://zero.webappsecurity.com/login.html?login_error=true");

       await expect(page).toHaveURL("http://zero.webappsecurity.com/login.html?login_error=true");
       const errorMessage = await page.locator(".alert");
         await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText("Login and/or password are wrong.");

    })

    //testing
    test("Valid Login scenario with logout", async ( {page}) => {

        const signinbutton =  await page.locator("#signin_button");
        await signinbutton.click();
        await page.type("#user_login", "username");
        await page.type("#user_password", "password");
        await page.click("input.btn-primary");
        await page.goto("http://zero.webappsecurity.com/index.html")

        await expect(page.locator("text=username")).toBeVisible();

        const logoutdrpdown = await page.locator(".caret").last();
        await logoutdrpdown.click();
        await page.click("#logout_link");
        await expect(signinbutton).toBeVisible();
        await expect(signinbutton).toBeEnabled();


    })


})
