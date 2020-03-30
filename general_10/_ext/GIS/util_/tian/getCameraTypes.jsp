<%@page import="org.json.JSONArray"%>
<%@page import="org.ofbiz.base.util.UtilMisc"%>
<%@page import="com.xloa.util.Global"%>
<%@page import="org.ofbiz.entity.condition.EntityOperator"%>
<%@page import="org.ofbiz.entity.condition.EntityExpr"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="org.ofbiz.entity.condition.EntityCondition"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.Space"%>
<%@page import="com.zsoa.base.NS"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.json.JSONObject"%>
<%@ page contentType="application/json;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%
response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
response.setHeader("Access-Control-Allow-Credentials", "true");

JSONArray data = new JSONArray();

List<GenericValue> types = NS.findAll("ExtXKCameraType", UtilMisc.toList("orderNo"));
for (GenericValue type : types) {
	JSONObject obj = new JSONObject();
	obj.put("id", type.getString("typeId"));
	obj.put("pId", null);
	obj.put("name", Global.getFieldLabel(type, "typeName"));
	data.put(obj);
}

response.getWriter().write(data.toString());
%>