
**任务说明**

当鼠标在链接之间移动时添加一个动画效果，使得背景随之移动

## HTML



## CSS

* `position: absolute`
* `transform: translate(x, y)` 用于移动元素，相比与直接改变其位置的 `top/left` 性能更好，且动画效果更平滑

## JS

* `element.getBoundingClientRect()` 用于获取元素的窗口坐标
* `window.pageXOffset/window.scrollX` 和 `window.pageYOffset/window.scollY` 用于将元素的窗口坐标转换为页面坐标
* `element.style.cssText` 用于读写元素的 `style` 属性，可以一次性修改元素的整个样式
* 将 `mouseover` 和 `mouseout` 事件委托给父元素
