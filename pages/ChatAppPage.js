var ChatAppPage= function(){

    browser.ignoreSynchronization = true;
    this.NumberField=element(by.name("phone_number"));
    this.TextBox=$("textarea[rows='7']");
    this.BtnSend=element(by.id("btnsms"));


    this.EnterChatDNIS=function (chatDNIS){
        this.NumberField.sendKeys(chatDNIS);
    };

    this.EnterChatText=function (text){
        this.TextBox.sendKeys(text);
    };

    this.SendChat=function (){
        this.BtnSend.click();
    };

    this.LaunchApp=function(URL){
        browser.get(URL);
    }




       
    browser.ignoreSynchronization = false; 
}
module.exports = new ChatAppPage();