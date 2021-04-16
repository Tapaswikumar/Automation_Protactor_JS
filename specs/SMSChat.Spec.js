describe('SMS Chat tests',function(){

    var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var AgentHomePage = require('../pages/AgentHomePage.js');
    var AgentOutboundDialerPage = require('../pages/AgentOutboundDialerPage.js');
    var AgentLoginPage = require('../pages/AgentLoginPage.js');
	var AgentDialPadPage = require('../pages/AgentDialPadPage.js');
    var AgentConfigPage=require('../pages/AgentConfigPage.js');
    var ChatAppPage=require('../pages/ChatAppPage.js');
    var AgentQueueSelectorPage=require('../pages/AgentQueueSelectorPage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;

    afterAll(function() {
        // browser.getAllWindowHandles().then(function (handles) {
        //     browser.switchTo().window(handles[0]);
            AgentHomePage.ClickAgentProfile();
            AgentHomePage.LogOutAgent(); 
        // })
    });


    it('SMS App Test', function() {    
        browser.ignoreSynchronization = true;
        ChatAppPage.LaunchApp(testdata[0].ChatAppURL);
        ChatAppPage.EnterChatDNIS(testdata[0].ChatDNIS);
        ChatAppPage.EnterChatText("Hello");
        ChatAppPage.SendChat();
        browser.ignoreSynchronization = false;
    });   

    it('Agent in Chat Queue Test', function() { 
        
        browser.executeAsyncScript("return window.open(arguments[0], '_blank')",testdata[0].AgentURL);
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            })
        AgentLoginPage.EnterUserName(testdata[0].AgentUserName);
        AgentLoginPage.EnterPassword(testdata[0].AgentPassword);
        AgentLoginPage.SignIn();
        browser.wait(EC.visibilityOf(AgentQueueSelectorPage.ChatQueue(testdata[0].ChatQueueName),5000));
        expect(AgentQueueSelectorPage.ChatQueue(testdata[0].ChatQueueName).isPresent()).toBe(true);
        AgentConfigPage.ContinueLogin();
        browser.wait(EC.visibilityOf(AgentHomePage.AgentStatus,5000));
    });

    

    it('Incoming Chat Test',function(){
        browser.wait(EC.visibilityOf(AgentDialPadPage.AcceptChatBtn,80000));
        expect(AgentDialPadPage.AcceptChatBtn.isPresent()).toBe(true);
        AgentDialPadPage.AcceptChat();
    })

    it('Send knowledge base Test',function(){
        browser.sleep(10000);
        expect(AgentDialPadPage.GetInboundMsg()).toEqual('hello Sent Via FoxText');
        AgentDialPadPage.SendOutboundMsg("This ia agent message");
        AgentDialPadPage.SendChat();
        AgentDialPadPage.ClickKnowledgeBase();
        AgentDialPadPage.SendKnowledgeBase();
        browser.sleep(1000);
        AgentDialPadPage.GetKnowledgeBaseArticle().then(function(text){
            console.log(text);
        });
        browser.sleep(80000);
        browser.pause();
        
        
    })









































})