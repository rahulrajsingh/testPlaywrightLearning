import {test , expect} from '@playwright/test'


test.describe("submit feedback form w/o login" , ()=> {


    test.beforeEach( async ({page}) =>{

        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.click("#feedback div");
    })

    test("Reset submit form", async ( {page}) => {

        
        await expect(page).toHaveURL("http://zero.webappsecurity.com/feedback.html");

        const urname = await page.locator("#name");
        await urname.type("rahul");
        await page.type("#email","rahulcyb15@gmail.com");
        await page.type("#subject", "feedback");
        await page.type("#comment", "egffgdfgdf");
        await page.click("input[Value='Clear']");

        await expect(urname).toBeEmpty();
    
    })

    test("submit form with proper details" ,async ( {page}) => {
        
        await expect(page).toHaveURL("http://zero.webappsecurity.com/feedback.html");

        const urname = page.locator("#name");
        await urname.type("rahul");
        await page.type("#email","rahulcyb15@gmail.com");
        await page.type("#subject", "feedback");
        await page.type("#comment", "this is a comment for test purpose");

        await page.click(".btn-signin");

        await expect(page).toHaveURL("http://zero.webappsecurity.com/sendFeedback.html");
        const feedbackpagename = page.locator("#feedback-title");
        await expect(feedbackpagename).toContainText("Feedback");
    })


})