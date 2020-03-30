
var queryStr;

function add(){
	var link=window.location.href;
	var first=link.indexOf("/general_0/");
	var last=link.lastIndexOf("/");
	var url=link.substring(first+1,last);
	popWinNo(url+"/edit.jsp?"+queryStr);
}
function edit(){
	var link=window.location.href;
	var first=link.indexOf("/general_0/");
	var last=link.lastIndexOf("/");
	var url=link.substring(first+1,last);	
	popWinFor(url+"/edit.jsp");
}

function del(){
  if(thisTrs.length>0){
    msg="您确实要删除选定的记录吗？";
    if(window.confirm(msg)) openWin("manage.jsp?del=yes&id="+thisIds()+"&"+queryStr,"","top=5000");
  }else{
    alert("请先选定待删除的对象！");
  }
}

function delOne(){
  if(thisId!=null){
    msg="您确实要删除该记录吗？";
    if(window.confirm(msg)) openWin("manage.jsp?del=yes&id="+thisId,"","top=5000");
  }else{
    alert("请先选定待删除的记录(限一条)！");
  }
}
function search(url){
  if(!url) url="search.jsp?"+queryStr;
  centWin(url,800,520);
}
function centWin(url,w,h){
	  if(!w) w=screen.availWidth;
	  if(!h) h=screen.availHeight;
	  if(w>screen.availWidth) w=screen.availWidth;
	  if(h>screen.availHeight) h=screen.availHeight;
	  l=(screen.availWidth-w)/2;
	  t=(screen.availHeight-h)/2;
	  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top="+t+",left="+l);
	  //window.top.createDialog(url,w,h); //弹出层停用
	}
	function centWinFor(url,w,h){
	  if(thisId!=null){//处理含参数情况
	    if(url.indexOf("?")>0) return centWin(url+"&id="+thisId,w,h);
	    else return centWin(url+"?id="+thisId,w,h);
	  }else{
	    alert("请先选定待操作的对象(限一条)！");
	  }
	}
	function centWinNo(url,w,h){
	  if(!w) w=700;
	  if(!h) h=500;
	  if(w>screen.availWidth) w=screen.availWidth;
	  if(h>screen.availHeight) h=screen.availHeight;
	  l=(screen.availWidth-w)/2;
	  t=(screen.availHeight-h)/2;
	  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,top="+t+",left="+l);
	}

	function popWin(url){
	  l=screen.availWidth;
	  t=screen.availHeight;
	  w=screen.availWidth;
	  h=screen.availHeight;
	  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,top="+t+",left="+l);
	}
	//popup window noresizable
	function popWinNo(url){
	  l=screen.availWidth;
	  t=screen.availHeight;
	  w=screen.availWidth;
	  h=screen.availHeight;
	  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=no,top="+t+",left="+l);
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

//function test(){
//str="bbb${新闻1}${ab1c}${新2闻1}${1新闻}${新闻}${def}${ab1c}aaabbb ${ab1c}$ {新闻3} ${新3闻1}${3新闻}$ {新闻31}${def}${ab1c}aaa";
//myRE = /\$\{[^\}]*\}/g;
//results = str.match(myRE)
//for(var i =0; i < results.length; i++)
//   {
//      alert(results[i])
//   }
//}

function setCursor(frm){
  frm.document.body.style.cursor="help";
  if(frm.cursorHandler){
    frm.retCur=frm.document.onmousedown;
    frm.document.onmousedown=frm.cursorHandler;
    frm.retTil=frm.document.body.title;
    frm.document.body.title="点击查看当前页帮助信息!";
  }
  for(var i=0;i<frm.frames.length;i++) setCursor(frm.frames[i]);
}
function retCursor(frm){
  frm.document.body.style.cursor="default";
  if(frm.cursorHandler){
    frm.document.onmousedown=frm.retCur;
    frm.document.body.title=frm.retTil;
  }
  for(var i=0;i<frm.frames.length;i++) retCursor(frm.frames[i]);
}
var helpWin=self;//可以在页面里赋值，如指定到parent
function cursorHandler(){
//  if(document.body.style.cursor=="help"){
    openWin("/common_0/help.jsp?w="+helpWin.document.body.clientWidth+"&h="+helpWin.document.body.clientHeight+"&loc="+escape(helpWin.document.location),"","toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no");
    retCursor(top);
    return false;
//  }
}

window.onerror = function (err) {
//  alert(""+err);
  return false;
};

//function cursorHandler(){
//    helpWin=openWin("","helpWin","");
//    helpWin.document.open();
//    helpWin.document.writeln("<html>");
//    helpWin.document.writeln("<head>");
//    helpWin.document.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
//    helpWin.document.writeln("<link rel=stylesheet type='text/css' href='/inc/style.css'>");
//    helpWin.document.writeln("<script language='JavaScript'>");
//    helpWin.document.writeln("function window.onerror(){return false;}");
//    helpWin.document.writeln("</script>");
//    helpWin.document.writeln("</head>");
//    helpWin.document.writeln("<body>");
//    helpWin.document.writeln(document.body.innerHTML);
//    helpWin.document.writeln("</body>");
//    helpWin.document.writeln("</html>");
//    helpWin.document.close();
//
//    retCursor(top);
//    return false;
//}

var printWin;

function printForm(content){
//  printWin=openWin("","printWin","height=1200,width=1600,toolbar=no,menubar=no,location=no,top=2000");
  printWin=window.open("","printWin","width="+screen.availWidth+",height="+screen.availHeight+",left=0,top=0,status=yes,toolbar=no,menubar=no,location=no");
  printWin.document.open();
  printWin.document.writeln("<html>");
  printWin.document.writeln("<head>");
  printWin.document.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
  printWin.document.writeln("<link rel=stylesheet type='text/css' href='/inc/style_print.css'>");
//  printWin.document.writeln("<script language='JavaScript' src='/js/print.js'></script>");
  printWin.document.writeln("</head>");
  printWin.document.writeln("<body onload='window.print();window.close();'>");
  if(content) printWin.document.writeln(content);
  else if(sourceTable){
    var newTable=sourceTable.cloneNode(true);
    newTable.style.cssText="";
    newTable.cellSpacing=1;
    newTable.bgColor="#eeeeee";
    printWin.document.writeln(newTable.outerHTML);
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
