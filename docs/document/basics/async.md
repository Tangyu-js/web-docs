# async和await

## 前言
异步操作是 JavaScript 编程的麻烦事，麻烦到一直有人提出各种各样的方案，试图解决这个问题。

从最早的回调函数，到 Promise 对象，再到 Generator 函数，每次都有所改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。

Generator函数是 协程 在ES6的实现，最大的特点是可以暂停执行， 并且在next()中可以传入参数
``` javascript
// 协程的写法， 
// 第一步，协程A开始执行。
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// 第三步，（一段时间后）协程B交还执行权。
// 第四步，协程A恢复执行。
function asnycJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}

// Generator函数用法
function* genFunc(x) {
  try{
    let y = yield x + 2
  } catch (e) {
    console.log(e)
  }
  let y = yield x + 2
  return y
}
let results = gen(1) // results是一个对象，调用这个对象的next()方法，可以执行一句yield语句，会返回一个对象{ value: '值', done: boolean： 是否还有下一个yield语句 
results.next()
results.throw('错误')

// 在Generator函数中，也可以部署错误代码处理，并且可以使用.throw()来抛出错误

```

## async是什么
async 函数就是 Generator 函数的语法糖

## async和Generator的区别
async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，仅此而已

## async 函数的优点

1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
2. async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）

## async 函数用法

``` javascript
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);

```

> 如果async函数中 await等待的是一个promise，则会阻塞代码，知道promise返回，如果promise进入reject状态，则我们需要部署try catch代码来处理出错误；
如果await等待的是一个普通的语句，则没有意思，和同步代码一样执行
