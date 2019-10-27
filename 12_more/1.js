'use strict';

//1: Arrays
const team = [
    'Joe',
    'Dyan',
    'Bea',
    'Theo',
];

function alphabetizeTeam(team) {
    return [...team].sort(); // ['Bea', 'Dyan', 'Joe', 'Theo']
}


console.log(alphabetizeTeam(team));

//集合方法 map filter reduce sort find forEach

console.log(Object.keys(team));

//搜索元素
console.log(team.indexOf('Bea'));

//如果是想简单查看是否包含
console.log(team.includes('Bea'));

// team.splice(1, 1); // 删除一个元素 会影响原数组
// team.slice(0, 2); // 返回子数组 不影响原数组

//删除一个元素，不影响原数组
function removeItem(items, removable) {
    const index = items.indexOf(removable);
    return [...items.slice(0, index), ...items.slice(index + 1)];
}

console.log(removeItem(team, 'Bea'));

//函数式过滤e 也不影响原数组
console.log(team.filter(v => v !== 'Bea'));

// 一般不要直接修改函数的参数