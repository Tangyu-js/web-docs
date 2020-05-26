# 继承

## ES5继承
``` javascript

  // 父类
  function Person(age, name) {
    this.name = name
    this.age = age
  }
  Person.prototype.getAge = function () {
    console.log(this.age)
  }

  // 继承

  function Super(name, age, subAttr) {
  // 1.借用父类构造器，并添加自己的属性
    Person.call(this, name, age)
    this.subAttr = subAttr
  }
  // 2.将父类的实例绑定为自己的原型
  Sub.prototype = new Person()
  // 3. 由于构造器constructor是挂载在prototype上的，需要找回自己的构造器，一个类的构造器就是类函数本身
  Sub.prototype.constructor = Sub

```

## ES6继承

``` javascript
class Sub extends Super {
  constructor(props) {
    super(props)
  }
}
```
