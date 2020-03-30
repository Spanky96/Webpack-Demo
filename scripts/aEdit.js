var form_calc;//用于判断form_calc.js是否加载
var entity;
var saved=false;
var initInputValues=new Array();

function saveContent(){
  if(saved) return;

  var myForm = document.forms.myForm;
  if (myForm) {
    var changed=false;//内容改变
    var mces="";
    var i=0,j=0;
    for(;i<myForm.elements.length&&j<initInputValues.length;i++){
      if(myForm.elements[i].name.indexOf("mce_editor_")==0){
      /*
        var index=myForm.elements[i].name.indexOf("_",11);
        var mceName=myForm.elements[i].name.substring(0,index);
        if(mces.indexOf(mceName)<0){
          mces+=mceName;
          if(initInputValues[j++]!=tinyMCE.getInstanceById(mceName).getBody().innerHTML){
          alert(mceName+";"+initInputValues[j]+"================="+tinyMCE.getInstanceById(mceName).getBody().innerHTML);
		    changed=true;
            break;
          }
        }
        */
      }else{
		if(initInputValues[j++]!=myForm.elements[i].value){
		  //alert(myForm.elements[i].name+";"+initInputValues[j]+"================="+myForm.elements[i].value);
		  changed=true;
          break;
		}
      }
    }
    //alert(i+";"+myForm.elements.length+";"+j+";"+initInputValues.length);
    if(i<myForm.elements.length||j<initInputValues.length) changed=true;
    if(changed) return "页面内容的改变尚未保存！";
  }
}
function recordInputValues(){
  var myForm = document.forms.myForm;
  if (myForm) {
    var mces="";
    for(var i=0,j=0;i<myForm.elements.length;i++){
      if(myForm.elements[i].name.indexOf("mce_editor_")==0){
      /*
        var index=myForm.elements[i].name.indexOf("_",11);
        var mceName=myForm.elements[i].name.substring(0,index);
        if(mces.indexOf(mceName)<0){
        alert(mceName+":"+tinyMCE.getInstanceById(mceName).getBody().innerHTML);
          mces+=mceName;
          initInputValues[j++]=tinyMCE.getInstanceById(mceName).getBody().innerHTML;
        }
        */
      }else{
        //alert(myForm.elements[i].name+":"+myForm.elements[i].value);
		initInputValues[j++]=myForm.elements[i].value;
      }
    }
  }
}

function view(id){
  centWin('viewContent.jsp?id='+id);
}
function remind(id){
  centWin('remind.jsp?id='+id);
}
function save(){
  if(window.document.readyState=="complete" && myForm.onsubmit()){
    saved=true;
    if(myForm.how) myForm.how.value="save";
    myForm.submit();
  }
}
function saveAndNew(){
  if(window.document.readyState=="complete" && myForm.onsubmit()){
    saved=true;
    if(myForm.how) myForm.how.value="saveAndNew";
    myForm.submit();
  }
}

