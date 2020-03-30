<%@page import="org.ofbiz.base.util.UtilMisc"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.xloa.util.Global"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.NS"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String userId = NS.getUserId(request);
String id = request.getParameter("id");
GenericValue ent = NS.findEnt("ExtXKItemReport", id);
request.setAttribute("entity", "ExtXKItemReport");
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
	width:15%;
	border-collapse:collapse;
	text-align:right
}
td:nth-child(2n){
	width:35%;
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
		<td class="tr">事项名称：</td>
		<td><%=Global.getFieldLabel(ent, "itemName")%></td>
		<td class="tr">事项级别：</td>
		<td><%=Global.getFieldLabel(ent, "itemLevel")%></td>
	</tr>
	<tr>
		<td class="tr">事项位置：</td>
		<td><%=Global.getFieldLabel(ent, "itemLocation")%></td>
		<td class="tr">处理状态：</td>
		<td><%=Global.getFieldLabel(ent, "itemStatus")%></td>
	</tr>
	<tr>
		<td class="tr">所属网格：</td>
		<td><%=com.zsoa.swgh.Util.getFullGridName(ent.getString("gridId"))%></td>
		<td class="tr">事项类型：</td>
		<td><%=Global.getFieldLabels("ExtXKItemType", ent.getString("itemType"), "typeName")%></td>
	</tr>
	<tr>
		<td class="tr">上报时间：</td>
		<td><%=Global.getFieldLabel(ent, "date")%></td>
		<td class="tr">事项描述：</td>
		<td><%=Global.getFieldLabel(ent, "content")%></td>
	</tr>
	<tr>
		<td class="tr">上报人：</td>
		<td><%=Global.getFieldLabel(ent, "userId")%></td>
		<td class="tr">所在部门：</td>
		<td><%=Global.getFieldLabel(ent, "deptId")%></td>
	</tr>
	<tr>
		<td class="tr">办理前：</td>
		<td>
		<%
		List<String> attaches1 = Global.split(ent.getString("attach"));
		if (null != attaches1 && attaches1.size()>0) {
		%>
			<div class="layui-carousel" id="imgDiv1">
				<div carousel-item>
				<%
				for (String img : attaches1) {
				%>
					<img src="<%=img%>">
				<%
				}
				%>
				</div>
			</div>
		<%
		}
		%>
		</td>
		<td class="tr">办理后：</td>
		<td>
		<%
		List<String> attaches2 = Global.split(ent.getString("imgs"));
		if (null != attaches2 && attaches2.size()>0) {
		%>
			<div class="layui-carousel" id="imgDiv2">
				<div carousel-item>
				<%
				for (String img : attaches2) {
				%>
					<img src="<%=img%>">
				<%
				}
				%>
				</div>
			</div>
		<%
		}
		%>
		</td>
	</tr>
	<tr>
		<td class="tr">承办意见：</td>
		<td colspan="3"><%=Global.getFieldLabel(ent, "opinion")%></td>
	</tr>
	<tr>
		<td class="tr">会办意见：</td>
		<td colspan="3"><%=Global.getFieldLabel(ent, "handleOpinion")%></td>
	</tr>
	<tr>
		<td class="tr">会办结果：</td>
		<td colspan="3">
		<%
		String xloaFormSn = ent.getString("xloaFormSn");
		String result = "";
		if (StringUtils.isNotBlank(xloaFormSn) && !"null".equalsIgnoreCase(xloaFormSn)) {
			List<GenericValue> opinions = NS.findEnts("ExtXKItemReportOpinion", UtilMisc.toMap("xloaFormSn", xloaFormSn));
			if (opinions!=null && opinions.size()>0) {
				result += "<table cellSpacing='1' cellPadding='2' width='100%' border='0'>";
				for (GenericValue opinion : opinions) {
					result += "<tr><td style='width:60px;text-align:left;'>"+Global.getFieldLabel(opinion, "userId")+":</td><td>"+Global.getFieldLabel(opinion, "opinion")+"</td></tr>";
				}
				result += "</table>";
			}
		}
		out.print(result);
		%>
		</td>
	</tr>
	<tr>
		<td class="tr">评价等级：</td>
		<td colspan="3"><%=Global.getFieldLabel(ent, "manYiDu")%></td>
	</tr>
	<tr>
		<td class="tr">评价内容：</td>
		<td colspan="3"><%=Global.getFieldLabel(ent, "assess")%></td>
	</tr>
</table>

<jsp:include page="viewProcess.jsp" />
<%	
}
%>
</body>
<script type="text/javascript">
layui.use(['layer', 'carousel'], function(){
	var layer = layui.layer;
	var carousel = layui.carousel;
	carousel.render({
		elem: '#imgDiv1',
		width: '100%',
		arrow: 'always' //始终显示箭头
	});
	
	carousel.render({
		elem: '#imgDiv2',
		width: '100%',
		arrow: 'always' //始终显示箭头
	});
	
	layer.photos({
		photos: '#imgDiv1',
		anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
	});
	
	layer.photos({
		photos: '#imgDiv2',
		anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
	});
});
</script>
</html>