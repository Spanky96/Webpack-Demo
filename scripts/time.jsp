<%@ page contentType="text/html;charset=utf-8" errorPage="/common_0/error.jsp"%>
<%@ taglib uri="/WEB-INF/app.tld"    prefix="w" %>
<%@ taglib uri="/WEB-INF/c.tld"  prefix="c"%>
<%@ page import="org.ofbiz.entity.*,org.ofbiz.entity.model.*,
                 org.ofbiz.base.util.*,java.util.*,
                  com.xloa.util.* " %>
<%

Date date=new Date();
int hour=date.getHours();
int minute=date.getMinutes();

String dateStr=request.getParameter("dateStr");
if(dateStr!=null && dateStr.length()>0) dateStr+=" ";
String timeStr=request.getParameter("timeStr");
if(timeStr!=null && timeStr.length()>0){
  try{
    List list=StringUtil.split(timeStr,":");
    hour=Integer.parseInt((String)list.get(0));
    minute=Integer.parseInt((String)list.get(1));
  }catch(Exception e){
    throw new Exception("输入参数不对！");
  }
}

%>
<html>
<head>
<title>时间</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="/scripts/style.css">
<script language="JavaScript" src="/scripts/window.js"></script>
<script language="JavaScript" src="/scripts/tables.jsp"></script>
<script language="JavaScript" src="/scripts/aBase.js"></script>
<script language="JavaScript">
// var returnValue="";
function afterSubmit(){
	var info = getExplorer();
	if(info=="edge"||info=="Chrome"){
		window.returnValue("<%=dateStr%>"+myForm.hour.value+":"+myForm.minute.value);
	   }else{
	   	window.returnValue="<%=dateStr%>"+myForm.hour.value+":"+myForm.minute.value;
	   }
	window.close();
}
//弹出层停用
// function getData(){
// 	afterSubmit();
// 	return returnValue;
// }
</script>
<style>
.win21{padding:0px 5px 0 5px;height:26px;  background:url(/images_0/050.jpg) repeat-x bottom; border:#848484 1px solid;}
.win2{height:44px; text-align:left; background:#F6F6F6; padding-left:20px; border-bottom:#CDCDCD 1px solid;}
</style>
</head>

<body class="bodycolor" topmargin="2" leftmargin="2" rightmargin="2" bottommargin="2" style="background:url(/images_0/002.png)">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td class="win2" style="height: 35px"><w:toolbar0 type="0">确定,确定,save.gif,afterSubmit();取消,取消,stop.gif,window.close()</w:toolbar0></td>
  </tr>
</table>
<span class="VSep"></span>
<table width="100%" bordercolorlight="#808080" bordercolordark="#ffffff" cellpadding="2" cellspacing="0" align="center">
<form action="#"  method="post" name="myForm">
  <tr>
    <td align="center">
  <select name="hour">
<%
for(int i=0;i<24;i++){
  String selected="";
  if(hour==i) selected="selected";
%>
<option value=<%=i%> <%=selected%>><%=i%></option>
  <%}%>
  </select>
  时
<select name="minute">
<%
for(int i=0;i<60;i+=5){
  String selected="";
  if(minute==i) selected="selected";
%>
<option value=<%=i%> <%=selected%>><%=i%></option>
  <%}%>
  </select>
  分
    </td>
  </tr>
</form>
</table>
</body>

</html>

