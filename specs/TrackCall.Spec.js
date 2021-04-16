describe('Track Call Tests', function() {
	var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentQueueSelectorPage=require('../pages/AgentQueueSelectorPage.js');
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

    it('Agent login Test', function() {  
        AgentQueueSelectorPage.CancelSelection();
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt, 'Connected'), 30000);
        expect(AgentDialPadPage.GetOffhookStatus()).toBe('Connected');
        browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 60000);
    });

    it('Track DNIS in Script Test',function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        })
        expect(AgentDialPadPage.GetScriptDNIS()).toContain(testdata[0].TrackDNIS);
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition();    
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
        AdminLoginPage.SignIn(); 
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(AdminRealTimeDashboardPage.InboundWidget,90000));
        browser.sleep(20000);
        expect(AdminHomePage.AccountName()).toEqual(testdata[0].AccountName); 
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
        expect(Inboundtelemetry.Col_3[this.Queueindex]).toEqual('1');
    });

    it('Admin Logout Test',function(){
    AdminHomePage.ClickUserProfile();
    AdminHomePage.LogOutAdmin();
    browser.getAllWindowHandles().then(function (handles) {
        browser.switchTo().window(handles[0]);
    });    
    AgentDialPadPage.HangUp();
    });
});