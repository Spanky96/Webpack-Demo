<%@ page contentType="text/plain; charset=utf-8" language="java" import="java.sql.*" %>
var allTrs=[];
var thisTrs=[];
var thisTr;
var thisId;
var thisName;
var thisTag;
var col_config = [];
function tableInit (str_tableid,num_header_offset,num_footer_offset){
   // skip non DOM browsers
  if (typeof(document.all) != 'object') return;

  // validate required parameters
  if (!str_tableid) return alert ("未指定表格！");
  var obj_table = (document.all ? document.all[str_tableid] : document.getElementById(str_tableid));
  if (!obj_table) return alert ("找不到指定的表格");

  // set defaults for optional parameters
  col_config.header_offset = (num_header_offset ? num_header_offset : 0);
  col_config.footer_offset = (num_footer_offset ? num_footer_offset : 0);
  tt_init_table(obj_table);
  document.body.onselectstart=YCancelEvent;
}

function tt_init_table (obj_table) {
  var col_trs = obj_table.rows;
  if(col_config.header_offset>=col_trs.length - col_config.footer_offset) afterClick(col_trs[col_config.header_offset]);
  else for (var i = col_config.header_offset; i < col_trs.length - col_config.footer_offset; i++) {
    if(col_trs[i].id&&col_trs[i].id=="exclude") continue;

    col_trs[i].onmousedown = tt_onclick;
    col_trs[i].ondblclick = edit;
    col_trs[i].className="normal";
    push(allTrs,col_trs[i]);
    if(i == col_config.header_offset) firstClick(col_trs[i]);
  }
}

//若需要开始选中第一行，在页面中重定义此函数
function firstClick(theTr){
}
//will be replaced in Jsps.
function afterClick(theTr){
}

function indexOf(trs,tr){
  for(var i=0;i<trs.length;i++){
    if(tr==trs[i]) return i;
  }
  return -1;
}
function addToTrs(tr){
  var i=indexOf(thisTrs,tr);
  if(i<0) push(thisTrs,tr);
}
function trClick(tr){
  var i=indexOf(thisTrs,tr);
  if(i<0) push(thisTrs,tr);
  else pop(thisTrs,i);
}

function push(trs,tr){
  trs[trs.length]=tr;
}
function pop(trs,index){
  if(index>=trs.length) return;
  for(var k=index;k<trs.length-1;k++){
    trs[k]=trs[k+1];
  }
  trs.length--;
}

function tt_onclick () {
//alert("thisTrs:"+thisTrs.length+",allTrs:"+allTrs.length);
  if(event&&event.button==2) return;
  if(event&&event.shiftKey){
    if(thisTr==null){
      trClick(this);
    }else{
      indexFrom=indexOf(allTrs,thisTr);
      indexTo=indexOf(allTrs,this);
      step=1;
      if(indexFrom>indexTo) step=-1;
      for(indexTo+=step;indexFrom!=indexTo;indexFrom+=step){
	addToTrs(allTrs[indexFrom]);
      }
    }
  }else if(event&&event.ctrlKey){
    trClick(this);
  }else{
    thisTrs=[];
    push(thisTrs,this);
  }

  if(thisTrs.length==1){
    thisId=thisTrs[0].id;
    if(thisTrs[0].tag) thisTag=thisTrs[0].tag;
  }else{
    thisId=null;
    thisTag=null;
  }

  for(var j=0;j<allTrs.length;j++){
    var tr=allTrs[j];
    if(indexOf(thisTrs,tr)<0) tr.className="normal";
    else tr.className="highlight";
  }

  thisTr=this;
  afterClick(this);
}

function thisIds(){
  var ids=[];
  for(var i=0;i<thisTrs.length;i++){
    idx=thisTrs[i].id.indexOf("&");
    if(idx<0) push(ids,thisTrs[i].id);
    else push(ids,thisTrs[i].id.substring(0,idx));
  }
  return ids.join(",");
}

var wOff,hOff;

function resize(){
  if(!opener) return;
  if(window.screenLeft<screen.availWidth) return;
<%
Integer xOff=new Integer(12);
Integer yOff=new Integer(31);
try{
  xOff=(Integer)session.getAttribute("xOff");
  yOff=(Integer)session.getAttribute("yOff");
}catch(Exception e){}
%>
  w=0;
  h=0;
  if(wOff&&hOff){//ww and wh will be defined in popup windows.
    w=wOff+<%=xOff%>;
    h=hOff+<%=yOff%>;
  }else{
    x=10+<%=xOff%>;
    y=35+<%=yOff%>;
    var tags=document.body.childNodes;
    for(i=0;i<tags.length;i++){
     var tag=tags[i];
     if(tag.offsetHeight && tag.offsetHeight>h){
       h=tag.offsetHeight;
       w=tag.offsetWidth;
     }
    }
//alert("H:"+h+";W:"+w);
    w+=x;
    h+=y;
  }

  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;

  window.resizeTo(w,h);
  window.moveTo(l,t);
//alert("w:"+w+",h:"+h+
//"\noffsetWidth:"+document.body.offsetWidth+",offsetHeight:"+document.body.offsetHeight);
}

