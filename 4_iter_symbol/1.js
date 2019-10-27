'use strict';

//------------------------------------------------------------------------
//1: 增强型for
const names = ['Sara', 'Jake', 'Pete', 'Mark', 'Jill'];
for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

//使用of 可用于所有可迭代的对象 即实现了[Symbol.iterator]()方法的所有对象 也可以是生成器 或者是iterator直接迭代
console.log("---use of:---");
for (const name of names) {
    console.log(name);
}

//entry是一对 entries()返回一个迭代器
for (const entry of names.entries()) {
    console.log(entry);
}

// 使用解构
for (const [i, name] of names.entries()) {
    console.log(i, name);
}

//2: Symbol: a new primitive type
// 所有primitive类型: number string boolean null undefined
// Symbol用途:
// $1: 定义对象属性  该属性不会在正常迭代中出现但并不是私有的
const age = Symbol('ageValue'); //称号的参数没有太多实际意义
const email = 'emailValue';
const sam = {
    first: 'Sam',
    [email]: 'sam@example.com', //让属性名为emailValue
    [age]: 2,
};
for (const property in sam) {
    console.log(property + ' : ' + sam[property]); //没有符号属性
}
console.log(Object.getOwnPropertyNames(sam));//没有符号属性
console.log(Object.getOwnPropertySymbols(sam));//符号属性
console.log(sam[age]); //访问符号属性
sam[age] = 3;
console.log(sam[age]); //访问符号属性
process.stdout.write("不会产生新行");
console.log();
// $2: 定义一个全局注册器或者对象字典
// Symbol.for创建时 key是有意义的 如果key已存在 就直接返回已存在的Symbol
const s1 = Symbol.for('aKey');
const s2 = Symbol.for('aKey');
console.log(s1 === s2);
const s3 = Symbol('aKey');
const s4 = Symbol('aKey');
console.log(s3 === s4);
console.log(Symbol.keyFor(s1));
console.log(Symbol.keyFor(s2));
console.log(Symbol.keyFor(s3));
console.log(Symbol.keyFor(s4));
console.log(Symbol.keyFor(Symbol('s4')));

// $3: 在对象中定义特殊的well-known方法 用于模拟接口
class SuperHero {
    constructor(name, realName) {
        this.name = name;
        this.realName = realName;
    }

    toString() {
        return this.name;
    }

    //定义一个特殊的方法 相当于一个接口方法
    [Symbol.search](value) {
        console.info('this: ' + this + ', value: ' + value);
        return value.search(this.realName);
    }
}

const superHeroes = [
    new SuperHero('Superman', 'Clark Kent'),
    new SuperHero('Batman', 'Bruce Wayne'),
    new SuperHero('Ironman', 'Tony Stark'),
    new SuperHero('Spiderman', 'Peter Parker'),
];

const names2 = 'Peter Parker, Clark Kent, Bruce Wayne';
for (const superHero of superHeroes) {
    console.log(`Result of search: ${names2.search(superHero)}`)
}
// https://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols  特殊符号列表

//3: 自定义迭代器与生成器
// Array Set Map都是可迭代的

const names3 = ['Tom', 'Jerry', 'Tyke'];
for (const name of names3) { //Array实现了[Symbol.iterate]
    console.log(name)
}

//自定义迭代
class CardDeck {
    constructor() {
        this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spaces'];
    }

    //定义一个用来返回iterator的方法
    * [Symbol.iterator]() {
        // 直接返回另外一个可迭代对象的迭代器
        // return this.suitShapes[Symbol.iterator]();
        //
        // 或者yield* this.suitShapes;
        //
        // 或从头实现自己的迭代器
        // let index = -1;
        // const self = this;
        // return { //迭代器就是可以在上面一直调next函数的对象 next返回{ done, value }的对象
        //     next() {
        //         index++;
        //         return {
        //             done: index >= self.suitShapes.length,
        //             value: self.suitShapes[index],
        //         }
        //     }
        // }
        //
        // 使用yield简化代码
        // 如果迭代器要使用yield 该方法前要加*
        for (const shape of this.suitShapes) {
            yield shape; // 遇到yield时，代码切换到调用方法 当调用方处理完 再继续
        }
    }


    * suits() {
        for (const color of this.suitShapes) {
            yield color; // 删掉上面的迭代器后 外面不能for(const suit of deck) 必须for(const suit of deck.suits())
        }
    }

    * pips() {  // 创建多个生成器函数
        yield 'Ace';
        yield 'King';
        yield 'Queen';
        yield 'Jack';
        for (let i = 10; i > 1; i--) {
            yield i.toString();
        }
    }

    //组合生成器函数
    * suitsAndPips() {
        yield* this.suits(); //yield*返回多个值  后面也可以接生成器, any_iterable对象 比如Array 或者是iterator
        yield* this.pips();
        yield* ['a', 'b', 'c'];
        yield* ['a', 'b', 'c'][Symbol.iterator]();
    }

}

const deck = new CardDeck();
for (const suit of deck) {
    console.log(suit);
}

// 自定义生成器函数
const suits = function* () {
    for (const e of [1, 2, 3]) {
        yield e;
    }
};

// 对生成器进行迭代
for (const e of suits()) {
    console.log(e);
}

for (const e of (new CardDeck().suits())) {
    console.log(e);
}

for (const e of (new CardDeck().pips())) {
    console.log(e);
}

for (const e of (new CardDeck().suitsAndPips())) {
    console.log(e);
}

//4: 无限迭代器
const isPrime = function (number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) return false;
    }
    return number > 1;
};
const primesStartingFrom = function* (start) {
    let index = start;
    while (true) {
        if (isPrime(index)) {
            yield index;
        }
        index++;
    }
};

for (const e of primesStartingFrom(10)) {
    console.log(e);
    if (e > 1000) break;
}