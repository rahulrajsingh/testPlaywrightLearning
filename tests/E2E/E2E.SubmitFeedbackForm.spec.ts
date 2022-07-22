import {test , expect} from '@playwright/test'
import { SubmitFormPage } from '../../page-objects/SubmitFormPage';


test.describe("submit feedback form w/o login" , ()=> {

    let submitformpage: SubmitFormPage;

    test.beforeEach( async ({page}) =>{

        submitformpage = new SubmitFormPage(page);
        submitformpage.openFeedbackForm();
    })

    test("Reset submit form", async ( {page}) => {

        await submitformpage.assertFeedbackPageIsOpen();
        await submitformpage.fillForm("rahul","rahuls@anything.com","testsubject","testcommet");
        await submitformpage.resetFormAndAssert();
    
    })

    test("submit form with proper details" ,async ( {page}) => {
        
        await submitformpage.assertFeedbackPageIsOpen();
        await submitformpage.fillForm("rahul","rahulcyb15@anything.com","testsubject","testcommet");
        await submitformpage.sendForm();
        await submitformpage.assertFormIsSubmitted();
    })


})