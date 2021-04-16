var AdminOutboundCampaignPage= function(){
    var EC=protractor.ExpectedConditions;
    this.LoadedListLink=element(by.linkText('Loaded Lists'));
    this.PhoneBookLink=element(by.linkText('Phone Book'));
    this.UploadListBtn=element(by.buttonText('Upload new list'));
    this.HeaderRowChkBox=element(by.xpath("//input[@ng-model='vm.upload.fileContainsHeaders']//parent::label"));
    this.ChooseFileBtn=element(by.model('files'));
    this.LeadListDescription=element(by.model('vm.upload.description'));
    this.DeDupeSelect=element(by.model('vm.upload.duplicateHandling'));
    this.RetainDuplicateField=element(by.model('vm.upload.duplicateHandling')).$("option[label='No, Retain duplicates']");
    this.LeadListNextBtn=element(by.buttonText('Next'));
    this.DNCInputBox=element(by.model('vm.upload.dncTags'));
    this.LeadListSaveBtn=$("button[ng-click='vm.save()']");
    this.CampaignSearchInput=$("input[placeholder='Search']");
    this.TemplateSelect=element(by.name('template')).element(by.className('btn btn-default form-control ui-select-toggle'));

    //Custom Lead data field elements
    this.ExtradataTest_underscores=element(by.cssContainingText("[ng-if='filePreview[selectedPage].extraMappings']", 'test_underscores'));
    this.ColHeaderTest_underscores=element(by.cssContainingText("th[ng-repeat='header in filePreview[selectedPage].rowData[0] track by $index+1']", 'test_underscores'));
    this.ExtradataTestCamelCase=element(by.cssContainingText("[ng-if='filePreview[selectedPage].extraMappings']", 'TestCamelCase'));
    this.ColHeaderTestCamelCase=element(by.cssContainingText("th[ng-repeat='header in filePreview[selectedPage].rowData[0] track by $index+1']", 'TestCamelCase'));
    this.ExtradataTESTALLCAPS=element(by.cssContainingText("[ng-if='filePreview[selectedPage].extraMappings']", 'TESTALLCAPS'));
    this.ColHeaderTESTALLCAPS=element(by.cssContainingText("th[ng-repeat='header in filePreview[selectedPage].rowData[0] track by $index+1']", 'TESTALLCAPS'));
    this.ExtradataTest_Underscores_andCamelCase=element(by.cssContainingText("[ng-if='filePreview[selectedPage].extraMappings']", 'Test_Underscores_andCamelCase'));
    this.ColHeaderTest_Underscores_andCamelCase=element(by.cssContainingText("th[ng-repeat='header in filePreview[selectedPage].rowData[0] track by $index+1']", 'Test_Underscores_andCamelCase'));
    
    this.ClickDialGroupDropDown=function(dialgroup){
        var ele=element(by.xpath("//outbound-list//descendant::tbody//descendant::span[contains(text(), '"+dialgroup+"')]")); 
        ele.click();
    }
    this.ClickCampaignLink=function(campaign){
        var ele=element(by.linkText(campaign)); 
        ele.click();
    }
    this.EnterSearchText=function(campaign){
        browser.wait(EC.visibilityOf(this.CampaignSearchInput,10000));
        this.CampaignSearchInput.clear();
        for ( i = 0; i < campaign.length; i++){
            c = campaign.charAt(i);
            browser.sleep(500);
            this.CampaignSearchInput.sendKeys(c);
        }  
    }
    this.ClickLoadedListsLink=function(){ 
        browser.wait(EC.visibilityOf(this.LoadedListLink,5000));
        this.LoadedListLink.click()};
    this.ClickPhoneBookLink=function(){ this.PhoneBookLink.click()};
    this.UploadLeadList=function(){ this.UploadListBtn.click()};
    this.SelectHeaderRow=function(){
        browser.wait(EC.elementToBeClickable(this.HeaderRowChkBox,1000));
        this.HeaderRowChkBox.click()};
    this.ChooseFile=function(){
        this.ChooseFileBtn.click();
    }
    this.SelectFile =function (file) {
        var path = require('path');
        var file_path = path.resolve(__dirname, file);
        this.ChooseFileBtn.sendKeys(file_path);
    }
    this.EnterLeadListDescription=function (desc){
        this.LeadListDescription.sendKeys(desc);
    }
    this.ClickOnDedupeList=function(){this.DeDupeSelect.click()};
    this.RetainDuplicates=function(){this.RetainDuplicateField.click()};
    this.ClickOnNext=function(){this.LeadListNextBtn.click()};
    this.ClickOnTemplateDropdown=function(){this.TemplateSelect.click()};
    this.SelectTemplate=function(template){
        var templatefield=element(by.cssContainingText("span[ng-bind-html='templ.mappingName | highlight: $select.search']", template));
        templatefield.click();
    }
    this.UploadedListDescription=function(desc){
        this.LeadDescField=element(by.xpath("//div[contains(text(), "+desc+")]"));
        return this.LeadDescField;
    }

    //Custom Lead data fields elements
    this.ClickExtraDataTest_underscores=function(){ this.ExtradataTest_underscores.click()};
    this.ClickColHeaderTest_underscores=function(){this.ColHeaderTest_underscores.click()};
    this.ClickExtraDataTestCamelCase=function(){ this.ExtradataTestCamelCase.click()};
    this.ClickColHeaderTestCamelCase=function(){this.ColHeaderTestCamelCase.click()};
    this.ClickExtraDataTESTALLCAPS=function(){ this.ExtradataTESTALLCAPS.click()};
    this.ClickColHeaderTESTALLCAPS=function(){this.ColHeaderTESTALLCAPS.click()};
    this.ClickExtraDataTest_Underscores_andCamelCase=function(){ this.ExtradataTest_Underscores_andCamelCase.click()};
    this.ClickColHeaderTest_Underscores_andCamelCase=function(){this.ColHeaderTest_Underscores_andCamelCase.click()};
    this.ClickOnSave=function(){
        browser.sleep(2000);
        this.LeadListSaveBtn.click();
    }

}
module.exports = new AdminOutboundCampaignPage();