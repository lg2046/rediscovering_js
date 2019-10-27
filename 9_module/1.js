'use strict';

//------------------------------------------
//1: module
//一个模块就是一个包含变量 常量 函数 和类的单独文件
//模块中的代码以use strict模式运行

//当 Node.js 直接运行一个文件时， require.main 会被设为它的 module。
// 这意味着可以通过 require.main === module 来判断一个文件是否被直接运行：
// 对于 foo.js 文件，如果通过 node foo.js 运行则为 true，但如果通过 require('./foo') 运行则为 false。
console.log(require.main === module);

// 因为 module 提供了一个 filename 属性（通常等同于 __filename），
// 所以可以通过检查 require.main.filename 来获取当前应用程序的入口点。
console.log(require.main.filename);


//导出:
const a = 1;
const f = () => 1;

class Person {
}

//最简单的方式 外面可以这样用： 比较灵活，不需要一个中间变量 const {a} =  require('./module.js');
module.exports = {
    a, f, Person
};

//如果只导出一个变量 比如直接导出单个类  外面const Person =  require('./module.js');
module.exports = Person;

//也可以一个一个赋值 就是上面上面的写法  尽量少用
// exports.a = a;
// exports.f = f;
// exports.Person = Person;