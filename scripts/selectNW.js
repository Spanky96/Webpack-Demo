function changeNS(object) {
  		if(confirm("您确定要切换到"+object.innerText+"的空间吗")){
    		top.frame1.onbeforeunload="";
    		top.location="/changeNS.jsp?ns="+object.id;
  	}else{
    	    document.getElementById("ns").style.display = "none";
  	}
}
function selectNS() {
	if(document.getElementById("wangzhan"))
	document.getElementById("wangzhan").style.display = "none";
	var aa = document.getElementById("aa");
	var ns = document.getElementById("ns");
	ns.style.display = "block";
	ns.style.border = "black 1px solid";
	ns.style.position = "absolute";
	var left = calculateOffset(aa,"offsetLeft")-455;
	var top = calculateOffset(aa,"offsetTop")+aa.offsetHeight;
	//alert(left);
	//alert(top);
	ns.style.left = left+"px";
	ns.style.top = top+"px";
	ns.style.width = "500px";
	ns.focus();
}
function delDiv() {
	document.getElementById('ns').style.display = 'none';
}
function changeBackcolor(object) {
	object.style.backgroundColor   = "#6eafe7";
}
function goBackcolor(object) {
	object.style.backgroundColor   = "#ffffff";
}
function selectWZ() {
	if(document.getElementById("ns"))
	document.getElementById("ns").style.display = "none";
	var wz = document.getElementById("wz");
	var wangzhan = document.getElementById("wangzhan");
	wangzhan.style.display = "block";
	wangzhan.style.border = "black 1px solid";
	wangzhan.style.position = "absolute";
	wangzhan.style.overflow = "visible";
	var left = calculateOffset(wz,"offsetLeft")-255;
	var top = calculateOffset(wz,"offsetTop")+wz.offsetHeight;
	//alert(left);
	//alert(top);
	wangzhan.style.left = left+"px";
	wangzhan.style.top = top+"px";
	wangzhan.style.width = "300px";
	wangzhan.focus();
}
function delDiv1() {
	document.getElementById('wangzhan').style.display = 'none';
}
function calculateOffset(field, attr) {
	var offset = 0;
	while (field) {
		offset += field[attr];
		field = field.offsetParent;
	}
		return offset;
}