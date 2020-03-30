<%@ page contentType="text/html;charset=utf-8" errorPage="/common_0/error.jsp"%>
<%@ taglib uri="/WEB-INF/app.tld"    prefix="w" %>
<%@ taglib uri="/WEB-INF/c.tld"  prefix="c"%>
<%@ page import="org.ofbiz.entity.*,org.ofbiz.entity.model.*,org.ofbiz.workflow.*,
org.ofbiz.workflow.client.*,org.ofbiz.base.util.*,java.util.*,java.sql.Timestamp,
com.xloa.util.*,com.zsoa.base.*,org.ofbiz.entity.condition.*,org.ofbiz.entity.util.* " %>
<%
String entity = (String) request.getAttribute("entity");
String id = Global.getReqParam(request, "id");
GenericValue entForm = NS.findEnt(entity, id, request);
try {
	if (entForm != null) {
		String workEffortId = entForm.getString("workEffortId");//workEffortId
		GenericValue process = NS.findEnt("WorkEffort", UtilMisc.toMap("workEffortId", workEffortId), request);
		if (process != null) {
			String parentId = process.getString("workEffortParentId");
			if (parentId==null || parentId.length()==0) parentId = workEffortId;
			GenericValue first = UtilWf.makeFirst(parentId,request);
			
			List filter = UtilMisc.toList(new EntityExpr("workEffortParentId", EntityOperator.EQUALS, parentId));
			List ents = NS.findEnts("WorkEffortAndPartyAssign", filter, UtilMisc.toList("createdDate", "-statusId", "thruDate"), request);
			ents.add(0, first);
			request.setAttribute("ents", ents);
			int i = 0;
			int step = 1;
			String stepId = ((GenericValue)ents.get(0)).getString("workEffortId");
			
			List pfilter = new ArrayList();
			pfilter.add(new EntityExpr("workEffortId", EntityOperator.EQUALS, parentId));
			pfilter.add(new EntityExpr("route", EntityOperator.EQUALS, "结案"));
			long count = NS.findCount("WorkEffortPartyAssignment", pfilter);
			
			boolean zbzjFlag = false;
			if (count>0) {
				zbzjFlag = true;
			}
%>
<body>
<script>
function showComment(i){
	var commentDiv=document.getElementById("comment"+i);
	commentDiv.style.display="block";
	var ePositionToBottom=document.body.clientHeight-event.clientY;
	if(commentDiv.clientHeight>ePositionToBottom) commentDiv.style.top=document.body.scrollTop+event.clientY-(commentDiv.clientHeight-ePositionToBottom);
	else commentDiv.style.top=document.body.scrollTop+event.clientY;
	commentDiv.style.left=document.body.scrollLeft+event.clientX;
}

function hideComment(i){
	var commentDiv=document.getElementById("comment"+i);
	commentDiv.style.display="none";
}
</script>
<table width="100%" cellpadding="2" cellspacing="0">
	<tr>
	    <td colspan="3" style="height:24px; text-align:left"><b>流程开始</b></td>
	</tr>
	<c:forEach var="ent" items="${ents}">
	<%
	GenericValue ent = (GenericValue)pageContext.getAttribute("ent");
	Timestamp fromDate = ent.getTimestamp("fromDate");
	Timestamp thruDate = ent.getTimestamp("thruDate");
	String comments = ent.getString("comments");
	String partyId = ent.getString("partyId");
	String workEffortId2 = ent.getString("workEffortId");
	if (!stepId.equals(workEffortId2)) {
		step++;
		stepId=workEffortId2;
	}
	i++;
	%>
	<tr>
		<td style="vertical-align:middle; text-align:left">
		<span style="width:20%;height:40px;"><b><font color="red" >步骤<%=step %></font></b></span>
		<%
		if (step==1 && zbzjFlag) {
			String workEffortName = Global.isNull(ent.getString("workEffortName")) ? "" : ent.getString("workEffortName");
			if ("事件上报".equals(workEffortName)) {
				workEffortName="自办自结事件";
			} 
		%>
		<span  style="width:30%;height:40px;">&nbsp; 序号<%=i %>：<%=workEffortName %>&nbsp;</span>
		<%
	 	} else {
		%>
		<span  style="width:30%;height:40px;">&nbsp; 序号<%=i %>：<w:out value="ent.workEffortName"/>&nbsp;</span>
		<%
		}
		String blUserNames = UtilWf.getParties(partyId, request);
		List<String>userNameList = Global.split(blUserNames);
		%>
		<span style="width:49%;height:40px;"><b><font color="blue"><%=UtilWf.getParties(partyId, request,true)%>&nbsp;主办</font></b>&nbsp;[<font color="green"><w:out value="ent.statusId" related="StatusItem.description"/>&nbsp;<%=UtilWf.transTime(fromDate,thruDate)%></font>]<br/>
		开始于：<w:out value="ent.fromDate" format="yyyy-MM-dd HH:mm:ss"/>&nbsp;<br/>
		<%
		if (thruDate != null) {
		%>
			 结束于：<w:out value="ent.thruDate" format="yyyy-MM-dd HH:mm:ss"/>&nbsp;
			<%
			if(userNameList.size()>1){
				GenericValue udEnt= NS.findEnt("UserAndDept", UtilMisc.toMap("userId",ent.getString("operator")));
				String deptName="";  
				if(!Global.isNull(udEnt)){
					deptName=udEnt.getString("deptName");
				}
							 		
				String userName=Global.getFieldLabels("User", ent.getString("operator"), "userName"); 
			%>
			<%=(Global.isNull(userName)) ? "" : deptName+"&nbsp;"+userName+" 已办理"%>
			<%
			}
		}
		if(!Global.isNull(comments)){
		%>
		<br/>意&nbsp;&nbsp;&nbsp;&nbsp;见：<span style="cursor:pointer;" onmouseover="showComment('<%=i %>')" onmouseout="hideComment('<%=i %>')"><%=comments %></span>
		<% 
		}
		%>
		</span>
		</td>
	</tr>
	<div id="comment<%=i %>" style="position:absolute;display:none;width:200px;border:1px solid black;background-color:#EEEEEE;"><%=comments %></div>
	</c:forEach>
</table>
</body>
<%
		}
	}
} catch(Exception e) {
	e.printStackTrace();
}
%>