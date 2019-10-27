'use strict';

console.log('executing right module');
const message = 'right called';

const right = function () {
    console.log(message);
};

module.exports = {
    right
};