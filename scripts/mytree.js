function clickHandler(){
  var targetid='E_'+this.id.substring(2);
  var targetelement=document.getElementById(targetid);
  if (targetelement.style.display=='none'){
    targetelement.style.display='';
    this.src='images/expanded.gif';
  }
  else{
    targetelement.style.display='none';
    strbuf=this.src;
    this.src='images/collapsed.gif';
  }
}
function checkHandler(){
   targetid='E_'+this.value.substring(2);
   var theTable=document.getElementById(targetid);
     if(theTable){
     var elements=theTable.getElementsByTagName('input');
     var len=elements.length;
     var i=0;
     while(i<len){
       var el=elements[i];
       if(el.type=='checkbox'){
         var tab=findParent(el,'TABLE');
         if(tab!=null&&tab.style.display!='none') el.checked=this.checked;
       }
      i++;
     }
   }
}
function setSpanHandler(){
  var spans=document.getElementsByTagName('span');
  var len=spans.length;
  var i=0;
  while(i<len){
    var span=spans[i];
    if(span.className=='contactPicCell'){
      span.title="查看此人的名片";
      span.onclick=OnClick_GetContactCard;
      span.onmouseout=OnMouseOut_ContactPic;
      span.onmouseover=OnMouseOver_ContactPic;
    }else if(span.className=='contactCell') 
      span.onclick=OnClick_OnlineContact;
    i++;
  }
}
function setInputHandler(theTable){
  if(!theTable) theTable=document.body;
  var checks=theTable.getElementsByTagName('input');
  var len=checks.length;
  var i=0;
  while(i<len){
    var check=checks[i];
    if(check.type=='checkbox') check.onclick=checkHandler;
    i++;
  }
}
function setImgHandler(theTable){
  if(!theTable) theTable=document.body;
  var imgs=theTable.getElementsByTagName('img');
  var len=imgs.length;
  var i=0;
  while(i<len){
   var img=imgs[i];
   if(img.id.indexOf('B_')==0) img.onclick=clickHandler;
   i++;
  }
}  
function findParent(theTag,parentTagName){
  var result=null;
  var parentTag=theTag;
  do{
    parentTag=parentTag.parentNode;//parentNode fro FF
    if(parentTag.tagName==parentTagName){
      result=parentTag;
      break;
    }
  }while(parentTag.parentNode)
  return result;
}

