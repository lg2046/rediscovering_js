'use strict';

//1: 使用Object来存储简单键值对查找
const colors = {
    red: '#d10202',
    green: '#19d836',
    blue: '#0e33d8'
};
//bad: const colors = ['#d10202', '#19d836', '#0e33d8'];

//使用Object.assign 避免直接修改原object
const defaults = {
    author: '',
    title: '',
    year: 2017,
    rating: null,
};
const book = {
    author: 'Joe Morgan',
    title: 'Simplifying JavaScript',
};

//不影响现有对象 组合新对象
console.log(Object.assign({}, defaults, book));

//但要注意嵌入式对象的问题
const defaultEmployee = {
    name: {
        first: '',
        last: '',
    },
    years: 0,
};
// const employee = Object.assign({}, defaultEmployee);
// 如果修改employee.name.first 会影响到defaultEmployee
// employee.name.first  = 'andy';
// console.log(defaultEmployee);

// 此时只能使用对嵌入属性手动拷贝
const employee = Object.assign(
    {},
    defaultEmployee,
    {
        name: Object.assign({}, defaultEmployee.name)
    });

//使用...语法
const employee2 = {
    ...defaultEmployee,
    name: {...defaultEmployee.name}
};

employee.name.first = 'andy';
console.log(defaultEmployee);

//2: 可以使用...来直接修改object
console.log("-----2----");
console.log({...defaults, ...book});  //效果等同于Object.assign({}, defaults, book)
console.log({...book, year: 1984}); //直接增加属性 有重复取后面的就是更新

//3: 使用Map来进行键值对的更新 set get delete keys 不能map.sort()
let filters = new Map()
    .set('breed', 'labrador')
    .set('size', 'large')
    .set('color', 'chocolate');

console.log(filters.get('size'));

//二维数组也可以用来初始化Map
new Map([
    ['breed', 'labrador'], ['size', 'large'], ['color', 'chocolate'],
]);

//4: 迭代map
for (const entry of filters) {
    console.log(entry);
}

filters.entries();

for (const [k, v] of filters) {
    console.log(k, ' : ', v);
}

//展开成二维数组
console.log([...filters]);
console.log(([...filters]).sort((a, b) => a[0] > b[0] ? 1 : -1));

//组合map
const defaultsMap = new Map().set('color', 'brown').set('breed', 'beagle').set('state', 'kansas');
const filtersMap = new Map().set('color', 'black');

console.log(new Map([...defaultsMap, ...filtersMap]));

//使用Set保持数据唯一性
const colorsArray = ['black', 'black', 'chocolate'];
console.log(new Set(colorsArray));
//对数组去重
console.log([...new Set(colorsArray)]);

const dogs = [
    {breed: 'boston terrier', color: 'black'},
    {breed: 'labrador', color: 'black'},
    {breed: 'labrador', color: 'chocolate'}
];

//获取所有可能的color值
console.log([...new Set(dogs.map(dog => dog.color))]);
console.log([...dogs.reduce((cum, dog) => cum.add(dog.color), new Set())]);

//for of是用于迭代对象
//for in用于object 而object不是可迭代的  可迭代是map array 迭代器 生成器 字符串
for (const e in book) {
    console.log(e);
}