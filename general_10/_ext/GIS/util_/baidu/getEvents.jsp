<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.TreeSet"%>
<%@page import="java.util.Set"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="org.ofbiz.entity.jdbc.ConnectionFactory"%>
<%@page import="java.sql.Connection"%>
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
<%!
private static Connection getConnection() {
	Connection conn = null;
	try {
		conn = ConnectionFactory.getConnection(Global.dg.getGroupHelperName("org.ofbiz"));
	} catch (Exception e) {
		e.printStackTrace();
	}
	return conn;
}

private static Set<String> getChildItemType(String typeId) {
	Connection conn = null;
	PreparedStatement pst = null;
	ResultSet rs = null;
	Set<String> set = new TreeSet<String>();
	try {
		conn = getConnection();
		conn.setAutoCommit(false);
		String sql = "WITH cte AS (SELECT ID, TYPE_NAME FROM EXT_X_K_ITEM_TYPE WHERE PARENT_ID = ? ";
		sql += " UNION ALL SELECT a.ID, a.TYPE_NAME FROM EXT_X_K_ITEM_TYPE AS a, cte AS b WHERE a.PARENT_ID = b.ID) ";
		sql += " SELECT ID, TYPE_NAME FROM cte";
		pst = conn.prepareStatement(sql);
		pst.setString(1, typeId);
		rs = pst.executeQuery();
		while (rs.next()) {
			set.add(rs.getString(1));
		}
	} catch (SQLException e) {
		e.printStackTrace();
	} finally {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (pst != null) {
			try {
				pst.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	return set;
}
%>

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
	Set<String> typeIds = getChildItemType(currentTypeId);
	typeIds.add(currentTypeId);
	Calendar calendar = Calendar.getInstance();
	int year = calendar.get(Calendar.YEAR);
	String nowDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar.getTime());
	filter.add(new EntityExpr("itemType", EntityOperator.IN, typeIds));
	filter.add(new EntityExpr("gridId", EntityOperator.LIKE, gridId+"%"));
	filter.add(new EntityExpr("date", EntityOperator.GREATER_THAN_EQUAL_TO, year+"-01-01 00:00:00"));
	filter.add(new EntityExpr("date", EntityOperator.LESS_THAN_EQUAL_TO, nowDate));
	List<GenericValue> ents = NS.findEnts("ExtXKItemReport", filter);
	for (GenericValue ent: ents) {
		JSONObject obj = new JSONObject();
		obj.put("id", ent.getString("id"));
		obj.put("name", ent.getString("itemName"));
		obj.put("itemLevel", Global.getFieldLabel(ent, "itemLevel"));
		String lng = ent.getString("longitude");
		String lat = ent.getString("latitude");
		obj.put("lng", Double.parseDouble(lng));
		obj.put("lat", Double.parseDouble(lat));
		array.put(obj);
	}
}

response.getWriter().write(array.toString());
%>