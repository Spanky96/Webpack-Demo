// JavaScript Document


/* 换肤 */
function skin(color){
	$.ajax({
		type:'post',
		url:'/general_0/setTheme.jsp',
		data:{id:color},
		success:function(result){
		},
		error:function(){
		}
	});
	var cssLink=document.getElementById("cssLink");
    cssLink.href = "/scripts/Style_"+ color +".css";
    var topframes = window.frames;
    if(topframes.length != 0){
    	for(var i =0;i<topframes.length;i++){
    		if(topframes[i].document.getElementById("cssLink")!=null)
    		topframes[i].document.getElementById("cssLink").href="/scripts/Style_"+ color +".css";
    		var firframes = topframes[i].frames;
    		if(firframes.length != 0){
    			for(var j =0;j<firframes.length;j++){
    				if(firframes[j].document.getElementById("cssLink")!=null)
    				firframes[j].document.getElementById("cssLink").href="/scripts/Style_"+ color +".css";
    				var secframes = firframes[j].frames;
    				if(secframes.length != 0){
    	    			for(var k =0;k<secframes.length;k++){
    	    				if(secframes[k].document.getElementById("cssLink")!=null)
    	    				secframes[k].document.getElementById("cssLink").href="/scripts/Style_"+ color +".css";
    	    			}
    	    		}else{ continue;}
    			}
    		}else{ continue;}
    	}
	}
    	topframes["frm2"].location.reload();
	noStyle();
	}

function Over(id){
	document.getElementById("title"+id).className = "index-8";
	document.getElementById("info"+id).style.display = "block";
	}

function noStyle(){// //初始化

	for(i=1;i<6;i++){
		var obj = document.getElementById("title"+i);
			if(obj!= null) {
				document.getElementById("title"+i).className = "";
				document.getElementById("info"+i).style.display = "none";
			}
		}
	}
	
function setNoStyle(){//alert("111");
	setTimeout(noStyle,100);
	}


//function showMenu(id){
//	noStyle();
//		document.getElementById("title"+id).className = "index-8";
//		var info = document.getElementById("info"+id);
//		
//		info.style.display = "block";
//		
//		info.focus();
//		/*
//		var as = info.getElementsByTagName("a");
//		for(i=0;i<as.length;i++){
//			as[i].unselectable = "on";
//			}*/
//			
//		//document.getElementById("info"+id).select();
//
//	}
var nid;
function showMenu(newid){
    nid=newid;
    setTimeout(sm2,100);

    }
    
function sm2(){
    noStyle();
        document.getElementById("title"+nid).className = "index-8";
        var info = document.getElementById("info"+nid);
        
        info.style.display = "block";
        
        info.focus();
    }

//页面载入获取高度
function height(){
	var hh = document.body.clientHeight;
	//alert(hh);
	for(i=1;i<7;i++){
		if(document.getElementById("frm"+i)) {
			alert("frm"+i+"高度为"+(hh-61));
			document.getElementById("frm"+i).height = hh-61;
		    }
		}
	}



function findDimensions(num) //函数：获取尺寸 
{ 
	var winHeight = 0;

	//alert(document.documentElement.clientHeight + "  " + document.body.clientHeight);

	if(document.documentElement.clientHeight > document.body.clientHeight) winHeight = document.documentElement.clientHeight;
	else winHeight = document.body.clientHeight;

	//alert(winHeight); 

//根据浏览器高度设置各ifram的高度

for(i=1;i<7;i++){
	
		if(document.getElementById("frm"+i)) {
				try{
					document.getElementById("frm"+i).height = winHeight-num;//alert("frm"+i+"高度为"+(winHeight)+"  "+document.getElementById("frm"+i).height);
				}catch(e){}
			}
		}	
if(document.getElementById("contactlist")){//alert(winHeight);
	document.getElementById("contactlist").height =parent.document.getElementById("frm1").height-num;
} 

//document.getElementById("frm5").height =parent.document.getElementById("page_iFrameTab1").height-num;
//document.getElementById("frm4").height =parent.document.getElementById("page_iFrameTab1").height-num;
} 

function aaa(){
	if(document.getElementById("frm4"))
		document.getElementById("frm4").height=parent.document.getElementById("page_iFrameTab1").height;
	if(document.getElementById("frm5"))
		document.getElementById("frm5").height=parent.document.getElementById("page_iFrameTab1").height;
}


// 头部主菜单下拉切换
function topMenu(){
	 var titles = $("#menuTr li");
	  var conts  = $("div.index-64");
	   titles.each(function( index ){
		   if(index == 0){
	       $(this).mouseover(function(){
//	          $(this).attr("className","index-11").siblings().attr("className","index-10");
	          conts.eq(index).show().siblings().hide();topMenuHeight();
	    });}
		   $(this).click(function(){
		          $(this).attr("className","index-11").siblings().attr("className","index-10");
		          conts.eq(index).show().siblings().hide();
		    }); 
	  });
	} 

//鼠标离开隐藏
function hiddenMenu(){
   var conts  = $("div.index-64");
   conts.each(function( index ){
	   $(this).hover(function(){$(this).css("display","block");},function(){$(this).css("display","none");});
  });
}

//二三级导航高度适应
function topMenuHeight(){//alert("111");
	var ul = document.getElementById("title1");
	var li = ul.getElementsByTagName("li");
	if(li.length<6){
		document.getElementById("index-67").style.height = 5*34+2+"px";
		document.getElementById("index-52").style.height = 5*34+2+"px";
	} 
	else if(li.length>12){
		document.getElementById("index-67").style.height = 11*34+2+"px";
		document.getElementById("index-52").style.height = 11*34+2+"px";
	} 
	else{
		document.getElementById("index-67").style.height = li.length*34+2+"px";
		document.getElementById("index-52").style.height = li.length*34+2+"px";
	} 
	}



//二三级导航切换
function topMenu2(id){
 var titles = $("#title"+id+" li");
  var conts  = $("#info"+id+" table.index-63");
   titles.each(function( index ){
	   $(this).mouseover(function(){
	      $(this).attr("className","index-53").siblings().attr("className","index-54");
		  conts.eq(index).show().siblings().hide();
	});
  });
}

function topMenu3(id){
 var titles = $("#title"+id+" li");
  var conts  = $("#info"+id+" table.index-63");
   titles.each(function( index ){
	   $(this).mouseover(function(){
	      $(this).attr("className","index-61").siblings().attr("className","index-62");
		  conts.eq(index).show().siblings().hide();
	});
  });
}

function centerMenu(id,cur,nor){
 var titles = $("#ul"+id+" li");
  var conts  = $("#td"+id+" div.index-0");
   titles.each(function( index ){
	   $(this).click(function(){
	      $(this).attr("className",cur).siblings().attr("className",nor);
		  conts.eq(index).show().siblings().hide();
	});
  });
}

//详细搜索
function searchMore(id1,id2,curClass,noClass){
	var btn = document.getElementById(id1);
	var ifo = document.getElementById(id2);
	if(btn.className == noClass){
		btn.className = curClass;
		ifo.style.display = "block";
		}
	else{
		btn.className = noClass;
		ifo.style.display = "none";
		}
	}


































































