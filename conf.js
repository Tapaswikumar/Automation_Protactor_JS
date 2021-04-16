exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/OutboundPreview.Spec.js'],
 
  // suites:{
  //   Outbound:['specs/OutboundPreview.Spec.js','specs/OutboundProgressive.Spec.js','specs/OutboundPredictive.Spec.js','specs/PipedLeadsDialing.Spec.js'] ,
  //   Inbound:['specs/InboundCall.Spec.js','specs/TrackCall.Spec.js','specs/CloudCall.Spec.js','specs/DTMFCallback.Spec.js'], 
  //   HCI:['specs/HCIFetch.Spec.js','specs/HCIPaced.Spec.js'],  
  //   IVR:['specs/IVR.Spec.js','specs/IVRUnmappedCampaign.Spec.js'],  
  //   Safedial:['specs/OutboundTCPA.Spec.js'], 
  //   Updatelogin:['specs/UpdateLogin.Spec.js'],
  //   Leadlist:['specs/LeadListUpload.Spec.js'],
  //   Supervisor:['specs/SupervisorMonitoring.Spec.js'],
  // },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
  },
  // allScriptsTimeout: 20000,
  capabilities: {
    'directConnect': true,
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--window-size=1920,1080','--incognito','--disable-gpu','--use-fake-device-for-media-stream','use-fake-ui-for-media-stream'],  
      
    }
  },
  //  '--headless', '--window-size=1920,1080','--start-maximized' ,'use-fake-ui-for-media-stream','--incognito',

  beforeLaunch:function(){
    xlsxj = require("xlsx-to-json");
    xlsxj({
      input: "./testdata.xlsx", 
      sheet: "d03",
      output: "./testdata.json"
    }, function(err) {
      if(err) {
        console.error(err);
      }
    });
  },

  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './TestReport/',
      filePrefix: 'xmlresults'
    }));
    var fs = require('fs-extra');
    fs.emptyDir('TestReport/screenshots/', function (err) {
    });
    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status == 'failed'|| result.status=='passed'|| result.status=='skipped') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');
            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('TestReport/screenshots/' + browserName + '-' + result.fullName+ '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });
  },   
    
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './TestReport/',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: false,
        testPlatform: platform
      };
      new HTMLReport().from('./TestReport/xmlresults.xml', testConfig);
    });
    
    /*..Zipping Test report directory

      var zipFolder = require('zip-folder');
      zipFolder('./TestReport', './TEST_REPORT', function(err) {
        if(err) {
          console.log(err);
        }
      });

    /* .......... Node mailer to send out mails after test execution

    return new Promise(function (fulfill, reject) {
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'tkumar@legacy.connectfirst.com',
          pass: 'Welcome@9585'
        }
      });
      var mailOptions = {
        from: 'tkumar@legacy.connectfirst.com',
        to: 'tapaswi.kumar@rsystems.com',
        subject: 'Test_Report',
        text: 'Test_Report_Regression',
        attachments: [
          {
            'path': './TEST_REPORT',
          },
        ]
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
          return console.log(error);
        }
        console.log('Mail sent: ' + info.response);
        fulfill(info);
      });
    });
    .............*/
  },
}