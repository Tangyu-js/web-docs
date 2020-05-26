# react注意事项

## 组件children

如果组件接受children属性，那么通过插槽传入的children会覆盖通过标签属性出入的children

``` typescript
class SuperComponent extends React.component<any, any> {
  render() {
    return (
      <SubComponent children={'通过标签属性传入的children'}>'通过插槽传入的children'</SubComponent>
    )
  }
}

class SubComponent extends React.component<{children: any}, any> {
  componentDidMount() {
    console.log(this.props.children)
    // 通过插槽传入的children
  }
}
```
