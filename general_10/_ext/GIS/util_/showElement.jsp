<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.xloa.util.Global"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.NS"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String userId = NS.getUserId(request);
String id = request.getParameter("id");
GenericValue ent = NS.findEnt("ExtXKGridElementInfo", id);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/scripts/layui/css/layui.css" media="all">
<script type="text/javascript" src="/scripts/jquery/jquery-1.11.min.js" ></script>
<script type="text/javascript" src="/scripts/layui/layui.js" charset="utf-8"></script>
<title>详情</title>
<style type="text/css">
table{
	border-collapse:collapse;
	width: 95%;
	margin: 10px auto;
}
td:nth-child(2n+1){
	width:20%;
	border-collapse:collapse;
	text-align:right
}
td:nth-child(2n){
	width:30%;
	border-collapse:collapse;
	text-align:left
}
td{
	padding:10px;
	border-collapse:collapse;
	border:1px solid #cdcdcd;
	text-align:center;
	font-size:16px;
}
textarea{
	width: 100%;
	height: 100px;
}
</style>
</head>
<body style="background: #ffffff;">
<%
if (null != ent) {
%>
<table cellpadding="0" cellspacing="0" border="1" bordercolor="#15DAFD">
	<tr>
		<td class="tr">元素名称：</td>
		<td><%=Global.getFieldLabel(ent, "eleName")%></td>
		<td class="tr">元素类别：</td>
		<td><%=Global.getFieldLabel(ent, "typeId")%></td>
	</tr>
    <tr>
    	<td class="tr">联系人：</td>
    	<td><%=Global.getFieldLabel(ent, "eleContact")%></td>
    	<td class="tr">联系电话：</td>
    	<td><%=Global.getFieldLabel(ent, "elePhone")%></td>
	</tr>
	<tr>
    	<td class="tr">地理位置：</td>
    	<td colspan="3"><%=Global.getFieldLabel(ent, "eleAddress")%></td>
	</tr>
	<tr>
    	<td class="tr">备注：</td>
    	<td><%=Global.getFieldLabel(ent, "remark")%></td>
    	<td class="tr">所属网格：</td>
    	<td><%=com.zsoa.swgh.Util.getFullGridName(ent.getString("gridId"))%></td>
	</tr>
	<tr>
    	<td class="tr">图片：</td>
    	<td colspan="3"><img src="<%=ent.getString("icon")%>" style="width:400px; height:300px"></td>
	</tr>
	<tr>
    	<td class="tr">简介：</td>
    	<td colspan="3"><%=Global.getFieldLabel(ent, "eleSummary")%></td>
	</tr>
</table>
<%	
}
%>
</body>
<script type="text/javascript">
layui.use(['layer'], function(){
	var layer = layui.layer;
});
</script>
</html>