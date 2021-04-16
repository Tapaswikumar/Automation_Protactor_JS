var AgentAgentQueueSelectorPage= function(){
    this.CancelSelectionBtn=$('div[class="default-footer ng-scope"]').$('button[ng-click="vm.cancel()"]')
    this.InboundQueue = function (queue) {
        var ele=element(by.cssContainingText("span[class='queue-name ng-binding']", queue)); 
        return ele;
    };
    this.ChatQueue = function (chatqueue) {
        var ele=element(by.cssContainingText("span[class='queue-name ng-binding']", chatqueue)); 
        return ele;
    };
    this.CancelSelection=function(){
        this.CancelSelectionBtn.click();
    }
}
module.exports = new AgentAgentQueueSelectorPage();
