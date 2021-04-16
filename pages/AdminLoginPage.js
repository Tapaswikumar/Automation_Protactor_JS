var testdata=require('../testdata.json');
browser.waitForAngularEnabled(false);
var AdminLoginPage= function(){
  this.EmailField =element(by.name('username'));;
  this.PasswordField=element(by.name('password'));
  this.SignInBtn=element(by.xpath("//button//child::span[contains(text(),'Sign in')]"));

  this.launch = function () {
    browser.manage().deleteAllCookies();   
    browser.get(testdata[0].AdminURL);     
  };
  this.EnterUserMail = function (username) {
    this.EmailField.sendKeys(username);
  };
  this.EnterPassword = function (password) {
    this.PasswordField.sendKeys(password);
  };
  this.SignIn = function () {	
    browser.wait(ExpectedConditions.elementToBeClickable(this.SignInBtn,3000));
    this.SignInBtn.click();       
  };
}
module.exports = new AdminLoginPage();