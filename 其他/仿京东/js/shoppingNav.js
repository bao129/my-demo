var spnavBox = document.getElementsByClassName("spnav-box")[0];//获取菜单盒子
var shoppingNav = document.getElementsByClassName("shopping-nav")[0];//获取菜单
var navItem = shoppingNav.getElementsByTagName("li");//获取菜单项
var shoppingTb = document.getElementsByClassName("shopping-tb")[0];//获取菜单列表
var tbItem = shoppingTb.getElementsByTagName("aside");//获取列表项

//菜单和菜单列表显示函数
function navOver(event) {
	shoppingTb.style.display = "block";
	if(shoppingNav.getElementsByClassName("navOn")[0]) {
		var navOn =  document.getElementsByClassName("navOn")[0];
		var navOnTxt = navOn.className;
		navOnTxt = navOnTxt.replace("navOn","");
		navOn.className = navOnTxt;
	}
	if(shoppingTb.getElementsByClassName("tbOn")[0]) {
		var tbOn =  document.getElementsByClassName("tbOn")[0]
		var tbOnTxt = tbOn.className;
		tbOnTxt = tbOnTxt.replace("tbOn","");
		tbOn.className = tbOnTxt;
	}
	for(var i = 0; i < navItem.length; i++) {
		if(event.currentTarget == navItem[i]) {
			navItem[i].className = "navOn";
			tbItem[i].className = "tbOn";
			break;
		}
	}
}
//菜单和菜单列表退出函数
function navOut(event) {
	shoppingTb.style.display = "none";
	shoppingNav.getElementsByClassName("navOn")[0].className = "";
	shoppingTb.getElementsByClassName("tbOn")[0].className = "";
}

//菜单监听器
function navEvent() {
	for(var i = 0; i < navItem.length; i++) {
		navItem[i].addEventListener("mouseover", navOver, false);
	}
	spnavBox.addEventListener("mouseleave",navOut,false);
}

addLoadEvent(navEvent);//为菜单设置监听器