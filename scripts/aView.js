var form_calc;//用于判断form_calc.js是否加载
var thisId;
function edit() {
	if(window==top) location = "editContent.jsp?id=" + thisId;
	else callParent('edit');
}
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 
function init(){
//  if(form_calc) initDetails();//表单初始化 
	var tds=document.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++){
		if(tds[i].className=="c3"&&tds[i].innerHTML.trim()=="") tds[i].innerHTML="&nbsp;";
	}
}

window.onload=init;

//window.print=function(){
//	eptforoper("Word");
//}

function eptforoper(type){
	window.open( "export" + type + "ForOper.jsp?id=" + thisId);
}