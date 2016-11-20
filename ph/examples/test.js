/**
 * Created by debasis on 19/11/16.
 */

var system = require('system');
var args = system.args;

console.log(args[1]);

var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0 -D';
phantom.addCookie({
    'name': 'i_r',
    'value': "true",
    'domain': 'http://ripoffreport.com'
})
page.open(args[1], function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        console.log("Success: ");
        console.log(page.cookies);
    }

    var title = page.evaluate(function() {
        return document.title;
    });
    console.log('Page title is ' + title);
    //console.log(JSON.stringify(page.cookies));

    phantom.exit();
});