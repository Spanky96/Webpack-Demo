function add(){
  centWin("edit.jsp");
}
function view(id){
  centWin('viewContent.jsp?id='+id);
}
function edit(id){
	if(id) thisId=id;
	if (thisId != null) {//处理含参数情况
		centWin("edit.jsp?id=" + thisId);
	} else {
		alert("请先选定待操作的对象(限一条)！");
	}
}
function del(id) {
    if(id) thisIds=id;
	if (thisIds != null) {
		msg = "您确实要删除选定的记录吗？";
		if (window.confirm(msg)) {
			showInfo();
			parent.action_bar.location = "del.jsp?id=" + thisIds;
		}
	} else {
		alert("请先选定待删除的对象！");
	}
}
//function del(id){
//  if(id) thisIds=id;
//  if(thisIds != null) {
//    msg="您确实要删除选定的记录吗？";
//    if(window.confirm(msg)){
//    	showInfo();
//	    //var msg=sendSync("manage.jsp?how=del&id="+thisIds);
//	    //alert("删除操作成功");//??
//	    //location.reload();
//	    popWin("manage.jsp?how=del&id="+thisIds);
//    }
//  }else{
//    alert("请先选定待删除的对象！");
//  }
//}
function importAddr(){
  popWin("import.jsp");
}
function exportAddr(){
  location="download.jsp";
}
function act(how){
  if(thisIds != null) {
    popWin("selectFolder.jsp?how="+how+"&ids="+thisIds);
  }else{
    alert("请先选定待操作的对象！");
  }
}
////////以上是主要方法
function newUrl(url,qStr){
   var now=new Date();
   var newUrl=url;
   index=url.indexOf("?");
   if(index<0) newUrl+="?";
   else newUrl+="&";
   
   newUrl+="now="+now.getTime();
   if(qStr) newUrl+="&"+qStr;
   return newUrl;
}
function sendAsync(sUri) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", newUrl(sUri), true);//newUrl保证提交
	xmlHttp.send(null);
}
function sendSync(sUri) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", newUrl(sUri), false);//newUrl保证提交
	xmlHttp.send(null);
	return trim(xmlHttp.responseText);
}

function getXmlHttpPrefix() {
	if (getXmlHttpPrefix.prefix) {
		return getXmlHttpPrefix.prefix;
	}
	var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
	var o;
	for (var i = 0; i < prefixes.length; i++) {
		try {
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			return getXmlHttpPrefix.prefix = prefixes[i];
		}
		catch (ex) {
		}
	}
	throw new Error("Could not find an installed XML parser");
}

// XmlHttp factory
function XmlHttp() {
}
XmlHttp.create = function () {
	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();

			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (req.readyState == null) {
				req.readyState = 1;
				req.addEventListener("load", function () {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function") {
						req.onreadystatechange();
					}
				}, false);
			}
			return req;
		}
		if (window.ActiveXObject) {
			return new ActiveXObject(getXmlHttpPrefix() + ".XmlHttp");
		}
	}
	catch (ex) {
	}
	// fell through
	throw new Error("Your browser does not support XmlHttp objects");
};

// Create the loadXML method and xml getter for Mozilla
if (window.DOMParser && window.XMLSerializer && window.Node && Node.prototype && Node.prototype.__defineGetter__) {

	// XMLDocument did not extend the Document interface in some versions
	// of Mozilla. Extend both!
	//XMLDocument.prototype.loadXML =
	Document.prototype.loadXML = function (s) {

		// parse the string to a new doc
		var doc2 = (new DOMParser()).parseFromString(s, "text/xml");

		// remove all initial children
		while (this.hasChildNodes()) {
			this.removeChild(this.lastChild);
		}

		// insert and import nodes
		for (var i = 0; i < doc2.childNodes.length; i++) {
			this.appendChild(this.importNode(doc2.childNodes[i], true));
		}
	};
	Document.prototype.__defineGetter__("xml", function () {
		return (new XMLSerializer()).serializeToString(this);
	});
}

