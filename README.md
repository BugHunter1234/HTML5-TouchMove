# HTML5-TouchMove
HTML5触摸事件(touchstart、touchmove和touchend) HBuilder，MUI

触摸事件(touch)会在用户手指放在屏幕上面的时候、在屏幕上滑动的时候或者是从屏幕上移开的时候出发。下面具体说明：

　　touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
　　touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
　　touchend事件：当手指从屏幕上离开的时候触发。
　　touchcancel事件：当系统停止跟踪触摸的时候触发。关于这个事件的确切出发时间，文档中并没有具体说明，咱们只能去猜测了。
  
　　上面的这些事件都会冒泡，也都可以取消。虽然这些触摸事件没有在DOM规范中定义，但是它们却是以兼容DOM的方式实现的。所以，每个触摸事件的event对象都提供了在鼠标实践中常见的属性：bubbles(起泡事件的类型)、cancelable(是否用 preventDefault() 方法可以取消与事件关联的默认动作)、clientX(返回当事件被触发时，鼠标指针的水平坐标)、clientY(返回当事件触发时，鼠标指针的垂直坐标)、screenX(当某个事件被触发时，鼠标指针的水平坐标)和screenY(返回当某个事件被触发时，鼠标指针的垂直坐标)。除了常见的DOM属性，触摸事件还包含下面三个用于跟踪触摸的属性。

　　touches：表示当前跟踪的触摸操作的touch对象的数组。
　　targetTouches：特定于事件目标的Touch对象的数组。
　　changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。

　　每个Touch对象包含的属性如下。
　　clientX：触摸目标在视口中的x坐标。
　　clientY：触摸目标在视口中的y坐标。
　　identifier：标识触摸的唯一ID。
　　pageX：触摸目标在页面中的x坐标。
　　pageY：触摸目标在页面中的y坐标。
　　screenX：触摸目标在屏幕中的x坐标。
　　screenY：触摸目标在屏幕中的y坐标。
　　target：触目的DOM节点目标。
