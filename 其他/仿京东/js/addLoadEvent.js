//页面加载完成启动多个指定函数的函数方法
function addLoadEvent (func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}