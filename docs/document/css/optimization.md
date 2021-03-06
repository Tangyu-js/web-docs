# css优化

## 首屏内联关键css

在首屏页面中关键地方使用内联css样式，可以使首屏加载效果更好，内联样式在html下载外成后就可以渲染。<br />
使用link外部样式，需要在下载完html后再下载css文件再进行渲染。如果首屏页面中有一些样式需要很快的渲染出来。可以适当使用内联样式
> 内联样式不会进行缓存，每次都会重新下载

## 异步加载css

css会阻塞html渲染，在css文件下载、解析、渲染完成之前，浏览器不会渲染任何已经处理好的内容。一般情况下，这种机制正是我们需要的。<br />
但是当我们把需要首屏就加载的css使用内联样式处理后，就可以对其他的css文件进行异步加载

### 如何异步下载css?

1. 使用js动态插入link标签

2. 使用link标签的rel='preload' 属性

``` html
<link rel="preload" href="cssfile.css" as="style" onload="this.rel='stylesheet'">
```

> 注意： 需要在onload中把rel属性值修改回stylesheet，否则样式不生效，并且浏览器支持不太好

## 文件压缩

文件大小直接影响浏览器加载速度，webpack gulp grunt rollup 等打包工具都可以进行css压缩

## 删减无用css

不是所有的程序员都可以一次写出很优秀的代码，在完成一个项目后，着重的对一些css样式复杂的页面进行review，找到重复、无用的代码，删除它

## 有选择性的使用css选择器

层级过深的选择器，会增加匹配所要花费的时间代价

## 有选择性的使用css属性

有选择性的使用相对开销小的css属性，能不用就不用，比如： box-shadow 、border-radius等