//返回隐藏的部门，逗号分隔
function getDepts(){
  var depts=",";
  var imgs=document.getElementsByTagName("IMG");
  var len=imgs.length;
  var i=0;
  while(i<len){
    var img=imgs[i];
    if(img.src.indexOf('images/collapsed.gif')>=0){//隐藏部门
      depts+=img.id.substring(2)+",";//id=O_0001
    }
    i++;
  }
  return depts;
}
function setVisibleDept(theTable,key){
  var visible=false;
  var subTable=theTable;
  if(key.length==0) visible=true;
  if(isPerson(theTable)){//是人
    var tr=theTable.childNodes[0].childNodes[0];
    if(key=='nln'){
      if(tr.getAttribute("status")!='FLN') visible=true;
    }else{
      var dn=tr.getAttribute('displayname');
	  if(dn!=null&&dn.indexOf(key)>=0) visible=true;
    }
  }else if(isDeptKey(theTable,key)){
     visible=true;
     subTable=document.getElementById('E_'+theTable.id.substring(2));
     if(subTable!=null){
      var tr=subTable.childNodes[0].childNodes[0];
      var tables=subTable.childNodes[0].childNodes[0].childNodes[0].childNodes;
      var len = tables.length;
      var j = 0;
	  while ( j < len) {
		if (isPerson(tables[j])) {
			tables[j].style.display='';
		}else if(isDept(tables[j])){
		    if(setVisibleDept(tables[j],'')) visible=true;
		}
		j++;
	  }
    }
  }else if(isDept(theTable)){//是部门
    //找下级部门
    subTable=document.getElementById('E_'+theTable.id.substring(2));
    subTable.style.display='';
    if(subTable!=null){
      var tr=subTable.childNodes[0];
      if(tr.nodeName=="TBODY") tr=tr.childNodes[0];
      var tables=tr.childNodes[0].childNodes;
	  var len = tables.length;
      var j = 0;
	  while ( j < len) {
		if (tables[j].nodeName == "TABLE"&&(isPerson(tables[j])||isDept(tables[j]))) {
			if(setVisibleDept(tables[j],key)) visible=true;
		}
	  j++;
	  }
    }
  }
  
  if(isIM(theTable)) visible=true;
  
  if(visible) {
     theTable.style.display='';
     subTable.style.display='';
  }else{
     theTable.style.display='none';
     subTable.style.display='none';
  }
  fold = false;
  return visible;
}
//显示在线人员，共用次方法。key:nln
function setVisible(theTable,key,condition){
  var visible=false;
  var subTable = theTable;
  if(key.length==0) visible=true;
  if(isPerson(theTable)){//是人
    var tr=theTable.childNodes[0].childNodes[0];
    //alert("tr.displayname:"+tr.getAttribute("displayname"));
    if(key=='nln'){
      if(tr.getAttribute("status")!='FLN') visible=true;
    }else{
      var dn=tr.getAttribute(condition);
	  if(dn!=null&&dn.indexOf(key)>=0) visible=true;
    }
  }else if(isDept(theTable)){//是部门
    //找下级部门
    subTable=document.getElementById('E_'+theTable.id.substring(2));
    if(subTable!=null){
      var tr=subTable.childNodes[0];
      var x =1;
      while(tr.nodeType != 1){
    	  tr =subTable.childNodes[x];
    	  x++;
      }
      if(tr.nodeName=="TBODY") tr=tr.childNodes[0];
      var v =1;
      while(tr.nodeType != 1){
    	  tr =tr.childNodes[v];
    	  v++;
      }
      var tables=tr.childNodes[0];
      var l =1;
      while(tables.nodeType != 1){
    	  tables =tr.childNodes[l];
    	  l++;
      }
      tables = tables.childNodes;
      var len = tables.length;
      var j = 0;
	  while(j < len) {
		if (tables[j].nodeName == "TABLE"&&(isPerson(tables[j])||isDept(tables[j]))) {
			//visible=visible||setVisible(tables[j],key);//该语法一旦有了一个true，其他步骤被省略，不妥
			if(setVisible(tables[j],key,condition)) visible=true;
		}
		j++;
	  }
    }
  }
  if(isIM(theTable)) visible=true;
  
  if(visible) {
     theTable.style.display='';
     subTable.style.display='';
  }
  else{
     theTable.style.display='none';
     subTable.style.display='none';
  }
  
  return visible;
}
function hideOffline(theTable,key,condition){
  var visible=false;
  var subTable = theTable;
  if(key.length==0) visible=true;
  if(isPerson(theTable)){//是人
    var tr=theTable.childNodes[0].childNodes[0];
    //alert("tr.displayname:"+tr.getAttribute("displayname"));
    if(key=='nln'){
      if(tr.getAttribute("status")!='FLN') visible=true;
    }else{
      var dn=tr.getAttribute(condition);
	  if(dn!=null&&dn.indexOf(key)>=0) visible=true;
    }
  }else if(isDept(theTable)){//是部门
    //找下级部门
    subTable=document.getElementById('E_'+theTable.id.substring(2));
    if(subTable!=null){
      var tr=subTable.childNodes[0];
      if(tr.nodeName=="TBODY") tr=tr.childNodes[0];
      var tables=tr.childNodes[0].childNodes;
      var len = tables.length;
      var j = 0;
	  while(j < len) {
		if (tables[j].nodeName == "TABLE"&&(isPerson(tables[j])||isDept(tables[j]))) {
			//visible=visible||setVisible(tables[j],key);//该语法一旦有了一个true，其他步骤被省略，不妥
			if(setVisible(tables[j],key,condition)) visible=true;
		}
		j++;
	  }
    }
  }
  if(isIM(theTable)) visible=true;
  
  if(!visible){
     theTable.style.display='none';
     subTable.style.display='none';
  }
  
  return visible;
}
function isDept(theTable){
  return theTable.id&&(theTable.id.indexOf("A_")==0);
}
function isDeptKey(theTable,key){
  var text = theTable.innerHTML;
  text = text.replace(/<.+?>/gim,'');
  //return theTable.id&&(theTable.id.indexOf("A_")==0)&&(theTable.innerText.indexOf(key)>=0);//因此处用innerText不符合W3C标准，放弃使用。
  return theTable.id&&(theTable.id.indexOf("A_")==0)&&(text.indexOf(key)>=0);
}
function isPerson(theTable){
  return theTable.id==null||theTable.id=="";
}
function isIM(theTable){
  return theTable.id=="A_imContacts"||theTable.id=="A_webVisitors"||theTable.getAttribute("title");
}

