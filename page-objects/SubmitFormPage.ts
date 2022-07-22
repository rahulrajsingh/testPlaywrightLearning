import { expect , Page, Locator } from "@playwright/test";

export class SubmitFormPage {

    readonly page: Page;
    readonly feedbackbutton: Locator;
    readonly nameOfUserTextBox: Locator;
    readonly emailOfUserTextBox: Locator;
    readonly feedbackSubjectTextBox: Locator;
    readonly feedbackCommentTextBox: Locator;
    readonly clearAllButton: Locator;
    readonly sendFormButton: Locator;
    readonly feedbackFormSucessMsg: Locator;

   constructor(page : Page){

    this.page = page;
    this.feedbackbutton = page.locator("#feedback div");
    this.nameOfUserTextBox = page.locator("#name");
    this.emailOfUserTextBox = page.locator("#email");
    this.feedbackSubjectTextBox = page.locator("#subject");
    this.feedbackCommentTextBox = page.locator("#comment");
    this.clearAllButton = page.locator("input[Value='Clear']");
    this.sendFormButton = page.locator(".btn-primary");
    this.feedbackFormSucessMsg =page.locator("#feedback-title");

   }

   async openFeedbackForm(){
    await this.page.goto("http://zero.webappsecurity.com/index.html");
    await this.page.click("#feedback div");

   }

   async assertFeedbackPageIsOpen(){
    expect(this.page).toHaveURL("http://zero.webappsecurity.com/feedback.html");
   }

   async fillForm(name:string, usermail:string, subject: string, comment:string){

    await this.nameOfUserTextBox.type(name);
    await this.emailOfUserTextBox.type(usermail);
    await this.feedbackSubjectTextBox.type(subject);
    await this.feedbackCommentTextBox.type(comment);
   }

   async resetFormAndAssert(){
    await this.clearAllButton.click();
    await expect(this.nameOfUserTextBox).toBeEmpty();
    await expect(this.emailOfUserTextBox).toBeEmpty();
   }

   async sendForm(){
    await this.sendFormButton.click();
   }

   async assertFormIsSubmitted(){

    await expect(this.page).toHaveURL("http://zero.webappsecurity.com/sendFeedback.html");
    await expect(this.feedbackFormSucessMsg).toContainText("Feedback");

   }
   }

