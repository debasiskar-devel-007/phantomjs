/**
 * Created by debasis on 14/9/16.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8002;


var http = require('http').Server(app);
var request = require('request');




var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '900mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '900mb', extended: true}));
var multer  = require('multer');
var datetimestamp='';
var filename='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploadedfiles/sharelinks/');
    },
    filename: function (req, file, cb) {

        console.log(file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        console.log(filename);
        cb(null, filename);
    }
});


var EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
// or 0 to turn off the limit
emitter.setMaxListeners(0)

var upload = multer({ //multer settings
    storage: storage
}).single('file');


app.use(bodyParser.json({type: 'application/vnd.api+json'}));




app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




/** API path that will upload the files */
app.post('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }


        res.json({error_code:0,filename:filename});
    });
});

var mongodb = require('mongodb');
var db;
//var faqdb;
//var url = 'mongodb://localhost:27017/probidbackend';
var url = 'mongodb://localhost:27017/phantomjs';

var MongoClient = mongodb.MongoClient;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
        //faqdb=database.faqs;

    }});




app.get('/addexpertarea', function (req, resp) {

    value1 = {title: 'sdf',description: '5435', priority: 6,status: 0};

    var collection = db.collection('addexpertarea');

    collection.insert([value1], function (err, result) {
        if (err) {
            resp.send(err);
        } else {
            resp.send('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);

        }
    });

});

app.get('/scrap1', function (req, resp) {

    /*var Horseman = require('node-horseman');
    var horseman = new Horseman({'phantomPath':'/var/www/html/phantomjs/node_modules/phantomjs/lib/phantom/bin/phantomjs'});

    horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('http://www.ripoffreport.com/')
        .type('input[name="q"]', 'github')
        .click('[name="btnK"]')
        .keyboardEvent('keypress', 16777221)
        .waitForSelector('div.g')
        .count('div.g')
        .log() // prints out the number of results
        .close();*/


    var Horseman = require('node-horseman');
    var horseman = new Horseman();

    function getTitle() {
        var title = jQuery('.product-name-main h1').text();
        return {title: title};
    }

    horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('http://shtoraoptom.ru/pokryvalo-nazsu-gul-abrikosovyj-240-260-sm')
        .text('.product-name-main h1')
        .then(function(title){
            console.log(title);
            return horseman.close();
        });

    resp.send({'uio':09});

});

app.get('/scrap2', function (req, resp) {
    var Horseman = require('node-horseman');

    var phantomInstance = new Horseman({
        phantomPath: '/var/www/html/phantom/phantomjs',
        loadImages: true,
        injectJquery: true,
        webSecurity: true,
        ignoreSSLErrors: true
    });

    phantomInstance
        .open('https://github.com/login')
        .evaluate(function () {
            console.log(4555);
            $ = window.$ || window.jQuery;

            // Return a single result object with properties for
            // whatever intelligence you want to derive from the page
            var result = {
                links: []
            };

            if ($) {
                $('a').each(function (i, el) {
                    var href = jQuery(el).attr('href');
                    if (href) {
                        if (!href.match(/^(#|javascript|mailto)/) && result.links.indexOf(href) === -1) {
                            result.links.push(href);
                        }
                    }
                });
            }
            // jQuery should be present, but if it's not, then collect the links using pure javascript
            else {
                var links = document.getElementsByTagName('a');
                for (var i = 0; i < links.length; i++) {
                    var href = links[i].href;
                    if (href) {
                        if (!href.match(/^(#|javascript|mailto)/) && result.links.indexOf(href) === -1) {
                            result.links.push(href);
                        }
                    }
                }
            }

            return result;
        })
        .then(function (result) {
            console.log('Success! Here are the derived links: \n', result.links);
        });
    console.log('r54');



    resp.send({'uio':5555});

});


app.post('/adddealer', function (req, resp) {

    var crypto = require('crypto');

    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var added_on=Date.now();

        var is_active=1;


    value1 = {fname: req.body.fname,lname: req.body.fname, phone: req.body.phone,zip: req.body.zip,username:req.body.username,password:hash,email:req.body.email,is_lead:1,is_active:is_active,added_on:added_on};

    var collection = db.collection('dealers');

    collection.insert([value1], function (err, result) {
        if (err) {
            resp.send(err);
        } else {
            // resp.send('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);

            request('http://influxiq.com/projects/domainmanager/createsubdomain.php?subdomain='+req.body.username, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result={status:body};
                    resp.send(JSON.stringify(result));
                    console.log(body) // Show the HTML for the Google homepage.
                }
            })

        }
    });

});





var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

      console.log("Example app listening at http://%s:%s", host, port)

})