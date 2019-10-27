'use strict';

//------------------------------------------------------------------------
//1: 原型链
class Counter {
    toString() {
        console.log(this);
        return "i am a Counter";
    }
}

//Counter => [Function: Counter]
//Counter.prototype => Counter {}
const counter1 = new Counter();
const counter2 = new Counter();

const counter1Prototype = Object.getPrototypeOf(counter1);
const counter2Prototype = Object.getPrototypeOf(counter2);

console.log(counter1 === counter2); // false
console.log(counter1Prototype === counter2Prototype); // true

// Object.getPrototypeOf(counter1) => Counter {}
// Object.getPrototypeOf(Object.getPrototypeOf(counter1)) => {}
// Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(counter1))) => null
//counter1 => Counter {} => {} => null

//When a property or a method is accessed on an object, the object may reuse the members in
// its prototype by delegating calls to its prototype.
// However, the behavior is widely different when getting a property compared to setting it

// Gets search deep, but sets are always shallow.

Counter.prototype.count = 0;
Counter.prototype.increment = function () {
    this.count += 1; //这里设置的属性是在counter1 instance上增加的 与prototype无关  这里this指向具体的实例
};

console.log(counter1.count); //这里是prototype的属性
console.log(counter2.count);
counter1.increment();
console.log(counter1.count);//这里就是counter1自己的属性了
console.log(counter2.count);

console.log(Object.getOwnPropertyNames(counter1));
console.log(Object.getOwnPropertyNames(counter2));
console.log(counter1);
console.log(counter2);

//2: 继承Class
class Person {
    constructor(firstName, lastName) {
        console.log('initializing Person fields');
        this.firstName = firstName;
        this.lastName = lastName;
    }

    toString() {
        return `Name: ${this.firstName} ${this.lastName}`;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get surname() {
        return this.lastName;
    }
}

//子类的默认构造器会自动调用super
class ReputablePerson extends Person {
    constructor(firstName, lastName, rating) {
        console.log('creating a ReputablePerson');
        super(firstName, lastName);
        this.rating = rating;
    }

    //覆盖父类方法与属性
    toString() {
        return super.toString();
    }

    get fullName() {
        return `Reputed ${this.surname}, ${super.fullName} `;
    }

}

//真正的关系: 有两个函数 有两个prototype对象
//ReputablePerson.prototype 的prototype 指向 Person.prototype
console.log(ReputablePerson.prototype.__proto__ === Person.prototype);
console.log(new ReputablePerson('a', 'b', 'c').__proto__.__proto__ === Person.prototype);

//注意点:
// $1: To access the member in the instance or in the derived class instead of the one in the base class,
//      use `this` remember that this is dynamically scoped.
// $2: If a member does not exist in the instance or in the derived class but exists in the base class, use `this`
//      If in the future you override this member in the derived class, then it will take precedence—this is
//      most likely what you’d want.
// $3: To bypass the member of the derived class and access the one in the base class, use super().

//递归打印原型链
const printPrototypeHierarchy = function (instance) {
    if (instance != null) {
        console.log(instance);
        printPrototypeHierarchy(Object.getPrototypeOf(instance));
    }
};
const alan = new ReputablePerson('Alan', 'Turing', 5);
printPrototypeHierarchy(alan);

//3: 修改原型链  一般涉及元编程时才会改 不然会很验证调试
console.log('修改prototype');

class ComputerWiz {
}

//这里将ReputablePerson.prototype的prototype指向了ComputerWiz.prototype
Object.setPrototypeOf(Object.getPrototypeOf(alan), ComputerWiz.prototype);

printPrototypeHierarchy(alan);


//4: 继承时的实例类型
class MyString extends String {
}

class MyArray extends Array {
    //Array就是使用的Symbol.species 允许子类指定返回类型
    static get [Symbol.species]() {
        return Array;
    }
}

const concString = new MyString().concat(new MyString());
const concArray = new MyArray().concat(new MyArray());

console.log("----");
console.log(concString instanceof MyString); //false
console.log(concArray instanceof MyArray);//false 删除上面的Symbol.species  就是true

// The concat() method of the String class decided to keep the instance it
// returns as its own type even though the method was called on a derived instance—how rude.
// The Array class, on the other hand, is playing nice, making the returned instance the same
// type as the instance on which the method concat() is called.

// When implementing a method in a base class, we can
// • make the returned instance the same type as the base class
// • make the returned instance the same type as the derived class
// • let the derived class tell us what the type should be


class Names {
    constructor(...names) {
        this.names = names;
    }

    // $1: 保持基类
    // 这里是Names的方法  强行返回成了Names类型
    filter1(selector) {
        return new Names(...this.names.filter(selector));
    }

    // $2: 动态选择
    // 根据this的类型 自动选择constructor
    filter2(selector) {
        const constructor = this.constructor;
        return new constructor(...this.names.filter(selector));
    }

    // $3: 用户进行配置
    filter3(selector) {
        //查看constructor上是否有kindHint静态属性
        const constructor = this.constructor[Symbol.species] || this.constructor;
        return new constructor(...this.names.filter(selector));
    }
}

class SpecializedNames extends Names {
    //子类指定要返回的类型
    static get [Symbol.species]() {
        return Names;
    }
}

const specializedNames = new SpecializedNames('Java', 'C#', 'JavaScript');
const names = new Names('Java', 'C#', 'JavaScript');
console.log(specializedNames);
console.log(specializedNames.filter1(n => n.startsWith('Java')));
console.log(names.filter1(n => n.startsWith('Java')));
console.log(specializedNames.filter2(n => n.startsWith('Java')));
console.log(names.filter2(n => n.startsWith('Java')));

console.log(specializedNames.filter3(n => n.startsWith('Java')));
console.log(names.filter3(n => n.startsWith('Java')));