'use strict';

// const fs = require('fs');
const request = require('request-promise');
const reportOnPromise = function (promise) {
    promise
        .then(result => console.log(`result is ${result}`))
        .catch(error => console.log(`ERROR: ${error}`))
};

//------------------------------------------------------------------------
//1: 回调方式
// const displayFileContent = function (pathToFile) {
//     const handleFile = function (err, contents) {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log(contents.toString());
//         }
//     };
//     try {
//         fs.readFile(pathToFile, handleFile);
//     } catch (ex) {
//         console.log(ex.message);
//     }
// };
//
// displayFileContent("./1.js");

// promise方式
const fs = require('fs-extra');
const countFileLines = function (pathToFile) {
    fs.readFile(pathToFile)
        .then(content => content.toString().split('\n').length)
        .then(count => console.log(`Number of lines: ${count}`))
        .catch(error => console.log(`ERROR: ${pathToFile}, ${error.message}`));
};

countFileLines('./1.js');
// countFileLines('./2.js');

//async await
const countFileLinesAsync = async function (pathToFile) {
    try {
        const content = await fs.readFile(pathToFile);
        return content.toString().split('\n').length;
        // .then(content => content.toString().split('\n').length)
        // .then(count => console.log(`Number of lines: ${count}`))
        // .catch(error => console.log(`ERROR: ${pathToFile}, ${error.message}`));
    } catch (ex) {
        console.log(`await promise error: ${ex.message}`)
    }

};
reportOnPromise(countFileLinesAsync('./1.js'));

//2: Promise
const computeSqrtAsync = function (number) {
    //创建Promise
    if (number < 0) {
        return Promise.reject('no negative number, please.');
    }
    if (number === 0) {
        return Promise.resolve(0);
    }
    //创建Promise
    return new Promise(function (resolve, _reject) {
        setTimeout(() => resolve(Math.sqrt(number)), 1000);
    })
};


const forNegative1 = computeSqrtAsync(-1);
const forZero = computeSqrtAsync(0);
const forSixteen = computeSqrtAsync(16);
console.log(forNegative1);
console.log(forZero);
console.log(forSixteen);

reportOnPromise(forNegative1);
reportOnPromise(forZero);
reportOnPromise(forSixteen);

//3: 多个Promise协作
// $1: race 竞态Promise 选择第一个被resolve或者是reject的
const createPromise = function (timeInMillis) {
    return new Promise(function (resolve, _reject) {
        setTimeout(() => resolve(timeInMillis), timeInMillis);
    });
};

const createTimeout = function (timeInMillis) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => reject(`timeout after ${timeInMillis} MS`), timeInMillis);
    });
};

Promise.race([createPromise(150), createTimeout(100)])
    .then(result => console.log(`completed after ${result} MS`))
    .catch(error => console.log(`ERROR: ${error}`));
// $2: Waiting Promise 等待所有任务resolve或者任意一个被reject
// Promise.all 所有resolve后整体resolve 一个被reject 则整体被reject

const countPrimes = function (number) {
    if (isNaN(number)) {
        return Promise.reject(`${number} is not a number`);
    }

    return request(`http://localhost:8084?number=${number}`)
        .then(count => `Number of primes from 1 to ${number} is ${count}`);
};

reportOnPromise(Promise.all([100, 1000, 10000].map(countPrimes)));

//4: Async and Await
//将返回promise的异步函数使用async标注  await只能在async中使用

const computeAsync = function (number) {
    if (number < 0) {
        return Promise.reject('no negative, please');
    }
    return Promise.resolve(number * 2);
};

const callCompute = async function (number) {
    try {
        const result = await computeAsync(number);
        console.log(`Result is ${result}`);
    } catch (ex) {
        console.log(ex)
    }
};

callCompute(10);
