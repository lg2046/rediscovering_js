'use strict';

//------------------------------------------------------------------------
//1: 函数定义
// 具名函数
function sqr1(n) {
    return n * n;
}

//匿名函数
const sqr2 = function (n) {
    return n * n;
};

//arrow function
//后面接一个表达式 或者{ return .... }
const sqr3 = (n) => n * n;

setTimeout(() => console.log('greetings'), 2000);

//支持可变参数与默认参数
const greet = (message, ...subject) => {
    console.log(message + ': ' + subject.join(', '));
};

greet('Hi', 'Developers', 'Geeks');

let factor = 2;
[1, 2, 3].map((e) => e * factor);

// arrow函数里的this自动绑定到定义函数位置的this (arguments也是 但不要用arguments了)
this.stuff = 'from lexical scope';
const someValue = 4;
const self = this;
setTimeout(() => {
    console.log('someValue is ' + someValue); //lexical scope for someValue
    console.log('this...' + this.stuff); //dynamic scope for this
    console.log('self...' + self.stuff); //lexical scope for self
}, 1000);

//bind是对一个函数绑定参数
const greet2 = function (message, name) {
    console.log(message + ' ' + name);
};
const sayHi = greet2.bind(null, 'hi'); //第一个参数是要绑定的this
sayHi('Joe');
// arrow Function使用bind的第一个参数无用 同时也不要对arrow function使用call apply
//call apply是直接应用函数 一个是一个一个参数 一个是list参数

//函数内容可以判断是使用new调用的还是直接调用的
const f1 = function () {
    if (new.target) {
        console.log('called as a constructor');
    } else {
        console.log('called as a function');
    }
};
new f1();
f1();

//arrow Function没有prototype  不能做为生成器  不能做为类函数
//throw需要使用{}包裹
const createObject = (name) => ({firstName: name}); //这里去掉后面的()会有问题
console.log(createObject('George'));

//只是在涉及较小的单行函数或者是需要固定this时才使用arr function
const pickNamesInUpperCaseOfLength = function (names, length) {
    return names
        .filter((name) => name.length === length)
        .map((name) => name.toUpperCase())
        .join(', ');
};

console.log(pickNamesInUpperCaseOfLength(['abc', 'de', 'aa'], 2));