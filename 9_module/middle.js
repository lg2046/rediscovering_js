`use strict`;

const {right} = require('./right');

console.log('executing middle module');

const middle = function () {
    console.log('middle called');
};

module.exports = {
    middle
};