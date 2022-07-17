import {test , expect} from '@playwright/test'

test.describe("transfer funds and make payment" , () => {

    test.beforeEach(async ( {page}) => {
        
        page.goto("http://zero.webappsecurity.com/index.html");
        await page.click("#signin_button");
        await page.type("#user_login", "username");
        await page.type("#user_password", "password");
        await page.click("input.btn-primary");
        await page.goto("http://zero.webappsecurity.com/index.html");

    })

    test("transfer funds",async ({page}) => {
        
        await page.click("#onlineBankingMenu");
        await expect(page).toHaveURL("http://zero.webappsecurity.com/online-banking.html");

        await page.click("#transfer_funds_link");
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds.html");

        await page.selectOption("#tf_fromAccountId" ,'2');
        await page.selectOption("#tf_toAccountId",'3');

        await page.type("#tf_amount", "100");
        await page.type("#tf_description","trasfering funds");
        await page.click("#btn_submit");

        const paymentmsg = await page.locator(".board-header");
        await expect(paymentmsg).toHaveText("Transfer Money & Make Payments - Verify")

        await page.click("#btn_submit");
        const paymentSuccessMessage = await page.locator(".alert-success");
        await expect(paymentSuccessMessage).toHaveText("You successfully submitted your transaction.");
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-confirm.html");




    })


})