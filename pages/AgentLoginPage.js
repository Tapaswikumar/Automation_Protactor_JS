var testdata=require('../testdata.json');
browser.waitForAngularEnabled(false);
var AgentLoginPage= function(){
  this.UserNameField =element(by.name('username'));
  this.PasswordField=element(by.name('password'));
  this.SignInBtn=element(by.xpath("//button//child::span[contains(text(),'Sign in')]"));

  this.launch = function () {  
    browser.manage().deleteAllCookies(); 
    browser.get(testdata[0].AgentURL); 
  };
  this.EnterUserName = function (username) {
		this.UserNameField.sendKeys(username);
  };
  this.EnterPassword = function (password) {
		this.PasswordField.sendKeys(password);
  };
  this.SignIn = function () {	
    this.SignInBtn.click();  
  };
}
module.exports = new AgentLoginPage();