var VRUMockPage= function(){
    var Request = require("request");
    var flowid=Math.floor(Math.random() * 1001);
    this.offHookRequest=function(){
        let myPromise;
        myPromise = new Promise(function(resolve, reject) {
                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": "http://localhost:8080/process/off-hook-init",
                    "body": JSON.stringify({
                        "flowId": flowid,
                    })
                },  (error, response, body) => {
                    if (error) {
                        console.dir(error);
                        reject(error);
                    }
                resolve(response.headers);
            });
        });
        return myPromise;
    }
    this.inboundCallRequest=function(){
        let myPromise;
        myPromise = new Promise(function(resolve, reject) {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": "http://localhost:8080/process/vru-call-inbound",
                "body": JSON.stringify({
                    "flowId": flowid,
                    "params": {
                        "dialDestination": "9092833940",
                        "callerPhone": "9168306499"
                    }
                })
                }, (error, response, body) => {
                  if(error) {
                    console.dir(error);
                    reject(error);
                  }
                resolve(response.headers);
            });
        });
        return myPromise;
    }
    this.hangUpRequest=function(){
        let myPromise;
        myPromise = new Promise(function(resolve, reject) {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": "http://localhost:8080/process/hang-up",
                "body": JSON.stringify({
                    "flowId": flowid,
                    "params": {
                        "agentHangsUp": true
                    }
                })
                }, (error, response, body) => {
                  if(error) {
                    console.dir(error);
                    reject(error);
                  }
                resolve(response.headers);
            });
        });
        return myPromise;
    }
    this.offHookTermRequest=function(){
        let myPromise;
        myPromise = new Promise(function(resolve, reject) {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": "http://localhost:8080/process/off-hook-term",
                "body": JSON.stringify({
                    "flowId": flowid,
                })
                }, (error, response, body) => {
                  if(error) {
                    console.dir(error);
                    reject(error);
                  }
                resolve(response.headers);
            });
        });
        return myPromise;
    }
}
module.exports = new VRUMockPage();