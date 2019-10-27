'use strict';

//---------------------------------------------
//1: 字符串插值
const name1 = 'Jack';
const name2 = 'Jill';
console.log(`Hello ${name1} and ${name2}`);

let value = 4;
const msg1 = `The value is ${value}`;
const print = () => `The value is ${value}`;  //这里字符串里的value还没有求值
value = 0;
console.log(msg1);
console.log(print());

//2: hereDoc
const name = 'John Doe';
const message = `Dear ${name},
We're delighted to let you know that you have been included in 
our routine spam starting with this one.
You can thank us later. `;
console.log(message);

//3: Tagged Template
console.log('some special characters: \\ \\n \\b \'');
console.log(String.raw`some special characters: \ \n \b '`);

//自定义tag 两个参数  一个是原始的字面量数组 一个是插值数组
//expressions.length总是texts.length - 1
const printDetails = function (texts, ...expressions) {
    console.log(texts);
    console.log(expressions);
};
const name3 = 'John';
printDetails`Hello ${name3}, how are${name3}`;

//也可以用于转换
const mask = function (texts, ...expressions) {
    return expressions
            .map((s) => '*'.repeat(s.length))
            .map((e, i) => `${texts[i]}${e}`)
            .join('')
        + texts[texts.length - 1];
};

const agent = 'Bond';
const organization = 'MI6';
console.log(mask`Hi, I'm ${agent}, with ${organization}.`);

//4: 增加对象字面量
const createPerson = function (name, age, sport, sprotFn) {
    return {
        name,  // 如果是同名的属性与变量 可以替换name: name
        age,
        toString() {  //不用 toString: function () {}
            return `${this.name} ${this.age}`;
        },
        [`play${sport}`]: sprotFn
    }
};

//5: 解构
// $1: 数组解构
const getPresidentName = function (number) {
    return ['John', 'Quincy', 'Adams'];
};

const president6 = getPresidentName(6);
// const firstName = president6[0];
// const lastName = president6[2];
// 简化为:
//这里规则类似于传参
const [firstName, _, lastName, nickName = 'Old Man'] = president6;
console.log(firstName);
console.log(lastName);
//也支持rest
const [firstName1, ...otherParts] = getPresidentName(6);
//可用于交换值
// [a, b] = [b, a];

//传参数时也可以匹配
function as([first, last]) {
    console.log(first, last)
}

as([1, 2]);

// $2: 对象解构

const weight = 'WeightKG';
const sam = {
    name: 'Sam',
    age: 2,
    height: 110,
    address: {street: '404 Missing St.'},
    shipping: {street: '500 NoName St.'},
    [weight]: 15,
    [Symbol.for('favoriteColor')]: 'Orange',
};
//其实就是模式匹配  //如果要生成的变量名一样可以直接写{ name, age }
const {name: name12, age: age12} = sam;
console.log(name12);
console.log(age12);
//支持计算属性与默认值
const {[weight]: wt, [Symbol.for('favoriteColor')]: favColor, favorite = true} = sam;
console.log(wt);
console.log(favColor);

console.log(favorite);

//参数传递时也可以使用 或者直接{ name, age }
const printInfo = function ({name: theName, age: theAge}) {
    console.log(theName, theAge);
};
printInfo(sam);

//嵌套解构
const {name: theName, address: {street}} = sam;
console.log(theName, street);

//也可以解构到已声明变量
let theName2 = '--';
console.log(theName2);
({name: theName2} = sam);//这种就直接theName2 = sam.name;
console.log(theName2);
//展开object
const addAge = function (person, theAge) {
    // return {...person, age: theAge};
    return Object.assign({age: theAge}, person);
};
const parker = {first: 'Peter', last: 'Parker'};
console.log(addAge(parker, 15));
console.log(parker);

const stripMargin = function (texts, ...expressions) {
    const exceptLast = expressions.map(function (expression, index) {
        return `${texts[index]}${expression.toString().toUpperCase()}`;
    }).join('');
    const result = `${exceptLast}${texts[texts.length - 1]}`;
    return result.replace(/[\n][\t\s]+(\w)/g, ' $1').trim();
};

const names = 'Jane';
const processed = stripMargin` This is for
  ${names} and it needs to be
        delivered by December 24th.`;
console.log(processed);