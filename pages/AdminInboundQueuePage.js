var AdminInboundQueuePage= function(){
    this.CampaignCallBackSelect=element(by.id('campaignCallback'));
    this.CampaignMappingNone=element(by.id('campaignCallback')).$('option[value="null"]');
    this.SignInBtn=element(by.xpath("//span[contains(text(),'Sign')]"));
    this.BarsBtn=element(by.className('fa fa-bars material-icons'));
    this.ConfigSaveBtn=$('button[ng-click="vm.save()"]');

    this.ClickQueueGroupDropDown=function(Queuegroup){
        var ele=element(by.xpath("//h4[contains(text(), '"+Queuegroup+"')]//ancestor::v-pane//descendant::i[@class='fa fa-chevron-down']")); 
        ele.click();
    }
    this.ClickQueueLink=function(queue){
        var ele=element(by.linkText(queue)); 
        ele.click();
    }
    this.ClickonCampaignMappingDropDown=function(){
        this.CampaignCallBackSelect.click();
    }
    this.SelectNoCampaignMapping=function(){
        this.CampaignMappingNone.click();
    }
    this.MoveToBarsBtn=function(){
        browser.actions().mouseMove(this.BarsBtn).perform();
    }
    this.ClickOnSave=function(){
        this.ConfigSaveBtn.click();
    }
    this.GetMappedCampaign=function(){
        return this.CampaignCallBackSelect.getText();
    }


}
module.exports = new AdminInboundQueuePage();