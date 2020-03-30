//var locs=new Array();//locations of main
//var locNum=-1;
//function loc(){
//  l=main.location.href;
//  if(l!=locs[locNum]){
//    locs.length=locNum+1;
//    locs.push(l);
//    locNum=locs.length-1;
//  }
//}
//function go(num){
//  locNum+=num;
//  if(locNum<0) locNum=0;
//  if(locNum>=locs.length) locNum=locs.length-1;
//  main.location=locs[locNum];
//}

function url(url,qStr){
   var now=new Date();
   var newUrl=url;
   index=url.indexOf("?");
   if(index<0) newUrl+="?";
   else newUrl+="&";
   
   newUrl+="now="+now.getTime();
//   newUrl+="now=123456789";
   if(qStr) newUrl+="&"+qStr;
   return newUrl;
}
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

function openUrl(Url,menuUrl,menuId,relTab){
  if(Url==null||Url.length==0) return;
//  var query="";
//  if(Url.indexOf("?")>0){
//    query=Url.substring(Url.indexOf("?")+1);
//  }
  if(!menuUrl) menuUrl='/general_0/'+Url;
  menuUrl=menuUrl.substring(0,menuUrl.lastIndexOf("/")+1);
//  if(menuUrl&&menuUrl.indexOf('/general/')>=0){
    //sendAsync('/common/setUserMenu.jsp?menu='+menuName);//暂时禁用
//    leftmenu.iframe0.location='menu/index.jsp?url='+menuUrl;
//  }
  main.location='/general_0/'+Url;
  leftmenu.iframe0.location=menuUrl+"left.jsp";
//  if(relTab==0||relTab==1||relTab==2){
//    user_bar.tp1.setSelectedIndex(relTab);
//  }
}

function edit(entity,id,target) {
  var url=sendSync('/common_0/getPathByEntity.jsp?entity='+entity);
  target.location = url+"edit.jsp?id=" + id;
}
function del(entity,id,target) {
  if (window.confirm("您确实要删除选定的记录吗？")) {
    var url=sendSync('/common_0/getPathByEntity.jsp?entity='+entity);
    target.location = url+"del.jsp?id=" + id;
  }
}
function viewContent(entity,id,target){
  var url=sendSync('/common_0/getPathByEntity.jsp?entity='+entity);
  if(target) target.location=url+'viewContent.jsp?entity='+entity+'&id='+id;
  else centWin(url+'viewContent.jsp?entity='+entity+'&id='+id);
}
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
function sendAsync(sUri) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", newUrl(sUri), true);//newUrl保证提交
//   xmlHttp.onreadystatechange = function () {
//      if (xmlHttp.readyState == 4)
//         doSomething(xmlHttp.responseXML); // responseXML : XmlDocument
//   }
	xmlHttp.send(null);
}
function sendSync(sUri) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", newUrl(sUri), false);//newUrl保证提交
	xmlHttp.send(null);
	return trim(xmlHttp.responseText);
}

function stripHtml(s) {
	return s.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br />");
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

function tagInfo(tag,str){
  var win=window.open("");
  if(str) win.document.write("<h2>"+str+"</h2><br>");
  for(var it in tag) win.document.write(it+":"+tag[it]+"<br>");
}
function debug(str){
  var win=window.open("");
  if(str) win.document.write(str);
}
function trim(str) {
  while(str.charCodeAt(0)==10||str.charCodeAt(0)==13||str.charCodeAt(0)==32) str=str.substr(1);
  while(str.charCodeAt(str.length-1)==10||str.charCodeAt(str.length-1)==13||str.charCodeAt(str.length-1)==32) str=str.substr(0, str.length-1);
  return str;
}