document.onreadystatechange=function(){
  menuInit();
  //document.body.onselectstart=YCancelEvent;
  if((opener||parent.dialogArguments)&&document.readyState=='complete') resize();
  if(opener&&document.readyState=='complete') resize();
}
//window.onresize=function(){
//  window.defaultStatus=document.documentElement.offsetWidth+","+document.documentElement.offsetHeight;
//}
 function menuInit(){
  for (i=0; i<document.body.all.length; i++) {
    btn=document.body.all[i];
    if (btn.className == 'Btn' || btn.className == 'BtnUp') {
      btn.onmouseover = BtnMouseOver;
      btn.onmouseout = BtnMouseOut;
      btn.onmousedown = BtnMouseDown;
      btn.onmouseup = BtnMouseUp;
      btn.ondragstart = YCancelEvent;
      btn.onselectstart = YCancelEvent;
      btn.onselect = YCancelEvent;
      btn.tag = btn.className;
    }else if(btn.className == 'Head' || btn.className == 'HeadUp') {
      btn.onmouseover = HeadMouseOver;
      btn.onmouseout = HeadMouseOut;
      btn.onmousedown = HeadMouseDown;
      btn.onmouseup = HeadMouseUp;
      btn.ondragstart = YCancelEvent;
      btn.onselectstart = YCancelEvent;
      btn.onselect = YCancelEvent;
      btn.tag = btn.className;
    }
  }
}

function BtnMouseOver() {
  var btn = event.srcElement;
  if (btn.tagName == 'IMG' || btn.tagName == 'FONT') btn=btn.parentElement;
  if (btn.tagName == 'SPAN') btn.className = 'BtnUp';
}
function BtnMouseOut() {
  var btn = event.srcElement;
  if (btn.tagName == 'IMG' || btn.tagName == 'FONT') btn=btn.parentElement;
  if (btn.tagName == 'SPAN') btn.className = btn.tag;
}
function BtnMouseDown() {
  var btn = event.srcElement;
  if (btn.tagName == 'IMG' || btn.tagName == 'FONT') btn=btn.parentElement;
  if (btn.tagName == 'SPAN') btn.className = 'BtnDown';
}
function BtnMouseUp() {
  var btn = event.srcElement;
  if (btn.tagName == 'IMG' || btn.tagName == 'FONT') btn=btn.parentElement;
  if (btn.tagName == 'SPAN') btn.className = 'BtnUp';
}
function HeadMouseOver() {
}
function HeadMouseOut() {
  var btn = event.srcElement;
  if (btn.tagName == 'DIV'||btn.tagName == 'IMG') btn.className = btn.tag;
}
function HeadMouseDown() {
  var btn = event.srcElement;
  if (btn.tagName == 'DIV'||btn.tagName == 'IMG') btn.className = 'HeadDown';
}
function HeadMouseUp() {
  var btn = event.srcElement;
  if (btn.tagName == 'DIV'||btn.tagName == 'IMG') btn.className = 'HeadUp';
}
function YCancelEvent() {
  event.returnValue=false;
  event.cancelBubble=true;
  return false;
}

