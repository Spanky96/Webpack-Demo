Array.prototype.remove = function(s) { 
 for (var i = 0; i < this.length; i++) { 
   if (s == this[i]) 
    this.splice(i, 1); 
 } 
} 


function Map() { 
 /** 存放键的数组(遍历用到) */ 
 this.keys = new Array(); 
 /** 存放数据 */ 
 this.data = new Object(); 
  
 /** 
  * 放入一个键值对 
  * @param {String} key 
  * @param {Object} value 
  */ 
 this.put = function(key, value) { 
  if(this.data[key] == null){ 
   this.keys.push(key); 
  } 
  this.data[key] = value; 
 }; 
  
 /** 
  * 获取某键对应的值 
  * @param {String} key 
  * @return {Object} value 
  */ 
 this.get = function(key) { 
  return this.data[key]; 
 }; 
  
 /** 
  * 删除一个键值对 
  * @param {String} key 
  */ 
 this.remove = function(key) { 
   this.keys.remove(key); 
   this.data[key] = null; 
 }; 
  
 /** 
  * 遍历Map,执行处理函数 
  * 
  * @param {Function} 回调函数 function(key,value,index){..} 
  */ 
 this.each = function(fn){ 
  if(typeof fn != 'function'){ 
   return; 
  } 
  var len = this.keys.length; 
  for(var i=0;i<len;i++){ 
   var k = this.keys[i]; 
   fn(k,this.data[k],i); 
  } 
 }; 
  
 /** 
  * 获取键值数组(类似Java的entrySet()) 
  * @return 键值对象{key,value}的数组 
  */ 
 this.entrys = function() { 
  var len = this.keys.length; 
  var entrys = new Array(len); 
  for (var i = 0; i < len; i++) { 
   entrys[i] = { 
    key : this.keys[i], 
    value : this.data[i] 
   }; 
  } 
  return entrys; 
 }; 
  
 /** 
  * 判断Map是否为空 
  */ 
 this.isEmpty = function() { 
  return this.keys.length == 0; 
 }; 
  
 /** 
  * 获取键值对数量 
  */ 
 this.size = function(){ 
  return this.keys.length; 
 }; 
  
 /** 
  * 重写toString 
  */ 
 this.toString = function(){ 
  var s = "{"; 
  for(var i=0;i<this.keys.length;i++,s+=','){ 
   var k = this.keys[i]; 
   s += k+"="+this.data[k]; 
  } 
  s+="}"; 
  return s; 
 }; 
}
var map=new Map();
var map2=new Map();
var map3=new Map();
//新建弹出层
function createDialog(url,w,h){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map.get("dialog-form"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	debugger;
	div.id="dialog-form"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+50,      
		width: w+20,     
		modal: true,      
		draggable:true,
		close:function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map.get(div.id)!=null){
				map.remove(div.id);
			}
		},
		resize:function( event, ui ){
			$("#"+iframe.id).attr("width","100%");
			$("#"+iframe.id).attr("height",ui.size.height-50);
		}
	});
	if(url.indexOf("?")>0) url+="&popDivId="+div.id;
	else url+="?popDivId="+div.id;
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h);
	$("#"+div.id).dialog("open");
	map.put(div.id, div);
}
//新建弹出选择框
function createDialog2(tag1,tag2,url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){   //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
				tag1.value=results[0];
				tag2.value=results[1];
				$("#"+div.id).dialog("close");
			}else{
				if(result == "error"||result == "error1"||result == "ok"){
					if(result == "error"){
						alert("筛选失败！");	
					}
					if(result == "error1"){
						alert("筛选失败,未选者筛选对象。");	
					}
					if(result == "ok"){
						alert("筛选成功！");
						$("#"+div.id).dialog("close");
					}
				}else{
					if(tag2!=null){
						if(seprator){
							var results=result.split(seprator);
							tag1.value=results[0];
							tag2.value=results[1];
						}
							
					}else tag1.value=result;
					$("#"+div.id).dialog("close");
				}
			}
			
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}

//新建弹出选择框
function createDialogColumns(url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){   //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
			}else{
				if(seprator){
					var results=result.split(seprator);
					sendSync("/common_0/selectEnts/manageColumn.jsp?ids="+results[0]);
				}
			}
			refreshIndex();
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}

