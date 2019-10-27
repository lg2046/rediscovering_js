'use strict';

const cluster = require('cluster');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const port = 8084;
const number_of_processes = 8;

const isPrime = function (number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number > 1;
};

const countNumberOfPrimes = function (number) {
    let count = 0;
    for (let i = 1; i <= number; i++) {
        if (isPrime(i)) {
            count++;
        }
    }
    return count;
};

const handler = function (request, response) {
    const params = querystring.parse(url.parse(request.url).query);
    const number = parseInt(params.number);
    const count = countNumberOfPrimes(number);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    return response.end(`${count}`);
};

if (cluster.isMaster) {
    for (let i = 0; i < number_of_processes; i++) {
        cluster.fork();
    }
} else {
    http.createServer(handler).listen(port);
}
