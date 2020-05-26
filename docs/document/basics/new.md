# new 关键字

## new 关键字做了什么

1. 创建了一个空对象
2. 将这个空对象的__proto__指向了Base函数的prototype
3. 使用apply()执行Base函数的构造器，为空对象生成属性
4. 返回这个对象
