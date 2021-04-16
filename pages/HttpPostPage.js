var HttpPostPage =function(){
    this.Postlink=element(by.cssContainingText('div[class="col-xs-12 col-sm-6 truncate"]', 'POST'));
    this.PostText=$$('textarea[class="form-control"]').first();
    this.ClickHereLink=element(by.cssContainingText('a[href*="https:"]','click here'));

    this.HTTPPostPageTitle= function () {	
        return browser.getTitle();        
    };
    this.ClickOnPost= function () {	
        return this.Postlink.click();        
    };
    this.GetPostedRequestValues= function () {	
        return this.PostText.getText();        
    };
}
module.exports=new HttpPostPage();