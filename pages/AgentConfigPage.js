var AgentConfigPage= function(){
    this.DialGroupList=$('div[ng-model="vm.assignments.dialGroup');
    this.LaunchDialler=element(by.className('btn btn-rc-brand-primary custom-disable'));
    this.InboundQueueSelectBtn=$('div[ng-click="vm.openQueueSelect(\'INBOUND\')"]');
    this.GetDialGroupList= function () {	
        this.DialGroupList.click();        
    };
    this.SelectDialGroup = function (dialgroup) {	
        var group=element(by.cssContainingText("div[ng-bind-html='dg.dialGroupName | highlight: $select.search']", dialgroup));        
        group.click();
    };
    this.OpenInboundQueueSelect=function(){
        this.InboundQueueSelectBtn.click();
    }
    this.ContinueLogin=function(){
        this.LaunchDialler.click();
    }
    
}
module.exports = new AgentConfigPage();

