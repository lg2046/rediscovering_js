'use strict';

//------------------------------------------------------------------------
//1: 参数传递： 当传递更多的参数 多的参数被忽略 当传递更少的参数  对应的为undefined
const max = function (a, b) {
    if (a > b) {
        return a;
    }
    return b;
};
console.log(max(1));
console.log(max(1, 3));
console.log(max(4, 2));
console.log(max(2, 7, 1));

//2: 可变参数
// ...values必须为最后一个参数  最多只有一个...values参数
const max2 = function (...values) {
    return values.reduce((large, e) => large > e ? large : e)
};

console.log(max2(1, 2, 3));
//也可以用于解构
console.log(max2(...[1, 2, 3, 4]));

console.log([...[1, 2, 3], 4]);

//...解析也可以用于object
const sam = {name: 'Sam', age: 2};
console.log(sam);
console.log({...sam, age: 3});
console.log({...sam, height: 100});
console.log(sam);

//3: 参数默认值
const books = [
    {title: 'Who Moved My Cheese'},
    {title: 'Great Expectations'},
    {title: 'The Power of Positive Thinking'}
];
const sortByTitle = function (books, ascending = true) {
    const multiplier = ascending ? 1 : -1;
    const byTitle = function (book1, book2) {
        return book1.title.localeCompare(book2.title) * multiplier;
    };
    return books.slice().sort(byTitle);
};

console.log(sortByTitle(books));
console.log(sortByTitle(books, false));

const fetchData = function (id,
                            location = {host: 'localhost', port: 443},
                            url = 'employees') {
    console.log("Fetch data from https://" + location.host + ':' + location.port + '/' + url);
};

fetchData(1, {host: 'agile_developer', port: 404}, 'books');
fetchData(1, {host: 'agile_developer', port: 404});
fetchData(2);
fetchData(2, undefined, 'books');  //传递undefined会让host继续使用默认参数

//默认参数还可以是一个表达式 会在调用时进行计算 而且后面的表达式还可以使用前面的值
const computeTax = function (amount,
                             stateTax = 15,
                             localTax = stateTax * 0.10) {
    console.log('stateTax: ' + stateTax + ' localTax: ' + localTax);
};