var entity;
//为了兼容query.jsp
var action_bar;
if(parent){
  if(parent.action_bar) action_bar=parent.action_bar;
  else if(parent.parent&&parent.parent.action_bar) action_bar=parent.parent.action_bar;
}
function checkAll(){  
   if(!action_bar && parent && parent.location.href.indexOf("mainFrame.jsp")>=0) return;
   thisIds=null;
   thisId=null;
   if(document.getElementById('checkbox') == null)  return;
   var boxes = getCheckBox();
   if(boxes.length || typeOf(boxes.length) != "undefined") {////如果当前记录有多条	
	  	for(var i=0;i<boxes.length;i++){
	  		boxes[i].checked=selectAll.checked;
	  	 }
	}
	//WebFXColumnList.prototype._click(selectAll.parentNode.prentNode);
	if(tp1) tp1.select();
}
function checkboxChange(id){
	if(checkbox.length ==  undefined ){//
		WebFXColumnList.prototype._click(checkbox.parentNode.prentNode);
	}else{
		for(var i=0;i<checkbox.length ; i++){	
		if(checkbox[i].value == id){	
			WebFXColumnList.prototype._click(checkbox[i].parentNode.prentNode);
			break;
			}
		}
	}
	return;
}
function add() {
	centWin("editContent.jsp?"+queryStr+"&random_timestamp="+Math.random());
}
function view(id){
	centWin('viewContent.jsp?id='+id);
}
function edit(id) {
	centWin('editContent.jsp?id='+id);
}
function eddd(id) {
	centWin('/general_10/_ext/zhzf/xzCaseInfo/do/editContent.jsp?id='+id);
}
function remind(id){
	if(id==null){
		if(thisId==null){
			alert("请先选定待操作的对象！");
			return;
		}else  id=thisId;
	}
	
	centWin('remind.jsp?id='+id);
}
function delinfo(ids){
	var len = ids.split(",").length;
	var nametitle="";
	var entitytilte="";
	if(document.getElementById("namefieldtitle")!=null)
		nametitle= document.getElementById("namefieldtitle").value;
	if(document.getElementById("entitytitle")!=null)
		entitytilte = document.getElementById("entitytitle").value;
	if(thisvalues!=""&&nametitle!=""&&entitytilte!="")
		return "你确定要删除【"+nametitle+"】为：\n"+thisvalues+"的"+len+"条【"+entitytilte+"】吗？"
	else return "你确定要删除选定的记录吗？";
}
function del(id) {
  if(!action_bar) return;
    if(id) thisIds=id;
	if (thisIds != null) {
		var msg = delinfo(thisIds);
		if (window.confirm(msg)) {
			showInfo();
			action_bar.location = "del.jsp?id=" + thisIds;
		}
	} else {
		alert("请先选定待删除的对象！");
	}
}
function delOne(id) {
  if(!action_bar) return;
	if(id) thisId=id;
	if (thisId != null) {
		var msg = delinfo(thisIds);
		if (window.confirm(msg)) {
			showInfo();
			action_bar.location = "del.jsp?id=" + thisId;
		}
	} else {
		alert("请先选定待删除的记录(限一条)！");
	}
}

function empty(){
	if(!document.getElementById("itemCount")) return;
	var itemCount=document.getElementById("itemCount").innerHTML;
	if(itemCount>0){
		msg = "您确实要清除当前查询条件下的"+itemCount+"条记录吗？";
		if (window.confirm(msg)) {
			showInfo();
			action_bar.location = "del.jsp?how=empty&amp;" + queryStr;
		}
	}else{
		alert("当前查询结果为空，没有需要清除的记录！");
	}
}
//////////////以上是不同的方法
//var queryStr;
var info = null;
var o = null;
var tp1 = null;
var layout = null;
function init() {
//initTip();
//window==top.main.menu_bar.mainFrame.index
//	if (window.name == "index"||parent.name=="index") {
		if (document.getElementById("container")) {
			layout = "main_half";
		} else {
			layout = "main_full";
		}
//	} 
	if (layout) {
		createO();
		createInfo();
		calcSize1();
		window.onresize =calcSize1;

		
		if(o){
			var index=0;
			if(parent&&parent.selectId){
				var tr=document.getElementById(parent.selectId);
				if(tr){
					parent.selectId="";
					index=tr.rowIndex;
					o.selectRow(index,false);
				}
			}
			
		}
		
		if (tp1) {
			tp1.select();
		}
	}
	
	if(document.getElementById("searchMenu")){
		var childs=document.getElementsByTagName("body")[0].childNodes;
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType!=1) continue;
			if(childs[i].className=="list-1") continue;
			if(childs[i].tagName!="TABLE") continue;
			childs[i].onclick=function(){
				document.getElementById("searchMenu").style.display="none";	
				if(document.getElementById("moreSearch")) document.getElementById("moreSearch").className="list-5";
			}
		}
		
	}
	
}
window.onload = init;

var dw0=0,dh0=0;
function calcSize1() {
	var dw = (window.innerWidth) ? window.innerWidth : document.documentElement.clientWidth;
	var dh = (window.innerHeight) ? window.innerHeight : document.documentElement.clientHeight;
	if (o) {
		o.resize(dw - 4, dh  - 100);
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
		//o.focus();
		//o.selectRow(0);
	}
}
//文件头是：<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>，才好用！
function createInfo() {
	if (info != null) return;
	info = document.createElement("table");
//info.outerHTML="<table id='info' style='' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center'><span style='border:1px solid buttonshadow;background-color:white;padding:4px;font-size:16px'>正在处理请求，请稍候...</span></td></tr></tbody></table>";
	info.id = "info";
	info.border = "0px";
//info.width="300px";
//info.height="300px";
	info.cellSpacing = "0px";
	info.cellPadding = "0px";
	info.style.cssText = "top:expression(eval(document.body.scrollTop));left:expression(eval(document.body.scrollLeft));"+
	"width:expression(eval(document.body.clientWidth));height:expression(eval(document.body.clientHeight));"+
	"background-color:#CED3F7;display:none;position:absolute;z-index:10;filter:alpha(opacity=70)";
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

function ept(type, queryStr) {
	location = "export" + type + ".jsp?" + queryStr;
}

function getCheckBox(){
	var inputs = document.getElementsByTagName("INPUT");
	var boxes=[];
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].type=="checkbox"&&inputs[i].id=="checkbox"){
			boxes.push(inputs[i]);
		}
	}
	return boxes;
}