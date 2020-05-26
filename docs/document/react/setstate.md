# 理解reacat state setState

## 什么是state 
state —— react 组件内部的状态管理，可以直接读取this.state
设置值需要通过 setState

## setState 作用
- 更新state
- 触发钩子函数：shouldComponentUpdate、 componentWillUpdate、 render、 componentDidUpdate

## setState 内部机制
>状态更新会合并（也就是说多次setstate函数调用产生的效果会合并）。
- this.setState首先会把state推入pendingState队列中
- 然后将组件标记为dirty
- React中有事务的概念，最常见的就是更新事务，如果不在事务中，则会开启一次新的更新事务，更新事务执行的操作就是把组件标记为dirty
- 判断是否处于batch update
- 是的话，保存组建于dirtyComponent中，在事务结束的时候才会通过 ReactUpdates.flushBatchedUpdates 方法将所有的临时 state merge 并计算出最新的    props 及 state，然后将其批量执行，最后再关闭结束事务。
- 不是的话，直接开启一次新的更新事务，在标记为dirty之后，直接开始更新组件。因此当setState执行完毕后，组件就更新完毕了，所以会造成定时器同步更新的情况。