function checkDate(it){
  var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})$/;
  if (!re_date.exec(trim(it.value))){
          alert("日期格式不正确！");
          try{it.focus();}catch(e){}
          return false;
  }
  return true;
}
function checkTime(it){
  var re_date =/^(\d{1,2})\:(\d{1,2})$/;
  if (!re_date.exec(trim(it.value))){
          alert("时间格式不正确！");
          try{it.focus();}catch(e){}
          return false;
  }
  return true;
}
function checkTs(it){
  var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})\ (\d{1,2})\:(\d{1,2})$/;
  if (!re_date.exec(it.value)){
    alert("日期或时间格式不正确！");
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
      alert(valueStr);
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
function checkFloat(it){
  if(isNaN(parseFloat(it.value))){
    alert("输入数据格式错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
  return true;
}
function checkEmail(it,str){
  var re_email=/^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
  if (re_email.exec(trim(it.value))) return true;
  else{
    if(str) alert(str+"的格式不正确！");
    else alert("电子邮件格式错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
} 
function isEmail(email){
  var re_email=/^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
  if (re_email.exec(trim(email))) return true;
  return false;
}

function send(){
 if(CheckForm()){
   myForm.content.value=myForm.EDIT_HTML.html;
   myForm.submit();
 }
}

function td_calendar(fieldname){
  myleft=document.body.scrollLeft+event.clientX-event.offsetX-80;
  mytop=document.body.scrollTop+event.clientY-event.offsetY+140;
  window.showModalDialog("/inc/calendar.jsp?field="+fieldname,self,"edge:raised;scroll:0;status:0;help:0;resizable:0;dialogWidth:280px;dialogHeight:250px;dialogTop:"+mytop+"px;dialogLeft:"+myleft+"px");
}
function td_date(fieldname){
  myleft=document.body.scrollLeft+event.clientX-event.offsetX-80;
  mytop=document.body.scrollTop+event.clientY-event.offsetY+140;
  window.showModalDialog("/inc/date.jsp?field="+fieldname,self,"edge:raised;scroll:0;status:0;help:0;resizable:0;dialogWidth:280px;dialogHeight:220px;dialogTop:"+mytop+"px;dialogLeft:"+myleft+"px");
}

function trim(str) {
  while(str.charCodeAt(0)==10||str.charCodeAt(0)==13||str.charCodeAt(0)==32) str=str.substr(1);
  while(str.charCodeAt(str.length-1)==10||str.charCodeAt(str.length-1)==13||str.charCodeAt(str.length-1)==32) str=str.substr(0, str.length-1);
  return str;
}

function writeCookie(name, value, hours){
  var expire = "";
  if(hours != null){
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}

function readCookie(name){
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0){
    offset = document.cookie.indexOf(search);
    if (offset != -1){
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}


var re_date_time = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
var re_date = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
var re_time = /^(\d{1,2}):(\d{1,2})$/;

var dateStr="";
var timeStr="";
function getStr(str){
  dateStr="";
  timeStr="";
  if(str!=""){
    var r = null;
    if((r=str.match(re_date))!=null){
      dateStr=str;
    }else if((r=str.match(re_time))!=null){
      timeStr=str;
    }else{
      r = str.match(re_date_time);
      if(r!=null){
	dateStr=r[1]+"-"+r[2]+"-"+r[3];
	timeStr=r[4]+":"+r[5];
      }
    }
  }
}
function getPreviousInput(tag){
  var theInput=tag;
  while(true){
    theInput=theInput.previousSibling;
    if(theInput==null) theInput=theInput.parentNode;
    if(theInput==null) break;
    if(theInput.tagName=="INPUT") return theInput;
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
	getStr(top.trim(theInput.value));
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
	getStr(top.trim(theInput.value));
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
	var relIds = new Object();
	relIds.w=window;
	if (input1.type && input1.type == "hidden") {
		//relIds = input1.value;
		relIds.value = input1.value;
	} else {
		//relIds = input2.value;
		relIds.value = input2.value;
	}
	//returnValue = popDialogNo("/common/selectUsers/index.jsp?relIds=" + relIds,460,440);
	returnValue = window.showModalDialog("/common/selectUsers/index.jsp?", relIds, "scroll:0;status:1;help:0;resizable:0;dialogWidth:460px;dialogHeight:440px");
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
function tagInfo(tag,str){
  var win=window.open("");
  if(str) win.document.write("<h2>"+str+"</h2><br>");
  for(var it in tag) win.document.write(it+":"+tag[it]+"<br>");
}

//parentTagName2可选，1或2满足一个即可
function findParent(theTag,parentTagName1,parentTagName2){
  var result=null;
  var parentTag=theTag;
  do{
    parentTag=parentTag.parentElement;
    if(parentTag.tagName==parentTagName1){
      result=parentTag;
      break;
    }else if(parentTagName2 && parentTag.tagName==parentTagName2){
      result=parentTag;
      break;
    }
  }while(parentTag.parentElement)

  return result;
}
function postSync(sUri,params) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("POST", sUri, false);
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttp.setRequestHeader("Content-length", params.length);
xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(params);
	return trim(xmlHttp.responseText);
}
function XmlHttp() {
}
XmlHttp.create = function () {
	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();

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
	throw new Error("Your browser does not support XmlHttp objects");
};

if (window.DOMParser && window.XMLSerializer && window.Node && Node.prototype && Node.prototype.__defineGetter__) {
	Document.prototype.loadXML = function (s) {

		var doc2 = (new DOMParser()).parseFromString(s, "text/xml");

		while (this.hasChildNodes()) {
			this.removeChild(this.lastChild);
		}

		for (var i = 0; i < doc2.childNodes.length; i++) {
			this.appendChild(this.importNode(doc2.childNodes[i], true));
		}
	};
	Document.prototype.__defineGetter__("xml", function () {
		return (new XMLSerializer()).serializeToString(this);
	});
}

