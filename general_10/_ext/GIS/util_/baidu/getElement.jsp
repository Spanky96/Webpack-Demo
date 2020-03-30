<%@page import="com.xloa.util.Global"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.zsoa.sbjc.BoundaryUtil"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.ofbiz.entity.condition.EntityConditionList"%>
<%@page import="org.ofbiz.entity.condition.EntityOperator"%>
<%@page import="org.ofbiz.entity.condition.EntityExpr"%>
<%@page import="org.ofbiz.entity.condition.EntityCondition"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.ofbiz.base.util.UtilMisc"%>
<%@page import="com.zsoa.base.NS"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.Space"%>
<%@ page contentType="application/json;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%
String currentGridId = request.getParameter("currentGridId");
String currentTypeId = request.getParameter("currentTypeId");
String userId = NS.getUserId(request);
Space space = Space.getSpace(request);
String gridId = "";

response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
response.setHeader("Access-Control-Allow-Credentials", "true");

JSONArray array = new JSONArray();

if (StringUtils.isNotBlank(currentTypeId) && !"null".equalsIgnoreCase(currentTypeId)) {
	if (StringUtils.isBlank(currentGridId) || "null".equalsIgnoreCase(currentGridId)) {
		if (space.isCitySpace) {
			gridId = space.gridNo;
		} else {
			GenericValue worker = NS.findEnt("ExtXKGridWorker", UtilMisc.toMap("sysUserId", userId));
			if (null != worker) {
				gridId = worker.getString("gridId");
			} else {
				gridId = space.gridNo;
			}
		}
	} else {
		gridId = currentGridId;
	}
	if (gridId.endsWith("000000")) {
		gridId = gridId.substring(0, gridId.length()-6);
	} else if (gridId.endsWith("000")) {
		gridId = gridId.substring(0, gridId.length()-3);
	}
	List<EntityCondition> filter = new ArrayList<EntityCondition>();
	filter.add(new EntityExpr("typeId", EntityOperator.EQUALS, currentTypeId));
	filter.add(new EntityExpr("gridId", EntityOperator.LIKE, gridId+"%"));
	List<GenericValue> ents = NS.findEnts("ExtXKGridElementInfo", filter);
	for (GenericValue ent: ents) {
		JSONObject obj = new JSONObject();
		obj.put("id", ent.getString("eleId"));
		obj.put("name", ent.getString("eleName"));
		obj.put("img", ent.getString("icon"));
		obj.put("mark", ent.getString("eleSummary"));
		obj.put("lng", Double.parseDouble(ent.getString("lng")));
		obj.put("lat", Double.parseDouble(ent.getString("lat")));
		array.put(obj);
	}
}

response.getWriter().write(array.toString());
%>