function search(key){
  key=trim(key);
  if(key=="") key="nln";
  showOnline=false;
  collapse(false);//全展开
  var mt=document.getElementById("A_mainContacts");
  //setVisible(mt,key,'displayname');
  setVisibleDept(mt,key);
  
}

function getUsers(excludeSelf){
  var users="";
  var checks=document.getElementsByTagName('input');
  var len=checks.length;
  var i=0;
  while(i<len){
   var check=checks[i];
   if(check.type=='checkbox'){
     if(check.checked){
       check.checked=false;//清除
       if(check.value.indexOf("U_")==0){
         var user=check.value.substring(2);
         if(excludeSelf==null||user!=globalWebMessenger.GetSelfPassport()) users+=","+user;
       }  
     }
   }
   i++;
  }
  if(users.length>0) users=users.substring(1);
  return users;
}
function getUsersName(){
 var userName="";
 var users="";
  var checks=document.getElementsByTagName('input');
  var len=checks.length;
  var i=0;
  while(i<len){
   var check=checks[i];
   if(check.type=='checkbox'){
     if(check.checked){
       if(check.value.indexOf("U_")==0){
          var userName = check.parentNode.innerText
          users+=","+userName;
       }  
     }
   }
   i++;
  }
  if(users.length>0) users=users.substring(1);
  return users;
}

function getDepts(excludeSelf){
  var depts="";
  var checks=document.getElementsByTagName('input');
  var len=checks.length;
  var i=0;
  while(i<len){
   var check=checks[i];
   if(check.type=='checkbox'){
     if(check.checked){
       check.checked=false;//清除
       if(check.value.indexOf("D_")==0){
         var dept=check.value.substring(2);
		 if(dept == "webVisitors")break;
         if(excludeSelf==null||dept!=globalWebMessenger.GetSelfPassport()) 
         depts+=","+dept;
       }  
     }
   }
   i++;
  }
  if(depts.length>0) depts=depts.substring(1);
  return depts;
}
function getDeptName(){
  var depts="";
  var checks=document.getElementsByTagName('input');
  var len=checks.length;
  var i=0;
  while(i<len){
   var check=checks[i];
   if(check.type=='checkbox'){
     if(check.checked){
       if(check.value.indexOf("D_")==0){
         var deptName = check.parentNode.innerText;
         depts+=","+deptName;
       }  
     }
   }
   i++;
  }
  if(depts.length>0) depts=depts.substring(1);
  return depts;
}
function sms(){
  var random=Math.random();
  var users=getUsers();
  if(users==null) users="";
  myForm.users.value=users;
//  myForm.action="/general_0/sms/new.jsp";
  myForm.target=random;
  var win = centWin("/general_0/sms/new.jsp?users="+users);
//  win.name = random;
//  myForm.submit();
  
 // centWinNo("/general/sms/new.jsp?users="+users,420,290);
}

