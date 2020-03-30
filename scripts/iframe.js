var form_calc;//用于判断form_calc.js是否加载
var thisId;
function callParent(func){
  if(parent) eval("parent."+func+"('"+thisId+"')");
}
function edit() {
	if(window==top) location = "editContent.jsp?id=" + thisId;
	else callParent('edit');
}
function del() {
	msg = "您确实要删除选定的记录吗？";
	if(window==top){
		if (window.confirm(msg)) {
			location = "del.jsp?id=" + thisId;
		}
	}else{
		callParent('del');
	}
}
function view(){
  centWin(location.href);
  //centWin('/common/showContent.jsp?'+queryStr);
}
function viewContent(entity,id){
  if(window.top.locs) top.viewContent(entity,id);
  else if(opener&&opener.top.locs) opener.top.viewContent(entity,id,window);
}

function init(){
  if(form_calc) initDetails();//表单初始化 
  var tool=document.getElementById('tool');
//  var cells = document.getElementsByTagName('td');//按钮
  if(window==top){
    if(tool) tool.style.display='';
//    for (var i = 0; i < cells.length; i++){
//      var cell=cells[i];
//      var title=cell.title;
//      if(cell.className=='coolButton'){
//        if(title!='关闭窗口') cell.style.display='none';
//      }
//    }
//  }else{
//    for (var i = 0; i < cells.length; i++){
//      var cell=cells[i];
//      var title=cell.title;
//      if(cell.className=='coolButton'){
//        if(title=='关闭窗口') cell.style.display='none';
//      }
//    }
  }
}

window.onload=init;

function centWin(url,w,h){
  if(!w) w=700;
  if(!h) h=500;
  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;
  window.open(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top="+t+",left="+l);
}
function centWinNo(url,w,h){
  if(!w) w=700;
  if(!h) h=500;
  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;
  window.open(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top="+t+",left="+l);
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
	printWin = window.open("", "printWin", "toolbar=0,location=0,menubar=1,scrollbars=1,status=1,resizable=1");
	printWin.document.open();
	printWin.document.writeln("<html>");
	printWin.document.writeln("<head>");
	printWin.document.writeln("<title>表单查看及打印</title>");
	printWin.document.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
	printWin.document.writeln("<link rel=stylesheet type='text/css' href='/inc/style_print.css'>");
//  printWin.document.writeln("<script language='JavaScript' src='/js/print.js'></script>");
	printWin.document.writeln("</head>");
//	printWin.document.writeln("<body onload='window.print();window.close();'>");
	printWin.document.writeln("<body>");
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

