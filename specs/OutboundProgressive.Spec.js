describe('Outbound Progressive dialling test', function(){
    var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
    var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentOutboundDialerPage = require('../pages/AgentOutboundDialerPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;

    afterAll(function() {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.close();
            browser.switchTo().window(handles[0]);
            
            AgentHomePage.ClickAgentProfile();
            AgentHomePage.LogOutAgent();
        });
    });

    it('Agent Login test',function(){
        AgentLoginPage.launch();
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,10000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].ProgressiveDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt, 'Connected'), 30000);
        expect(AgentDialPadPage.GetOffhookStatus()).toBe('Connected');
    });

    it('Progressive dialling test',function(){
        AgentHomePage.ClickPeopleBtn();   
        AgentOutboundDialerPage.StartDialer();
        browser.wait(EC.invisibilityOf(AgentOutboundDialerPage.FetchingLeadMessage,20000));
        AgentOutboundDialerPage.FetchedLead.isPresent().then(function(result){
            if(result){
                browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 170000); 
            }else{
                AgentOutboundDialerPage.StopDialer();
                browser.wait(EC.invisibilityOf(AgentOutboundDialerPage.FetchingLeadMessage,2000));
                AgentOutboundDialerPage.StartDialer();
                browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 170000);
            }
        });
    });

    it('Admin Login test',function(){
        browser.waitForAngularEnabled(false);
        browser.executeScript("window.open()");
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        AdminLoginPage.launch();
        AdminLoginPage.EnterUserMail(testdata[0].UserMail);
        AdminLoginPage.EnterPassword(testdata[0].Password);
        AdminLoginPage.SignIn(); 
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(AdminRealTimeDashboardPage.OutboundWidget,90000));
        browser.sleep(20000);
        expect(AdminHomePage.AccountName()).toEqual(testdata[0].AccountName); 
    });
    
// Real-Time Outbound telemetry tests :
    it('OutBound Telemetry Test',async function(){
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.OutboundWidget);
        var Outtelemetry=await AdminRealTimeDashboardPage.OutboundTelemetry();
        for(var i=0;i<Outtelemetry.NameColumn.length;i++){
            if(Outtelemetry.NameColumn[i]=== testdata[0].ProgressiveCampaign){
                this.Campaignindex=i;
            }
        }
        expect(Outtelemetry.Col_1[this.Campaignindex]).toEqual('1');
        expect(Outtelemetry.Col_2[this.Campaignindex]).toEqual('1');
    });
    
    it('Admin Logout Test',function(){
        AdminHomePage.ClickUserProfile();
        AdminHomePage.LogOutAdmin();
    });

    it('Disposition Test',function(){ 
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });
        browser.wait(EC.visibilityOf(AgentDialPadPage.RequiredCheck,4000));
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition();
        AgentDialPadPage.HangUp();
    });

    it('Second Progressive dialling test',function(){ 
        browser.wait(EC.visibilityOf(AgentDialPadPage.RequiredCheck,40000));
        browser.wait(EC.alertIsPresent(), 5000, "Leave page Alert not displayed");
        browser.switchTo().alert().dismiss();
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition();
        AgentDialPadPage.HangUp();
        AgentOutboundDialerPage.StopDialer();
    });

});