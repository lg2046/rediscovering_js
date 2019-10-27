'use strict';

//元编程时要注意
//1: Inject vs. Synthesis
// Inject 就是可以对一个类增加，替换特定的方法 这些成员的名字在代码编写时是确定的
// 比如直接增加类的方法givenDate.isInLeapYear()
// Synthesis 就是动态创建一些方法Employee.findThoseWithCorporateCreditCard(...)

// $1 注入类方法
String.prototype.reverse =
    function () {
        return this.split('').reverse().join('');
    };
const text = new String('live');
const anotherText = 'rats';
const primitiveText = 'part';

// $2 直接增加实例方法
text.reverse = function () {
    return this.split('').reverse().join('');
};
console.log(text.reverse());
console.log(anotherText.reverse());
console.log(primitiveText.reverse());

// $3 为prototype定义属性
Object.defineProperty(Date.prototype, 'isInLeapYear', {
    get: function () {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
});
for (const year of [2018, 2019, 2020, 2021]) {
    const yayOrNay = new Date(year, 1, 1).isInLeapYear ? '' : 'not ';
    console.log(`${year} is ${yayOrNay}a leap year`);
}

// $4 定义多个属性 可以是Array.prototype 也可以是Array此时是静态属性
Object.defineProperties(Array.prototype, {
    first: {
        get: function () {
            return this[0];
        },
        set: function (value) {
            this[0] = value;
        }
    },
    last: {
        get: function () {
            return this[this.length - 1];
        },
        set: function (value) {
            this[Math.max(this.length - 1, 0)] = value;
        }
    }
});

Object.defineProperties(Array, {
    name: {
        get: function () {
            return 'I am a array';
        }
    }
});

console.log(Array.name);
console.log([1, 2, 3].first);
console.log([1, 2, 3].last);

//2: 方法合成Method synthesis 后面再看