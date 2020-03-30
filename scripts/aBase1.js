function bug(id){
  centWin('/general/system/bug/editContent.jsp?statusId=00000&menuId='+id);
}

function checkAll(This){
	var oEle = document.getElementsByName("cols");
	var bl;
	if(This.checked == true) bl = true; else bl = false;
	for(var i = 0 ;i<oEle.length;i++){
		oEle[i].checked = bl;
	}
}


function viewContent(entity,id,target){
  var url=sendSync('/common_0/getPathByEntity.jsp?entity='+entity);
  if(target) target.location=url+'viewContent.jsp?entity='+entity+'&id='+id;
  else centWin(url+'viewContent.jsp?entity='+entity+'&id='+id);
}
function resizeWin(w,h){
  if(!w) w=700;
  if(!h) h=500;
 
  if(w>screen.availWidth) w=screen.availWidth;
  if(h>screen.availHeight) h=screen.availHeight;
  l=(screen.availWidth-w)/2;
  t=(screen.availHeight-h)/2;
  window.resizeTo(w,h);
  window.moveTo(l,t);
 
  
  //window.top.resizeDialog(w,h);  //弹出层停用
}
function centWin(url,w,h){
  if(!w) w=800;
  if(!h) h=500;
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
  return openWin(url,"","height="+h+",width="+w+",status=yes,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top="+t+",left="+l);
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

function closeWindow(w){
	if(w.frameElement) top.closeDiv(w);
	else w.close();
}
///////////////////////////////////////////




function check(it){
  if(it.getAttribute("CHECKDATE")){
    return checkDate(it,it.getAttribute("CHECKDATE"));
  }else if(it.getAttribute("CHECKTIME")){
    return checkTime(it,it.getAttribute("CHECKTIME"));
  }else if(it.getAttribute("CHECKTS")){
    return checkTs(it,it.getAttribute("CHECKTS"));
  }else if(it.getAttribute("CHECKNULL")){
    return checkNull(it,it.getAttribute("CHECKNULL"));
  }else if(it.getAttribute("CHECKINT")){
    return checkInt(it,it.getAttribute("CHECKINT"));
  }else if(it.getAttribute("CHECKFLOAT")){
    return checkFloat(it,it.getAttribute("CHECKFLOAT"));
  }else if(it.getAttribute("CHECKEMAIL")){
    return checkEmail(it,it.getAttribute("CHECKEMAIL"));
  }else if(it.getAttribute("CHECKIP")){
	return checkIp(it,it.getAttribute("CHECKIP"));
  }else if(it.getAttribute("CHECKMAC")){
	return checkMac(it,it.getAttribute("CHECKMAC"));
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
      valueStr=tinyMCE.getInstanceById("mce_editor_0").getBody().innerHTML.toLowerCase();
	  valueStr=valueStr.replace(/<(\/)?p>/g,"").replace(/<br( \/)?>/g,"").replace(/&nbsp;/g,"");
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

function checkMobile(it,str){
   if (re_mobile.exec(trim(it.value))) return true;
   else{
    if(str) alert(str+"不正确！");
    else alert("手机号码错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
}
function checkPhone(it,str){
   if(it.value.length==7||it.value.length==8){
     alert("小灵通或大灵通号码前需添加区号！");
     return false;
   }
   if (re_phone.exec(trim(it.value))) return true;
   else{
    if(str) alert(str+"不正确！");
    else alert("小灵通或大灵通号码格式错误！");
    try{it.focus();}catch(e){}
    return false ;
  }
}

function checkIp(it,str){ 
	if (re_ip.exec(trim(it.value))) return true;
	else{
	 if(str) alert(str+"格式不正确！");
	 else alert("ip地址格式错误！");
	 try{it.focus();}catch(e){}
	 return false ;
	}
} 

function checkMac(it,str){ 
	if (re_mac.exec(trim(it.value))) return true;
	else{
	 if(str) alert(str+"格式不正确！");
	 else alert("MAC地址格式错误！");
	 try{it.focus();}catch(e){}
	 return false ;
	}
} 
function isIp(ip){
	return re_ip.exec(trim(ip));
}
function isMac(mac){
	return re_mac.exec(trim(mac))
}
function isEmail(email){
  return re_email.exec(trim(email));
}
function isNumAndEnglish(NumAndEnglish){
  return re_NumAndEnglish.exec(trim(NumAndEnglish)); 
}
function isMobile(mobileNo){
  return re_mobile.exec(trim(mobileNo));
}
var re_phone = /^(?:0(?:10|2[0-57-9]|[3-9]\d{2}))?(-)?\d{7,8}((-)?\d{1,8})?$/;
var re_mobile=/^((86)|(0))?((1(3|4|5|8|7)\d{9}))$/;
var re_NumAndEnglish=/^(\.|\w)+$/;
var re_email=/^\w+([-+.]\w+)*@([\w-]+)(\.[\w-]+)+$/;
var re_date_time = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
var re_date = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
var re_time = /^(\d{1,2}):(\d{1,2})$/;
var re_ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
var re_mac = /^([0-9A-Fa-f]{2})(-[0-9A-Fa-f]{2}){5}|([0-9A-Fa-f]{2})(:[0-9A-Fa-f]{2}){5}/;

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
		if(theInput==null) return null;
		while(theInput.nodeType!=1){
			theInput=theInput.previousSibling;
			if(theInput==null) break;
		}
		if(theInput==null) return null;
		theInput=theInput.childNodes[theInput.childNodes.length-1];
		if(theInput.nodeType!=1) return getPreviousInput(theInput);
		else if(theInput.tagName == "INPUT") return theInput;
	    else return getPreviousInput(theInput);
	}else{
		if(theInput.nodeType!=1) return getPreviousInput(theInput);
		else if (theInput.tagName == "INPUT")  return theInput;
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
	returnValue = popDialogNo("/scripts/calendar0.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,280,240);
	if (returnValue == null) {
		return;
	}

//  myForm.elements[fieldName].value=returnValue;
	theInput.value = returnValue;
	//弹出层停用
	//window.top.createDialog2(theInput,null,"/scripts/calendar0.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,280,210);
}
function selectTime(tag) {
	var theInput = getPreviousInput(tag);
	if (theInput == null) {
		return;
	}
	getStr(trim(theInput.value));
	returnValue = popDialogNo("/scripts/time.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,150,120);
	if (returnValue == null) {
		return;
	}

//  myForm.elements[fieldName].value=returnValue;
	theInput.value = returnValue;
	//弹出层停用
	//window.top.createDialog2(theInput,null,"/scripts/time.jsp?dateStr=" + dateStr + "&timeStr=" + timeStr,150,100);
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
	
	returnValue = popDialog("/common_0/selectImg/index.jsp?path=" + path,w,h);
	if (returnValue == null) {
		return;
	}
	theInput.value = returnValue;
	//弹出层停用
	//window.top.createDialog2(theInput,null,"/common_0/selectImg/index.jsp?path=" + path,w,h);
	
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

	returnValue = popDialog("/common_0/selectImg/indexLarge.jsp?path=" + path,w,h);
	if (returnValue == null) {
		return;
	}
	theInput.value = returnValue;
	//弹出层停用
	//window.top.createDialog2(theInput,null,"/common_0/selectImg/indexLarge.jsp?path=" + path,w,h);
}
function selectEnt(tag, entityName, topId) {
	var input2 = getPreviousInput(tag);
	if (input2 == null) {
		return;
	}
	var input1 = getPreviousInput(input2);
	if (input1 == null) {
		return;
	}
	
	if (entityName == "User") {
		return selectUser(tag);
	}else if(entityName == "NetFile"){
	    tag.addAttach = function(file){
	    	input1.value = file;
	    	input2.value = file;
	    };
		return selectFile("",tag);
	}
	
	href = "/common_0/selectEnt/index.jsp?entityName=" + entityName;
	if(topId) href+="&id="+topId;
	//if (userId) href += "&userId=" + userId;
	
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
	//弹出层停用
	/*
	if (input1.type && input1.type == "hidden") {
		window.top.createDialog2(input1,input2,href,300,440,",");
	}else{
		window.top.createDialog2(input2,input1,href,300,440,",");
	}
	*/
}
function selectEnts(tag, entityName ,topId) {
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
	var topStr="";
	if(typeof(topId)!='undefined' && topId!=null && topId!="") topStr="&id="+topId;
	
	returnValue = popDialog("/common_0/selectEnts/index.jsp?entityName=" + entityName + "&relIds=" + relIds + topStr,300,440);
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
	
	//弹出层停用
	/*
	var key="";
	if(relIds) key=postSync("/common_0/selectedAjax.jsp","relIds="+relIds);
	if(key=="fail"){
		alert("程序错误！");
	}else{
		if (input1.type && input1.type == "hidden") {
			window.top.createDialog2(input1,input2,"/common_0/selectEnts/index.jsp?entityName=" + entityName + "&key=" + key + topStr,300,440,"|");
		}else{
			window.top.createDialog2(input2,input1,"/common_0/selectEnts/index.jsp?entityName=" + entityName + "&key=" + key + topStr,300,440,"|");
		}
	}
	*/
	
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
	var relIds = new Object();
	relIds.w=window;
	if (input1.type && input1.type == "hidden") {
		relIds.value = input1.value;
	} else {
		relIds.value = input2.value;
	}
	
	returnValue = window.showModalDialog("/common_0/selectUser/index.jsp", relIds, "scroll:0;status:1;help:0;resizable:0;dialogWidth:350px;dialogHeight:310px");
	//returnValue = popDialogNo("/common/selectUser/index.jsp",340,440);
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
	//弹出层停用
	/*
	
	if (input1.type && input1.type == "hidden") {
		window.top.createDialog2(input1,input2,"/common_0/selectUser/index.jsp?relIds=" + relIds.value,350,302,",");
	}else{
		window.top.createDialog2(input2,input1,"/common_0/selectUser/index.jsp?relIds=" + relIds.value,350,302,",");
	}
	*/
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

	returnValue = window.showModalDialog("/common_0/selectUsers/index.jsp?", relIds, "scroll:0;status:1;help:0;resizable:0;dialogWidth:580px;dialogHeight:320px");
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
	//弹出层停用
	/*
	var key="";
	if(relIds.value) key=postSync("/common_0/selectedAjax.jsp","relIds="+relIds.value);
	if(key=="fail"){
		alert("程序错误！");
	}else{
		if (input1.type && input1.type == "hidden") {
			window.top.createDialog2(input1,input2,"/common_0/selectUsers/index.jsp?key=" + key,580,302,"|");
		}else{
			window.top.createDialog2(input2,input1,"/common_0/selectUsers/index.jsp?key=" + key,580,302,"|");
		}
	}
	*/
}

function selectSpaceUsers(tag,online) {
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
	
	returnValue = window.showModalDialog("/common_0/selectSpaceUsers/index.jsp?online="+online, relIds, "scroll:0;status:1;help:0;resizable:0;dialogWidth:580px;dialogHeight:320px");
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
	
	
	/*
	var key="";
	if(relIds.value) key=postSync("/common_0/selectedAjax.jsp","relIds="+relIds.value);
	if(key=="fail"){
		alert("程序错误！");
	}else{
		if (input1.type && input1.type == "hidden") {
			window.top.createDialog2(input1,input2,"/common_0/selectSpaceUsers/index.jsp?online="+online+"&key=" + key,580,302,"|");
		}else{
			window.top.createDialog2(input2,input1,"/common_0/selectSpaceUsers/index.jsp?online="+online+"&key=" + key,580,302,"|");
		}
	}
	*/
	
}
//变量item必须定义方法：addAttach(file)以便对选择好的文件进行处理
//queryStr的参数为：type=photo|movie|video|attach|folder  loc=web
function selectFile(queryStr,item){
  item.w=window;
  if(typeof item.addAttach=="undefined"){
    item.addAttach=function(url){
      if(queryStr.indexOf("type=attach")>=0|| queryStr.indexOf("type=album")>=0){
        item.value+=","+url;
      }else{
        item.value=url;
      }
      if(item.value.indexOf(",")==0) item.value=item.value.substring(1);
      var str=sendSync("/common_0/getFileExpr.jsp?"+queryStr+"&name="+encodeURI(item.name)+"&value="+encodeURI(item.value));
      var div=document.getElementById("f_"+item.name);
      if(str.indexOf('$')!=-1){
      	var imgsSrc=str.split("$")[1].split(",");
      	for(var i=0;i<imgsSrc.length;i++){
      		var imgSrc=imgsSrc[i];
	      	if(trim(imgSrc).length>0)addHeadImage(imgSrc);
      	}
      	str=str.split("$")[0];	
      }else if(queryStr.indexOf("loc=web")!=-1){
      	   var re = new RegExp("<img src='((.)*)?' width=[0-9]* height=[0-9]* />","ig");
		   var arr = re.exec(str);
		   var href =RegExp.$1;
		   if(href!=null && trim(href).length>0 && typeof(addHeadImage)=="function")addHeadImage(href);
      }
      if(div) div.innerHTML=str;
    };
  }else if(queryStr.indexOf("loc=web")!=-1){//内容中图片加入headimages
  	var tempFun=item.addAttach;
  	item.addAttach=function(url){
  		tempFun(url);
  		if(trim(url).length>0)addHeadImage(url);
  	}
  }
  if(window.showModelessDialog)
	  window.showModelessDialog('/general_0/netfile/attach/index.jsp?'+queryStr, item, 'scroll:0;status:1;help:0;resizable:0;dialogWidth:800px;dialogHeight:560px');
  else 
	  window.showModalDialog('/general_0/netfile/attach/index.jsp?'+queryStr, item, 'scroll:0;status:1;help:0;resizable:0;dialogWidth:800px;dialogHeight:560px');
}
function publicMailSelectFile(queryStr,item){
	  item.w=window;
	  if(typeof item.addAttach=="undefined"){
	    item.addAttach=function(url){
	      if(queryStr.indexOf("type=attach")>=0|| queryStr.indexOf("type=album")>=0){
	        item.value+=","+url;
	      }else{
	        item.value=url;
	      }
	      if(item.value.indexOf(",")==0) item.value=item.value.substring(1);
	      var str=sendSync("/common/getFileExpr.jsp?"+queryStr+"&name="+encodeURI(item.name)+"&value="+encodeURI(item.value));
	      var div=document.getElementById("f_"+item.name);
	      if(str.indexOf('$')!=-1){
	      	var imgsSrc=str.split("$")[1].split(",");
	      	for(var i=0;i<imgsSrc.length;i++){
	      		var imgSrc=imgsSrc[i];
		      	if(trim(imgSrc).length>0)addHeadImage(imgSrc);
	      	}
	      	str=str.split("$")[0];	
	      }else if(queryStr.indexOf("loc=web")!=-1){
	      	   var re = new RegExp("<img src='((.)*)?' width=[0-9]* height=[0-9]* />","ig");
			   var arr = re.exec(str);
			   var href =RegExp.$1;
			   if(href!=null && trim(href).length>0 && typeof(addHeadImage)=="function")addHeadImage(href);
	      }
	      if(div) div.innerHTML=str;
	    };
	  }else if(queryStr.indexOf("loc=web")!=-1){//内容中图片加入headimages
	  	var tempFun=item.addAttach;
	  	item.addAttach=function(url){
	  		tempFun(url);
	  		if(trim(url).length>0)addHeadImage(url);
	  	}
	  }
	  window.showModalDialog('/general/netfile/attach/emailindex.jsp?'+queryStr, item, 'scroll:0;status:1;help:0;resizable:0;dialogWidth:400px;dialogHeight:280px');
	}
function delFile(itemName){
  var item=myForm.elements[itemName];
  if(item) item.value="";
  var div=document.getElementById("f_"+itemName);
  if(div) div.innerHTML="";
}
function delAlbum(id){
	var d=document.getElementById("album_"+id);
	var path=document.getElementsByName(id+"_path")[0].value;
	myForm.album.value=myForm.album.value.replace(path,"");
	if(d)d.removeNode(true);
}
function delAttach(itemName,url){
	  var items=document.getElementsByTagName("input");
	  var item=null;
	  for(var i=0;i<items.length;i++){
		  if(items[i].name==itemName){
			  item=items[i];
			  break;
		  }
	  }
	  var urls = [];
	  var files=item.value.split(",");
	  for(var i=0;i<files.length;i++){
	    if(files[i]!=""&&files[i]!=url) urls.push(files[i]);
	  }
	  item.value=urls.join(",");
	  item=document.getElementById("f_"+itemName);
	  urls = [];
	  if(item.innerHTML.indexOf("<BR>")>=0) files=item.innerHTML.split("<BR>");
	  else files=item.innerHTML.split("<br>");
	  url="'"+url+"'";
	  for(var i=0;i<files.length;i++){
	    if(files[i]!=""&&files[i].indexOf(url)<0) urls.push(files[i]);
	  }
	  item.innerHTML=urls.join("<BR>");
}


function selectObjs(tag,namespace) {
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
		relIds.value = input1.value;
	} else {
		relIds.value = input2.value;
	}
		
	//url="/common/selectObjs/index.jsp?relIds=" + relIds;
	//if(namespace) url+="&namespace="+namespace;
	if(namespace) relIds.namespace=namespace;
	//returnValue = popDialogNo(url,460,440);
	
	returnValue = window.showModalDialog("/common_0/selectObjs/index.jsp", relIds, "scroll:0;status:1;help:0;resizable:0;dialogWidth:580px;dialogHeight:320px");
	
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
	
	//弹出层停用
	/*
	var key="";
	if(relIds.value) key=postSync("/common_0/selectedAjax.jsp","relIds="+relIds.value);
	if(key=="fail"){
		alert("程序错误！");
	}else{
		var href="/common_0/selectObjs/index.jsp?";
		if(relIds.value) href+="key=" + key;
		if(relIds.namespace&&href.indexOf("key=")>=0) href="&namespace="+relIds.namespace;
		else if(relIds.namespace&&href.indexOf("key=")<0) href="namespace="+relIds.namespace;
		if (input1.type && input1.type == "hidden") {
			window.top.createDialog2(input1,input2,href,580,302,"|");
		}else{
			window.top.createDialog2(input2,input1,href,580,302,"|");
		}
	}
	*/
}
//linda添加，选择列
function selectEntTitles(tag,entityName){
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
	
	
	returnValue = popDialog("/common_0/selectEntTitles/index.jsp?entityName=" + entityName + "&relIds=" + relIds,280,440);
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
	
	//弹出层停用
	/*
	if (input1.type && input1.type == "hidden") {
		window.top.createDialog2(input1,input2,"/common_0/selectEntTitles/index.jsp?entityName=" + entityName + "&relIds=" + relIds,280,440,"|");
	}else{
		window.top.createDialog2(input2,input1,"/common_0/selectEntTitles/index.jsp?entityName=" + entityName + "&relIds=" + relIds,280,440,"|");
	}
	*/
}
function trim(str) {
  while(str.charCodeAt(0)==10||str.charCodeAt(0)==13||str.charCodeAt(0)==32) str=str.substr(1);
  while(str.charCodeAt(str.length-1)==10||str.charCodeAt(str.length-1)==13||str.charCodeAt(str.length-1)==32) str=str.substr(0, str.length-1);
  return str;
}
//设置照片、动画、视屏、附件的值
function setAttach(name,value,fileStr){
  var attachVal=document.getElementById(name);
  attachVal.value=value;
  var attach=document.getElementById("f_"+name);
  attach.innerHTML=fileStr;
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
function postSync(sUri,params) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("POST", sUri, false);
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttp.setRequestHeader("Content-length", params.length);
xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(params);
	return trim(xmlHttp.responseText);
}
function findEmailNames(sUri,email,number) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.onreadystatechange = function (){
		if (xmlHttp.readyState == 4) { // 判断对象状态
			　　if (xmlHttp.status == 200) { // 信息已经成功返回，开始处理信息
			　　returnAjaxValue(xmlHttp.responseText,number);
			　　} else { 
			　　alert("您所请求的页面有异常。");
			　　}
			　　}
		};
	sUri = encodeURI(sUri);
	xmlHttp.open("POST", sUri, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if(number==2){xmlHttp.send("userMobile="+email);}
	else if(number==3)xmlHttp.send("harbor="+email);
	else xmlHttp.send("userEmail="+email);
}
function findEmailNames1(sUri,number) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.onreadystatechange = function (){
		if (xmlHttp.readyState == 4) { // 判断对象状态
			　　if (xmlHttp.status == 200) { // 信息已经成功返回，开始处理信息
			　　returnAjaxValue(xmlHttp.responseText,number);
			　　} else { 
			　　alert("您所请求的页面有异常。");
			　　}
			　　}
		};
	sUri = encodeURI(sUri);
	xmlHttp.open("POST", sUri, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.send(null);
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

function getElementsByClassName(eleClassName){
	var getEleClass = [];//定义一个数组
	var myclass = new RegExp("\\b"+eleClassName+"\\b");//创建一个正则表达式对像
	var elem = document.getElementsByTagName("*");//获取文档里所有的元素
	for(var h=0;h<elem.length;h++)
	{
	var classes = elem[h].className;//获取class对像
	if (myclass.test(classes)) getEleClass.push(elem[h]);//正则比较，取到想要的CLASS对像
	}
	return getEleClass;//返回数组
}

function tagInfo(tag,str){
  var win=window.open("");
  if(str) win.document.write("<h2>"+str+"</h2><br>");
  for(var it in tag) win.document.write(it+":"+tag[it]+"<br>");
}

function correctPNG(){
  var pngs=document.getElementsByName("png");
  if(!pngs) return;
  for(var i=pngs.length-1; i>=0; i--){
    var img = pngs[i]
    var imgName = img.src.toUpperCase()
    if (imgName.substring(imgName.length-3, imgName.length) == "PNG"){
	  var imgID = (img.id) ? "id='" + img.id + "' " : ""
	  var imgClass = (img.className) ? "class='" + img.className + "' " : ""
	  var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
	  var imgStyle = "display:inline-block;" + img.style.cssText 
	  if (img.align == "left") imgStyle = "float:left;" + imgStyle
	  if (img.align == "right") imgStyle = "float:right;" + imgStyle
	  if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle  
	  var strNewHTML = "<span " + imgID + imgClass + imgTitle
	  + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
	  + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
	  + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
	  img.outerHTML = strNewHTML
    }
  }
}
function separatorOp(obj){//分隔符的处理
	if(obj!=null && typeof(obj.value)!='undefined' && obj.value!=null)
		obj.value=trim(obj.value).replace(/(，|；|;|,)+/g,",").replace(/^(,)/,"").replace(/(,)$/,"");
}
function getResizeImg(imgsrc,width,height){
	imgsrc=trim(imgsrc);
	var reg=/(_(\d)+_(\d)+\.((jpg)|(jpeg)|(bmp)|(gif)|(png)))$/ig;
	var newImg=imgsrc;
	if(!reg.exec(trim(newImg))){
		newImg=imgsrc.replace(/(\.((jpg)|(jpeg)|(bmp)|(gif)|(png)))$/ig,"_"+width+"_"+height+"$1");
	}
	return newImg;
}
function getHostUrl(url){// 例http://www.05info.com返回05info.com
	var host=trim(url);
	var hand=getUrlHand(host);
	if(hand==null)return null;
	host=host.replace(hand,"");
	if(!host.indexOf("www.")==0)return null;
	var re = new RegExp("((([A-Za-z0-9]+)((\.com)|(\.cn)|(\.org)|(\.net)|(\.com.cn)|(\.net.cn)|(\.org.cn)))(:[0-9]+)?)$","ig");
	host=host.match(re);
	if(host==null)return host;
	return RegExp.$1;
}
function getUrlHand(url){
	if(trim(url).indexOf("http://")==0)return "http://";
	if(trim(url).indexOf("https://")==0)return "https://";
	return '';
}
function transfer(value){
	if(isNaN(value)) {
		alert("不是一个有效的数字，请重新输入！");
	}

	var money1 = new Number(value);
	if(money1> 1000000000000000000) {
	alert("您输入的数字太大，重新输入！");
	return;
	}
	var monee = Math.round(money1*100).toString(10)
	var i,j;
	j=0;
	var leng = monee.length;
	var monval="";
	for( i=0;i<leng;i++)
	{
	monval= monval+to_upper(monee.charAt(i))+to_mon(leng-i-1);
	}
	return repace_acc(monval);
	}
function to_upper( a){
	switch(a){
	case '0' : return '零'; break;
	case '1' : return '壹'; break;
	case '2' : return '贰'; break;
	case '3' : return '叁'; break;
	case '4' : return '肆'; break;
	case '5' : return '伍'; break;
	case '6' : return '陆'; break;
	case '7' : return '柒'; break;
	case '8' : return '捌'; break;
	case '9' : return '玖'; break;
	default: return '' ;
	}
	}
function to_mon(a){
	if(a>10){ a=a - 8;
	return(to_mon(a));}
	switch(a){
	case 0 : return '分'; break;
	case 1 : return '角'; break;
	case 2 : return '元'; break;
	case 3 : return '拾'; break;
	case 4 : return '佰'; break;
	case 5 : return '仟'; break;
	case 6 : return '万'; break;
	case 7 : return '拾'; break;
	case 8 : return '佰'; break;
	case 9 : return '仟'; break;
	case 10 : return '亿'; break;
	}
	}
function repace_acc(Money){
	Money=Money.replace("零分","");
	Money=Money.replace("零角","零");
	var yy;
	var outmoney;
	outmoney=Money;
	yy=0;
	while(true){
	var lett= outmoney.length;
	outmoney= outmoney.replace("零元","元");
	outmoney= outmoney.replace("零万","万");
	outmoney= outmoney.replace("零亿","亿");
	outmoney= outmoney.replace("零仟","零");
	outmoney= outmoney.replace("零佰","零");
	outmoney= outmoney.replace("零零","零");
	outmoney= outmoney.replace("零拾","零");
	outmoney= outmoney.replace("亿万","亿零");
	outmoney= outmoney.replace("万仟","万零");
	outmoney= outmoney.replace("仟佰","仟零");
	yy= outmoney.length;
	if(yy==lett) break;
	}
	yy = outmoney.length;
	if ( outmoney.charAt(yy-1)=='零'){
	outmoney=outmoney.substring(0,yy-1);
	}
	yy = outmoney.length;
	if ( outmoney.charAt(yy-1)=='元'){
	outmoney=outmoney +'整';
	}
	return outmoney;
	}