var info = null;
function init() {
	afterLoad();
//  initTip();
	var myForm = document.forms.myForm;
	if (myForm) {
		myForm.onsubmit = function () {
//			for(var j = 0 ; j < myForm.all.tags("input").length && myForm.all.tags("input")[j].type == "text" ; j++){
//					if(myForm.all.tags("input")[j].value!=null && myForm.all.tags("input")[j].value!=""){
//						myForm.all.tags("input")[j].value =myForm.all.tags("input")[j].value.replace(/(^\s*)|(\s*$)/g, "");
//					}		
//			}
		    if(!beforeSubmit()) return false;
			for (var i = 0; i < this.elements.length; i++) {
				var el = this.elements[i];
				if (!check(el)) {
					return false;
				}
			}
			showInfo();
			return true;
		};
	}
	createInfo();
	if(form_calc) initDetails();//表单初始化
	recordInputValues();//记录所有input的值，用于页面跳转之前判断内容有无修改
}
function afterLoad(){//页面加载完之后需要做什么，可重载
}
function beforeSubmit(){//表单提交之前还要做什么，可重载
  return true;
}
window.onload = init;
function createInfo() {
	if (info != null) {
		return;
	}
	info = document.createElement("table");
//info.outerHTML="<table id='info' style='' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td align='center'><span style='border:1px solid buttonshadow;background-color:white;padding:4px;font-size:16px'>正在处理请求，请稍候...</span></td></tr></tbody></table>";
	info.id = "info";
	info.border = "0px";
//info.width="300px";
//info.height="300px";
	info.cellSpacing = "0px";
	info.cellPadding = "0px";
	info.style.cssText = "top:expression(eval(document.body.scrollTop));left:expression(eval(document.body.scrollLeft));"+
	"width:expression(eval(document.body.clientWidth));height:expression(eval(document.body.clientHeight));"+
	"background-color:#CED3F7;display:none;position:absolute;z-index:1001;filter:alpha(opacity=70)";
//info.style.top="0px";
//info.style.left="0px";
//info.style.position="absolute";
//info.style.backgroundColor="#CED3F7";
//info.style.display="block";
//info.style.zIndex="10";
//info.style.filter="alpha(opacity=70)";
	document.body.appendChild(info);
//top.tagInfo(info.style);
// TBODY is required for IE, otherwise you don't see anything in the TABLE.
	var tbody = document.createElement("tbody");
	info.appendChild(tbody);
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	var td = document.createElement("td");
	td.align = "center";
	tr.appendChild(td);
	var span = document.createElement("span");
	span.style.cssText = "border:1px solid buttonshadow;background-color:white;padding:4px;font-size:16px";
//span.style.border="1px solid buttonshadow";
//span.style.backgroundColor="#ffffff";
//span.style.padding="4px";
//span.style.fontSize="16px";
	span.innerHTML = "正在处理请求，请稍候...";
	td.appendChild(span);
}
function showInfo() {
	if (info) {
		info.style.display = "block";
	}
}
function hideInfo() {
	if (info) {
		info.style.display = "none";
	}
}
position = function(x,y)
{
    this.x = x;
    this.y = y;
}

getPosition = function(oElement)
{
    var objParent = oElement
    var oPosition = new position(0,0);
    while (objParent.tagName != "BODY")
    {
        oPosition.x += objParent.offsetLeft;
        oPosition.y += objParent.offsetTop;
        objParent = objParent.offsetParent;
    }
    return oPosition;
} 
function helpDiv(obj,entityName,col){
    var pos = getPosition(obj);
    var objDiv=document.getElementById(obj.innerHTML+"_Help");
    if(objDiv){
    	objDiv.style.display="";
    }else{
	   var objDiv = document.createElement("div");
	   objDiv.className="lionrong";//For IE
	   objDiv.id=obj.innerHTML+"_Help";
	   objDiv.style.position = "absolute";
	   var tempheight=pos.y;
	   var tempwidth1,tempheight1;
	   var windowwidth=document.body.clientWidth;
	   var isIE=((navigator.appVersion.indexOf("MSIE 5")>0) || (navigator.appVersion.indexOf("MSIE")>0 && parseInt(navigator.appVersion)> 4)||(navigator.appVersion.indexOf("MSIE 5.5")>0)||navigator.appVersion.indexOf("MSIE 6")>0||(navigator.appVersion.indexOf("MSIE 7")>0)||(navigator.appVersion.indexOf("MSIE 8")>0));
	   if(isIE){var tempwidth=pos.x+305;}else{var tempwidth=pos.x+312;}
	   objDiv.style.width = "300px";
		   objDiv.innerHTML = sendSync('/common_0/helpAjax.jsp?entityName='+entityName+'&col='+col);
	   if (tempwidth>windowwidth)
	   {
			tempwidth1=tempwidth-windowwidth
	    	objDiv.style.left = (pos.x-tempwidth1) + "px";
	   }
	   else
	   {
			if(isIE){objDiv.style.left = (pos.x + 30) + "px";}else{objDiv.style.left = (pos.x) + "px";}
	   }
	   var tempheight=pos.y+16;
	   if(isIE && (tempheight<document.body.clientHeight)){objDiv.style.top = tempheight + "px";}
	   else if(isIE && ((tempheight-32)>document.body.clientHeight)){objDiv.style.top=tempheight-32+"px"}
	   else {objDiv.style.top=tempheight-16+"px";}
	   objDiv.style.display = "";
	   document.body.appendChild(objDiv);
    }
}
function hiddenHelpDiv(obj){
var helpDivId=obj.innerHTML+"_Help";
var helpDiv=document.getElementById(helpDivId);
if(helpDiv && helpDiv.style.display=="")helpDiv.style.display="none";
}
