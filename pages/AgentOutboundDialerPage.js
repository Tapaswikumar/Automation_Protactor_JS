var EC=protractor.ExpectedConditions;
var AgentOutboundDialerPage= function(){
     this.LeadFilterToggle=$('div[ng-click="toggleSearchFields()"]');
     this.LeadFetchHeader=$('[class="nav-title underline ng-binding"]');
     this.LeadFetchBtn=element(by.buttonText('Fetch leads'));
     this.FetchedLead=$$('button[ng-click="dial(lead)"]').first();
     this.FetchErrorMessage=element(by.cssContainingText('h4[class="fetch-msg no-margin ng-binding ng-scope"]', 'Click \'Fetch Leads\' to request leads'));
     this.FetchingLeadMessage=element(by.cssContainingText('h4[class="fetch-msg no-margin ng-binding ng-scope"]', 'Fetching leads'));
     this.DialerBtn= $('button[ng-click="toggleProgressive()"]');
     this.PipedLeadsCard=element.all(by.cssContainingText('div[ng-click="setSelected(lead)"]', 'Multiple numbers')).first();
     this.LeadInfoDialBtn=$('button[ng-click="vm.findAndDialDestination()"]');

     this.FetchLeads= function () {this.LeadFetchBtn.click()};
     this.HideSearchFilter= function () {LeadFilterToggle.click()};
     this.GetLeadFetchHeader= function () { return this.LeadFetchHeader.getText()};
     this.DialLead= function () {
          browser.wait(EC.elementToBeClickable(this.FetchedLead), 5000);
          this.FetchedLead.click();
     }
     this.ClickOnPipedLeadsCard= function () {
          browser.wait(EC.elementToBeClickable(this.PipedLeadsCard), 5000);
          this.PipedLeadsCard.click();
     }
     
     this.StartDialer= function(){
          browser.wait(EC.elementToBeClickable(this.DialerBtn), 5000); 
          this.DialerBtn.click();
     }
     this.StopDialer=function(){
          browser.sleep(1000); 
          browser.waitForAngularEnabled(false);
          this.DialerBtn.click();
          browser.waitForAngularEnabled(true);
     }
     this.DialPipedNumber=function(){this.LeadInfoDialBtn.click()};
}
module.exports = new AgentOutboundDialerPage();