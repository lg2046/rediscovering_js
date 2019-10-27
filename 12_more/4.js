'use strict';


const N = 123;
const x_ = new Array(N + 1);
let v_ = 0;

function cfun(t) {
    let sum = 0;
    for (let i = 1; i < t; ++i) {
        sum += x_[i];
    }
    if (sum >= N) {
        if (sum === N) {
            ++v_;
        }
    } else {
        for (let i = 1; i <= 2; ++i) {
            if (1 === i)
                x_[t] = 3;
            else
                x_[t] = 5;
            cfun(t + 1);
        }
    }
}

const bec = new Date().getTime();
cfun(1);
console.log('花费时间(毫秒) ' + ((new Date()).getTime() - bec));
console.log(v_ + '种');