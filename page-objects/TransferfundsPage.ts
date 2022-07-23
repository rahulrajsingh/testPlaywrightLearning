import { expect, Locator, Page } from "@playwright/test";

export class TransferfundsPage {

    readonly page: Page;
    readonly onlineBankingMenu: Locator;
    readonly linkTransferFunds: Locator;
    readonly selectFromAcctDropdwn: Locator;
    readonly selectToAcctDropdwn: Locator;
    readonly textTransferAmount: Locator;
    readonly textTransferDescription: Locator;
    readonly btnTransfer: Locator;
    readonly msgPaymentStart: Locator;
    readonly msgPaymentSuccess: Locator;


    constructor(page: Page){

        this.page = page;
        this.onlineBankingMenu = page.locator("#onlineBankingMenu");
        this.linkTransferFunds = page.locator("#transfer_funds_link");
        this.selectFromAcctDropdwn = page.locator("#tf_fromAccountId");
        this.selectToAcctDropdwn =page.locator("#tf_toAccountId");
        this.textTransferAmount =page.locator("#tf_amount");
        this.textTransferDescription =page.locator("#tf_description");
        this.btnTransfer =page.locator("#btn_submit");
        this.msgPaymentStart =page.locator(".board-header");
        this.msgPaymentSuccess =page.locator(".alert-success");

    }
    
    async openOnlineBanking(){
        await this.onlineBankingMenu.click();
        await this.linkTransferFunds.click();
    }
    async StartTransferFunds(fromacct: string, toacct: string, amt: string, desc:string){
        
        await this.selectFromAcctDropdwn.selectOption(fromacct);
        await this.selectToAcctDropdwn.selectOption(toacct);
        await this.textTransferAmount.type(amt);
        await this.textTransferDescription.type(desc);
        await this.btnTransfer.click();

    }

    async confirmTransferFunds(){
        await this.btnTransfer.click();
    }

    async assertUserIsOnTransferPage(){
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds.html");
    }
    async assertVerifyPaymentPage(){
        await expect(this.msgPaymentStart).toHaveText("Transfer Money & Make Payments - Verify");
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-verify.html");
    }
    async assertpaymentIsSuccessful(){
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-confirm.html");
        await expect(this.msgPaymentSuccess).toHaveText("You successfully submitted your transaction.");
        
    }
}