function mobile(){
  var random=Math.random();
  var users=getUsers();
  if(users==null) users="";
  myForm.users.value=users;
//  myForm.action="/general/mobile/send/edit.jsp";
  myForm.target=random;
  var win = centWin("/general_0/mobile/send/edit.jsp?users="+users,600,430);
//  win.name = random;
//  myForm.submit();
 // centWinNo("/general/mobile/send/edit.jsp?users="+users,420,290);
}
function email(){
  var random=Math.random();
  var users=getUsers();
  if(users==null) users="";
  myForm.users.value=users;
//  myForm.action="/general/webmail/new.jsp";
  myForm.target=random;
  var win = centWin("/general_0/webmail/new.jsp?users="+users,750,560);
//  win.name = random;
//  myForm.submit();
  //centWin("/general/webmail/new.jsp?users="+users,650,560);
}
function meeting(){
  var us=getUsers(true);
  if(us.length>0){
    var users = us.split(",");
    var invitee=users.shift();
    var more=users.join(",");
    inviteUsers(invitee,more);
  }else{
    alert("请先选定参加谈话的人员！");
  }
}
var showOnline=false;
var fold=false;
function showOnlineUsers(){
  if(showOnline){
    collapse(false);//全展开
    var mt=document.getElementById("A_mainContacts");
    setVisible(mt,"nln");
  }  
}
function showOnlineUser(userId){
    var subTable = document.getElementById(userId);
    var userTable = subTable.parentNode.parentNode;
    var deptId = userTable.parentNode.parentNode.parentNode.parentNode.id.substring(2);
    var deptTable = document.getElementById("A_"+deptId);
    if(subTable.getAttribute("status") == 'NLN'){
      	userTable.style.display = '';//显示人员
        if(deptTable.style.display == 'none') deptTable.style.display = '';//显示直属机构
        deptTable = document.getElementById("E_"+deptId);
        deptTable.style.display = '';//处理空白
        deptTable = deptTable.parentNode.parentNode.parentNode.parentNode;
        while(deptTable&&deptTable.id != "E_mainContacts"&&deptTable.id !=""){//显示上级机构
	        var parentDept = document.getElementById("A_"+deptTable.id.substring(2));
	        if(parentDept.style.display == 'none') {
	          parentDept.style.display = '';
		      deptTable.style.display = '';//处理空白
	        }
	        deptTable = deptTable.parentNode.parentNode.parentNode.parentNode;
        }
    }else if(showOnline&&subTable.getAttribute("status") == 'FLN'){
      	userTable.style.display = 'none';//隐藏人员
        deptTable = userTable.parentNode.parentNode.parentNode.parentNode;
        while(deptTable && deptTable.id != "E_mainContacts"){//隐藏上级机构
		    var tables=deptTable.childNodes[0].childNodes[0].childNodes[0].childNodes;
		    noChild = true;
		    var len=tables.length;
		    var j=0;
			while (j < len) {
				if (tables[j].nodeName == "TABLE"&&(isPerson(tables[j])||isDept(tables[j]))) {
					if(tables[j].style.display == '') {
					   noChild=false;
					   break;
					}
				}
				 j++;
			}
	       if(noChild){
		      var parentDept = document.getElementById("A_"+deptTable.id.substring(2));
		      parentDept.style.display = 'none';//隐藏机构
		      subTable = document.getElementById("E_"+deptTable.id.substring(2)); 
		      subTable.style.display = 'none';//处理空白
	       }else break;
           deptTable = deptTable.parentNode.parentNode.parentNode.parentNode;
      	}
    }
}
function o_a(){
  var id = "0";
  showOnline=!showOnline;
  if(showOnline)id="1";
  var mt=document.getElementById("A_mainContacts");
  if(showOnline) setVisible(mt,"nln");
  else setVisible(mt,"");
  sendAsync("/general_0/setUserParam.jsp?type=showOnline&id="+id);
  if(fold) {
   collapse(fold);
  }
}
function e_c(){
  var id = "0";
  fold = !fold;
  if(fold)id="1";
  collapse(fold);
  sendAsync("/general_0/setUserParam.jsp?type=fold&id="+id);
  
}
function collapse(isCol){
  var imgs=document.getElementsByTagName('img');
  var len = imgs.length;
  var i = 0;
  while(i < len){
    var img=imgs[i];
	if(isCol&&(img.src.indexOf('expanded.gif')>=0||img.src.indexOf('collapsed.gif')>=0)){
	  img.src='images/collapsed.gif';
	  var target=document.getElementById('E_'+img.id.substring(2));
	  if(target!=null) target.style.display='none';
	}else if(!isCol&&(img.src.indexOf('expanded.gif')>=0||img.src.indexOf('collapsed.gif')>=0)){
	  img.src='images/expanded.gif';
	  var target=document.getElementById('E_'+img.id.substring(2));
	  var trueNode=document.getElementById('A_'+img.id.substring(2));
	  if(trueNode!=null && trueNode.style.display=='') target.style.display='';
	  //if(target!=null) target.style.display='';
	}
	i++;
  }
}
function addRemoveGroup(parentId,groupId,add){
  var pt=document.getElementById("E_"+parentId);
  var gt=pt.all("E_"+groupId);
  if(gt!=null){
    if(!add){
      gt.outerHTML="";
      gt=pt.getElementById("A_"+groupId);
      gt.outHTML="";
    }
  }else{
    if(add){
      gt=document.createElement("div");
      pt.rows[0].cells[0].appendChild(gt);
      var html="<table border=0 cellspacing=0 cellpadding=0 id=A_"+groupId+">";
	  html+="<tr><td height=18 width=48 align=right><img src='images/expanded.gif' id='B_"+groupId+"' align=absmiddle></td>";
	  html+="<td><input type=checkbox value='D_"+groupId+"'><b>"+groupId+"</b></td></tr></table>";
	  html+="<table border=0 cellspacing=0 cellpadding=0 id=E_"+groupId+" style='display:'><tr><td></td></tr></table>";
	  gt.outerHTML=html;	
      setImgHandler(pt);
      setInputHandler(pt);
    }
  }
}
function addRemoveUser(groupId,userId,add,userName){
  var pt=document.getElementById("E_"+groupId);
  var gt=pt.all(userId);
  if(gt){
      gt=gt.parentNode.parentNode;
      gt.outerHTML="";
  }

    if(add){
      gt=document.createElement("div");
      pt.rows[0].cells[0].appendChild(gt);
      var html="<table border=0 cellspacing=0 cellpadding=0><tbody>";
	  html+="<tr id='"+userId+"' onclickfn='OnClick_OnlineContact' displayname='"+userName+"' ";
	  html+="status='NLN'>";
	  html+="<td height=18 width=64 align=right><span><span id=CPic class=contactPicCell onclick='OnClick_GetContactCard(this)' title='查看此人的名片' ";
	  html+="onmouseout='OnMouseOut_ContactPic(this)' onmouseover='OnMouseOver_ContactPic(this)'><img width=16 height=16 ";
	  html+="style='vertical-align: middle' src='images/nln.gif' id='F_"+userId+"' style='cursor:hand'></span></span></td><td>";
	  html+="<div class='contactRow'><input type=checkbox style='width:14px;height:14px' value='U_"+userId+"'>";
	  html+="<span class='contactCell' title='"+userName+"'	onclick='OnClick_OnlineContact'>"+userName+"</span></div>";
	  html+="</td></tr></tbody></table>";
	  gt.outerHTML=html;	
      setImgHandler(pt);
      setInputHandler(pt);
    }
	//showOnlineUsers();
}

