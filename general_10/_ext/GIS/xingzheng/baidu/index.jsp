<%@page import="org.ofbiz.base.util.UtilMisc"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.NS"%>
<%@page import="com.zsoa.base.Space"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String userId = NS.getUserId(request);
Space space = Space.getSpace(request);

String topGridName = "";
String topGridId = "";
if (space.isCitySpace) {
	topGridName = space.spaceName;
	topGridId = "";
} else {
	GenericValue worker = NS.findEnt("ExtXKGridWorker", UtilMisc.toMap("sysUserId", userId));
	if (null != worker) {
		String gridId = worker.getString("gridId");
		GenericValue myGrid = NS.findEnt("ExtXKGrid", gridId);
		if (null != myGrid) {
			topGridName = myGrid.getString("gridName");
			topGridId = myGrid.getString("gridId");
		} else {
			topGridName = space.spaceName;
			topGridId = space.gridNo;
		}
	} else {
		topGridName = space.spaceName;
		topGridId = space.gridNo;
	}
}
%>
<!DOCTYPE html>
<html>
<head>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="/scripts/layui/css/layui.css" media="all">
<script type="text/javascript" src="/scripts/jquery/jquery-1.11.min.js"></script>
<script type="text/javascript" src="/scripts/layui/layui.js" charset="utf-8"></script>
<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=5b46e0c637e0e8e19b56fb68c2406efb&s=1"></script>
<script type="text/javascript" src="/scripts/BMap/RichMarker_min.js"></script>
<style type="text/css">
body, html {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
.alert {
    filter: alpha(opacity=100);
    -moz-opacity: 1.0;
    opacity: 1.0;
    width: 145px;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    text-align: center;
}
.layui-layer-content{
    background-color: rgba(10, 10, 10, 0.7)
}
.layui-layer {
	background-color: transparent!important;
}
</style>
</head>
<body>
<div id="container" style="width: 100%;height: 100%;"></div>
</body>
<div id="gridNavigation" style="line-height:30px; color:#ffffff; padding-left:10px">
	<span style="cursor:pointer" onclick="initMap()"><%=topGridName%></span>
</div>
<script type="text/javascript">
layui.use(['layer'], function(){
	var layer = layui.layer;
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		content: $('#gridNavigation'),
		shade: 0,
		area: ['100%', '30px'],
		offset: 't'
	});
});

var map;//百度地图
var container = document.getElementById("container");

function initMap() {
	map = new BMap.Map("container", {minZoom:12, maxZoom:19, enableMapClick:false});
	var centerPoint = new BMap.Point(<%=space.centerPoint%>);
	map.centerAndZoom(centerPoint, 13);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.MapTypeControl());
	map.enableScrollWheelZoom();
	
	$.getJSON("/general_10/_ext/GIS/util/baidu/initJSON.jsp", function(json) {
		for (var i=0; i<json.length; i++) {
			var arr =  [];
			var boundry = json[i].boundry;
			for (var k=0; k<boundry.length; k++) {
				var point = new BMap.Point(boundry[k].lng, boundry[k].lat);
				arr.push(point);
			}
			var p = new BMap.Point(json[i].center_lng, json[i].center_lat);
			addPoly(arr, 2, json[i].gridId, json[i].gridName, "#2f57f7", p);
		}
	});
	
	$("#gridNavigation").find("span").each(function(index){
		if (index != 0) {
			$(this).remove();
		}
	})
}

function addPoly(boundry, weight, gridNo, gridName, fillColor, point) {
	var ply = new BMap.Polygon(boundry, {strokeWeight: weight, strokeColor: "red", fillColor: fillColor}); //建立多边形覆盖物	 
	ply.setFillOpacity(0.2);
	//添加富标注
	var htm = "";
	htm = "<div class='alert'>"
		+     "<div>"+gridName+"</div>"
		+     "<div style='font-size:12px'>"+gridNo+"</div>"
		+ "</div>";
	var myRM = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-72.5, -10), "enableDragging": false});
	map.addOverlay(myRM);
	map.addOverlay(ply);  //添加覆盖物
	
	ply.onclick = function() {
		reloadGridMap(gridNo, point);
		if ($("#gridNavigation").find("#"+gridNo).length == 0) {
			$("#gridNavigation").append("<span id='"+gridNo+"' style='cursor:pointer' onclick='selectGrid(this)'>"+">>"+gridName+"</span>");
		}
	}
}

initMap();

function reloadGridMap(gridNo, point) {
	map.centerAndZoom(point, 14);
	$.getJSON("/general_10/_ext/GIS/util/baidu/getGridJson.jsp?gridNo="+gridNo, function(json) {
		if (json.length > 0) {
			map.clearOverlays();
			for (var i=0; i<json.length; i++) {
				var arr =  [];
				var boundry = json[i].boundry;
				for (var k=0; k<boundry.length; k++) {
					var point = new BMap.Point(boundry[k].lng, boundry[k].lat);
					arr.push(point);
				}
				var p = new BMap.Point(json[i].center_lng, json[i].center_lat);
				addPoly(arr, 2, json[i].gridId, json[i].gridName, "#2f57f7", p);
			}
		}
	})
}

function selectGrid(obj) {
	$(obj).nextAll().each(function(){
		$(this).remove();
	});
	reloadGridMap($(obj).attr("id"))
}
</script>
</html>