<%@ page contentType="text/html;charset=utf-8" errorPage="/common_0/error.jsp"%>
<%@ taglib uri="/WEB-INF/app.tld"    prefix="w" %>
<%@ taglib uri="/WEB-INF/c.tld"  prefix="c"%>
<%@ page import="org.ofbiz.entity.*,org.ofbiz.entity.model.*,
                 org.ofbiz.base.util.*,java.util.*,
                  com.xloa.util.Global " %>
<%
Date date=new Date();
String year=""+(date.getYear()+1900);
String month=""+(date.getMonth()+1);
String day=""+date.getDate();

String dateStr=request.getParameter("dateStr");
if(dateStr!=null && dateStr.length()>0){
dateStr+=" ";
List list=StringUtil.split(dateStr,"-");
if(list.size()!=3) throw new Exception("输入参数不对！");
year=(String)list.get(0);
month=(String)list.get(1);
day=(String)list.get(2);
try{
  int ss=Integer.parseInt(year);
  year=""+ss;
}catch(Exception ee){}
try{
  int ss=Integer.parseInt(month);
  month=""+ss;
}catch(Exception ee){}
try{
  int ss=Integer.parseInt(day);
  day=""+ss;
}catch(Exception ee){}

}
String timeStr=request.getParameter("timeStr");
if(timeStr!=null && timeStr.length()>0) timeStr=" "+timeStr;
%>
<html>
<head>
<title>日历</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="/scripts/style.css">
<script language="JavaScript" src="/scripts/window.js"></script>
<script language="JavaScript" src="/scripts/tables.jsp"></script>
<script language="JavaScript" src="/scripts/aBase.js"></script>

<script language="JavaScript">

function MM_findObj(n, d) { //v4.0

  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {

    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}

  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];

  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);

  if(!x && document.getElementById) x=document.getElementById(n); return x;

}



function doCal()

{

  n=new Date();

  cm="<%=month%>";

  n.setFullYear("<%=year%>");

  n.setMonth(cm-1,1);



  writeMonth(n);

}



function set_year(op)

{

  if(op==-1 && document.form1.YEAR.selectedIndex==0)

     return;

  if(op==1 && document.form1.YEAR.selectedIndex==(document.form1.YEAR.options.length-1))

     return;



  document.form1.YEAR.selectedIndex=document.form1.YEAR.selectedIndex+op;



  yr=document.form1.YEAR.value;

  cm=document.form1.MONTH.value;

  doOther(yr,cm);

}



function set_mon(op)

{

  if(op==-1 && document.form1.MONTH.selectedIndex==0)

     return;

  if(op==1 && document.form1.MONTH.selectedIndex==(document.form1.MONTH.options.length-1))

     return;



  document.form1.MONTH.selectedIndex=document.form1.MONTH.selectedIndex+op;



  yr=document.form1.YEAR.value;

  cm=document.form1.MONTH.value;

  doOther(yr,cm);

}



function doOther(yr,cm)

{

  n=new Date();

  n.setFullYear(yr);

  n.setMonth(cm-1,1);

  writeMonth(n);

}


var timeValue ="";
function writeMonth(n)

{

  yr=document.form1.YEAR.value;

  cm=document.form1.MONTH.value;

  dow=n.getDay();moy=n.getMonth();



  for (i=0;i<41;i++)

  {

    if ((i<dow)||(moy!=n.getMonth()))

       dt="&nbsp;";

    else

    {

      dt=n.getDate();

      n.setDate(n.getDate()+1);


      if(dt==<%=day%>&&cm==<%=month%>&&yr==<%=year%>){
    	    if(dt==null || dt=="") dt="1";
    	      if(cm<10)cm="0"+cm;
    	      if(dt<10)dt="0"+dt;
    	      date_str=yr+"-"+cm+"-"+dt;
    	      timeValue=date_str+"<%=timeStr%>";
         dt="<a href='#' style='color:red;' onclick='dateClick("+dt+",this)'>"+dt+"</a>";
      }


      else

         dt="<a href='#'  onclick='dateClick("+dt+",this)'>"+dt+"</a>";

    }
    document.getElementsByName("day").item(i).innerHTML="<b>"+dt+"</b>";
//     MM_findObj('day')[i].innerHTML="<b>"+dt+"</b>";
  }

}



function setPointer(theRow, thePointerColor)

{

   theRow.bgColor = thePointerColor;

}

function dateClick(theDate,obj)
{
	var alist = document.getElementsByTagName("a");
	for(var i=0;i<alist.length;i++){
		alist[i].style.color ="#000";
	}
   obj.style.color="red";
   yr=document.form1.YEAR.value;
   cm=document.form1.MONTH.value;
   dt=theDate;
   if(dt==null || dt=="") dt="1";
   if(cm<10)cm="0"+cm;
   if(dt<10)dt="0"+dt;
   date_str=yr+"-"+cm+"-"+dt;
   timeValue=date_str+"<%=timeStr%>";
   var info = getExplorer();
	if(info=="edge"||info=="Chrome"){
	   window.returnValue(timeValue);
   }else{
	   window.returnValue=timeValue;
   }
   window.close();
}
// function getData(){
// 	return timeValue;
// }
function thisMonth()

{

   document.form1.YEAR.selectedIndex=(<%=year%>-1950);

   document.form1.MONTH.selectedIndex=(<%=month%>-1);

   doCal();

}

</script>
</head>

<body class="bodycolor" onload="doCal();" topmargin="1" leftmargin="1" rightmargin="1" style="background:url(/images_0/002.png)">
<form action="#"  method="post" name="form1">
  <table width="100%" border="0" cellspacing="1" bgcolor="#333333" cellpadding="3" align="center">
    <tr align="center" class="bodycolor">
      <td colspan="7">
        <!-------------- 年 ------------>
        <p><w:button text="〈" title="上一年" onClick="set_year(-1)"/>
        <select name="YEAR" onchange="set_year(0)">
<%
for(int i=1950;i<=2050;i++){
out.print("<option value="+i+" ");
if(year.equals(""+i)) out.print("selected");
out.print(">"+i+"</option>\n");
}
%>
        </select> <w:button text="〉" title="下一年" onClick="set_year(1)"/>
        <b>年</b>
        <!-------------- 月 ------------>
        <w:button text="〈" title="上一月" onClick="set_mon(-1)"/>
        <select name="MONTH" onchange="set_mon(0)">
<%
for(int i=1;i<=12;i++){
out.print("<option value="+i+" ");
if(month.equals(""+i)) out.print("selected");
out.print(">"+i+"</option>\n");
}
%>
        </select>
        <w:button text="〉" title="下一月" onClick="set_mon(1)"/>
        <b>月</b><input type=hidden name=DATE> </td>
    </tr>
    <tr align="center" class="bodycolor">
      <td width="14%" bgcolor="#FFCCFF"><b>日</b></td>
      <td width="14%"><b>一</b></td>
      <td width="14%"><b>二</b></td>
      <td width="14%"><b>三</b></td>
      <td width="14%"><b>四</b></td>
      <td width="14%"><b>五</b></td>
      <td width="14%" bgcolor="#CCFFCC"><b>六</b></td>
<%
for(int i=0;i<42;i++){
  if(i%7==0) out.print("</tr><tr bgcolor=#FFFFFF align=center style='cursor:hand'>");
  out.print("<td width=14% id=day name=day></td>");
}
%>
    </tr>
  </table>
</form>
</body>
</html>

