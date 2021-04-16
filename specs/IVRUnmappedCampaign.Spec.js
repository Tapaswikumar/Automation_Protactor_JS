describe('IVR with Unmapped Campaign Tests', function() {
	var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
    var inboundqueuepage=require('../pages/InboundQueuePage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentOutboundDialerPage = require('../pages/AgentOutboundDialerPage.js');
    var httppostpage=require('../pages/HttpPostPage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;
    
    afterAll(function() {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
            browser.close();
            browser.switchTo().window(handles[2]);
            browser.close();
            browser.switchTo().window(handles[1]);
            AgentHomePage.ClickAgentProfile();
            AgentHomePage.LogOutAgent(); 
        });
    });

    it('Queue Configuration Test', function() {    
        AdminLoginPage.launch();
        AdminLoginPage.EnterUserMail(testdata[0].UserMail);
        AdminLoginPage.EnterPassword(testdata[0].Password);
        AdminLoginPage.SignIn(); 
        browser.sleep(20000);
        AdminRealTimeDashboardPage.ClickConfigureMenu();
        AdminHomePage.ClickOnInbound();
        inboundqueuepage.ClickQueueGroupDropDown(testdata[0].QueueGroup);
        inboundqueuepage.ClickQueueLink(testdata[0].QueueName);
        inboundqueuepage.ClickonCampaignMappingDropDown();
        inboundqueuepage.SelectNoCampaignMapping();
        inboundqueuepage.MoveToBarsBtn();
        inboundqueuepage.ClickOnSave();
    });
    
    it('Agent in InboundQueue Test', function() {   
        browser.executeScript("return window.open(arguments[0], '_blank')",testdata[0].AgentURL); 
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.InboundQueue(testdata[0].QueueName),5000));
        expect(AgentConfigPage.InboundQueue(testdata[0].QueueName).isPresent()).toBe(true);
    });

    it('Successful Agent login Test', function() {  
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,5000));
        expect(AgentHomePage.AgentStatus.isPresent()).toBe(true); 
    });

    it('IVR Variables in script',function(){
        browser.wait(EC.presenceOf(AgentDialPadPage.RequiredCheck,10000));
        AgentDialPadPage.GetScriptSipTestUnderScores().then(function (tus){
            this.ScriptTestUnderScores=tus.split(': ')[1];
        }).then(function(){
            expect(this.ScriptTestUnderScores).toEqual('Unicorns');
        });
        AgentDialPadPage.GetScriptSipTestCamelCase().then(function (tcc){
            this.ScriptTestCamelCase=tcc.split(': ')[1];
        }).then(function(){
            expect(this.ScriptTestCamelCase).toEqual('Dragons');
        });
        AgentDialPadPage.GetScriptSipTestAllCaps().then(function (tac){
            this.ScriptTestAllCaps=tac.split(': ')[1];
        }).then(function(){
            expect(this.ScriptTestAllCaps).toEqual('Mogwai');
        });
        AgentDialPadPage.GetScriptSipTestUnderscoresAndCamelCase().then(function (tuac){
            this.ScriptTestUnderscoresAndCamelCase=tuac.split(': ')[1];
        }).then(function(){
            expect(this.ScriptTestUnderscoresAndCamelCase).toEqual('Nargles');
        });
        AgentDialPadPage.SelectRequiredCheck();
        browser.sleep(4000);
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.presenceOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('QA Inbound');
        AgentDialPadPage.SubmitDisposition();  
    });

    it('HTTP POST Test',function(){     
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[2]);
        });
        browser.ignoreSynchronization = true;
        httppostpage.ClickOnPost();
        httppostpage.GetPostedRequestValues().then(function(reqdata){
            expect(reqdata).toContain('sipTestUnderscores='+this.ScriptTestUnderScores);
            expect(reqdata).toContain('SIPTestCamelCase='+this.ScriptTestCamelCase);
            expect(reqdata).toContain('SIPTESTALLCAPS='+this.ScriptTestAllCaps);
            expect(reqdata).toContain('sipTestUnderscoresAndcamelcase='+this.ScriptTestUnderscoresAndCamelCase);
        });
        browser.ignoreSynchronization = false;   
     });  

// Real-Time IVR telemetry tests :
    it('IVR Telemetry Test',async function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
            AdminHomePage.ClickOnDashboard();
        });
        browser.sleep(2000);
        var IVRtelemetry=await AdminRealTimeDashboardPage.IVRTelemetry();
        for(var i=0;i<IVRtelemetry.NameColumn.length;i++){
            if(IVRtelemetry.NameColumn[i]=== testdata[0].IVRName){
                this.IVRindex=i;
            }
        }
        expect(IVRtelemetry.Col_2[ this.IVRindex]).toEqual('1'); 
        expect(IVRtelemetry.Col_3[ this.IVRindex]).toEqual('1');
    });
    
    it('Admin Logout Test',function(){
        AdminHomePage.ClickUserProfile();
        AdminHomePage.LogOutAdmin();
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);    
        });     
        AgentDialPadPage.HangUp();
    });

    
    
});