/**
 *作者：444811716@qq.com
 *时间：2016-10-28
 *描述：手势移动事件
 */
var TouchMove = (function(mod) {

	//触摸事件(touch)会在用户手指放在屏幕上面的时候、在屏幕上滑动的时候或者是从屏幕上移开的时候出发。
	//下面具体说明
	//touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
	//touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
	//touchend事件：当手指从屏幕上离开的时候触发。
	//touchcancel事件：当系统停止跟踪触摸的时候触发。关于这个事件的确切出发时间，文档中并没有具体说明，咱们只能去猜测了。

	//触摸事件还包含下面三个用于跟踪触摸的属性。
	//touches：表示当前跟踪的触摸操作的touch对象的数组。
	//targetTouches：特定于事件目标的Touch对象的数组。
	//changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。

	//每个Touch对象包含的属性如下。
	//clientX：触摸目标在视口中的x坐标。
	//clientY：触摸目标在视口中的y坐标。
	//identifier：标识触摸的唯一ID。
	//pageX：触摸目标在页面中的x坐标。
	//pageY：触摸目标在页面中的y坐标。
	//screenX：触摸目标在屏幕中的x坐标。
	//screenY：触摸目标在屏幕中的y坐标。
	//target：触目的DOM节点目标。

	/**
	 * 增加监听
	 */
	mod.addTouchListener = function(table) {
		//获取页面中的宽高
		var screen = {
			height: plus.screen.resolutionHeight - plus.navigator.getStatusbarHeight(), //屏幕高度-状态栏高度
			width: plus.screen.resolutionWidth //屏幕宽度
		};
		//获取table的宽高
		var table_width = table.offsetWidth;
		var table_height = table.offsetHeight;

		//根据宽高的大小判断是否放大和如何放大
		if(table_width > table_height) {
			//宽大于高
			if(table_height < screen.width / 2) {
				//高度小于屏幕的一半
				table.style.height = screen.width / 2 + 'px'; //设置table的高度为屏幕1/2的宽度
				table.style.width = table_width * (screen.width / 2 / table_height) + 'px'; //宽度按比例放大
			}
		} else {
			//高大于宽
			if(table_width < screen.width / 2) {
				//宽度小于屏幕的一半
				table.style.width = screen.width / 2 + 'px'; //设置图片的宽度为屏幕的宽度
				table.style.height = table_height * (screen.width / 2 / table_width) + 'px'; //高度按比例放大
			}
		}

		//设置table居中
		//获取设置后table的宽高
		var table_width_original = table.offsetWidth;
		var table_height_original = table.offsetHeight;

		table.style.left = (screen.width - table_width_original) / 2 + 'px';
		table.style.top = (screen.height - table_height_original) / 2 + 'px';

		//判断是否在移动
		var moved = false;
		//移动table时记录手指的坐标
		var movedx = 0;
		var movedy = 0;
		//放大缩小table时记录手指坐标
		var changex = 0;
		var changey = 0;
		//
		var left = 0;
		//增加监听
		document.addEventListener('touchstart', touch, false);
		document.addEventListener('touchmove', touch, false);
		document.addEventListener('touchend', touch, false);

		function touch(event) {
			var event = event || window.event;
			switch(event.type) {
				case "touchstart":
					moved = false;
					break;
				case "touchend":
					movedx = 0;
					movedy = 0;
					moved = false;
					break;
				case "touchmove":
					event.preventDefault(); //阻止滚动
					if(event.touches[1] != undefined) {
						//有第二个触点
						changeTable(table, event.touches[0], event.touches[1]); //放大缩小table
					} else {
						moveTable(event.touches[0], table); //移动table
						moved = true;
					}
					break;
			}
		}

		/**
		 * 移动元素
		 * @param {Object} data 点击对象的数据
		 */
		function moveTable(data, table) {
			if(data.target.getAttribute('id') == table.id) {
				if(movedx == 0) {
					movedx = data.clientX;
					movedy = data.clientY;
				} else {
					var x = movedx - data.clientX;
					var y = movedy - data.clientY;

					var table_x = table.offsetLeft;
					var table_y = table.offsetTop;
					var table_width = table.offsetWidth;
					var table_height = table.offsetHeight;

					if(x >= 0) { //左移
						table.style.left = (table_x - Math.abs(x)) + 'px';
					} else { //右移
						table.style.left = (table_x + Math.abs(x)) + 'px';
					}

					if(y >= 0) { //上移
						table.style.top = (table_y - Math.abs(y)) + 'px';
					} else { //下移
						table.style.top = (table_y + Math.abs(y)) + 'px';
					}
					//记录本次坐标
					movedx = data.clientX;
					movedy = data.clientY;

					//将table限制在屏幕宽度的1/4圆圈的范围区域内
					//获取table坐标和宽高
					var table_x = table.offsetLeft;
					var table_y = table.offsetTop;
					var table_width = table.offsetWidth;
					var table_height = table.offsetHeight;

					//限制右移区域
					if(table_x >= screen.width / 4 && x < 0) {
						//如果x坐标大于屏幕宽度的1/4，并且右移时
						table.style.left = (screen.width / 4) + 'px';
					}
					//限制左移区域
					if(table_x + table_width <= (screen.width * 3 / 4) && x > 0) {
						//如果x坐标加上table的宽度，小于屏幕宽度的3/4，并且左移时
						table.style.left = (screen.width * 3 / 4) - table_width + 'px';
					}
					//限制下移区域
					if(table_y >= (screen.height / 2 - screen.width / 4) && y < 0) {
						//如果y坐标，大于圆圈顶部的坐标，并且下移时
						if(table_height > (screen.width / 2)) {
							//如果table的高度大于屏幕宽度的1/2（在圆圈范围内）
							table.style.top = (screen.height / 2 - screen.width / 4) + 'px';
						} else {
							table.style.top = (screen.height / 2 + screen.width / 4 - table_height) + 'px';
						}
					}
					//限制上移区域
					if(table_y + table_height <= (screen.height / 2 + screen.width / 4) && y > 0) {
						//如果y坐标，大于圆圈底部的坐标，并且上移时
						if(table_height > (screen.width / 2)) {
							//如果table的高度大于屏幕宽度的1/2（在圆圈范围内）
							table.style.top = (screen.height / 2 + screen.width / 4 - table_height) + 'px';
						} else {
							table.style.top = (screen.height / 2 - screen.width / 4) + 'px';
						}
					}
				}
			}
		}

		function changeTable(table, touch1, touch2) {

			//touch1坐标
			var x1 = parseInt(touch1.clientX);
			var y1 = parseInt(touch1.clientY);
			//touch2坐标
			var x2 = parseInt(touch2.clientX);
			var y2 = parseInt(touch2.clientY);
			//获取touch之间的距离
			var x = Math.abs(x1 - x2);
			var y = Math.abs(y1 - y2);
			//				console.log('---------------');
			//				console.log('x|y:' + x + '|' + y);
			//与上一次touch比较
			var changex2 = changex - x;
			var changey2 = changey - y;

			//				console.log('changex:' + changex);
			//				console.log('changey:' + changey);
			//				console.log('x:' + x);
			//				console.log('y:' + y);
			//				console.log('changex2:' + changex2);
			//				console.log('changey2:' + changey2);

			//获取table坐标和宽高
			var table_x = table.offsetLeft;
			var table_y = table.offsetTop;
			var table_width = table.offsetWidth;
			var table_height = table.offsetHeight;

			//改变宽度高度
			if(Math.abs(changex2) <= 15 && Math.abs(changey2) <= 15) {
				//限制两个触点的变化距离
				var change = changex2 + changey2; //根据x,y总体的大小判断是缩小还是放大
				if(change >= 0) { //缩小
					if(table_width - Math.abs(change) >= screen.width / 2 && table_height - Math.abs(change) >= screen.width / 2) {
						//缩小后的宽高要大于屏幕的1/2
						table.style.width = (table_width - Math.abs(change)) + 'px';
						table.style.height = table_height * (table_width / (table_width - Math.abs(change)));
					}
				} else { //放大
					table.style.width = (table_width + Math.abs(change)) + 'px';
					table.style.height = table_height * (table_width / (table_width + Math.abs(change)));
				}

				//获取设置后table的宽高
				var table_x_after = table.offsetLeft;
				var table_y_after = table.offsetTop;
				var table_width_after = table.offsetWidth;
				var table_height_after = table.offsetHeight;
				if(table_y_after + table_height_after <= screen.height / 2 + screen.width / 4) {
					table.style.top = table_y_after + Math.abs(change) + 'px';
				}
				if(table_x_after + table_width_after <= screen.width * 3 / 4) {
					table.style.left = table_x_after + Math.abs(change) + 'px';
				}
			}

			//记录本次change
			changex = x;
			changey = y;
		}
	}

	return mod;
})(window.TouchMove || {});