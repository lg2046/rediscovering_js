'use strict';

//------------------------------------------------------------------------
//1: class
//本质还是创建了一个只能使用new的函数 [Function: Car]
class Car {
    //提供自定义构建器  构造器里的代码其实是相当于直接写在function Car中的代码
    constructor(year) {
        //初始化自定义属性
        this.year = year;
        this.miles = 0;
    }

    //定义方法 方法其实是定义在prototype里的
    drive(distance) {
        //可访问自己的属性与其他方法
        this.miles += distance;
        this.aMethod();
    }

    aMethod() {
        console.log('a');
    }

    //创建属性 下面是老形式
    getAge() {
        return new Date().getFullYear() - this.year;
    }

    //创建get属性
    get age() {
        return new Date().getFullYear() - this.year;
    }

    set distanceTraveled(value) {
        if (value < this.miles) {
            throw  new Error('Sorry, cant set value to less than current distance traveled');
        }
        this.miles = value;
    }

    //类静态属性get setter
    //get setter可以对静态字段做一些包装，如果不需要包装 直接在class外声明
    static get ageFactor() {
        return this.distanceFactor;
    }

    static set ageFactor(v) {
        this.distanceFactor = v;
    }

    //静态方法
    static pickBetter(carA, carB) {
        const computeScore = car =>
            car.age * Car.ageFactor + car.distanceTraveled * Car.distanceFactor;
        return computeScore(carA) < computeScore(carB) ? carA : carB;
    }
}

//定义类成员
Car.distanceFactor = 0.01;
Car.ageFactor = 0.02;

// ------ 定义结束

console.log(Car.ageFactor);
Car.ageFactor = 0.02;
console.log(Car.ageFactor);

const car = new Car(2018);
console.log(car);
car.drive(100);
console.log(car);
console.log(car.getAge());
console.log(car.age);

car.distanceTraveled = 200;
console.log(car);

//2: 属性与方法都可以是动态计算成员
const NYD = `New Year's Day`;

class Holidays {
    constructor() {
        this[NYD] = 'January 1';
        this["Valentine's Day"] = 'February 14';
    }

    ['list holidays']() {
        return Object.keys(this);
    }
}

const usHolidays = new Holidays();
usHolidays['4th of July'] = 'July 4';
console.log(usHolidays);

const methodName = 'list holidays';
console.log(usHolidays[methodName]());

//3: Class Expressions
//用于运行时动态创建类

const createClass = function (...fields) {
    return class {
        constructor(...values) {
            fields.forEach((field, i) => this[field] = values[i]);
        }
    }
};

const Book = createClass('Name', 'title');
const book = new Book('Ruby', 'in Practice');
console.log(book);  // { Name: 'Ruby', title: 'in Practice' } 没有class name

//4: 新的built in Class
//Set Map WeakSet WeakMap
const names_set = new Set(['Jack', 'Jill', 'Jake', 'Jack']);
console.log(names_set);
console.log(names_set.size);
names_set.add('Kate').add('Kara');
console.log(names_set.has('Kara'));

console.log(names_set.keys());
console.log(names_set.values());

console.log([...names_set]); //从set创建一个数组 从而使用filter map  set可以直接forEach

names_set.delete('kara');
names_set.clear();

//Map
//key可以是任何原语或者object, 方法entries forEach keys values has 等等
const scores = new Map([['Sara', 12], ['Bob', 11], ['Jill', 15], ['Bruce', 14]]);
scores.set('Jake', 14);
console.log(scores.size);

//WeakSet WeakMap
// Suppose you added an object as a value to a Set or as a key to a Map.
// If that object is no longer needed in your application, it can’t be garbage collected
// The values stored in a WeakSet and the keys in a WeakMap may be garbage collected if
// they’re not otherwise needed in the application
// Thus, these objects may go away at any time without notice. To avoid any surprises,
// WeakSet and WeakMap have some restrictions on how we can access the elements:
//      While the values stored in a Set and the keys placed into a Map may be primitive or objects,
//              the values in a WeakSet and keys in a WeakMap are required to be objects, not primitives.
//      The weak collections are not enumerable. The reason for this is while in the middle of enumeration,
//              if it were possible, an object held in the collection may be garbage collected and that would throw
//              a wrench into the iteration.
//WeakSet只提供了add delete has方法  WeakMap只提供了get delete set has 连size属性都没有

// const MAX = 100000000;
// const map = new Map();
// for (let i = 0; i <= MAX; i++) {
//     const key = {index: i};  //这里创建的每个对象在每个迭代都是可能被回收的，但是Map阻止了
//     map.set(key, i);
// }
// console.log("DONE");

const MAX = 100000000;
const map = new WeakMap();
for (let i = 0; i <= MAX; i++) {
    const key = {index: i};
    map.set(key, i);
}
console.log("DONE");
