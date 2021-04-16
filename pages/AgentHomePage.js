var AgentHomePage= function(){
  //Top Nav elements
  this.AgentStatus=$("button[class='btn available agent-state dropdown-toggle no-animate']").$("div[class='state ng-binding']");
  this.AgentProfileBtn=element(by.className("nav-btn md-icon-button md-button ng-scope md-ink-ripple agent-button"));
  this.AgentDialGroupField=element(by.xpath("//label[@translate='NAV.USER.DIAL_GROUP']//following-sibling::span[@class='ng-binding']"));
  this.SessionInfoField=element(by.xpath("//div[@class='session']//child::button"));
  this.UpdateSessionLnk=$('[ng-click="updateLogin()"]');
  this.AgentSignOutLnk= $('button[ng-click="logOut()"]').$('span[class="ng-binding ng-scope"]');
  this.UpdateSessionGrowl=element(by.cssContainingText('span[class="ng-scope"]','Login Updated'));
  this.GrowlCancel=$("button[class='close']");
  //Left Nav elements
  this.PeopleBtn=$("div[href*='#/home/phone/pr']");
  this.DialPadBtn=$("div[href='#/home/phone/dialpad']");
  this.SupervisorTabLnk=element(by.id('monitoring'));

  this.GetAgentStatus=function() {return this.AgentStatus.getText() };
  this.ClickAgentProfile= function () {this.AgentProfileBtn.click() };
  this.LogOutAgent= function () {this.AgentSignOutLnk.click()};
  this.ClickPeopleBtn= function () {this.PeopleBtn.click()};
  this.SelectAgentState=function(state){
    this.AgentStatus.click();
    this.AgentStateField=element(by.cssContainingText('a[ng-click="vm.agentService.setAgentState(state.value, state.label, state.color)"]', state));
    this.AgentStateField.click();
  }
 this.GetAgentDialGroup=function(){return this.AgentDialGroupField.getText()};
 this.SelectSessionInfo=function(){this.SessionInfoField.click()};
 this.UpdateAgentLogin=function(){this.UpdateSessionLnk.click()};
 this.CancelGrowlMessage=function(){this.GrowlCancel.click()};
 this.ClickOnSupervisorTab=function(){this.SupervisorTabLnk.click()};
}
module.exports = new AgentHomePage();