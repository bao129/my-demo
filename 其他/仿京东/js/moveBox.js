var moveBox = document.getElementsByClassName("move-box");

//在此处添加定时器自动运行变换函数
function moveStart() {
	moveBox[0].movement = setInterval("changeTo(moveBox[0])", 3500);
	moveBox[1].movement = setInterval("changeTo(moveBox[1])", 3500);
	moveBox[2].movement = setInterval("changeTo(moveBox[2])", 3500);
	moveBox[3].movement = setInterval("changeTo(moveBox[3])", 3500);
}

//初始化所有动画盒子及其内容
function iniMoveBox() {
	var moveBox = document.getElementsByClassName("move-box");
	var imgList,
	    walker,
	    firstImg,
	    indexList,
	    firstLi;
	for(var i = 0; i < moveBox.length; i++) {
		moveBox[i].style.backgroundImage = "none";
		imgList = moveBox[i].getElementsByClassName("move-img-list")[0];
		imgList.style.display = "block";
		walker = document.createTreeWalker(imgList, NodeFilter.SHOW_ELEMENT, null, false);
		firstImg = walker.firstChild();
		if(firstImg.className.length == 0) {
			firstImg.className = "imgOn";
		} else {
			firstImg.className += " imgOn";
		}
		if(!(moveBox[i].getElementsByClassName("move-index-list")[0])) continue;
		indexList = moveBox[i].getElementsByClassName("move-index-list")[0];
		indexList.style.display = "block";
		firstLi = indexList.getElementsByTagName("li")[0]
		firstLi.className = "indexOn";
	}
}

//设置透明度
function setOpacity(elem, level) {
	elem.style.opacity = level / 100;
}

//淡入处理函数
function fadeIn(elem) {
	setOpacity(elem, 0); //初始全透明
	for(var i = 0; i <= 20; i++) { //透明度改变 20 * 5 = 100
		(function() {
			var level = i * 5; //透明度每次变化值
			setTimeout(function() {
				setOpacity(elem, level)
			}, i * 5); //i * 25 即为每次改变透明度的时间间隔
		})(i); //每次循环变化一次
	}
}

//淡出处理函数
function fadeOut(elem) {
	for(var i = 0; i <= 20; i++) { //透明度改变 20 * 5 = 100
		(function() {
			var level = 100 - i * 5; //透明度每次变化值
			setTimeout(function() {
				setOpacity(elem, level)
			}, i * 5); //i * 25 即为每次改变透明度的时间间隔
		})(i); //每次循环变化一次
	}
}

//变换函数
function changeTo(elem, num) {
	var imgList = elem.getElementsByClassName("move-img-list")[0];
	var imgArr = [];
	var walkerImg = document.createTreeWalker(imgList, NodeFilter.SHOW_ELEMENT, null, false);
	var nodeImg = walkerImg.firstChild();
	while(nodeImg !== null) {
		imgArr.push(nodeImg);
		nodeImg = walkerImg.nextSibling();
	}
	var imgOntxt = /imgOn/;
	var curNum;
	for(var i = 0; i < imgArr.length; i++) {
		if(imgOntxt.test(imgArr[i].className)) {
			curNum = i;
			break;
		}
	}
	if(curNum < imgArr.length - 1) {
		curNum++;
	} else {
		curNum = 0;
	}
	var curImg = elem.getElementsByClassName("imgOn")[0];
	fadeOut(curImg);
	var curImgClassName = curImg.className;
	curImg.className = curImgClassName.replace("imgOn", "");
	if(typeof(num) !== "undefined") {
		if(imgArr[num].className.length == 0) {
			imgArr[num].className = "imgOn";
		} else {
			imgArr[num].className += " imgOn";
		}
		fadeIn(imgArr[num]);
	} else {
		if(imgArr[curNum].className.length == 0) {
			imgArr[curNum].className = "imgOn";
		} else {
			imgArr[curNum].className += " imgOn";
		}
		fadeIn(imgArr[curNum]);
	}
	var indexList = elem.getElementsByClassName("move-index-list")[0];
	var indexArr = indexList.getElementsByTagName("li");
	var curIndex = elem.getElementsByClassName("indexOn")[0];
	if(elem.getElementsByClassName("move-index-list")[0]) {
		curIndex.className = " ";
		if(typeof(num) !== "undefined") {
			indexArr[num].className = "indexOn";
		} else {
			indexArr[curNum].className = "indexOn";
		}

	}
}

