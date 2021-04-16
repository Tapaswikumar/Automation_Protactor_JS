var AgentDialPadPage= function(){
     var EC=protractor.ExpectedConditions;
     //   DialPad elements
     this.HangUpBtn=$$("button[ng-click='vm.dialOptions()']").first();
     this.OffhookToggle=element(by.model('vm.agentService.isOffhook'));
     this.OffhookFieldTxt=element(by.xpath("//span[contains(@ng-if, 'vm.agentService.offhookStatus')]"));
     this.AcceptOffHookBtn=element(by.buttonText('Go Offhook'));
     
     //Details Pane elements
     this.DetailsTab=element(by.cssContainingText('a[ng-click="cfTabs.select(tab, $index)"]','Details'));
     this.LeadInfoDialBtn=$('button[ng-click="vm.findAndDialDestination()"]');
     this.PipedLeadPhoneNumbers=$('button[ng-click="vm.dial(phone, $event)"]');
     this.DispositionSelect=element(by.model('disposition.disposition'));
     this.SubmitDispositionBtn=element(by.partialButtonText('Submit'));
     this.CancelDispositionBtn=$('button[ng-click="close()"]');
     this.SupervisorAgentlist=$('tr[ng-click="vm.selectAgent(agent)"]');
     this.SuperviseeActiveCallId=element(by.xpath("//label[@translate='AGENT_MONITOR.CALL_ID']//following-sibling::span[@class='value ng-binding']"));
     this.SupervisorStartMonitoringBtn=element(by.className("btn-monitor btn ng-binding btn-secondary"));
     this.SupervisorStopMonitoringBtn=element.all(by.className("btn-monitor btn ng-binding btn-danger")).first();
     this.SupervisorAcceptMonitoringBtn= $('button[ng-click="vm.closeSuccess()"]');

     //Chat elements
     this.EndChatBtn=$('button[class="btn btn-danger ng-scope"]');
     this.InboundMsg=$('div[class="msg-content inbound"]').$('span[class="message ng-binding"]');
     this.OutboundMsg=element(by.name('agentChatMsgForm')).element(by.model('chat.agentMessage'));
     this.SendChatBtn=element(by.name('agentChatMsgForm')).element(by.buttonText('Send'));;
     this.AcceptChatBtn=element(by.buttonText('Accept'));
     this.SendKnowledgeBaseLink=element(by.linkText('Send'));
     this.KnowledgeBaseArticle=$('[class="msg-content outbound"]').$('span[class="message ng-binding"]');
     this.SendArticleBtn=element(by.buttonText('Send now'));
     this.EndChatConfirmation=$('[ng-click="vm.closeSuccess()"]');
     this.DSPQAChat=element(by.xpath("//option[@label='QA Chat']"));

     //  Script elements
     this.RequiredCheck=$('[ng-click="toggleCheckbox(option.value)"]');   
     this.NextBtn = $('[ng-click="next()"]');
     this.ScriptUiiField =element(by.xpath("//span[contains(text(), 'model.call.uii:')]//parent::p"));
     this.ScriptLeadIdField=element(by.xpath("//span[contains(text(), 'model.lead.leadId:')]//parent::p"));
     this.ScriptQueueNameField =element(by.xpath("//span[contains(text(), 'model.call.queueName:')]//parent::p"));
     this.ScriptDNISField=element(by.xpath("//span[contains(text(), 'model.call.dnis:')]//parent::p"));
     this.ScriptSipTestUnderScores=element(by.xpath("//span[contains(text(), 'model.call.baggage.sipTestUnderscores:')]//parent::p"));
     this.ScriptSipTestCamelCase=element(by.xpath("//span[contains(text(), 'model.call.baggage.siptestcamelcase:')]//parent::p"));
     this.ScriptSipTestAllCaps=element(by.xpath("//span[contains(text(), 'model.call.baggage.siptestallcaps:')]//parent::p"));
     this.ScriptSipTestUnderscoresAndCamelCase=element(by.xpath("//span[contains(text(), 'model.call.baggage.sipTestUnderscoresAndcamelcase:')]//parent::p"));
     this.ScriptResult=element(by.xpath("//h2[contains(text(),'Script Result')]"));

     //  Dialler functions
     this.GetDispositions= function () { this.DispositionSelect.click() };
     this.SelectDisposition= function (disp) {
          var disposition=element(by.cssContainingText('div[class="ng-binding ng-scope"]', disp)); 
          disposition.click();
     };
     this.SubmitDisposition= function () {this.SubmitDispositionBtn.click()};
     this.CancelDisposition= function () {
          browser.wait(EC.visibilityOf(this.CancelDispositionBtn,3000));
          this.CancelDispositionBtn.click()};
     this.HangUp= function () {
          browser.wait(EC.elementToBeClickable(this.HangUpBtn), 2000);
          this.HangUpBtn.click();
     };
     this.ClickOffhookToggle=function(){this.OffhookToggle.click()};
     this.GetOffhookStatus=function(){return this.OffhookFieldTxt.getText()};
     this.AcceptOffHookSession=function(){
          browser.wait(EC.visibilityOf( this.AcceptOffHookBtn,3000));
          this.AcceptOffHookBtn.click()};
     this.ClickOnSupervisorTab=function(){this.SupervisorTabLnk.click()};

     //  script functions
     this.SelectRequiredCheck= function () {	this.RequiredCheck.click()};
     this.FireWWWNode= function () {this.NextBtn.click()};
     this.GetScriptUii=function(){return this.ScriptUiiField.getText()};
     this.GetScriptLeadId=function(){ return this.ScriptLeadIdField.getText()};
     this.GetScriptDNIS=function(){ return this.ScriptDNISField.getText()};
     this.GetScriptSipTestUnderScores=function(){ return this.ScriptSipTestUnderScores.getText()};
     this.GetScriptSipTestCamelCase=function(){ return this.ScriptSipTestCamelCase.getText()};
     this.GetScriptSipTestAllCaps=function(){ return this.ScriptSipTestAllCaps.getText()};
     this.GetScriptSipTestUnderscoresAndCamelCase=function(){ return this.ScriptSipTestUnderscoresAndCamelCase.getText()};

     //Piped Numbers functions
     this.GetDialedPipedNumber=function(){
          return this.PipedLeadPhoneNumbers.getText();
     };
     this.ClickOnDetailsTab=function(){this.DetailsTab.click()}
     this.DialPipedNumber=function(){this.LeadInfoDialBtn.click()};
     //Supervisor functions
    
     this.SelectSupervisedAgent=function(){this.SupervisorAgentlist.click()}
     this.GetSuperviseeActiveCallId=function(){return this.SuperviseeActiveCallId.getText()}
     this.StartMonitoring=function(){this.SupervisorStartMonitoringBtn.click()}
     this.StopMonitoring=function(){this.SupervisorStopMonitoringBtn.click()}
     this.AcceptMonitoringSession=function(){this.SupervisorAcceptMonitoringBtn.click()}

     //Chat functions:
     this.GetInboundMsg=function(){return this.InboundMsg.getText()}
     this.EndChat=function(){this.EndChatBtn.click()}
     this.SendOutboundMsg=function(text){this.OutboundMsg.sendKeys(text)}
     this.SendChat=function(){this.SendChatBtn.click()}
     this.AcceptChat=function(){this.AcceptChatBtn.click()}
     this.ClickKnowledgeBase=function(){this.SendKnowledgeBaseLink.click()}
     this.GetKnowledgeBaseArticle=function(){return this.KnowledgeBaseArticle.getText()}
     this.ClickKnowledgeBase=function(){this.SendKnowledgeBaseLink.click()}
     this.SendKnowledgeBase=function(){this.SendArticleBtn.click()}
     this.SelectQAChat= function () {this.DSPQAChat.click()};

     //Generic functions
     this.WaitForExtTab=function(windows,wait){
          var result;
          browser.wait(function(){
              browser.getAllWindowHandles().then(function(handles){
                  if(handles.length!=windows){
                      result=false;
                  }else{
                      result=true;
                  }
              })
              return result;
          },wait);
     }
}
module.exports = new AgentDialPadPage();