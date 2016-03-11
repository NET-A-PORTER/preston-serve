#!/usr/bin/env node

var request = require('request');

var isPullRequest = process.env.TRAVIS_PULL_REQUEST;
var herokuApiToken = process.env.HEROKU_API_TOKEN;
var branch = process.env.TRAVIS_BRANCH;

if(isPullRequest) ***REMOVED***
    console.log("Creating test environment")
    var options = ***REMOVED***
        method: "POST",
        url: "https://api.heroku.com/app-setups",
        headers: ***REMOVED***
            "Content-Type": "application/json",
            "Accept": "application/vnd.heroku+json; version=3",
            "Authorization": "Bearer " + herokuApiToken
    ***REMOVED***,
        body: '***REMOVED***"source_blob": ***REMOVED*** "url": "https://github.com/jay-a-porter/preston/tarball/' + branch + '"***REMOVED*** ***REMOVED***'
***REMOVED***;
    request(options, function(error, response, body) ***REMOVED***
        console.log('Creating...');
        if(response.statusCode == 202) ***REMOVED***
            var id = JSON.parse(body).id;
            var interval = setInterval(function()***REMOVED***
                appInfo(id, function(info) ***REMOVED***
                    if(info.status != "pending") clearInterval(interval);
                    if(info.status == "succeeded") ***REMOVED***
                        appInfo(id, function(info) ***REMOVED***
                            console.log(info.resolved_success_url);
                    ***REMOVED***);
                ***REMOVED*** else if (info.status != "succeeded" && info.status != "pending") ***REMOVED***
                        console.log('Failed to create envionment. Error:', info.failure_message);
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***, 5000);
    ***REMOVED*** else ***REMOVED***
            console.log('Failed to create envionment. Error:', JSON.parse(body).message);
    ***REMOVED***
***REMOVED***);
***REMOVED***

function appInfo(id, callback) ***REMOVED***

    var options = ***REMOVED***
        method: "GET",
        url: "https://api.heroku.com/app-setups/" + id,
        headers: ***REMOVED***
            "Content-Type": "application/json",
            "Accept": "application/vnd.heroku+json; version=3",
            "Authorization": "Bearer " + herokuApiToken
    ***REMOVED***
***REMOVED***;

    request(options, function(error, response, body) ***REMOVED***
        console.log('polling...');
        var isPending = JSON.parse(body).status != "succeeded";
        callback(JSON.parse(body));
***REMOVED***);

***REMOVED***