describe('Supervisor monitoring test',function(){
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentOutboundDialerPage = require('../pages/AgentOutboundDialerPage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;
    var ActiveCallUii;

    afterAll(function() {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            browser.close();
            browser.switchTo().window(handles[0]);
            AgentDialPadPage.HangUp();
            AgentHomePage.ClickAgentProfile();
            AgentHomePage.LogOutAgent();
        });
    });

    it('Outbound Call Test',function(){
        AgentLoginPage.launch();
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,10000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,5000));
        AgentHomePage.ClickPeopleBtn();
        browser.wait(EC.visibilityOf(AgentOutboundDialerPage.LeadFetchBtn,10000));
        AgentOutboundDialerPage.FetchLeads();
        browser.wait(EC.invisibilityOf(AgentOutboundDialerPage.FetchingLeadMessage,20000));
        AgentDialPadPage.FetchErrorMessage.isPresent().then(function(result){
            if(result){
                AgentOutboundDialerPage.FetchLeads();
                browser.wait(EC.visibilityOf(AgentOutboundDialerPage.FetchedLead,20000));
                AgentOutboundDialerPage.DialLead();
            }else{
                browser.wait(EC.visibilityOf(AgentOutboundDialerPage.FetchedLead,20000));
                AgentOutboundDialerPage.DialLead();
            }
        });
        browser.wait(EC.textToBePresentInElement(AgentHomePage.AgentStatus, 'ENGAGED'), 60000);
        expect(AgentHomePage.AgentStatus.getText()).toEqual('ENGAGED');
        AgentDialPadPage.GetScriptUii().then(function (uii){
            ActiveCallUii=uii.match(/\d+/g)[0];
        });
        AgentDialPadPage.SelectRequiredCheck();
        AgentDialPadPage.FireWWWNode();
        browser.wait(EC.visibilityOf(AgentDialPadPage.DispositionSelect,3000));
        AgentDialPadPage.GetDispositions();
        AgentDialPadPage.SelectDisposition('Lead Complete');
        AgentDialPadPage.SubmitDisposition();
    });

    it('Supervisor Login Test',function(){
        browser.executeScript("return window.open(arguments[0], '_blank')", testdata[0].AgentURL);
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
        });
        AgentLoginPage.EnterUserName(testdata[0].HCIAgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].HCIAgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,10000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
    });

    it('Call Id in Supervisor tab Test',function(){
        AgentHomePage.ClickOnSupervisorTab();
        browser.wait(EC.visibilityOf(AgentDialPadPage.SupervisorAgentlist,10000));
        AgentDialPadPage.SelectSupervisedAgent();
        browser.wait(EC.visibilityOf(AgentDialPadPage.SuperviseeActiveCallId,10000));
        expect(AgentDialPadPage.GetSuperviseeActiveCallId()).toEqual(ActiveCallUii);
    });

    it('Supervisor Monitoring Test',function(){
        AgentDialPadPage.StartMonitoring();
        AgentDialPadPage.AcceptMonitoringSession();
        browser.wait(EC.visibilityOf(AgentDialPadPage.SupervisorStopMonitoringBtn,10000));
        expect(AgentHomePage.GetAgentStatus()).toEqual('ENGAGED');
    });

    it('Supervisor Logout Test',function(){
        AgentDialPadPage.StopMonitoring();
        AgentHomePage.ClickAgentProfile();
        AgentHomePage.LogOutAgent();
    });


});