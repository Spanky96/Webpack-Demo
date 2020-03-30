<%@page import="com.xloa.util.Global"%>
<%@page import="org.ofbiz.base.util.UtilMisc"%>
<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="java.util.List"%>
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

List<GenericValue> list = NS.findEnts("ExtXKGridElementType", UtilMisc.toMap("isOpen", "1", "gridType", "3"), UtilMisc.toList("seqNum asc"), null);
%>
<!DOCTYPE html>
<html>
<head>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="/scripts/layui/css/layui.css" media="all">
<link rel="stylesheet" href="/scripts/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="/scripts/jquery/jquery-1.11.min.js"></script>
<script type="text/javascript" src="/scripts/layui/layui.js" charset="utf-8"></script>
<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=5b46e0c637e0e8e19b56fb68c2406efb&s=1"></script>
<script type="text/javascript" src="/scripts/BMap/RichMarker_min.js"></script>
<script type="text/javascript" src="/scripts/ztree/js/jquery.ztree.core.min.js"></script>
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
.ztree {
	zoom: 1.2;
}
.ztree li a {
	color: #ffffff !important;
}

.ztree li a.curSelectedNode {
	background-color: rgb(255, 230, 176, 0.5);
	border-color: rgb(255, 185, 81);
}
</style>
</head>
<body>
<div id="container" style="width: 100%;height: 100%;"></div>
</body>
<ul id="ztree" class="ztree"></ul>
<div id="gridNavigation" style="line-height:30px; color:#ffffff">
	<span style="cursor:pointer" onclick="initMap()"><%=topGridName%></span>
</div>
<script type="text/javascript">
layui.use(['layer'], function(){
	var layer = layui.layer;
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		content: $('#ztree'),
		shade: 0,
		area: ['250px', '100%'],
		offset: 'l'
	});
	
	layer.open({
		type: 1,
		title: false,
		closeBtn: false,
		content: $('#gridNavigation'),
		shade: 0,
		area: ['100%', '30px'],
		offset: ['0px', '250px']
	});
});

var map;//百度地图
var container = document.getElementById("container");
var currentTypeId = "";//当前选中分类
var currentGridId = "";//当前选中网格

function initMap() {
	currentGridId = "";//设置当前grid
	map = new BMap.Map("container", {minZoom:12, maxZoom:19, enableMapClick:false});
	var centerPoint = new BMap.Point(<%=space.centerPoint%>);
	map.centerAndZoom(centerPoint, 13);
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
	});
	
	getElement(currentGridId, currentTypeId);
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
	currentGridId = gridNo;//设置当前grid
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
		getElement(currentGridId, currentTypeId);
	});
}

function selectGrid(obj) {
	$(obj).nextAll().each(function(){
		$(this).remove();
	});
	reloadGridMap($(obj).attr("id"))
}

function getElement(currentGridId, currentTypeId) {
	$.getJSON("/general_10/_ext/GIS/util/baidu/getElement.jsp?currentGridId="+currentGridId+"&currentTypeId="+currentTypeId, function(json) {
		if (json.length > 0) {
			for (var i=0; i<json.length; i++) {
				var point = new BMap.Point(json[i].lng, json[i].lat);
				var marker = new BMap.Marker(point);
				map.addOverlay(marker);
				(function() {
					var html = "<div style='cursor:pointer' onclick=\"showElement('"+json[i].id+"', '"+json[i].name+"')\"><h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+json[i].name+"</h4>";
					html += "<img style='float:right;margin:4px' id='imgDemo' src='"+json[i].img+"' width='139' height='104'/>";
					html += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+json[i].mark+"</p></div>";
					var infoWindow = new BMap.InfoWindow(html);
					marker.addEventListener("click", function(){
						this.openInfoWindow(infoWindow);
					});
				})();
			}
		}
	});
	
	return false;
}

function showElement(id, name) {
	layer.open({
		type: 2,
		title: name,
		content: '/general_10/_ext/GIS/util/showElement.jsp?id='+id,
		area: ['50%', '80%'],
	});
}
</script>

<script type="text/javascript">
var zTree;

var setting = {
	view: {
		dblClickExpand : false,
		showLine : true,
		selectedMulti : false,
		expandSpeed : "fast"
	},
	data: {
		simpleData: {
			enable : true,
			idKey : "id",
			pIdKey : "pId",
			rootPId : ""
		}
	},
	callback: {
		beforeClick: function(treeId, treeNode) {
			if (!treeNode.isParent) {
				currentTypeId = treeNode.id;//设置选择分类
			} else {
				currentTypeId = "";
			}
			if (currentGridId == "") {
				initMap();
			} else {
				reloadGridMap(currentGridId);
			}
		}
	}
};
	
var zNodes = [
	{id: '00', pId: null, name: "分类查看", open: true},
	<%
	for (GenericValue ent : list) {
	%>
	{id: '<%=ent.getString("typeId")%>', pId: '00', name: "<%=Global.getFieldLabel(ent, "typeName")%>", open: true, icon: '/scripts/ztree/zTreeStyle/img/diy/10.png'},
	<%
	}
	%>
];

$(document).ready(function(){
	var t = $("#ztree");
	t = $.fn.zTree.init(t, setting, zNodes);
});
</script>
</html>