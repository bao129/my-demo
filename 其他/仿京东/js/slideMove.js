//滑动块变换函数
function slideMove(elemId,totalLen,totalNum,num){
	var moveLen = (totalLen / totalNum) * num;
	var elem = document.getElementById(elemId);
	var computedStyle = document.defaultView.getComputedStyle(elem,null)
	var xpos = parseInt(computedStyle.left);
	var dist = 0;
	if(elem.moveslide) {
		clearTimeout(elem.moveslide);
	}
	if(xpos == moveLen) {
		return true;
	}
	if(xpos < moveLen) {
		dist = Math.ceil((moveLen - xpos)/10)
		xpos = xpos + dist;
	}
	if(xpos > moveLen) {
		dist = Math.ceil((xpos - moveLen)/10)
		xpos = xpos - dist;
	}
	elem.style.left = xpos + "px";
	var repeat =  "slideMove('" + elemId + "'," + totalLen + "," + totalNum + "," + num + ")";
	elem.moveslide = setTimeout(repeat,10);
}

//获取滑动块ID，滑动的总长度，滑动总次数，本次滑动次数，并传入滑动变换函数运行
function getSlide(event) {
	var infoBox = event.currentTarget.getElementsByClassName("info-box");
	var infoOntxt = /infoOn/g;
	var infoOfftxt = /infoOff/g;
	var infoOnElem = event.currentTarget.getElementsByClassName("infoOn")[0];
	var slideStrip = event.currentTarget.getElementsByClassName("slide-strip")[0];
	var slideLump = slideStrip.getElementsByClassName("slide-lump")[0];
	var slideLumpId = slideLump.getAttribute("id");
	var computedStyle = document.defaultView.getComputedStyle(slideStrip,null)
	var totalLen = parseInt(computedStyle.width);
	var slideItem = event.currentTarget.getElementsByClassName("slide-list")[0].getElementsByTagName("a");
	for(var i = 0; i < slideItem.length; i++) {
		if(event.target == slideItem[i]) {
			slideMove(slideLumpId,totalLen,slideItem.length,i);
			infoOnElem.className = infoOnElem.className.replace(" infoOn", " infoOff");
			infoBox[i].className = infoBox[i].className.replace(" infoOff"," infoOn");
			break;
		}
	}
}

//给滑动的区域设置监听器
function slideEvent() {
	var slideBox = document.getElementsByClassName("slide-box");
	for(var i = 0; i < slideBox.length; i++){
		slideBox[i].addEventListener("mouseover",getSlide,false);
	}
}

addLoadEvent(slideEvent);//设置滑动监听器