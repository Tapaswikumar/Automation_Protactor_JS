describe ("Leads List upload Tests", function(){
    var AdminLoginPage = require('../pages/AdminLoginPage.js');
    var AdminRealTimeDashboardPage= require('../pages/AdminRealTimeDashboardPage.js');
    var AdminOutboundCampaignPage=require('../pages/AdminOutboundCampaignPage.js');
    var AdminHomePage = require('../pages/AdminHomePage.js');
    var testdata=require('../testdata.json');
    var EC=protractor.ExpectedConditions;

    it("Admin Login test",function(){
        browser.waitForAngularEnabled(false);
        AdminLoginPage.launch();
        AdminLoginPage.EnterUserMail(testdata[0].UserMail);
        AdminLoginPage.EnterPassword(testdata[0].Password);
        AdminLoginPage.SignIn(); 
        browser.waitForAngular();
        browser.wait(EC.visibilityOf(AdminRealTimeDashboardPage.OutboundWidget,90000));
        expect(AdminHomePage.AccountName()).toEqual(testdata[0].AccountName); 
    });

    it("Lead List upload test" ,function(){
        browser.waitForAngularEnabled(true);
        AdminHomePage.ClickOnAccLnk();
        AdminHomePage.SelectAccount(testdata[0].AccountName);
        AdminHomePage.ClickOnOutbound();
        browser.wait(EC.visibilityOf(AdminHomePage.CampaignLnk,2000));
        AdminHomePage.ClickOnCampaignLnk();
        AdminOutboundCampaignPage.EnterSearchText(testdata[0].LeadUploadCampaign);
        AdminOutboundCampaignPage.ClickDialGroupDropDown(testdata[0].LeadUploadDialGroup);
        AdminOutboundCampaignPage.ClickCampaignLink(testdata[0].LeadUploadCampaign);
        AdminOutboundCampaignPage.ClickLoadedListsLink();
        AdminOutboundCampaignPage.UploadLeadList();
        AdminOutboundCampaignPage.SelectHeaderRow();
        AdminOutboundCampaignPage.SelectFile(testdata[0].LeadListPath);
        var day=new Date();
        this.time=day.getTime();
        AdminOutboundCampaignPage.EnterLeadListDescription(this.time);
        AdminOutboundCampaignPage.RetainDuplicates();
        expect(AdminOutboundCampaignPage.LeadListNextBtn.isEnabled()).toBe(true);
        AdminOutboundCampaignPage.ClickOnNext();
        browser.wait(EC.visibilityOf(AdminOutboundCampaignPage.DNCInputBox,10000));
        AdminOutboundCampaignPage.ClickOnNext();
    });

    it('Custom Lead data field Mapping Test',function(){
        AdminOutboundCampaignPage.ClickOnTemplateDropdown();
        AdminOutboundCampaignPage.SelectTemplate(testdata[0].ExtraDataTemplate);
        AdminOutboundCampaignPage.ClickExtraDataTest_underscores();
        AdminOutboundCampaignPage.ClickColHeaderTest_underscores();
        AdminOutboundCampaignPage.ClickExtraDataTestCamelCase();
        AdminOutboundCampaignPage.ClickColHeaderTestCamelCase();
        AdminOutboundCampaignPage.ClickExtraDataTESTALLCAPS();
        AdminOutboundCampaignPage.ClickColHeaderTESTALLCAPS();
        AdminOutboundCampaignPage.ClickExtraDataTest_Underscores_andCamelCase();
        AdminOutboundCampaignPage.ClickColHeaderTest_Underscores_andCamelCase();
        AdminOutboundCampaignPage.ClickOnSave();
    });

    it('Successful Lead List upload Test',function(){
        AdminOutboundCampaignPage.ClickPhoneBookLink();
        browser.sleep(10000);
        AdminOutboundCampaignPage.ClickLoadedListsLink();
        expect(AdminOutboundCampaignPage.UploadedListDescription(this.time).isPresent()).toBe(true); 
    });

    it('Admin Logout Test',function(){
        AdminHomePage.ClickUserProfile();
        AdminHomePage.LogOutAdmin();
    });

});