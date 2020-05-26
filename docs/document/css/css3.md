# css3新特性
> 这里的不是全部的css3新特性

## 边框

1. border-raduis: 0 0 0 0 / 0 0 0 0     / 前设置水平半径 后面设置垂直半径

2. box-shadow: [投影方式] X轴偏移量 Y轴偏移量 模糊半径 阴影扩展半径 阴影颜色}

3. border-image: border-image-source || border-image-slice [ / border-image-width] || border-image-repeat

## 背景

1. background-size: 宽 高

2. background-origin：content-box|padding-box|border-box      ——指定背景图片放置区域

## 文本

1. text-shadow: 水平阴影大小 垂直阴影大小 模糊距离大小 阴影颜色    例：  5px 5px 5px #FF0000

2. text-wrap: normal | none | unrestricted | suppress | break-word

## 字体

css3可以自定义字体

``` css
/* 定义字体 */
  @font-face{
  font-family: myFont;
  src: url('Sansation_Light.ttf'),
      url('Sansation_Light.eot');     /* IE9+ */
  }

  div{
  font-family:myFont;
  }
```

## 转换

transform：

- translate(x, y)

- rotate(角度)  ——设置元素以中心点旋转，正值为顺时针旋转，负值为逆时针旋转

- scale(x, y) ——根据给定的宽高控制元素的尺寸增加和减少

- skew(x角度, y角度) ——设置元素绕x轴和y轴旋转角度

## 过渡

transition: 过渡属性 过渡时间 过渡方式 等待过渡时间

## 动画

``` css
  /* 通过@keyframes 创建动画 */
  @keyframes myfirst{
    from {background: red;}
    to {background: yellow;}
  }

  /* 当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变 */
  @keyframes myfirst{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
  }

  div{
    animation: myfirst 5s;
  }
```

animation: 动画名称 动画时间 速度曲线 动画何时开始 播放次数 动画下一周期是否逆向播放

- @keyframes|规定动画。
- animation ——所有动画属性的简写属性，除了 animation-play-state 属性。
- animation-name ——规定 @keyframes 动画的名称。
- animation-duration ——规定动画完成一个周期所花费的秒或毫秒。默认是 0。
- animation-timing-function ——规定动画的速度曲线。默认是 "ease"。
- animation-delay ——规定动画何时开始。默认是 0。
- animation-iteration-count ——规定动画被播放的次数。默认是 1。
- animation-direction ——规定动画是否在下一周期逆向地播放。默认是 "normal"。
- animation-play-state ——规定动画是否正在运行或暂停。默认是 "running"。
- animation-fill-mode ——规定对象动画时间之外的状态。

## 多列

- column-count: 3  ——将规定元素分割成3列
- colunm-gap: 10px ——列间隔
- column-rule: 3px outset #ccc; ——列之间的宽度、样式、颜色
