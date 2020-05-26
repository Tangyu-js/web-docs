# React 生命周期和render函数

> 有时候你会发现react组件的render函数执行了3次甚至4次

## React生命周期

- constructor() : 在constructor中 完成了react数据的初始化，它接受props、context两个参数，当想在函数内部使用这两个参数时，需要使用super()传入这两个参数。并且在constructor函数中，super是必须的
- componentWillMount() : 在经历constructor初始化数据后，render前 调用，在这个方法中使用异步获取数据，当异步任务执行完成的时候，render如果还没执行完成，是不会触发重新渲染的，而且componentWillMount钩子会存在中断后再执行的情况
- render() : react将组件挂载到网页上，render函数会插入jsx生成的dom，react会生成一份虚拟dom树，在每一次组件更新时，react会通过其diff算法比较更新前后的dom树，比较后找到最小的有差异的dom节点，并重新渲染。
- componentDidMount() : 在组件完全挂载到网页上之后执行，在这个钩子函数中进行setState会触发重渲染
- componentWillReceiveProps (nextProps) 在接受父组件改变后的props时，会触发该钩子函数，它接受一个参数（改变后的props）
- shouldComponentUpdata(nextProps, nextState) ：主要用于性能优化，可以判断props和state的变化，通过返回true和false来控制是否进行render
- componentDidUpdate(prevProps,prevState) : 组件更新完成的钩子函数，这个函数中可以拿到更新前的props和state

- getDerivedStateFromProps(nextProps, prevState) ： 代替componentWillReceiveProps方法，这个方法可以返回需要更改的state值   ————（新增）
- getSnapshotBeforeUpdate(prevProps, prevState) ：代替componentWillUpdate。常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。<br />
在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。<br />
getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。

> Tips : 使用异步请求数据，如果得到的数据不需要setState，可以在componengWillMount中获取，否则，请使用componengDidMount;
  如果使用的是服务端渲染，可以使用componentWillMount,因为服务端没有componentDidMount钩子函数。

## render函数

在componentWillMount之后会触发一次render，并且在state、props 引起componentShouldUpdate并且componentShouldUpdate返回true后会执行render