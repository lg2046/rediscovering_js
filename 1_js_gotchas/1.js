//------------------------------------------------------------------------
// 1: 注意不小心的换行造成自动插入分号情况
// 有效的js程序以一个分号结束 如果一个脚本没有以;线束，js会自动插入一个
// 为了防止换行的时候js会莫名插入一个分号 引发bug，最好使用lint工具或者是pycharm辅助工具
const unexpected = function () {
    let first
    second = 1;  // first后面跟second是无效的，所以会在second前面插入一个分号，此时first未定义 second成了全局变量

    console.log(first);
    console.log(second);
};

const compute = function (number) {
    if (number > 5) {
        return number
            + 2;  // 这里 + 2跟在number是语义符合的，所以不会插入分号
    }


    if (number > 2) {
        return
        number * 2;   //break, continue, return, throw, or yield如果后面跟着一个换行，在关键字后面会自动插入一个分号
        //这里就是return undefined
    }
}

//------------------------------------------------------------------------
// 2: 使用 === 而不是 ==
// ==是自动类型转非强制相等操作符
const a = '1';
const b = 1;
const c = '1.0';

console.log(a == b);
console.log(b == c);
console.log(a == c);

console.log(a === b);
console.log(b === c);
console.log(a === c);
// ==使用的情况是想判断一个变量是不是null或者是undefined时 使用variable == null

//------------------------------------------------------------------------
// 3: 变量使用前先声明
const oops = function () {
    haha = 2;  // 未声明的会是全局变量
    console.log(haha);
};

oops();
console.log(haha);

//下面盒子两个i都没有声明  其实都是用的全局变量那个  所以输出是1 2 3 4 5
const outer = function () {
    for (i = 1; i <= 3; i++) {
        inner();
    }
};

const inner = function () {
    for (i = 1; i <= 5; i++) {
        console.log(i);
    }
};

outer();

// 4: 总是使用'use strict';
// 'use strict';
// 在文件头部使用，可以让解释器报错不严格的行为
