var AdminRealTimeAdminRealTimeDashboardPage= function(){
    var EC=protractor.ExpectedConditions;
    
    //Real-Time Agent variables
    this.AgentWidget=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]"));
    var AgentList=element.all(by.xpath("//a[@ng-click='grid.appScope.openCallDetails(row.entity)']"));
    var AgentColUsername=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Username')]"));
    var AgentColState=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'State')and not(contains(text(),'Chat'))]"));
    var AgentColAgentId=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Agent Id')]"));
    var AgentColCallSource=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Call Source')]"));
    var AgentColDNIS=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'DNIS')]"));
    var AgentColANI=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'ANI')]"));
    var Agentdiv=element(by.xpath("//span[contains(text(), 'Real-Time Agent')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport'][3]"));
    
    //Real-Time Inbound variables
    this.InboundWidget=element(by.xpath("//span[contains(text(), 'Real-Time Inbound')]"));
    var InboundQueueList=element.all(by.xpath("//span[contains(text(), 'Real-Time Inbound')]//ancestor::div[@class='wg-widget-content']//descendant::a[@ng-click='grid.appScope.showActiveCallsDialog(row.entity)']"));
    var InboundColLiveCalls=element(by.xpath("//span[contains(text(), 'Real-Time Inbound')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Live')]"));
    var InboundColQueuedCalls=element(by.xpath("//span[contains(text(), 'Real-Time Inbound')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Queued')]"));
    var InboundColStaffedCalls=element(by.xpath("//span[contains(text(), 'Real-Time Inbound')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Staffed')]"));
    var Inbounddiv = element(by.xpath("//span[contains(text(), 'Real-Time Inbound')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport'][2]"));

    //Real-Time Outbound variables
    this.OutboundWidget=element(by.xpath("//span[contains(text(), 'Real-Time Outbound')]"));
    var OutboundCampaignList=element.all(by.xpath("//span[contains(text(), 'Real-Time Outbound')]//ancestor::div[@class='wg-widget-content']//descendant::a[@ng-click='grid.appScope.showActiveCallsDialog(row.entity)']"));
    var Outbounddiv=element(by.xpath("//span[contains(text(), 'Real-Time Outbound')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport']"));
    var OutboundColActiveCalls=element(by.xpath("//span[contains(text(), 'Real-Time Outbound')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Active')]"));
    var OutboundColStaffed=element(by.xpath("//span[contains(text(), 'Real-Time Outbound')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Staffed')]"));

    // Real-Time Cloud Profile
    this.CloudProfileWidget=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Profile')]"));
    var CloudProfileList=element.all(by.xpath("//span[contains(text(), 'Real-Time Cloud Profile')]//ancestor::div[@class='wg-widget-content']//descendant::a[@ng-click='grid.appScope.showActiveCallsDialog(row.entity)']"));
    var CloudProfileColActiveCalls=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Profile')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Active Calls')]"));
    var CloudProfileColConnectedCalls=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Profile')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Connected Calls')]"));
    var CloudProfilediv=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Profile')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport'][2]"));
    
    //Real-Time Cloud Destination variables
    this.CloudDestinationWidget=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Destination')]"));
    var CloudDestColList=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Destination')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Destination Name')]"));
    var CloudDestColConnectedCalls=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Destination')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Connected Calls')]"));
    var CloudDestColAcceptedCalls=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Destination')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Accepted Calls')]"));
    var CloudDestdiv=element(by.xpath("//span[contains(text(), 'Real-Time Cloud Destination')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport'][2]"));

    //IVR Telemetry variables 
    this.IVRWidget=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]"));
    var IVRColList=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Name')]"));
    var IVRColLiveCalls=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Live')]"));
    var IVRColPresentedCalls=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Pres')]"));
    var IVRColTransferQueues=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]//ancestor::div[@class='wg-widget-content']//descendant::span[contains(text(), 'Transfer Queue')]"));
    var IVRdiv=element(by.xpath("//span[contains(text(), 'Real-Time IVR')]//ancestor::div[@class='wg-widget-content']//descendant::div[@class='ui-grid-viewport ng-isolate-scope' or @class='ui-grid-viewport'][2]"));

    //Function to extract Telemetry table content
    this.Tabledata=async function (telemetryname,scrollelement,colheader1,colheader2,colheader3,colheader4,colheader5,colheader6) { 
        var TableContent={
            NameColumn:[],
            Col_1:[],
            Col_2:[],
            Col_3:[],
            Col_4:[],
            Col_5:[],
            Col_6:[],
        };
        var start={};
        var distance ={};
        await browser.executeScript("return arguments[0].scrollTop;", scrollelement.getWebElement()).then(function (dst) {
            distance.value = dst;
        }).then( function Callback() {
            while(start.value!==distance.value){
                start.value = distance.value;
                var filteredIdentifier=telemetryname.filter(function(elem){return elem.isDisplayed()});
                telemetryname.each(function(elem,index){
                    elem.isDisplayed().then(function(result){
                        if(result){
                            elem.getText().then(function(name){
                                if(TableContent.NameColumn.indexOf(name) == -1){
                                    TableContent.NameColumn.push(name);
                                    if(colheader1){
                                        colheader1.get(index).getText().then(function(value){TableContent.Col_1.push(value)});
                                    }
                                    if(colheader2){
                                        colheader2.get(index).getText().then(function(value){TableContent.Col_2.push(value)});
                                    }
                                    if(colheader3){
                                        colheader3.get(index).getText().then(function(value){TableContent.Col_3.push(value)});
                                    }
                                    if(colheader4){
                                        colheader4.get(index).getText().then(function(value){TableContent.Col_4.push(value)});
                                    }
                                    if(colheader5){
                                        colheader5.get(index).getText().then(function(value){TableContent.Col_5.push(value)});
                                    }
                                    if(colheader6){
                                        colheader6.get(index).getText().then(function(value){TableContent.Col_6.push(value)});
                                    }
                                }
                            });
                        }
                    });
                });
                
                //scroll
                browser.executeScript("arguments[0].scrollIntoView();", filteredIdentifier.last());
                browser.wait(EC.presenceOf(telemetryname.last()), 1000);
                browser.executeScript("return arguments[0].scrollTop;", scrollelement.getWebElement()).then(function (dst) {
                    distance.value = dst;
                    if(start.value < distance.value){
                        TableContent.NameColumn.pop();
                        TableContent.Col_1.pop();
                        TableContent.Col_2.pop();
                        TableContent.Col_3.pop();
                        TableContent.Col_4.pop();
                        TableContent.Col_5.pop();
                        TableContent.Col_6.pop();
                    }
                    Callback();
                });
            }
        });
        return TableContent;
    }

    //Extracting column id
    this.getColumnId= async function(elem){
        try{
            var col;
            await elem.getAttribute('id').then(function(eid){
            col=eid.split('-')[2];
            });
        }catch(error){
            console.log('error -' , error);
        }
        return col;
    };
    
    //Agent Telemetry Function
    this.AgentTelemetry= async function () {	
        try{
            var telemetry;
            var id1 = await this.getColumnId(AgentColUsername);
            var id2 = await this.getColumnId(AgentColState);
            var id3 = await this.getColumnId(AgentColAgentId);
            var id4 = await this.getColumnId(AgentColCallSource);
            var id5 = await this.getColumnId(AgentColDNIS);
            var id6 = await this.getColumnId(AgentColANI);
            var Agentusername=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var AgentState=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            var AgentAgentId=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id3+''));
            var AgentCallSource=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id4+''));
            var AgentDNIS=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id5+''));
            var AgentANI=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id6+''));
            await this.Tabledata(AgentList,Agentdiv,Agentusername,AgentState,AgentAgentId,AgentCallSource,AgentDNIS,AgentANI).then(function(data){
                telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };

    //Inbound Telemetry function
    this.InboundTelemetry= async function () {	
        try{
            var telemetry;
            var id1 = await this.getColumnId(InboundColLiveCalls);
            var id2 = await this.getColumnId(InboundColQueuedCalls);
            var id3 = await this.getColumnId(InboundColStaffedCalls);
            var InboundLiveCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var InboundQueuedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            var InboundStaffedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id3+''));
            await this.Tabledata(InboundQueueList,Inbounddiv,InboundLiveCalls,InboundQueuedCalls,InboundStaffedCalls).then(function(data){
            telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };

    //Outbound Telemetry Function
    this.OutboundTelemetry= async function () {	
        try{
            var telemetry;
            var id1 = await this.getColumnId(OutboundColActiveCalls);
            var id2 = await this.getColumnId(OutboundColStaffed);
            var OutboundActiveCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var OutboundStaffed=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            await this.Tabledata(OutboundCampaignList,Outbounddiv,OutboundActiveCalls,OutboundStaffed).then(function(data){
            telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };

    //Cloud Profile Telemetry Function
    this.CloudProfileTelemetry= async function () {	
        try{
            var telemetry;
            var id1 = await this.getColumnId(CloudProfileColActiveCalls);
            var id2 = await this.getColumnId(CloudProfileColConnectedCalls);
            var CloudProfileActiveCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var CloudProfileConnectedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            await this.Tabledata(CloudProfileList,CloudProfilediv,CloudProfileActiveCalls,CloudProfileConnectedCalls).then(function(data){
            telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };

    //Cloud Destination Telemetry Function
    this.CloudDestTelemetry= async function () {	
        try{
            var telemetry;
            var DestId=await this.getColumnId(CloudDestColList);
            var id1 = await this.getColumnId(CloudDestColConnectedCalls);
            var id2 = await this.getColumnId(CloudDestColAcceptedCalls);
            var CloudDestList=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+DestId+''));
            var CloudDestAcceptedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var CloudDestConnectedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            await this.Tabledata(CloudDestList,CloudDestdiv,CloudDestConnectedCalls,CloudDestAcceptedCalls).then(function(data){
                telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };
           
    //IVR telemetry function
    this.IVRTelemetry= async function () {	
        try{
            var telemetry;
            var IVRId=await this.getColumnId(IVRColList);
            var id1 = await this.getColumnId(IVRColLiveCalls);
            var id2 = await this.getColumnId(IVRColPresentedCalls);
            var id3 = await this.getColumnId(IVRColTransferQueues);
            var IVRNameList=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+IVRId+''));
            var IVRLiveCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id1+''));
            var IVRPresentedCalls=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id2+''));
            var IVRTransferQueues=element.all(by.className('ui-grid-cell ui-grid-coluiGrid-'+id3+''));
            await this.Tabledata(IVRNameList,IVRdiv,IVRLiveCalls,IVRPresentedCalls,IVRTransferQueues).then(function(data){
                telemetry=data;
            });
        }catch(error){
            console.log('error -' , error);
        }
        return telemetry;
    };

    
    
}
module.exports = new AdminRealTimeAdminRealTimeDashboardPage();