//鼠标滑入动画盒子时执行
function moveBoxMouseover(event) {
	clearInterval(event.currentTarget.movement);
	var indexArr = event.currentTarget.getElementsByClassName("move-index-list")[0].getElementsByTagName("li");
	if(event.currentTarget.getElementsByClassName("move-index-list")[0]) {
		for(var i = 0; i < indexArr.length; i++) {
			if(indexArr[i] == event.target) {
				if(indexArr[i].className == "indexOn") break;
				changeTo(event.currentTarget, i);
				break;
			}
		}
	}
	var lrIndexList = event.currentTarget.getElementsByClassName("move-lr-index")[0];
	if(event.currentTarget.getElementsByClassName("move-lr-index")[0]){
		lrIndexList.style.display = "block";
	}
}

//鼠标滑出动画盒子时执行
function moveBoxMouseout(event) {
	var _curI;
	for(var i = 0; i < moveBox.length; i++) {
		if(event.currentTarget === moveBox[i]) {
			_curI = i;
			moveBox[i].movement = setInterval(function() {
				changeTo(moveBox[_curI]);
			}, 3500);
			break;
		}
	}
	var lrIndexList = event.currentTarget.getElementsByClassName("move-lr-index")[0];
	if(event.currentTarget.getElementsByClassName("move-lr-index")[0]){
		lrIndexList.style.display = "none";
	}
}

//鼠标点击左右移动按钮时执行
function moveBoxLRclick (event) {
	var l_index = event.currentTarget.getElementsByClassName("left-index")[0];
	var r_index = event.currentTarget.getElementsByClassName("right-index")[0];
	var imgList = event.currentTarget.getElementsByClassName("move-img-list")[0];
	var imgArr = [];
	var walkerImg = document.createTreeWalker(imgList, NodeFilter.SHOW_ELEMENT, null, false);
	var nodeImg = walkerImg.firstChild();
	while(nodeImg !== null) {
		imgArr.push(nodeImg);
		nodeImg = walkerImg.nextSibling();
	}
	var _curI;
	for(var i = 0; i < imgArr.length; i++) {
		var imgOntxt = /imgOn/;
		if(imgOntxt.test(imgArr[i].className)) {
			_curI = i;
			break;
		}
	}
	if(event.target == l_index) {
		if(_curI == 0){
			changeTo(event.currentTarget, imgArr.length - 1);
		}
		else {
			_curI--;
			changeTo(event.currentTarget, _curI);
		}
	}
	if(event.target == r_index) {
		if(_curI == imgArr.length - 1){
			changeTo(event.currentTarget, 0);
		}
		else {
			_curI++;
			changeTo(event.currentTarget, _curI);
		}
	}
}

//为所有动画盒子设置事件监听器
function moveBoxEvent() {
	for(var i = 0; i < moveBox.length; i++) {
		moveBox[i].addEventListener("mouseover", moveBoxMouseover, false);
		moveBox[i].addEventListener("mouseout", moveBoxMouseout, false);
		moveBox[i].addEventListener("click", moveBoxLRclick, false);
	}
}

//页面加载完毕运行指定函数
addLoadEvent(iniMoveBox);//初始化动画盒子
addLoadEvent(moveStart);//开始动画变换
addLoadEvent(moveBoxEvent)//为动画盒子添加事件监听