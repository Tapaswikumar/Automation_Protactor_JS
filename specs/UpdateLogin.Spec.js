describe('Update Login Tests', function(){
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;

    it('Agent login test',function(){
        AgentLoginPage.launch();
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,10000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].PreviewDialGroup);    
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,5000));
        expect(AgentHomePage.AgentStatus.isPresent()).toBe(true);
    })

    it('Update Agent Login test',function(){
        AgentHomePage.ClickAgentProfile();
        AgentHomePage.SelectSessionInfo();
        AgentHomePage.UpdateAgentLogin();
        browser.wait(EC.visibilityOf(AgentConfigPage.DialGroupList,10000));
        AgentConfigPage.GetDialGroupList(); 
        AgentConfigPage.SelectDialGroup(testdata[0].ProgressiveDialGroup);   
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.GrowlCancel,5000));
        AgentHomePage.CancelGrowlMessage();
        AgentHomePage.ClickAgentProfile();
        AgentHomePage.SelectSessionInfo();
        expect(AgentHomePage.GetAgentDialGroup()).toEqual(testdata[0].ProgressiveDialGroup);
        AgentHomePage.LogOutAgent();
    })














































})