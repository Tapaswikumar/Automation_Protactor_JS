describe('Inbound Calling Tests', function() {
	var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var httppostpage=require('../pages/HttpPostPage.js');
    var AgentQueueSelectorPage=require('../pages/AgentQueueSelectorPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var VRUMockPage=require('../pages/VRUMockPage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;
    afterAll(function() {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.close();
            browser.switchTo().window(handles[2]);
            browser.close();
            browser.switchTo().window(handles[0]);
            AgentHomePage.ClickAgentProfile();
            AgentHomePage.LogOutAgent();
        });
    });
    
    it('Agent in InboundQueue Test', function() {    
        AgentLoginPage.launch();
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.InboundQueueSelectBtn,5000));
        AgentConfigPage.OpenInboundQueueSelect();
        browser.wait(EC.visibilityOf(AgentQueueSelectorPage.InboundQueue(testdata[0].QueueName.split(/ - (.+)/)[1]),5000));
        expect(AgentQueueSelectorPage.InboundQueue(testdata[0].QueueName.split(/ - (.+)/)[1]).isPresent()).toBe(true);
    });

    it('Successful Agent login Test', function() {  
        AgentQueueSelectorPage.CancelSelection();
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,10000));
        expect(AgentHomePage.AgentStatus.isPresent()).toBe(true); 
    });

    it('Agent Offhook Test', async function(){
        AgentDialPadPage.ClickOffhookToggle();
        await VRUMockPage.offHookRequest();
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt,'Connected'),10000);
        expect(AgentDialPadPage.GetOffhookStatus()).toEqual('Connected');
    });

    it('Inbound call mocking Test',async function(){
        await VRUMockPage.inboundCallRequest();
        browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 60000);
    });

    it('External Tab Test',function(){
        browser.wait(EC.visibilityOf(AgentDialPadPage.RequiredCheck,10000));
        browser.waitForAngularEnabled(false);
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        expect(httppostpage.HTTPPostPageTitle()).toContain('Rest API Mock Server');  
        browser.waitForAngularEnabled(true);
    });

    it('WWW Node Firing Test',function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
        AgentDialPadPage.GetScriptUii().then(function (uii){
            this.scriptUii=uii.match(/\d+/g);
        });
        AgentDialPadPage.GetScriptLeadId().then(function (lead){
            this.scriptLeadId=lead.match(/\d+/g);
        });
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.ScriptResult,3000));
        expect(AgentDialPadPage.ScriptResult.isPresent()).toBe(true);
           
    });
  
    it('HTTP POST Test',function(){   
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete'); //Lead Complete  QA Inbound
        AgentDialPadPage.SubmitDisposition();   
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        browser.waitForAngularEnabled(false);
        httppostpage.ClickOnPost();
        httppostpage.GetPostedRequestValues().then(function(reqdata){
            expect(reqdata).toContain('uii='+this.scriptUii);
            expect(reqdata).toContain('leadId='+this.scriptLeadId);
        });
        browser.waitForAngularEnabled(true);   
    });  

    it('Admin Login Test', function() {
        browser.executeScript("window.open()");
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[2]);
        });
        browser.waitForAngularEnabled(false);
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        AdminLoginPage.launch();
        AdminLoginPage.EnterUserMail(testdata[0].UserMail);
        AdminLoginPage.EnterPassword(testdata[0].Password);
        browser.sleep(1000);
        AdminLoginPage.SignIn(); 
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(AdminRealTimeDashboardPage.AgentWidget,90000));
        browser.sleep(20000);
        expect(AdminHomePage.AccountName()).toEqual(testdata[0].AccountName); 
    });

// Real-Time Agent telemetry tests :
    it('Agent Telemetry Test',async function(){
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.AgentWidget);
        var Agenttelemetry=await AdminRealTimeDashboardPage.AgentTelemetry();
        for(var i=0;i<Agenttelemetry.NameColumn.length;i++){
            if(Agenttelemetry.NameColumn[i]=== testdata[0].AgentName){
                this.agentindex=i;
            }
        }
        expect(Agenttelemetry.Col_1[this.agentindex]).toEqual(testdata[0].AgentUserName);
        expect(Agenttelemetry.Col_2[this.agentindex]).toEqual("ENGAGED");
        expect(Agenttelemetry.Col_3[this.agentindex]).toEqual(testdata[0].AgentID);
        expect(Agenttelemetry.Col_4[this.agentindex]).toEqual(testdata[0].AgentCallSource);
        expect(Agenttelemetry.Col_5[this.agentindex]).toEqual(testdata[0].AgentDNIS);
    });
    
// Real-Time Inbound telemetry tests :
    it('Inbound Telemetry Test',async function(){
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.InboundWidget);
        var Inboundtelemetry=await AdminRealTimeDashboardPage.InboundTelemetry();
        for(var i=0;i<Inboundtelemetry.NameColumn.length;i++){
            if(Inboundtelemetry.NameColumn[i]=== testdata[0].QueueName){
                this.Queueindex=i;
            }
        }
        expect(Inboundtelemetry.Col_1[this.Queueindex]).toEqual('1');
    });

    it('Admin Logout Test',function(){
        AdminHomePage.ClickUserProfile();
        AdminHomePage.LogOutAdmin();
        browser.sleep(1000);
        browser.wait(ExpectedConditions.visibilityOf(AdminLoginPage.SignInBtn,1000));
        expect(AdminLoginPage.SignInBtn.isPresent()).toBe(true);
    });

    it('Call Hangup Test',async function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]); 
        });  
        AgentDialPadPage.HangUp();  
        await VRUMockPage.hangUpRequest();
    });
  
    it('off-hook term test', async function(){
        AgentDialPadPage.ClickOffhookToggle();
        await VRUMockPage.offHookTermRequest();
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt,'Disconnected'),10000);
        expect(AgentDialPadPage.GetOffhookStatus()).toEqual('Disconnected');
    });

});