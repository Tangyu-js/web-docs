## 组件通信

## 子传父

1.创建一个子组件，在父组件引入 ，在子组件绑定一个自定义属性

```vue
<template>
  <div>
    父组件:
    <!-- 引入子组件 -->
    <child :inputName="name"></child>
  </div>
</template>
<script>
import child from './child' //引入
export default {
  components: {
    child,
  },
  data() {
    return {
      name: '传给子组件的值',
    }
  },
}
</script>
```

2.在子组件接收这个自定义属性

```vue
<template>
  <div>
    <!-- 子组件-->
    {{ name }}
  </div>
</template>
<script>
export default {
  props: ['name'],
}
</script>
```

## 子传父

1.在子组件通过 this.\$emit 触发一个自定义事件，实例如下

```vue
<template>
  <div>
    <button @click="handleClick">传给父组件</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit('sendMsg', '需要传递的值')
    },
  },
}
</script>
```

2.在父组件中

```vue
<template>
  <div>
    <child @sendMsg="getMsg"></child>
  </div>
</template>
<script>
import child from './child' //引入
export default {
  components: {
    child,
  },
  methods: {
    getMsg(msg) {
      // msg就是传递过来的值
    },
  },
}
</script>
```

## 兄弟组件传值

1.可以通过兄弟组件传给父组件再传给子组件的方式传值

2.定义一个公共的公共实例文件 bus.js，作为中间仓库来传值，如下所示:
(1)、在工程 src 目录下新建一个 Pub.js 文件 Pub.js

```javascript
import Vue from 'vue'
export default new Vue()
```

(2)、在各组件中引入 Pub.js 文件

```javascript
import Pub from '../Pub.js'
```

(3)、在 A 组件中通过\$emit 调用自定义函数并且传参

```javascript
Pub.$emit('namefn',"str1","str2"，……)
```

(4)、在 B 组件中通过\$on 响应事件并接受参数

```javascript
Pub.$on('namefn',(str1,str2,……) =>{
console.log(str1+"就是 A 组件中定义的数据")
})
```
