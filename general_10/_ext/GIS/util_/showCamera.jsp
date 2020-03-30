<%@page import="org.ofbiz.entity.GenericValue"%>
<%@page import="com.zsoa.base.NS"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String id = request.getParameter("id");
GenericValue ent = NS.findEnt("ExtXKCameras", id);
if (null != ent) {
	String url = ent.getString("url");
%>
<!DOCTYPE html>
<html>
<head>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<script type="text/javascript" src="/scripts/cyberplayer-3.5.3/cyberplayer.js"></script>
</head>
<body>
<div id="playercontainer" style="width:100%; height:420px"></div>
</body>
<script type="text/javascript">
var player = cyberplayer("playercontainer").setup({
    width: 620,
    height: 420,
    isLive: true, // 必须设置，表明是直播视频
    file: "<%=url%>", // <—hls直播地址
    autostart: true,
    stretching: "uniform",
    volume: 100,
    controls: true,
    hls: {
        reconnecttime: 5 // hls直播重连间隔秒数
    },
    ak: "844c746d1b1c43ad8e52db984489954b" // 公有云平台注册即可获得accessKey
});
</script>
</html>
<%
}
%>