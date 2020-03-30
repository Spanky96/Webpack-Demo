var offsetfromcursorX=12 //Customize x offset of tooltip
var offsetfromcursorY=10 //Customize y offset of tooltip
var offsetdivfrompointerX=10 //Customize x offset of tooltip DIV relative to pointer image
var offsetdivfrompointerY=14 //Customize y offset of tooltip DIV relative to pointer image. Tip: Set it to (height_of_pointer_image-1).
document.write('<div id="dhtmltooltip" style = "position:absolute;left: -300px;width: 100px;border: 1px solid black;padding: 2px;background-color: #FFFFCC;visibility: hidden;z-index: 1000;filter: progid:DXImageTransform.Microsoft.Shadow(color=gray,direction=135);"></div>') //write out tooltip DIV
document.write('<img id="dhtmlpointer" style = "position:absolute;left: -300px;z-index: 1001;visibility: hidden;" src="/images/arrow.gif">') //write out pointer image
var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""
var pointerobj=document.all? document.all["dhtmlpointer"] : document.getElementById? document.getElementById("dhtmlpointer") : ""
document.onmousemove=positionTip

function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showTip(thewidth, thecolor){
	if (ns6||ie){
		//if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
		//if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
		tipobj.innerHTML=this.getAttribute("tip");
		enabletip=true
		return false
	}
}
function positionTip(e){
	if (enabletip){
		var nondefaultpos=false
		var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
		var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
		//Find out how close the mouse is to the corner of the window
		var winwidth=ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20
		var winheight=ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20
		var rightedge=ie&&!window.opera? winwidth-event.clientX-offsetfromcursorX : winwidth-e.clientX-offsetfromcursorX
		var bottomedge=ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY
		var leftedge=(offsetfromcursorX<0)? offsetfromcursorX*(-1) : -1000
		//if the horizontal distance isn't enough to accomodate the width of the context menu
		if (rightedge<tipobj.offsetWidth){
			//move the horizontal position of the menu to the left by it's width
			var l=curX-tipobj.offsetWidth;
			if(l<2) l=2;
			tipobj.style.left=l+"px"
			nondefaultpos=true
		}
		else if (curX<leftedge) tipobj.style.left="2px"
		else{
			//position the horizontal position of the menu where the mouse is positioned
			tipobj.style.left=curX+offsetfromcursorX-offsetdivfrompointerX+"px"
			pointerobj.style.left=curX+offsetfromcursorX+"px"
		}
		//same concept with the vertical position
		if (bottomedge<tipobj.offsetHeight){
			tipobj.style.top=curY-tipobj.offsetHeight-offsetfromcursorY+"px"
			nondefaultpos=true
		}else{
			tipobj.style.top=curY+offsetfromcursorY+offsetdivfrompointerY+"px"
			pointerobj.style.top=curY+offsetfromcursorY+"px"
		}
		tipobj.style.visibility="visible"
		if (!nondefaultpos)  pointerobj.style.visibility="visible"
		else pointerobj.style.visibility="hidden"
	}
}
function hideTip(){
	if (ns6||ie){
		enabletip=false
		tipobj.style.visibility="hidden"
		pointerobj.style.visibility="hidden"
		tipobj.style.left="-1000px"
		tipobj.style.width=''
	}
}

function initTip(){
	var aTag = getElementsByClassName("coolButton");
	for(k = 0; k < aTag.length;k++){
	  var tip = aTag[k].getAttribute("tip");
	  if(tip != null && tip != ""){
	    aTag[k].onmouseover = showTip;
	    aTag[k].onmouseout = hideTip;
	  }
	}
//	aTag = document.getElementsByTagName("A");
//	for(k = 0; k < aTag.length;k++){
//	  var tip = aTag[k].getAttribute("tip");
//	  if(tip != null && tip != ""){
//	    aTag[k].onmouseover = showTip;
//	    aTag[k].onmouseout = hideTip;
//	  }
//	}
}