//新建弹出选择框3
function createDialog3(tag1,url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();	
					var results=result.split(seprator);
					tag1.value=results[0];
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//新建弹出选择框4
function createDialog4(centHref,url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();	
			if (result != null) {
				var values = result.split(seprator);
				centWin(centHref+values[0]);
//				centWin("/general_0/system/dept/manage.jsp?how=moveTo&id="+thisIds+"&deptId="+values[0]);
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//新建弹出选择框5
function createDialog5(tag1,tag2,url,centHref,w,h,seprator,id,entityName,win){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){   //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
				tag1.value=results[0];
				tag2.value=results[1];
				
			}else{
				if(tag2!=null){
					if(seprator){
						var results=result.split(seprator);
						if("WebColumn"==entityName){
							  if(id!=results[0]){
								  centWin(centHref+"&webColumnId="+results[0],1070,600);
								  closeDiv(win);
							  }
							}else if("WebTemplate"==entityName){
							  if(id!=results[0]) centWin(centHref+"&webColumnId="+id.split(",")[0]+"&webTemplateId="+results[0],1070,600);
							  closeDiv(win);
							}
							else{
								tag1.value=results[0];
								tag2.value=results[1];
							}
					}
						
				}else tag1.value=result;
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//新建弹出选择框6
function createDialog6(tag1,tag2,url,w,h,seprator,end,head,path){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result!=null&&result!="undefined"&&result!=""){
				if(tag2!=null){
					if(seprator){
						var results=result.split(seprator);
						tag1.value=results[0];
						tag2.value=results[1];
					}
						
				}else tag1.value=result;
				path.value=trim(values[2]);
				var url=values[3];
				var hostUrl=getHostUrl(url);
				if(hostUrl!=null){
					end.innerHTML=".blog."+hostUrl;
					head.innerHTML=getUrlHand(url);
				}
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//新建弹出选择框7
function createDialog7(tag1,tag2,url,w,h,seprator,entityName,array){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){  //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
				tag1.value=results[0];
				tag2.value=results[1];
			}else if(result!=""){
				var results=result.split(seprator);
				if(tag2!=null){
					if(seprator){
						tag1.value=results[0];
						tag2.value=results[1];
					}
						
				}else tag1.value=result;
				if(entityName=="WebColumn"){
					 var temps = sendSync("/general/publish/setTemp.jsp?parentId="+results[0]);
					 var values = temps.split("$")
					 var homeT = values[0].split("|");
					 var contentT = values[1].split("|");
					 array["homeTemp"].value = homeT[0];
					 array["homeTemp_nouse"].value = homeT[1];
					 array["contentTemp"].value = contentT[0];
					 array["contentTemp_nouse"].value = contentT[1];
				}
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//新建弹出选择框
function createDialog8(tag,tag1,url,item,id,w,h){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var file=document.getElementById(iframe.id).contentWindow.getData();
			if(file!=""){
				 var path=file.split("|")[0];
				 var tempSpace=file.split("|")[1];
				 var fileName=file.split("|")[2];
				 if(file.length==0){//不选不反应
				 }else if((tag1.value!=fileName || tag.value!=tempSpace)&&(tag1.value==""||confirm("修改模板路径可能导致原有模板配置信息丢失，是否继续？"))){
				 try{
				       var str=sendSync("/common/setTempPath.jsp?webSiteId="+id+"&path="+encodeURI(path)+"&tempSpace="+tempSpace);
				       if(str=="ok"){
				        tag1.value = fileName;
				        tag.value=tempSpace;
				        }else{
				            alert("设置模板路径失败，原因是："+str);
				         }
				        }catch(e){alert(e)}
				      }
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}

//新建弹出选择框
function createDialog9(tag1,tag2,url,w,h,seprator,pinyin){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){   //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
				tag1.value=results[0];
				tag2.value=results[1];
			}else{
				if(tag2!=null){
					if(seprator){
						var results=result.split(seprator);
						tag1.value=pinyin+"@"+results[0];
						tag2.value=pinyin+"@"+results[1];
					}
				}else {
					tag1.value=result;
				}
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}

//模版配置特殊selectEnt处理
function createDialog10(url,w,h,seprator,parentDiv){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();	
			if (result != null) {
				if(parentDiv){
					parentDiv=parentDiv.replace("dialog-form","popup");
				}
				var ifr=top.document.getElementById(parentDiv);
				if(ifr){
					ifr.contentWindow.frames["preview"].doResult(result);
				}
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}
//调整div大小
function resizeDialog(w,h,popDivId){
	if($("#"+popDivId)){	
		$("#"+popDivId).dialog("option","height",h+70);
		$("#"+popDivId).dialog("option","width",w+20);
		var popId=popDivId.replace(/dialog-form/,"popup");
		$("#"+popId).attr("width","100%");
		$("#"+popId).attr("height",h);
	}
}

//关闭div
function closeDiv(w){
	if(w.frameElement){
		var frameId=w.frameElement.id;
		if(frameId.indexOf("popup")==0){
			frameId=frameId.replace(/popup/,"");
			var divId="dialog-form"+frameId;
			if($("#"+divId)){
				$("#"+divId).dialog("close");
			}
		}
	}
}


function closeDiv2(id){
	$("#"+id).dialog("close");	
}


function createDialog_workflow(tag1,url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();	
			var results=result.split(seprator);
			if(results[0].length<2) {
				var users=results[0].substring(1,values[0].length-1);
				tag1.value=users;
				$("#"+div.id).dialog("close");
			}else{
				$("#"+div.id).dialog("close");
			}
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}


//新建弹出选择框
function createDialog_nimei(url,w,h,url1){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map3.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:true, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();		
			if (result && result != null&&result != "") {
				values = result.split(",");
				createDialog(url1+values[0],700,550);
			}
			$("#"+div.id).dialog("close");

		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map3.get(div.id)!=null){
				map3.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map3.put(div.id, div);
}
//新建弹出选择框
function createXxgkDialog(tag1,tag2,url,w,h,seprator,doc,type){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result=="false") return;
			if(seprator){
				var results=result.split(seprator);
				
				if(type==1){
					tag1.value=results[0];
					tag2.value=results[1];
					var idArray=tag1.value.split("_");
					if(idArray.length!=2){
						tag1.value="";
						tag2.value="";
						alert("参数错误！");
					}else{
						tag1.value=idArray[0];
						var currentDeptId=doc.getElementById("departmentId").value;
						if(currentDeptId!=idArray[1]){
							doc.getElementById("departmentId").value=idArray[1];
							var no=sendSync("/general_0/_ext/xxgk/myContent/getNo.jsp?deptId="+idArray[1]);
							if(no=="nodept") alert("所选栏目所属部门不存在！");
							else if(no=="nodeptno") alert("该部门没有部门编号不能生成索引号！");
							else{
								var noArray=no.split(",");
								if(noArray.length!=4) alert("程序错误！");
								else{
									doc.myForm.deptNo.value=noArray[0];
									doc.myForm.year.value=noArray[1];
									doc.myForm.serialNo.value=noArray[2];
									doc.myForm.publishDepartment.value=noArray[3];
								}
								
							}
							
						}
						
					}
				}else if(type==2){
					var oneTopicArray=results[1].split(",");
					var twoTopicArray=results[0].split(",");
					if(oneTopicArray.length!=2||twoTopicArray.length!=2){
						alert("参数错误！");
						return;
					}else{
						doc.myForm.topic.value=oneTopicArray[0];
						tag1.value=twoTopicArray[0];
						if(oneTopicArray[1]!="")
							tag2.value=oneTopicArray[1]+","+twoTopicArray[1];
						else tag2.value="";
					}
				}else if(type==3){
					var cateArray=results[0].split("|");
					var keyArray=results[1].split("|");
					if(cateArray.length!=2||keyArray.length!=2){
						alert("参数错误！");
						return;
					}else{
						doc.myForm.categoty.value=cateArray[0];
						doc.myForm.categoty_nouse.value=cateArray[1];
						doc.myForm.keywords.value=keyArray[0];
						doc.myForm.keywords_nouse.value=keyArray[1];
					}
				}else if(type==4){
					if(confirm("确定要将选定信息改签到“"+results[1]+"”栏目？"))
						centWin("/general_0/_ext/xxgk/myContent/manageTransfer.jsp?column="+results[0]+"&ids="+results[2]);
				}
				
			}
						
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);

}
//新建弹出层
function createReturnDialog(url,w,h){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map.get("dialog-form"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup"+random;
	iframe.name="popup"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+50,      
		width: w+20,     
		modal: true,      
		draggable:true,
		close:function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map.get(div.id)!=null){
				map.remove(div.id);
			}
		},
		resize:function( event, ui ){
			$("#"+iframe.id).attr("width","100%");
			$("#"+iframe.id).attr("height",ui.size.height-50);
		}
	});
	if(url.indexOf("?")>0) url+="&popDivId="+div.id;
	else url+="?popDivId="+div.id;
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map.put(div.id, div);
	return iframe.name;
}

//新建弹出选择框
function createDialogTemp(tag1,tag2,tag3,tag4,url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result.indexOf("type=selectColumn,")==0){   //selectColumns
				result=result.replace(/type=selectColumn,/,"");
				result=sendSync("/common_0/selectColumns/manageColumn.jsp?ids="+result);
				var results=result.split(seprator);
				tag1.value=results[0];
				tag2.value=results[1];
			}else{
				if(tag2!=null){
					if(seprator){
						var results=result.split(seprator);
						var isHas=sendSync("/general_0/publish/webtemplate/floatlevel/temp.jsp?id="+results[0]);
						if(isHas.indexOf("yes")!=-1){
							isHas=isHas.split(",");
							tag1.value=results[0];
							tag2.value=results[1];
							tag3.value=results[0];
							if(trim(isHas[1])!=""){
								tag4.value=isHas[1].substring(isHas[1].indexOf("}")+1);
							}
							
						}else{
							alert("对不起该模版不支持漂浮窗口");
						}
						
					}
						
				}else tag1.value=result;
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}

//朗奇模版配置特殊selectEnt处理
function createDialogIndex(url,w,h,seprator){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();	
			if (result != null) {
				var ifr=document.getElementById("frm2");
				var frs = ifr.contentWindow.frames;
				for(var i=0;i<frs.length;i++){
					if(frs[i].frameElement.id&&frs[i].frameElement.id.indexOf("page_iFrameTab")==0&&frs[i].frameElement.style.display!="none"){
						if(frs[i].frames["index"]){
							frs[i].frames["index"].doResult(result);
						}		
					}
				}
			}
			$("#"+div.id).dialog("close");
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}


//调整div大小
function resizeDialog(w,h,popDivId){
	if($("#"+popDivId)){	
		$("#"+popDivId).dialog("option","height",h+70);
		$("#"+popDivId).dialog("option","width",w+20);
		var popId=popDivId.replace(/dialog-form/,"popup");
		$("#"+popId).attr("width","100%");
		$("#"+popId).attr("height",h);
	}
}

//关闭div
function closeDiv(w){
	if(w.frameElement){
		var frameId=w.frameElement.id;
		if(frameId.indexOf("popup")==0){
			frameId=frameId.replace(/popup/,"");
			var divId="dialog-form"+frameId;
			if($("#"+divId)){
				$("#"+divId).dialog("close");
			}
		}
	}
}




function refreshIndex(){
	var ifr=document.getElementById("frm2");
	var frs = ifr.contentWindow.frames;
	for(var i=0;i<frs.length;i++){
		if(frs[i].frameElement.id&&frs[i].frameElement.id.indexOf("page_iFrameTab")==0&&frs[i].frameElement.style.display!="none"){
			if(frs[i].frames["index"]){
				frs[i].frames["index"].location.reload();
			}
			if(frs[i].frames["menu"]){
				frs[i].frames["menu"].location.reload();
			}
			
		}
			
			
	}
	
}


function createDialogBS(url,w,h){
	var div=document.createElement("div");
	var random=Math.round(Math.random()*100000000);
	while(map2.get("dialog-form2"+random)!=null){
		random=Math.round(Math.random()*100000000);
	}
	div.id="dialog-form2"+random;
	div.style.display="none";
	div.style.margin="0";
	div.style.padding="0";
	var iframe=document.createElement("iframe");
	iframe.id="popup2"+random;
	iframe.frameBorder="0"
	iframe.scrolling="auto";
	iframe.style.margin="0";
	iframe.style.padding="0";
	div.appendChild(iframe);
	$("body").eq(0).append(div);
	$("#"+div.id).dialog({      
		autoOpen: false,      
		height: h+100,      
		width: w+20,     
		modal: true,      
		draggable:false,
		resizable:false, 
		buttons:{
		"确定":function(){
			var result=document.getElementById(iframe.id).contentWindow.getData();
			if(result==null||result=="undefined") result="";
			if(result == "ok"){
				alert("报送成功");	
			}else{
				alert("报送失败");		
			}
			$("#"+div.id).dialog("close");			
		},
		"取消":function(){
			$("#"+div.id).dialog("close");
		}
		},
		close: function() {
			$("#"+iframe.id).attr("src","");
			$("#"+div.id).remove();
			if(map2.get(div.id)!=null){
				map2.remove(div.id);
			}
		}
	});
	
	$("#"+iframe.id).attr("src",url);
	$("#"+iframe.id).attr("width","100%");
	$("#"+iframe.id).attr("height",h-2);
	$("#"+div.id).dialog("open");
	map2.put(div.id, div);
}