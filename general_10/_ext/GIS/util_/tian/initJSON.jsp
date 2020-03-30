<%@page import="com.zsoa.zhzf.map.PositionUtil"%>
<%@page import="com.zsoa.zhzf.map.Gps"%>
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
String userId = NS.getUserId(request);
Space space = Space.getSpace(request);
List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
if (space.isCitySpace) {
	List<EntityCondition> filter = new ArrayList<EntityCondition>();
	filter.add(new EntityExpr("spaceId", EntityOperator.NOT_EQUAL, Space.zero_space.spaceId));
	EntityExpr expr1 = new EntityExpr("isCitySpace", EntityOperator.NOT_EQUAL, "Y");
	EntityExpr expr2 = new EntityExpr("isCitySpace", EntityOperator.EQUALS, null);
	EntityConditionList conlist = new EntityConditionList(UtilMisc.toList(expr1, expr2), EntityOperator.OR);
	filter.add(conlist);
	List<GenericValue> spaceList = NS.findEnts("Space", filter);
	for (GenericValue s : spaceList) {
		String gridNo = s.getString("gridNo");
		GenericValue grid = NS.findEnt("ExtXKGrid", gridNo);
		if (null != grid) {
			if (StringUtils.isNotBlank(grid.getString("boundry")) && !"null".equals(grid.getString("boundry"))) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("gridId", grid.getString("gridId"));
				map.put("gridName", grid.getString("gridName"));
				map.put("center", BoundaryUtil.getCenterPoint(grid.getString("boundry")));
				map.put("boundry", grid.getString("boundry"));
				list.add(map);
			}
		}
	}
} else {
	GenericValue worker = NS.findEnt("ExtXKGridWorker", UtilMisc.toMap("sysUserId", userId));
	if (null != worker) {
		String gridId = worker.getString("gridId");
		List<GenericValue> grids = NS.findEnts("ExtXKGrid", UtilMisc.toMap("parentId", gridId), request);
		if (null != grids && grids.size() > 0) {
			for (GenericValue grid : grids) {
				if (StringUtils.isNotBlank(grid.getString("boundry")) && !"null".equals(grid.getString("boundry"))) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("gridId", grid.getString("gridId"));
					map.put("gridName", grid.getString("gridName"));
					map.put("center", BoundaryUtil.getCenterPoint(grid.getString("boundry")));
					map.put("boundry", grid.getString("boundry"));
					list.add(map);
				}
			}
		} else {
			GenericValue grid = NS.findEnt("ExtXKGrid", gridId);
			if (StringUtils.isNotBlank(grid.getString("boundry")) && !"null".equals(grid.getString("boundry"))) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("gridId", grid.getString("gridId"));
				map.put("gridName", grid.getString("gridName"));
				map.put("center", BoundaryUtil.getCenterPoint(grid.getString("boundry")));
				map.put("boundry", grid.getString("boundry"));
				list.add(map);
			}
		}
		
	} else {
		String gridId = space.gridNo;
		List<GenericValue> grids = NS.findEnts("ExtXKGrid", UtilMisc.toMap("parentId", gridId), request);
		if (null != grids && grids.size() > 0) {
			for (GenericValue grid : grids) {
				if (StringUtils.isNotBlank(grid.getString("boundry")) && !"null".equals(grid.getString("boundry"))) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("gridId", grid.getString("gridId"));
					map.put("gridName", grid.getString("gridName"));
					map.put("center", BoundaryUtil.getCenterPoint(grid.getString("boundry")));
					map.put("boundry", grid.getString("boundry"));
					list.add(map);
				}
			}
		} else {
			GenericValue grid = NS.findEnt("ExtXKGrid", gridId);
			if (StringUtils.isNotBlank(grid.getString("boundry")) && !"null".equals(grid.getString("boundry"))) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("gridId", grid.getString("gridId"));
				map.put("gridName", grid.getString("gridName"));
				map.put("center", BoundaryUtil.getCenterPoint(grid.getString("boundry")));
				map.put("boundry", grid.getString("boundry"));
				list.add(map);
			}
		}
	}
}

response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
response.setHeader("Access-Control-Allow-Credentials", "true");

JSONArray array = new JSONArray();

for (Map<String, Object> map : list) {
	JSONObject obj = new JSONObject();
	obj.put("gridId", (String)map.get("gridId"));
	obj.put("gridName", (String)map.get("gridName"));
	//百度转WGS84
	Gps gps = PositionUtil.bd09_To_Gps84(((Map<String, Double>)map.get("center")).get("lat"), ((Map<String, Double>)map.get("center")).get("lng"));
	obj.put("center_lng", gps.getWgLon());
	obj.put("center_lat", gps.getWgLat());
	List<String> boundrys = Global.split((String)map.get("boundry"), ";");
	JSONArray boundry = new JSONArray();
	for (String s : boundrys) {
		JSONObject b = new JSONObject();
		gps = PositionUtil.bd09_To_Gps84(Double.parseDouble(s.split(",")[1]), Double.parseDouble(s.split(",")[0]));
		b.put("lng", gps.getWgLon());
		b.put("lat", gps.getWgLat());
		boundry.put(b);
	}
	obj.put("boundry", boundry);
	array.put(obj);
}

response.getWriter().write(array.toString());
%>