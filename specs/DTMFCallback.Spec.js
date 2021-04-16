describe('DTMF CallBack Tests', function() {
	var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var AgentQueueSelectorPage=require('../pages/AgentQueueSelectorPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
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

    it('Agent in AWAY state Test', function() {  
        AgentQueueSelectorPage.CancelSelection();
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,5000));
        AgentHomePage.SelectAgentState("Away");
        browser.sleep(50000);
    });

    it('Admin Login Test', function() {
        browser.executeScript("window.open()");
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
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

    it('Queued Call telemetry test',async function(){
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.InboundWidget);
        var Inboundtelemetry=await AdminRealTimeDashboardPage.InboundTelemetry();
        browser.refresh();
        for(var i=0;i<Inboundtelemetry.NameColumn.length;i++){
            if(Inboundtelemetry.NameColumn[i]=== testdata[0].QueueName){
                this.Queueindex=i;
            }
        }
        expect(Inboundtelemetry.Col_2[this.Queueindex]).toEqual('1');
    });

    it('Queue CallBack Test',function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
        AgentHomePage.CancelGrowlMessage();
        AgentHomePage.SelectAgentState("Available");
        AgentDialPadPage.AcceptOffHookSession();
        AgentDialPadPage.WaitForExtTab(3,60000);  //pass (number of windows,time to wait in milliseconds)
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
        browser.wait(EC.visibilityOf(AgentDialPadPage.RequiredCheck,3000));
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.presenceOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition(); 
    });
    
    it('CallBack telemetry test',async function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        })
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.InboundWidget);
        var Inboundtelemetry=await AdminRealTimeDashboardPage.InboundTelemetry();
        for(var i=0;i<Inboundtelemetry.NameColumn.length;i++){
            if(Inboundtelemetry.NameColumn[i]=== testdata[0].QueueName){
                this.callbackindex=i;
            }
        }
        expect(Inboundtelemetry.Col_1[this.callbackindex]).toEqual('1');
        expect(Inboundtelemetry.Col_2[this.callbackindex]).toEqual('0');
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