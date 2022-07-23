import {test} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage';
import { TransferfundsPage } from '../../page-objects/TransferfundsPage';
import {HomePage} from '../../page-objects/HomePage';


test.describe("transfer funds and make payment" , () => {

    let transferfundspage : TransferfundsPage;
    let loginpage: LoginPage;
    let homepage: HomePage;

    test.beforeEach(async ( {page}) => {

        transferfundspage = new TransferfundsPage(page);
        loginpage = new LoginPage(page);
        homepage = new HomePage(page);

        await homepage.landOnHomePage();
        await homepage.selectSignInOption();
        await loginpage.loginFunction("username","password");
        await homepage.landOnHomePage();

    })

    test("transfer funds",async ({page}) => {
       
        await transferfundspage.openOnlineBanking();
        await transferfundspage.assertUserIsOnTransferPage();
        await transferfundspage.StartTransferFunds("2","3","100","testtransfer");
        await transferfundspage.assertVerifyPaymentPage();
        await transferfundspage.confirmTransferFunds();
        await transferfundspage.assertpaymentIsSuccessful();

    })


})