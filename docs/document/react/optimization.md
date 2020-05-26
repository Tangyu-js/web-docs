# React 优化

## shouldComponentUpdate 和 PureComponent

在shouldComponentUpdate钩子函数中判断是否需要重新render，可以摒弃一些不必要的render执行<br />
如果 组件是 React.PureComponent的扩展，那么react会自动的帮我们实现shouldComponentUpdate函数逻辑，在内部进行浅比较（引用类型相同指针比较为相等）

## 定制优化

对页面某些需要进行优化的内容进行定制优化，比如：超长列表 —— 可以使用react-window和react-virtualized 等热门的虚拟滚动库它们提供了多种可复用的组件，用于展示列表、网格和表格数据。 如果你想要一些针对你的应用做定制优化，你也可以创建你自己的虚拟滚动组件

## 基于路由的代码分割

``` javascript
lazy(() => import('./routes/About'));
```

如果代码体积很大，已经超出正常加载时间了，可以使用路由代码分割，这样可以使在用户进入这个路由时，才去加载组件。

## 异常边界

如果react模块加载失败，会触发一个错误，可以通过错误边界来捕捉这个错误并处理