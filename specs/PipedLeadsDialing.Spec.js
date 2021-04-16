describe ('Outbound Preview Dialling Tests',function(){
    var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentOutboundDialerPage = require('../pages/AgentOutboundDialerPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
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
        })
    });

    it('Agent Login test',function(){
        AgentLoginPage.launch();
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,60000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PipedLeadsDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt, 'Connected'), 30000);
        expect(AgentDialPadPage.GetOffhookStatus()).toBe('Connected');
    });

    it('Piped Lead dialing test',function(){
        browser.wait(EC.textToBePresentInElement(AgentDialPadPage.OffhookFieldTxt, 'Connected'), 30000);
        AgentHomePage.ClickPeopleBtn();
        browser.wait(EC.visibilityOf(AgentOutboundDialerPage.LeadFetchBtn,10000));
        AgentOutboundDialerPage.FetchLeads();
        browser.wait(EC.invisibilityOf(AgentOutboundDialerPage.FetchingLeadMessage,20000));
        AgentOutboundDialerPage.PipedLeadsCard.isPresent().then(function(result){
            if(result){
                AgentOutboundDialerPage.ClickOnPipedLeadsCard();
                AgentOutboundDialerPage.DialPipedNumber();
            }else{
                AgentOutboundDialerPage.FetchLeads();
                browser.wait(EC.visibilityOf(AgentOutboundDialerPage.PipedLeadsCard,20000));
                AgentOutboundDialerPage.ClickOnPipedLeadsCard();
                AgentOutboundDialerPage.DialPipedNumber();
            }
        });
        browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 60000);
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.ClickOnDetailsTab();
        browser.sleep(500);
        AgentDialPadPage.GetDialedPipedNumber().then(function(num){
            this.dialledNumber=num.replace(/\s|\)|\(|\-/g,'');
            console.log(this.dialledNumber);
        });
    });

    it('Admin Login test',function(){
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
        browser.wait(EC.visibilityOf(AdminRealTimeDashboardPage.AgentWidget,90000));
        browser.sleep(5000);
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
        expect(Agenttelemetry.Col_6[this.agentindex]).toEqual(this.dialledNumber);
    });

    it('Piped Lead second number dial Test',function(){ 
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        })
        AgentDialPadPage.HangUp();
        AgentDialPadPage.CancelDisposition();
        this.nxtDialledNumber=AgentDialPadPage.GetDialedPipedNumber(1);
        AgentDialPadPage.DialPipedNumber();
        browser.wait(EC.visibilityOf(AgentDialPadPage.RequiredCheck,4000));
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition();
    });
    
    it('Second Agent Telemetry Test',async function(){
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        browser.executeScript("arguments[0].scrollIntoView();", AdminRealTimeDashboardPage.AgentWidget);
        var Agenttelemetry=await AdminRealTimeDashboardPage.AgentTelemetry();
        for(var i=0;i<Agenttelemetry.NameColumn.length;i++){
            if(Agenttelemetry.NameColumn[i]=== testdata[0].AgentName){
                this.agentindex=i;
            }
        }
        expect(Agenttelemetry.Col_6[this.agentindex]).toEqual(this.nxtDialledNumber);
    });

    it('Admin Logout Test',function(){
        AdminHomePage.ClickUserProfile();
        AdminHomePage.LogOutAdmin();
    });

});