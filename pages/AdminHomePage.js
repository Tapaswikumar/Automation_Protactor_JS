var AdminHomePage= function(){
    var EC=protractor.ExpectedConditions;
    this.DashBoardNameField=element(by.className('dashboard-dropdown-wrapper')).element(by.className('btn btn-default dropdown-input'));
    var DasboardLink=$('[ng-click="toggleDashboard()"]');
    this.AccountNameField=element(by.xpath("//a[contains(text(), 'Account')]"));
    this.UserProfileBtn=element(by.xpath("//button[contains(@class, 'MuiButtonBase-root MuiFab-root')]"));
    this.LogOutBtn=element(by.xpath("//li[@color='primary' and contains(text(), 'Sign out')]"));
    this.OutboundLnk=$('i[class="icon-outbounddialer "]');
    this.CampaignLnk=$("a[href='#/campaigns']");
    this.InboundLnk=$("a[href='#/queues']");

    //Generic Functions
    this.DashBoardName = function () {	return this.DashBoardNameField.getText()};
    this.ClickOnDashboard=function(){ DasboardLink.click()};
    this.AccountName= function () {	return this.AccountNameField.getText()};
    this.ClickUserProfile = function () { 
        browser.executeScript("arguments[0].scrollIntoView();", this.UserProfileBtn);
        this.UserProfileBtn.click();
    };
    this.LogOutAdmin = function () { 
        browser.wait(EC.visibilityOf(this.LogOutBtn),1000);
        this.LogOutBtn.click();
    };
    this.ClickOnAccLnk=function(){ this.AccountNameField.click()};
    this.ClickOnOutbound=function(){ this.OutboundLnk.click()};
    this.ClickOnCampaignLnk=function(){ this.CampaignLnk.click()};
    this.ClickOnInbound=function(){ this.InboundLnk.click()};
    this.SelectAccount=function(AccName){
        var SelectBtn=element(by.xpath("//td[contains(text(), '"+AccName+"')]//preceding-sibling::td//button"));
        SelectBtn.getText().then(function(btntxt){
            if(btntxt=='Select'){
                SelectBtn.click();
            }
            else{
                $('[ng-click="close($event)"]').click();
            }
        })
    }

}
module.exports = new AdminHomePage();