//////////////以上是不同的方法
//var queryStr;
var info = null;
var o = null;
var tp1 = null;
var layout = null;
function init() {
	if (document.getElementById("container")) {
		layout = "main_half";
	} else {
		layout = "main_full";
	}
//	alert(layout);
	if (layout) {
		createO();
		createInfo();
		calcSize1();
		window.onresize = calcSize1;
		if (tp1) {
			tp1.select();
		}
	}
	var myForm = document.forms.myForm;
	if (myForm) {
		myForm.onsubmit = function () {
			for (var i = 0; i < this.elements.length; i++) {
				var el = this.elements[i];
				if (!check(el)) {
					return false;
				}
			}
			showInfo();
			return true;
		};
	}
}
window.onload = init;
function calcSize1() {
	var dw = (window.innerWidth) ? window.innerWidth : document.documentElement.clientWidth;
	var dh = (window.innerHeight) ? window.innerHeight : document.documentElement.clientHeight;
	if (o) {
		o.resize(dw - 4, dh / 2 - 48);
	}
	if (layout.indexOf("main") >= 0) {
		resizeInfo(dw, dh);
	}
	var ifrs = document.getElementsByTagName("iframe");
	for (var i = 0; i < ifrs.length; i++) {
		if (layout == "main_half") {
			ifrs[i].height = dh / 2 - 7;
		} else {
			if (layout == "main_full") {
				ifrs[i].height = dh - 50;
			} else {
				ifrs[i].height = dh - 28;
			}
		}
	}
}
function createO() {
	if (o) {
		return;
	}
	if (document.getElementById("container")) {
		o = new WebFXColumnList();
		o.bind(document.getElementById("container"), document.getElementById("head"), document.getElementById("body"));
		o.selectRow(0);
		o.focus();
	}
}
function createInfo() {
//	if (window != top.main&&parent!=top.main) {
//		return;
//	}
	if (info != null) {
		return;
	}
	info = document.createElement("table");
//info.outerHTML="<table id='info' style='' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center'><span style='border:1px solid buttonshadow;background-color:white;padding:4px;font-size:16px'>正在处理请求，请稍候...</span></td></tr></tbody></table>";
	info.id = "info";
	info.border = "0px";
//info.width="300px";
//info.height="300px";
	info.cellSpacing = "0px";
	info.cellPadding = "0px";
	info.style.cssText = "top:0px;left:0px;background-color:#CED3F7;display:none;position:absolute;z-index:10;filter:alpha(opacity=70)";
//info.style.top="0px";
//info.style.left="0px";
//info.style.position="absolute";
//info.style.backgroundColor="#CED3F7";
//info.style.display="block";
//info.style.zIndex="10";
//info.style.filter="alpha(opacity=70)";
	document.body.appendChild(info);
//top.tagInfo(info.style);
// TBODY is required for IE, otherwise you don't see anything in the TABLE.
	var tbody = document.createElement("tbody");
	info.appendChild(tbody);
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	var td = document.createElement("td");
	td.align = "center";
	tr.appendChild(td);
	var span = document.createElement("span");
	span.style.cssText = "border:1px solid buttonshadow;background-color:white;padding:4px;font-size:16px";
//span.style.border="1px solid buttonshadow";
//span.style.backgroundColor="#ffffff";
//span.style.padding="4px";
//span.style.fontSize="16px";
	span.innerHTML = "正在处理请求，请稍候...";
	td.appendChild(span);
}
function showInfo() {
	if (info) {
		info.style.display = "block";
	}
}
function hideInfo() {
	if (info) {
		info.style.display = "none";
	}
}
function resizeInfo(dw, dh) {
	info.style.width = dw + "px";
	info.style.height = dh + "px";
}
function centWin(url,w,h){
  if(!w) w=700;
  if(!h) h=500;
  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;
  openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top="+t+",left="+l);
}
function centWinNo(url,w,h){
  if(!w) w=700;
  if(!h) h=500;
  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;
  openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top="+t+",left="+l);
}

