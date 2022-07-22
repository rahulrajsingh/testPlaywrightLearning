import {test , expect} from '@playwright/test'

test.describe("currency purchase", () => {

    
    test.beforeEach(async ( {page}) => {
        
        page.goto("http://zero.webappsecurity.com/index.html");
        await page.click("#signin_button");
        await page.type("#user_login", "username");
        await page.type("#user_password", "password");
        await page.click("input.btn-primary");
        await page.goto("http://zero.webappsecurity.com/index.html");

    })

    test("currency xchange",async ( {page}) => {

        await page.click("#onlineBankingMenu");
        await expect(page).toHaveURL("http://zero.webappsecurity.com/online-banking.html");

        await page.click("#pay_bills_link");
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/pay-bills.html");

        await page.click("a[href*='tabs-3']");
        await page.selectOption("#pc_currency","AUD");
        await page.type("#pc_amount", "100");
        await page.click("#pc_inDollars_false");
        await page.click("#pc_calculate_costs");

        await page.click("#purchase_cash");

        const crncyPurchasedMsg = page.locator("#alert_content");
        await expect(crncyPurchasedMsg).toHaveText("Foreign currency cash was successfully purchased.");




    })

})