function addUser(){
  var users=getUsers();
  index=users.indexOf(",");
  userId=index>0?users.substring(0,index):users;
  centWin('/general_0/users/toolbar/addOrEdit.jsp?id='+userId,700,520);
}

function addDept(){
  centWin('/general_0/system/dept/editContent.jsp?namespace='+namespace,710,520);
}
function editDept(){
  var depts=getDepts();
  index=depts.indexOf(",");
  var deptId=index>0?depts.substring(0,index):depts;
  if(deptId=='')addDept();
  else  centWin('/general_0/system/dept/editContent.jsp?id='+deptId+'&namespace='+namespace,710,520);
}
function delDept(){
  var deptNames = getDeptName();
  var depts=getDepts();
  if(depts==""){
    alert("请选择您要删除的机构。");
    return;
  }
  if(confirm("您确定要删除“"+deptNames+"”吗？")){
	  index=depts.indexOf(",");
	  var deptId=index>0?depts.substring(0,index):depts;
	  centWin('/general_0/system/dept/del.jsp?id='+deptId,520,300);
  }
}
function importUser(){
  popWin('/general_0/users/toolbar/import.jsp');
}
function ioUser(){
  centWin('/general_0/users/toolbar/ioUser.jsp',390,240);
}
function moveUser(){
  var names = getUsersName();
  var users=getUsers();
  if(users==""){
    alert("请先选定待移动的用户！");
    return;
  }
  
  var href = "/common_0/selectEnt/index.jsp?entityName=Department&namespace="+namespace;
  var returnValue = popDialog(href,300,440);
  if (returnValue != null) {
    values = returnValue.split(",");
    if(confirm("您确定要将“"+names+"”移动到“"+values[1]+"”机构下吗？"))
	centWin("/general_0/users/toolbar/manage.jsp?how=moveTo&id="+users+"&deptId="+values[0],0,0);
  }
//弹出层停用
//  var centHref = "/general_0/users/toolbar/manage.jsp?how=moveTo&id="+ users + "&deptId=";
//  window.top.createDialog4(centHref,href,300,440,",");
}
function addUserToMy(){
  var names = getUsersName();
  var users=getUsers();
  if(users==""){
    alert("请先选定待添加的人员！");
    return;
  }
  if(confirm("您确定要将“"+names+"”添加到个人通讯录吗？"))
  centWin("/general_0/users/toolbar/manage.jsp?how=addTo&id="+users,0,0);
}
function moveDept(){
  var deptName=getDeptName();
  var depts=getDepts();
  index=depts.indexOf(",");
  var deptId=index>0?depts.substring(0,index):depts;
  if(deptId==""){
	    alert("请先选定待移动的机构！");
	    return;
  }
  var href = "/common_0/selectEnt/index.jsp?entityName=Department&namespace="+namespace;
  var returnValue = popDialog(href,300,440);
  if (returnValue != null) {
    values = returnValue.split(",");
    if(confirm("您确定要将“"+deptName+"”移动到“"+values[1]+"”下吗？"))
    centWin("/general_0/system/dept/manage.jsp?how=moveTo&amp;id="+deptId+"&amp;deptId="+values[0]);
  }
 //弹出层停用
//  var centHref = "/general_0/system/dept/manage.jsp?how=moveTo&id="+deptId+"&deptId=";
//  if(confirm("您确定要将移动选定的机构？"))
//	  window.top.createDialog4(centHref,href,300,440,",");
  
}
function delUser(){
  var names = getUsersName();
  var users=getUsers();
  if(users==""){
    alert("请先选定待删除的人员！");
    return;
  }
  if(!confirm("您确定要删除“"+names+"”吗？")) return;
  centWin("/general_0/users/toolbar/manage.jsp?how=del&id="+users,390,240);
}
function createUser( userId,deptId,userName,status,e,m  ){
	if(document.getElementById(userId)){	
		var oldUser=document.getElementById(userId);
		if(userName==null || userName=='')userName=oldUser.displayname;
		if(status ==null || status == '')status=oldUser.status;
		if(e == null || e == '')e=oldUser.e;
		if(m == null || m == '')m=oldUser.m;
		oldUser.parentNode.parentNode.removeNode(true);
	}
	if(status ==null || status == '') status='FLN';
	
	var dept=document.getElementById("A_"+deptId);
	var width;
	if(dept.rows[0].cells[0].width == '' || dept.rows[0].cells[0].width == null){
		width=32;
	}else{
		width=parseInt(dept.rows[0].cells[0].width)+16;
	}
	//构建用户
	var newUser=document.createElement('table');	
	var tr=newUser.insertRow(0);
	tr.id=userId;
	if(e != null && e!='')tr.e=e;
	if(m != null && m!='')tr.m=m;
	tr.displayname=userName;
	tr.status=status;
	var td1=tr.insertCell(0);
	td1.height=18;
	td1.width=width;
	td1.align='right';
	var span1=document.createElement('span');
	var span2=document.createElement('span');
	span2.className='contactPicCell';
	var pic=document.createElement('img');
	pic.src='images/'+status.toLowerCase()+'.gif';
	pic.id='F_'+userId;
	var td2=tr.insertCell(1);
	span2.appendChild(pic);
	span1.appendChild(span2);
	td1.appendChild(span1);
	var div=document.createElement('div');
	div.className='contactRow';
	var input=document.createElement('input');
	input.type='checkbox';
	input.value='U_'+userId;
	var span=document.createElement('span');
	span.className='contactCell';
	span.innerText=userName;
	div.appendChild(input);
	div.appendChild(span);
	td2.appendChild(div);
	return newUser;
}
function createDept(parentId,deptId,deptName){
		var width=16;
		var dept;
		var tables=new Array();
		if(document.getElementById("A_"+parentId)){
				width=parseInt(document.getElementById("A_"+parentId).rows[0].cells[0].width)+16;
		}
		if(document.getElementById("A_"+deptId)){
			setWidth(deptId,width);
			if(deptName !=null && deptName !='')document.getElementById('A_'+deptId).all.tags('b')[0].innerText=deptName;
		    tables[0]=document.getElementById('A_'+deptId);	
		    tables[1]=document.getElementById('E_'+deptId);			
			document.getElementById('A_'+deptId).removeNode(true);
			document.getElementById('E_'+deptId).removeNode(true);
		}else{
			tables[0]=document.createElement('table');
			tables[0].id='A_'+deptId;
			var tr=tables[0].insertRow(0);
			var td1=tr.insertCell(0);
			td1.heigth=18;
			td1.width=width;
			td1.align='right';
			var img=document.createElement('img');
			img.src='images/expanded.gif';
			img.id='B_'+deptId;
			td1.appendChild(img);
			var td2=tr.insertCell(1);
			var input=document.createElement('input');
			input.type='checkbox';
			input.value='D_'+deptId;
			var b=document.createElement('b');
			b.innerText=deptName;
			td2.appendChild(input);
			td2.appendChild(b);
			tables[1]=document.createElement('table');
			tables[1].id='E_'+deptId;
			tables[1].style.display='none';
			tr1=tables[1].insertRow(0);
			tr1.insertCell(0);	
		}
		return tables;
}
function changeDept(dept,frontId,behindId,parentId){
		deptInfo=dept[0].outerHTML+dept[1].outerHTML;
		if(behindId && '' != behindId){	
			if(parentId && ''!=parentId && 'null'!=parentId){
				behindId='';
				var tables=document.getElementById('E_'+parentId).getElementsByTagName('table');
				for(var i=0;i<tables.length;i++){
					if(tables[i].id.indexOf("A_") !=-1){
						behindId=tables[i].id;
						break;
					}
				}
			}else behindId='A_'+behindId;
		}
		
		if(frontId && '' != frontId && document.getElementById('A_'+frontId)){
			frontDept=document.getElementById("E_"+frontId);
			frontDept.outerHTML=frontDept.outerHTML+deptInfo;
		}else if(behindId && '' != behindId){	
			behindDept=document.getElementById(behindId);
			behindDept.outerHTML=deptInfo+behindDept.outerHTML;
		}else if( parentId && '' !=parentId && document.getElementById('A_'+parentId)){	
			parentDept=document.getElementById("E_"+parentId);
			parentDept.rows[0].cells[0].innerHTML=parentDept.rows[0].cells[0].innerHTML+deptInfo;
		}else{
			document.getElementById("A_webVisitors").outerHTML=deptInfo+document.getElementById("A_webVisitors").outerHTML;
		}
	updateUserList();
}
function setWidth(deptId,width){//修改部门和部门下人员的table的宽度
	var dis=width-parseInt(document.getElementById('A_'+deptId).rows[0].cells[0].width);
	document.getElementById('A_'+deptId).rows[0].cells[0].width=width;
	var tables=document.getElementById('E_'+deptId).rows[0].cells[0].all.tags("table");
	for(var j =0 ;j<tables.length;j++){
		if(tables[j].rows[0].cells[0].width!=null && tables[j].rows[0].cells[0].width!=''){
		tables[j].rows[0].cells[0].width=parseInt(tables[j].rows[0].cells[0].width)+dis;
		}
	}
}
function changeUser(newUser,frontId,deptId){
	if('' != frontId){
		dept=document.getElementById(frontId).parentNode.parentNode;
		dept.outerHTML=dept.outerHTML+newUser.outerHTML;
	}else{	
		dept=document.getElementById('E_'+deptId);
		dept.rows[0].cells[0].innerHTML=newUser.outerHTML+dept.rows[0].cells[0].innerHTML;
	}
	updateUserList(newUser);
}
function updateUserList(table){
	if(typeof table == undefined){
		setSpanHandler();
		setImgHandler();
		setInputHandler();
	}else{
		setSpanHandler(table);
		setImgHandler(table);
		setInputHandler(table);
	}
	showOnlineUsers();
}
function updateAddUser(userId,deptId,frontId,userName,email,mobileNo){
	var user=createUser(userId,deptId,userName,'',email,mobileNo);
	changeUser(user,frontId,deptId);
}
function updateDelUser(userId){
	if(document.getElementById(userId)){
		document.getElementById(userId).parentNode.parentNode.removeNode(true);
		updateUserList();
	}
}