function popWin(url){
  l=screen.availWidth;
  t=screen.availHeight;
  w=screen.availWidth;
  h=screen.availHeight;
  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,top="+t+",left="+l);
}
//popup window noresizable
function popWinNo(url){
  l=screen.availWidth;
  t=screen.availHeight;
  w=screen.availWidth;
  h=screen.availHeight;
  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top="+t+",left="+l);
}
function popWinFor(url){
  if(thisId!=null){//处理含参数情况
    if(url.indexOf("?")>0) return popWin(url+"&id="+thisId);
    else return popWin(url+"?id="+thisId);
  }else{
    alert("请先选定待操作的对象(限一条)！");
  }
}
function openWin(url,target,attr){
  if(target!=null&&target.length>0) return window.open(url,target,attr);
  var win=window.open(url,"",attr);
  if(win) win.focus();
  return win;
}

function ept(type, queryStr) {
	location = "export" + type + ".jsp?" + queryStr;
}


function setCursor(frm) {
	frm.document.body.style.cursor = "help";
	if (frm.cursorHandler) {
		frm.retCur = frm.document.onmousedown;
		frm.document.onmousedown = frm.cursorHandler;
		frm.retTil = frm.document.body.title;
		frm.document.body.title = "点击查看当前页帮助信息!";
	}
	for (var i = 0; i < frm.frames.length; i++) {
		setCursor(frm.frames[i]);
	}
}
function retCursor(frm) {
	frm.document.body.style.cursor = "default";
	if (frm.cursorHandler) {
		frm.document.onmousedown = frm.retCur;
		frm.document.body.title = frm.retTil;
	}
	for (var i = 0; i < frm.frames.length; i++) {
		retCursor(frm.frames[i]);
	}
}
var helpWin = self;//可以在页面里赋值，如指定到parent
function cursorHandler() {
//  if(document.body.style.cursor=="help"){
	openWin("/common/help.jsp?w=" + helpWin.document.body.clientWidth + "&h=" + helpWin.document.body.clientHeight + "&loc=" + escape(helpWin.document.location), "", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no");
	retCursor(top);
	return false;
//  }
}
var printWin;
function printForm(content) {
//  printWin=openWin("","printWin","height=1200,width=1600,toolbar=no,menubar=no,location=no,top=2000");
	printWin = window.open("", "printWin", "width=" + screen.availWidth + ",height=" + screen.availHeight + ",left=0,top=0,toolbar=no,menubar=no,location=no");
	printWin.document.open();
	printWin.document.writeln("<html>");
	printWin.document.writeln("<head>");
	printWin.document.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
	printWin.document.writeln("<link rel=stylesheet type='text/css' href='/inc/style_print.css'>");
//  printWin.document.writeln("<script language='JavaScript' src='/js/print.js'></script>");
	printWin.document.writeln("</head>");
	printWin.document.writeln("<body onload='window.print();window.close();'>");
	if (content) {
		printWin.document.writeln(content);
	} else {
		if (container) {
			var newTable = container.cloneNode(true);
			newTable.style.cssText = "";
//    newTable.cellSpacing=1;
			newTable.bgColor = "#000000";
			printWin.document.writeln(newTable.outerHTML);
		}
	}
	printWin.document.writeln("</body>");
	printWin.document.writeln("</html>");
	printWin.document.close();
}

//function closePrintWin(){
//tagInfo(printWin);
//  if(printWin&&!printWin.closed){
//alert("closed");
//printWin.close();
//  }
//}
function check(it){
  if(it.checkDate){
    return checkDate(it,it.checkDate);
  }else if(it.checkTime){
    return checkTime(it,it.checkTime);
  }else if(it.checkTs){
    return checkTs(it,it.checkTs);
  }else if(it.checkNull){
    return checkNull(it,it.checkNull);
  }else if(it.checkInt){
    return checkInt(it,it.checkInt);
  }else if(it.checkFloat){
    return checkFloat(it,it.checkFloat);
  }else if(it.checkEmail){
    return checkEmail(it,it.checkEmail);
  }
  return true;
}

function checkDate(it,str){
  var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})$/;
  if (!re_date.exec(trim(it.value))){
    if(str) alert(str+"的格式不正确！");
    else alert("日期格式不正确！");
    try{it.focus();}catch(e){}
    return false;
  }
  return true;
}
function checkTime(it,str){
  var re_date =/^(\d{1,2})\:(\d{1,2})$/;
  if (!re_date.exec(trim(it.value))){
    if(str) alert(str+"的格式不正确！");
    else alert("时间格式不正确！");
    try{it.focus();}catch(e){}
    return false;
  }
  return true;
}
function checkTs(it,str){
  var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})\ (\d{1,2})\:(\d{1,2})$/;
  if (!re_date.exec(it.value)){
    if(str) alert(str+"的格式不正确！");
    else alert("日期或时间格式不正确！");
    try{it.focus();}catch(e){}
    return false;
  }
  return true;
}
function checkNull(it,str){
  var valueStr=it.value;
  if(it.name=="content"){//检查超文本编辑器？！
    try{
      valueStr=tinyMCE.getInstanceById("mce_editor_0").getBody().innerHTML;
    }catch(e){}
  }  
  if(trim(valueStr)==""){
    if(str) alert(str+"不能为空！");
    else alert("不能为空！");
    try{it.focus();}catch(e){}
    return false;
  }
  return true;
}
function checkInt(it,str){
  var value = it.value;
  for(var i = 0; i < value.length; i=i+1){
    var oneChar = value.charAt(i);
    if(oneChar < '0' || oneChar > '9'){
      if(str) alert(str+"的格式不正确！");
  	  else alert("输入数据格式错误！");
 	  try{it.focus();}catch(e){}
 	  return false ;
    }
  }
  return true;
}
function checkFloat(it,str){
  if(isNaN(parseFloat(it.value))){
    if(str) alert(str+"的格式不正确！");
    else alert("输入数据格式错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
  return true;
}

function checkEmail(it,str){
  if (re_email.exec(trim(it.value))) return true;
  else{
    if(str) alert(str+"的格式不正确！");
    else alert("电子邮件格式错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
} 
var re_email=/^\w+([-+.]\w+)*@([\w-]+)(\.[\w-]+)+$/;
var re_date_time = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
var re_date = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
var re_time = /^(\d{1,2}):(\d{1,2})$/;
var dateStr = "";
var timeStr = "";
function getStr(str) {
	dateStr = "";
	timeStr = "";
	if (str != "") {
		var r = null;
		if ((r = str.match(re_date)) != null) {
			dateStr = str;
		} else {
			if ((r = str.match(re_time)) != null) {
				timeStr = str;
			} else {
				r = str.match(re_date_time);
				if (r != null) {
					dateStr = r[1] + "-" + r[2] + "-" + r[3];
					timeStr = r[4] + ":" + r[5];
				}
			}
		}
	}
}
function getPreviousInput(tag) {
	var theInput = tag;
	theInput = theInput.previousSibling;
	
	if (theInput == null) {
		theInput = tag.parentNode;
		if(theInput==null) return null;
		
		theInput=theInput.previousSibling;
	    theInput=theInput.childNodes[theInput.childNodes.length-1];
	    if(theInput.tagName == "INPUT") return theInput;
	    else return getPreviousInput(theInput);
	}else{
		if (theInput.tagName == "INPUT")  return theInput;
	    else return getPreviousInput(theInput);
	}

	return null;
}


function popDialog(url,w,h) {
	return window.showModalDialog(url, self, "scroll:1;status:1;help:0;resizable:1;dialogWidth:"+w+"px;dialogHeight:"+h+"px");
}
function popDialogNo(url,w,h) {
	return window.showModalDialog(url, self, "scroll:0;status:1;help:0;resizable:0;dialogWidth:"+w+"px;dialogHeight:"+h+"px");
}
function selectDate(tag) {
	var theInput = getPreviousInput(tag);
	if (theInput == null) {
		return;
	}
	getStr(trim(theInput.value));
	returnValue = popDialogNo("/inc/calendar0.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,280,240);
	if (returnValue == null) {
		return;
	}

//  myForm.elements[fieldName].value=returnValue;
	theInput.value = returnValue;
}
function selectTime(tag) {
	var theInput = getPreviousInput(tag);
	if (theInput == null) {
		return;
	}
	getStr(trim(theInput.value));
	returnValue = popDialogNo("/inc/time.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,150,120);
	if (returnValue == null) {
		return;
	}

//  myForm.elements[fieldName].value=returnValue;
	theInput.value = returnValue;
}
function selectImg(tag, path, width, height) {
	w = 290;
	h = 270;
	if (width) {
		w = width;
	}
	if (height) {
		h = height;
	}
	var theInput = getPreviousInput(tag);
	if (theInput == null) {
		return;
	}
	returnValue = popDialog("/common/selectImg/index.jsp?path=" + path,w,h);
	if (returnValue == null) {
		return;
	}
	theInput.value = returnValue;
}
function selectLargeImg(tag, path, width, height) {
	w = 750;
	h = 520;
	if (width) {
		w = width;
	}
	if (height) {
		h = height;
	}
	var theInput = getPreviousInput(tag);
	if (theInput == null) {
		return;
	}
	returnValue = popDialog("/common/selectImg/indexLarge.jsp?path=" + path,w,h);
	if (returnValue == null) {
		return;
	}
	theInput.value = returnValue;
}
function selectEnt(tag, entityName, userId) {
	if (entityName == "User") {
		return selectUser(tag);
	}
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	href = "/common/selectEnt/index.jsp?entityName=" + entityName;
	if (userId) {
		href += "&userId=" + userId;
	}
	returnValue = popDialog(href,300,440);
	if (returnValue && returnValue != null) {
		values = returnValue.split(",");
		if (input1.type && input1.type == "hidden") {
			input1.value = values[0];
			input2.value = values[1];
		} else {
			input2.value = values[0];
			input1.value = values[1];
		}
	}
}
function selectEnts(tag, entityName) {
	if (entityName == "User") {
		return selectUsers(tag);
	}
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	relIds = "";
	if (input1.type && input1.type == "hidden") {
		relIds = input1.value;
	} else {
		relIds = input2.value;
	}
	returnValue = popDialog("/common/selectEnts/index.jsp?entityName=" + entityName + "&relIds=" + relIds,300,440);
	if (returnValue && returnValue != null) {
		values = returnValue.split("|");
		if (input1.type && input1.type == "hidden") {
			input1.value = values[0];
			input2.value = values[1];
		} else {
			input2.value = values[0];
			input1.value = values[1];
		}
	}
}
function selectUser(tag) {
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	relIds = "";
	if (input1.type && input1.type == "hidden") {
		relIds = input1.value;
	} else {
		relIds = input2.value;
	}
	returnValue = popDialogNo("/common/selectUser/index.jsp",340,440);
	if (returnValue && returnValue != null) {
		values = returnValue.split(",");
		if (input1.type && input1.type == "hidden") {
			input1.value = values[0];
			input2.value = values[1];
		} else {
			input2.value = values[0];
			input1.value = values[1];
		}
	}
}
function selectUsers(tag) {
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	relIds = "";
	if (input1.type && input1.type == "hidden") {
		relIds = input1.value;
	} else {
		relIds = input2.value;
	}
	returnValue = popDialogNo("/common/selectUsers/index.jsp?relIds=" + relIds,460,440);
	if (returnValue && returnValue != null) {
		values = returnValue.split("|");
		if (input1.type && input1.type == "hidden") {
			input1.value = values[0];
			input2.value = values[1];
		} else {
			input2.value = values[0];
			input1.value = values[1];
		}
	}
}
function selectObjs(tag) {
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	relIds = "";
	if (input1.type && input1.type == "hidden") {
		relIds = input1.value;
	} else {
		relIds = input2.value;
	}
	returnValue = popDialogNo("/common/selectObjs/index.jsp?relIds=" + relIds,460,440);
	if (returnValue && returnValue != null) {
		values = returnValue.split("|");
		if (input1.type && input1.type == "hidden") {
			input1.value = values[0];
			input2.value = values[1];
		} else {
			input2.value = values[0];
			input1.value = values[1];
		}
	}
}

function trim(str) {
  while(str.charCodeAt(0)==10||str.charCodeAt(0)==13||str.charCodeAt(0)==32) str=str.substr(1);
  while(str.charCodeAt(str.length-1)==10||str.charCodeAt(str.length-1)==13||str.charCodeAt(str.length-1)==32) str=str.substr(0, str.length-1);
  return str;
}

