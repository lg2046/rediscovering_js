'use strict';

// https://attacomsian.com/blog/node-http-requests-using-request-module

const request = require('request-promise');

request.get('someUrl').then(function (body) {
    // body is html or json or whatever the server responds
});

request({
    uri: 'someUrl',
    method: 'GET',
    resolveWithFullResponse: true
}).then(function (response) {
    // now you got the full response with codes etc...
});