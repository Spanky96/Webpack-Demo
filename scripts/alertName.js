if(document.getElementById("names")&&document.getElementById("names1")) {
	document.getElementById("names").rows = "2";
	  document.getElementById("names1").rows = "2";
	  //document.getElementById("names2").rows = "2";
	  document.getElementById("names").onkeydown = findNames;
	  document.getElementById("names1").onkeydown = findNames1;
}
//下拉的层
completeDiv = document.getElementById("popup");
if(document.getElementById("mobilePhone"))
document.getElementById("mobilePhone").onkeydown = findNames2;

var inputField;
var inputField1;
var inputField2;
var inputField4;
var nameTable;
var completeDiv;
var nameTableBody;
var receivervalue = "";
var receivervalue1 = "";
var receivervalue4 = "";
var receivervalue5 = "";
var names;
var names1;
var names2;
var names4;
var k;
var k1;
var k2;
var m=0;//标识是否按了向下键
var m1=0;
var m2=0;
var n=0;//标识是否按了向上键
var n1=0;
var n2=0;
var number=0;//定义按键次数
var url;
var email;
var havenId="";
function initVars() {
		  //输入文本框
		  inputField = document.getElementById("names");
		  inputField1 = document.getElementById("names1");
		  inputField2 = document.getElementById("mobilePhone");
		  inputField4 = document.getElementById("names4");
		  inputField5 = document.getElementById("text2");
		  if(inputField)
			  receivervalue = inputField.value;
		  if(inputField1)
			  receivervalue1 = inputField1.value;
		  if(inputField2)
		  receivervalue2 = inputField2.value;
		  if(inputField4)
			  receivervalue4 = inputField4.value;
		  if(inputField5)
			  receivervalue5 = inputField5.value;
		  //层中的表格
		  nameTable = document.getElementById("name_table");
		
		  //表格中的表主体
		  nameTableBody = document.getElementById("name_table_body");
		 // completeDiv.style.display = "block";
		}
function initVars1(id) {
	  //输入文本框
	  inputField = document.getElementById(id);
	  if(document.getElementById(id)) {
		  receivervalue = inputField.value;
	  }
	  //层中的表格
	  nameTable = document.getElementById("name_table");
	
	  //表格中的表主体
	  nameTableBody = document.getElementById("name_table_body");
	 // completeDiv.style.display = "block";
	}
    	function findNames(){
    		var e = window.event;
    		//按向下键
    		if(e.keyCode==40) {
    			if(n==0){
    				if(k>1&&k<=names.length) {
    					if(document.getElementById((k-1)+""))
    					document.getElementById((k-1)+"").className = 'mouseOver';
    					if(document.getElementById(k+""))
    	        			document.getElementById(k+"").className = 'mouseOut';
    	        			inputField.onblur=hideNames;
    				}
    				if(k==1){
    					if(document.getElementById(k+""))
        					document.getElementById(k+"").className = 'mouseOver';
        					if(document.getElementById((k+1)+""))
        	        			document.getElementById((k+1)+"").className = 'mouseOut';
        	        			inputField.onblur=hideNames;
        	        			k++;
    				}
        			if(k>names.length) {
//        				if(document.getElementById(k+""))
//        					document.getElementById(k+"").className = 'mouseOver';
//        				if(document.getElementById((k+1)+""))
//        					document.getElementById((k+1)+"").className = 'mouseOver';
        				if(document.getElementById((k-1)+""))
        					document.getElementById((k-1)+"").className = 'mouseOver';
        				k = 1;
        				if(document.getElementById(k+""))
        				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k>10) {
        				document.getElementById("popup").scrollTop = ((k-10)*20);
        			}
        			k++;
    			}else {
    				if(k>1&&k<=names.length) {
    					if(document.getElementById((k-1)+""))
    					document.getElementById((k-1)+"").className = 'mouseOver';
    					if(document.getElementById(k+""))
    	        			document.getElementById(k+"").className = 'mouseOut';
    	        			inputField.onblur=hideNames;
    	        			var s;
        	        		for(var h=0;h<names.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+9))
        	        			document.getElementById("popup").scrollTop = (k-10)*20;
    				}if(k==1){
    					if(document.getElementById(k+""))
        					document.getElementById(k+"").className = 'mouseOver';
        					if(document.getElementById((k+1)+""))
        	        			document.getElementById((k+1)+"").className = 'mouseOut';
        	        			inputField.onblur=hideNames;
        	        			k++;
    				}
        			if(k>names.length) {
        				if(document.getElementById(names.length+""))
            				document.getElementById(names.length+"").className = 'mouseOver';
        				k = 1;
        				if(document.getElementById(k+""))
        				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			
        			k++;
    			}
        			m++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m>0) {
         			if(k>2) {
     					if(document.getElementById((k-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names.length+""))
             				document.getElementById(names.length+"").className = 'mouseOver';
     					if(document.getElementById((k-1)+""))
             				document.getElementById((k-1)+"").className = 'mouseOver';
        					if(document.getElementById((k-2)+""))
             				document.getElementById((k-2)+"").className = 'mouseOut';
            				inputField.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k--;
     			}
     			else {
     				k = names.length;
     				if(document.getElementById((k-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k+""))
     				document.getElementById(k+"").className = 'mouseOut';
    				inputField.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k==1) {
         				k = names.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k+""))
         				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
         			}else {
         				if(k<names.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names.length-k)+2)*20);
         				}
         				k--;
         				if(document.getElementById((k+1)+""))
         				document.getElementById((k+1)+"").className = 'mouseOver';
         				if(document.getElementById(k+""))
             			document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				
         			}
         			
         		}
         		
         			n++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue.substring(receivervalue.length-1)==",") {
	    			receivervalue = receivervalue.substring(0, receivervalue.length-1);
	    			receivervalue = receivervalue.substring(0, (receivervalue.lastIndexOf(",")+1));
	    			//alert(receivervalue);
	    			inputField.value = receivervalue+",";
	    		}
	    	}
    	}
function upFindNames() {
	number=0;
	var e = window.event;
	if (e.keyCode == 40) {
	} else if (e.keyCode == 38) {
	} else if (e.keyCode == 13) {
	} else {
		//alert("email:"+email);
		//alert("url:"+url);
		initVars();
		if (inputField.value != null && inputField.value != "") {
			if (inputField.value.lastIndexOf(",") > -1) {
				var s = inputField.value.substring(inputField.value
						.lastIndexOf(",") + 1);
				if (s != null && s != "") {
					url = url+ "value=" + inputField.value;
					findEmailNames(url,email,number);
				} else {
					clearNames();
				}
			} else {
				url = url + "value=" + inputField.value;
			    findEmailNames(url,email,number);
			}
		} else {
			clearNames();
		}
	}
}
    	function findNames1(){
    		var e = window.event;
    		// 按向下键
    		if(e.keyCode==40) {
    			if(n1==0){
    				if(k1>1&&k1<=names1.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField1.onblur=hideNames;
    				}
    				if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField1.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names1.length) {
        				if(document.getElementById((k1-1)+""))
        					document.getElementById((k1-1)+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField1.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k1>10) {
        				document.getElementById("popup").scrollTop = ((k1-10)*20);
        			}
        			k1++;
    			}else {
    				if(k1>1&&k1<=names1.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField1.onblur=hideNames;
    	        			var s;
        	        		for(var h=0;h<names1.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+9))
        	        			document.getElementById("popup").scrollTop = (k1-10)*20;
    				}if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField1.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names1.length) {
        				if(document.getElementById(names1.length+""))
            				document.getElementById(names1.length+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField1.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			k1++;
    			}
        			m1++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m1>0) {
         			if(k1>2) {
     					if(document.getElementById((k1-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names1.length+""))
             				document.getElementById(names1.length+"").className = 'mouseOver';
     					if(document.getElementById((k1-1)+""))
             				document.getElementById((k1-1)+"").className = 'mouseOver';
        					if(document.getElementById((k1-2)+""))
             				document.getElementById((k1-2)+"").className = 'mouseOut';
            				inputField1.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names1.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k1--;
     			}
     			else {
     				k1 = names1.length;
     				if(document.getElementById((k1-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k1+""))
     				document.getElementById(k1+"").className = 'mouseOut';
    				inputField1.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k1==1) {
         				k1 = names1.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k1-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k1+""))
         				document.getElementById(k1+"").className = 'mouseOut';
        				inputField1.onblur=hideNames;
         			}else {
         				if(k1<names1.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names1.length-k1)+2)*20);
         				}
         				k1--;
         				if(document.getElementById((k1+1)+""))
         				document.getElementById((k1+1)+"").className = 'mouseOver';
         				if(document.getElementById(k1+""))
             			document.getElementById(k1+"").className = 'mouseOut';
        				inputField1.onblur=hideNames;
        				
         			}
         			
         		}
         		
         			n1++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names1.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName1(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue1.substring(receivervalue1.length-1)==",") {
	    			receivervalue1 = receivervalue1.substring(0, receivervalue1.length-1);
	    			receivervalue1 = receivervalue1.substring(0, (receivervalue1.lastIndexOf(",")+1));
	    			//alert(receivervalue1);
	    			document.getElementById("names1").value = receivervalue1+",";
	    			//alert(document.getElementById("names1").value);
	    		}
	    	}
    	}
    	function upFindNames1() {
    		number = 1;
	    	  	var e = window.event;
	    	if(e.keyCode==40){
	    	}
	    	else if(e.keyCode==38) {
	    	}
	    	else if(e.keyCode==13) {
	    	}
	    	else {
	    		initVars();
	    		if(inputField1.value!=null&&inputField1.value!="") {
	    			if(inputField1.value.lastIndexOf(",")>-1) {
	    				var s = inputField1.value.substring(inputField1.value.lastIndexOf(",")+1);
		    			if(s!=null&&s!="") {
		    				//alert("当前文本框值"+inputField1.value);
			    			url = url + "value="+inputField1.value;
				    		findEmailNames(url,email,number);
		    			}else {
		    				clearNames();
		    			}
	    			}else {
	    				url = url + "value="+inputField1.value;
			    		findEmailNames(url,email,number);
	    			}
	    		}else {
	    			clearNames();
	    		}
    			//TestInput.getNames(inputField.value,callback);
    			//clearNames();
	    	}
    	}
    	
    	function findNames2(){
    		var e = window.event;
    		//按向下键
    		if(e.keyCode==40) {
    			if(n2==0){
    				if(k2>1&&k2<=names2.length) {
    					if(document.getElementById((k2-1)+""))
    					document.getElementById((k2-1)+"").className = 'mouseOver';
    					if(document.getElementById(k2+""))
    	        			document.getElementById(k2+"").className = 'mouseOut';
    	        			inputField2.onblur=hideNames;
    				}
    				if(k2==1){
    					if(document.getElementById(k2+""))
        					document.getElementById(k2+"").className = 'mouseOver';
        					if(document.getElementById((k2+1)+""))
        	        			document.getElementById((k2+1)+"").className = 'mouseOut';
        	        			inputField2.onblur=hideNames;
        	        			k2++;
    				}
        			if(k2>names2.length) {
//        				if(document.getElementById(k+""))
//        					document.getElementById(k+"").className = 'mouseOver';
//        				if(document.getElementById((k+1)+""))
//        					document.getElementById((k+1)+"").className = 'mouseOver';
        				if(document.getElementById((k2-1)+""))
        					document.getElementById((k2-1)+"").className = 'mouseOver';
        				k2 = 1;
        				if(document.getElementById(k2+""))
        				document.getElementById(k2+"").className = 'mouseOut';
        				inputField2.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k2>10) {
        				document.getElementById("popup").scrollTop = ((k2-10)*20);
        			}
        			k2++;
    			}else {
    				if(k2>1&&k2<=names2.length) {
    					if(document.getElementById((k2-1)+""))
    					document.getElementById((k2-1)+"").className = 'mouseOver';
    					if(document.getElementById(k2+""))
    	        			document.getElementById(k2+"").className = 'mouseOut';
    	        			inputField2.onblur=hideNames;
    	        		var s;
    	        		for(var h=0;h<names2.length;h++) {
    	             			var text = document.getElementById((h+1)+"");
    	             			if(text&&text.className == 'mouseOut') {
    	             				s = h;break;
    	             			}
    	             		}
    	        		var j = document.getElementById("popup").scrollTop/20;
    	        		if(s<j||s>(j+9))
    	        			document.getElementById("popup").scrollTop = (k2-10)*20;
    				}if(k2==1){
    					if(document.getElementById(k2+""))
        					document.getElementById(k2+"").className = 'mouseOver';
        					if(document.getElementById((k2+1)+""))
        	        			document.getElementById((k2+1)+"").className = 'mouseOut';
        	        			inputField2.onblur=hideNames;
        	        			k2++;
    				}
        			if(k2>names2.length) {
        				if(document.getElementById(names2.length+""))
            				document.getElementById(names2.length+"").className = 'mouseOver';
        				k2 = 1;
        				if(document.getElementById(k2+""))
        				document.getElementById(k2+"").className = 'mouseOut';
        				inputField2.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			k2++;
    			}
        			m2++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m2>0) {
         			if(k2>2) {
     					if(document.getElementById((k2-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names2.length+""))
             				document.getElementById(names2.length+"").className = 'mouseOver';
     					if(document.getElementById((k2-1)+""))
             				document.getElementById((k2-1)+"").className = 'mouseOver';
        					if(document.getElementById((k2-2)+""))
             				document.getElementById((k2-2)+"").className = 'mouseOut';
            				inputField2.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names2.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k2--;
     			}
     			else {
     				k2 = names2.length;
     				if(document.getElementById((k2-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k2+""))
     				document.getElementById(k2+"").className = 'mouseOut';
    				inputField2.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k2==1) {
         				k2 = names2.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k2-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k2+""))
         				document.getElementById(k2+"").className = 'mouseOut';
        				inputField2.onblur=hideNames;
         			}else {
         				if(k2<names2.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names2.length-k2)+2)*20);
         				}
         				k2--;
         				if(document.getElementById((k2+1)+""))
         				document.getElementById((k2+1)+"").className = 'mouseOver';
         				if(document.getElementById(k2+""))
             			document.getElementById(k2+"").className = 'mouseOut';
        				inputField2.onblur=hideNames;
         			}
         			
         		}
         		
         			n2++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names2.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName2(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue2.substring(receivervalue2.length-1)==",") {
	    			receivervalue2 = receivervalue2.substring(0, receivervalue2.length-1);
	    			receivervalue2 = receivervalue2.substring(0, (receivervalue2.lastIndexOf(",")+1));
	    			//alert(receivervalue);
	    			inputField2.value = receivervalue2+",";
	    		}
	    	}
    	}
    	
    	
    	
    	function upFindNames2() {
    		number = 2;
	    	  	var e = window.event;
	    	if(e.keyCode==40){
	    	}
	    	else if(e.keyCode==38) {
	    	}
	    	else if(e.keyCode==13) {
	    	}
	    	else {
	    		initVars();
	    		if(inputField2.value!=null&&inputField2.value!="") {
	    			if(inputField2.value.lastIndexOf(",")>-1) {
	    				var s = inputField2.value.substring(inputField2.value.lastIndexOf(",")+1);
		    			if(s!=null&&s!="") {
		    				//alert("当前文本框值"+inputField1.value);
			    			url = url + "value="+inputField2.value;
				    		findEmailNames(url,email,number);
		    			}else {
		    				clearNames();
		    			}
	    			}else {
	    				url = url + "value="+inputField2.value;
			    		findEmailNames(url,email,number);
	    			}
	    		}else {
	    			clearNames();
	    		}
    			//TestInput.getNames(inputField.value,callback);
    			//clearNames();
	    	}
    	}
    	
    	function upFindNames3(id) {
    		number = 3;
	    	  	var e = window.event;
	    	if(e.keyCode==40){
	    	}
	    	else if(e.keyCode==38) {
	    	}
	    	else if(e.keyCode==13) {
	    	}
	    	else {
	    		initVars1(id);
	    		if(inputField.value!=null&&inputField.value!="") {
	    			if(inputField.value.lastIndexOf(",")>-1) {
	    				var s = inputField.value.substring(inputField.value.lastIndexOf(",")+1);
		    			if(s!=null&&s!="") {
		    				//alert("当前文本框值"+inputField1.value);
			    			url = url + "value="+inputField.value;
				    		findEmailNames(url,email,number);
		    			}else {
		    				clearNames();
		    			}
	    			}else {
	    				url = url + "value="+inputField.value;
			    		findEmailNames(url,email,number);
	    			}
	    		}else {
	    			clearNames();
	    		}
    			//TestInput.getNames(inputField.value,callback);
    			//clearNames();
	    	}
    	}
    	function findNames3(){
    		var e = window.event;
    		//按向下键
    		if(e.keyCode==40) {
    			if(n==0){
    				if(k>1&&k<=names.length) {
    					if(document.getElementById((k-1)+""))
    					document.getElementById((k-1)+"").className = 'mouseOver';
    					if(document.getElementById(k+""))
    	        			document.getElementById(k+"").className = 'mouseOut';
    	        			inputField.onblur=hideNames;
    				}
    				if(k==1){
    					if(document.getElementById(k+""))
        					document.getElementById(k+"").className = 'mouseOver';
        					if(document.getElementById((k+1)+""))
        	        			document.getElementById((k+1)+"").className = 'mouseOut';
        	        			inputField.onblur=hideNames;
        	        			k++;
    				}
        			if(k>names.length) {
//        				if(document.getElementById(k+""))
//        					document.getElementById(k+"").className = 'mouseOver';
//        				if(document.getElementById((k+1)+""))
//        					document.getElementById((k+1)+"").className = 'mouseOver';
        				if(document.getElementById((k-1)+""))
        					document.getElementById((k-1)+"").className = 'mouseOver';
        				k = 1;
        				if(document.getElementById(k+""))
        				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k>10) {
        				document.getElementById("popup").scrollTop = ((k-10)*20);
        			}
        			k++;
    			}else {
    				if(k>1&&k<=names.length) {
    					if(document.getElementById((k-1)+""))
    					document.getElementById((k-1)+"").className = 'mouseOver';
    					if(document.getElementById(k+""))
    	        			document.getElementById(k+"").className = 'mouseOut';
    	        			inputField.onblur=hideNames;
    	        			var s;
        	        		for(var h=0;h<names.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+9))
        	        			document.getElementById("popup").scrollTop = (k-10)*20;
    				}if(k==1){
    					if(document.getElementById(k+""))
        					document.getElementById(k+"").className = 'mouseOver';
        					if(document.getElementById((k+1)+""))
        	        			document.getElementById((k+1)+"").className = 'mouseOut';
        	        			inputField.onblur=hideNames;
        	        			k++;
    				}
        			if(k>names.length) {
        				if(document.getElementById(names.length+""))
            				document.getElementById(names.length+"").className = 'mouseOver';
        				k = 1;
        				if(document.getElementById(k+""))
        				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			
        			k++;
    			}
        			m++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m>0) {
         			if(k>2) {
     					if(document.getElementById((k-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names.length+""))
             				document.getElementById(names.length+"").className = 'mouseOver';
     					if(document.getElementById((k-1)+""))
             				document.getElementById((k-1)+"").className = 'mouseOver';
        					if(document.getElementById((k-2)+""))
             				document.getElementById((k-2)+"").className = 'mouseOut';
            				inputField.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k--;
     			}
     			else {
     				k = names.length;
     				if(document.getElementById((k-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k+""))
     				document.getElementById(k+"").className = 'mouseOut';
    				inputField.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k==1) {
         				k = names.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k+""))
         				document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
         			}else {
         				if(k<names.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names.length-k)+2)*20);
         				}
         				k--;
         				if(document.getElementById((k+1)+""))
         				document.getElementById((k+1)+"").className = 'mouseOver';
         				if(document.getElementById(k+""))
             			document.getElementById(k+"").className = 'mouseOut';
        				inputField.onblur=hideNames;
        				
         			}
         			
         		}
         		
         			n++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName3(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue.substring(receivervalue.length-1)==",") {
	    			receivervalue = receivervalue.substring(0, receivervalue.length-1);
	    			receivervalue = receivervalue.substring(0, (receivervalue.lastIndexOf(",")+1));
	    			//alert(receivervalue);
	    			inputField.value = receivervalue;
	    		}
	    	}
    	}
    	function findNames4(){
    		var e = window.event;
    		// 按向下键
    		if(e.keyCode==40) {
    			if(n1==0){
    				if(k1>1&&k1<=names4.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField4.onblur=hideNames;
    				}
    				if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField4.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names4.length) {
        				if(document.getElementById((k1-1)+""))
        					document.getElementById((k1-1)+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField4.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k1>10) {
        				document.getElementById("popup").scrollTop = ((k1-10)*20);
        			}
        			k1++;
    			}else {
    				if(k1>1&&k1<=names4.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField4.onblur=hideNames;
    	        			var s;
        	        		for(var h=0;h<names4.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+9))
        	        			document.getElementById("popup").scrollTop = (k1-10)*20;
    				}if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField4.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names4.length) {
        				if(document.getElementById(names4.length+""))
            				document.getElementById(names4.length+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField4.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			k1++;
    			}
        			m1++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m1>0) {
         			if(k1>2) {
     					if(document.getElementById((k1-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names4.length+""))
             				document.getElementById(names4.length+"").className = 'mouseOver';
     					if(document.getElementById((k1-1)+""))
             				document.getElementById((k1-1)+"").className = 'mouseOver';
        					if(document.getElementById((k1-2)+""))
             				document.getElementById((k1-2)+"").className = 'mouseOut';
            				inputField4.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names4.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k1--;
     			}
     			else {
     				k1 = names4.length;
     				if(document.getElementById((k1-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k1+""))
     				document.getElementById(k1+"").className = 'mouseOut';
    				inputField4.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k1==1) {
         				k1 = names4.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k1-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k1+""))
         				document.getElementById(k1+"").className = 'mouseOut';
        				inputField4.onblur=hideNames;
         			}else {
         				if(k1<names4.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names4.length-k1)+2)*20);
         				}
         				k1--;
         				if(document.getElementById((k1+1)+""))
         				document.getElementById((k1+1)+"").className = 'mouseOver';
         				if(document.getElementById(k1+""))
             			document.getElementById(k1+"").className = 'mouseOut';
        				inputField4.onblur=hideNames;
        				
         			}
         			
         		}
         		
         			n1++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names4.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName4(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue4.substring(receivervalue4.length-1)==",") {
	    			receivervalue4 = receivervalue4.substring(0, receivervalue4.length-1);
	    			receivervalue4 = receivervalue4.substring(0, (receivervalue4.lastIndexOf(",")+1));
	    			//alert(receivervalue1);
	    			document.getElementById("names4").value = receivervalue4+",";
	    			//alert(document.getElementById("names1").value);
	    		}
	    	}
    	}
    	function findNames5(){
    		var e = window.event;
    		// 按向下键
    		if(e.keyCode==40) {
    			if(n1==0){
    				if(k1>1&&k1<=names4.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField5.onblur=hideNames;
    				}
    				if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField5.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names4.length) {
        				if(document.getElementById((k1-1)+""))
        					document.getElementById((k1-1)+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField5.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			if(k1>10) {
        				document.getElementById("popup").scrollTop = ((k1-10)*20);
        			}
        			k1++;
    			}else {
    				if(k1>1&&k1<=names4.length) {
    					if(document.getElementById((k1-1)+""))
    					document.getElementById((k1-1)+"").className = 'mouseOver';
    					if(document.getElementById(k1+""))
    	        			document.getElementById(k1+"").className = 'mouseOut';
    	        			inputField5.onblur=hideNames;
    	        			var s;
        	        		for(var h=0;h<names4.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+9))
        	        			document.getElementById("popup").scrollTop = (k1-10)*20;
    				}if(k1==1){
    					if(document.getElementById(k1+""))
        					document.getElementById(k1+"").className = 'mouseOver';
        					if(document.getElementById((k1+1)+""))
        	        			document.getElementById((k1+1)+"").className = 'mouseOut';
        	        			inputField5.onblur=hideNames;
        	        			k1++;
    				}
        			if(k1>names4.length) {
        				if(document.getElementById(names4.length+""))
            				document.getElementById(names4.length+"").className = 'mouseOver';
        				k1 = 1;
        				if(document.getElementById(k1+""))
        				document.getElementById(k1+"").className = 'mouseOut';
        				inputField5.onblur=hideNames;
        				document.getElementById("popup").scrollTop = 0;
        			}
        			k1++;
    			}
        			m1++;
         	}
    		//按向上键
         	else if(e.keyCode==38) {
         		if(m1>0) {
         			if(k1>2) {
     					if(document.getElementById((k1-1)+""))
             				//去掉第一行和最后一行的颜色
             				document.getElementById("1").className = 'mouseOver';
             				if(document.getElementById(names4.length+""))
             				document.getElementById(names4.length+"").className = 'mouseOver';
     					if(document.getElementById((k1-1)+""))
             				document.getElementById((k1-1)+"").className = 'mouseOver';
        					if(document.getElementById((k1-2)+""))
             				document.getElementById((k1-2)+"").className = 'mouseOut';
            				inputField5.onblur=hideNames;
            				var s;
        	        		for(var h=0;h<names4.length;h++) {
        	             			var text = document.getElementById((h+1)+"");
        	             			if(text&&text.className == 'mouseOut') {
        	             				s = h;break;
        	             			}
        	             		}
        	        		var j = document.getElementById("popup").scrollTop/20;
        	        		if(s<j||s>(j+10)){
        	        			document.getElementById("popup").scrollTop = s*20;
        	        		}
            				k1--;
     			}
     			else {
     				k1 = names4.length;
     				if(document.getElementById((k1-1)+""))
         				//去掉第一行的颜色
         			document.getElementById("1").className = 'mouseOver';
     				if(document.getElementById(k1+""))
     				document.getElementById(k1+"").className = 'mouseOut';
    				inputField5.onblur=hideNames;
    				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
     			}
         		}else {
         			if(k1==1) {
         				k1 = names4.length;
         				document.getElementById("popup").scrollTop = document.getElementById("popup").scrollHeight;
         				if(document.getElementById((k1-1)+""))
             				//去掉第一行的颜色
             			document.getElementById("1").className = 'mouseOver';
         				if(document.getElementById(k1+""))
         				document.getElementById(k1+"").className = 'mouseOut';
        				inputField5.onblur=hideNames;
         			}else {
         				if(k1<names4.length-8) {
         					var st = document.getElementById("popup").scrollHeight;
         					document.getElementById("popup").scrollTop = st-(((names4.length-k1)+2)*20);
         				}
         				k1--;
         				if(document.getElementById((k1+1)+""))
         				document.getElementById((k1+1)+"").className = 'mouseOver';
         				if(document.getElementById(k1+""))
             			document.getElementById(k1+"").className = 'mouseOut';
        				inputField5.onblur=hideNames;
        				
         			}
         			
         		}
         		
         			n1++;	
         	}
         	else if(e.keyCode==13) {
         		for(var h=0;h<names4.length;h++) {
         			var text = document.getElementById((h+1)+"");
         			if(text&&text.className == 'mouseOut') {
         				populateName5(text);
         			}
         		}
         		//if(k>1)
         		//var text = document.getElementById((k-1)+"");
         		//if(text)
         		//populateName(text);
         	}	
         	else if(e.keyCode==8) {
	    		if(receivervalue5.substring(receivervalue5.length-1)==",") {
	    			receivervalue5 = receivervalue5.substring(0, receivervalue5.length-1);
	    			receivervalue5 = receivervalue5.substring(0, (receivervalue5.lastIndexOf(",")+1));
	    			document.getElementById("text2").value = receivervalue5;
	    			//alert(document.getElementById("names1").value);
	    		}
	    	}
    	}
    	function upFindNames4(id) {
    		number = 4;
	    	  	var e = window.event;
	    	if(e.keyCode==40){
	    	}
	    	else if(e.keyCode==38) {
	    	}
	    	else if(e.keyCode==13) {
	    	}
	    	else {
	    		initVars();
	    		if(inputField4.value!=null&&inputField4.value!="") {
	    			if(inputField4.value.lastIndexOf(",")>-1) {
	    				var s = inputField4.value.substring(inputField4.value.lastIndexOf(",")+1);
		    			if(s!=null&&s!="") {
		    				//alert("当前文本框值"+inputField1.value);
			    			url = url + "value="+inputField4.value;
				    		findEmailNames(url,email,number);
		    			}else {
		    				clearNames();
		    			}
	    			}else {
	    				url = url + "value="+inputField4.value;
			    		findEmailNames(url,email,number);
	    			}
	    		}else {
	    			clearNames();
	    		}
    			//TestInput.getNames(inputField.value,callback);
    			//clearNames();
	    	}
    	}
    	
    	function upFindNames5(id) {
    		number = 5;
	    	  	var e = window.event;
	    	if(e.keyCode==40){
	    	}
	    	else if(e.keyCode==38) {
	    	}
	    	else if(e.keyCode==13) {
	    	}
	    	else {
	    		initVars();
	    		if(inputField5.value!=null&&inputField5.value!="") {
	    			if(inputField5.value.lastIndexOf(",")>-1) {
	    				var s = inputField5.value.substring(inputField5.value.lastIndexOf(",")+1);
		    			if(s!=null&&s!="") {
		    				//alert("当前文本框值"+inputField1.value);
			    			url = url + "value="+inputField5.value;
				    		findEmailNames(url,email,number);
		    			}else {
		    				clearNames();
		    			}
	    			}else {
	    				url = url + "value="+inputField5.value;
			    		findEmailNames(url,email,number);
	    			}
	    		}else {
	    			clearNames();
	    		}
    			//TestInput.getNames(inputField.value,callback);
    			//clearNames();
	    	}
    	}
    	// 回调函数
    	function callback(Emails){
    		 //清除表格原有的内容
			  clearNames();
			  //滚动条置顶
			  document.getElementById("popup").scrollTop = 0;
			  completeDiv.style.display = "block";
			  var el = Emails.lastIndexOf(",");
			  Emails = Emails.substring(0,el);
			  var the_names = Emails.split(",");
			  names = the_names;
			  
			  var size = the_names.length;
			  //alert("size"+size);
			  //设置表格的位置
			  setOffsets();
			
			  //单元格的行，列，文本节点
			  var row, cell, txtNode;
			  for (var i = 0; i < size; i++) {
			    //名字的内容
			    var nextNode = the_names[i];
			    //alert("nextNode:"+nextNode);
			    //建立一行
			    row = document.createElement("tr");
			    cell = document.createElement("td");
			     //设置单元格的属性
			    cell.setAttribute("bgcolor", "#FFFFFF");
			    cell.setAttribute("border", "0");
			    cell.setAttribute("id",(i+1)+"");
			    cell.setAttribute("height","20px");
			    //匿名函数
			    cell.onmouseout = function() {this.className = 'mouseOver';inputField.onblur=hideNames;} ;
			    cell.onmouseover = function() {
			    	this.className = 'mouseOut';
			    	for(var j=0;j<names.length+1;j++) {
			    		if(this.id == j) {
			    			this.className = 'mouseOut';
			    			k = j+1;
			    		}
			    		else {
			    			if(document.getElementById((j+1)+"")) {
			    				var text = document.getElementById((j+1)+"");
         						text.className = 'mouseOver';
			    			}
			    		}
         			}
         			inputField.onblur=null;
			    };
			  
			    //for(var j=0;j<names.length;j++) {
			    //	var text = document.getElementById((j+1)+"");
         		//	if(text&&text.className == 'mouseOut') {
         		//		k = j+1;
         		//		break;
         		//	}
         		//	else k=1;
			    //}
			    k=1;
			    //点击，选到文本框中
			    cell.onclick = function() {populateName(this);};
			
			    txtNode = document.createTextNode(nextNode);
			    //文本加到单元格
			    cell.appendChild(txtNode);
			    //单元格加到表格行
			    row.appendChild(cell);
			    //行加到表格
			    nameTableBody.appendChild(row);
			    //alert(nameTableBody.innerHTML);
			    if(i==0) {
			    	document.getElementById((i+1)+"").className = "mouseOut";
			    }
			   
			  }
    	}
    	function callback1(Emails){
    		 //清除表格原有的内容
			  clearNames();
			  //滚动条置顶
			  document.getElementById("popup").scrollTop = 0;
			  var el = Emails.lastIndexOf(",");
			  Emails = Emails.substring(0,el);
			  var the_names = Emails.split(",");
			  var size = the_names.length;
			  //设置表格的位置
			  setOffsets1();
			  names1 = the_names;
			  //单元格的行，列，文本节点
			  var row, cell, txtNode;
			  for (var i = 0; i < size; i++) {
			    //名字的内容
			    var nextNode = the_names[i];
			    //建立一行
			    row = document.createElement("tr");
			    cell = document.createElement("td");
			    //设置单元格的属性
			    cell.setAttribute("bgcolor", "#FFFFFF");
			    cell.setAttribute("border", "0");
			    cell.setAttribute("id",(i+1)+"");
			    cell.setAttribute("height","20px");
			    //匿名函数
			    cell.onmouseout = function() {this.className = 'mouseOver';inputField1.onblur=hideNames;} ;
			    cell.onmouseover = function() {
				    this.className = 'mouseOut';
			    	for(var j=0;j<names1.length+1;j++) {
			    		if(this.id == j) {
			    			this.className = 'mouseOut';
			    			k1 = j+1;
			    		}
			    		else {
			    			if(document.getElementById((j+1)+"")) {
			    				var text = document.getElementById((j+1)+"");
         						text.className = 'mouseOver';
			    			}
			    		}
         			}
         			inputField1.onblur=null;
			    } 
			    k1 = 1;
			    //点击，选到文本框中
			    cell.onclick = function() {populateName1(this);};
			
			    txtNode = document.createTextNode(nextNode);
			    //文本加到单元格
			    cell.appendChild(txtNode);
			    //单元格加到表格行
			    row.appendChild(cell);
			    //行加到表格
			    nameTableBody.appendChild(row);
			    if(i==0) {
			    	document.getElementById((i+1)+"").className = "mouseOut";
			    }
			  }
    	}
    	function callback2(Emails){
   		 //清除表格原有的内容
			  clearNames();
			  //滚动条置顶
			  document.getElementById("popup").scrollTop = 0;
			  completeDiv.style.display = "block";
			  var el = Emails.lastIndexOf(",");
			  Emails = Emails.substring(0,el);
			  var the_names = Emails.split(",");
			  names2 = the_names;
			  
			  var size = the_names.length;
			  //alert("size"+size);
			  //设置表格的位置
			  setOffsets2();
			
			  //单元格的行，列，文本节点
			  var row, cell, txtNode;
			  for (var i = 0; i < size; i++) {
			    //名字的内容
			    var nextNode = the_names[i];
			    //alert("nextNode:"+nextNode);
			    //建立一行
			    row = document.createElement("tr");
			    cell = document.createElement("td");
			     //设置单元格的属性
			    cell.setAttribute("bgcolor", "#FFFFFF");
			    cell.setAttribute("border", "0");
			    cell.setAttribute("id",(i+1)+"");
			    cell.setAttribute("height","20px");
			    //匿名函数
			    cell.onmouseout = function() {this.className = 'mouseOver';inputField2.onblur=hideNames;} ;
			    cell.onmouseover = function() {
			    	this.className = 'mouseOut';
			    	for(var j=0;j<names2.length+1;j++) {
			    		if(this.id == j) {
			    			this.className = 'mouseOut';
			    			k2 = j+1;
			    		}
			    		else {
			    			if(document.getElementById((j+1)+"")) {
			    				var text = document.getElementById((j+1)+"");
        						text.className = 'mouseOver';
			    			}
			    		}
        			}
        			inputField2.onblur=null;
			    };
			  
			    k2=1;
			    //点击，选到文本框中
			    cell.onclick = function() {populateName2(this);};
			
			    txtNode = document.createTextNode(nextNode);
			    //文本加到单元格
			    cell.appendChild(txtNode);
			    //单元格加到表格行
			    row.appendChild(cell);
			    //行加到表格
			    nameTableBody.appendChild(row);
			    //alert(nameTableBody.innerHTML);
			    if(i==0) {
			    	document.getElementById((i+1)+"").className = "mouseOut";
			    }
			   
			  }
   	}
    	function callback3(havens){
      		 //清除表格原有的内容
   			  clearNames();
   			  //滚动条置顶
   			  document.getElementById("popup").scrollTop = 0;
   			  completeDiv.style.display = "block";
   			  var el = havens.lastIndexOf(",");
   			  havens = havens.substring(0,el);
   			  //var ha =  havens.split(",");
   			  //var the_name="";
   			  //for(var j=0;j<ha.length;j++) {
   				//the_name += ha[j].split(":")[0]+",";
   			 // }
   			  var the_names = havens.split(",");
   			  names = the_names;
   			  
   			  var size = the_names.length;
   			  //alert("size"+size);
   			  //设置表格的位置
   			  setOffsets();
   			
   			  //单元格的行，列，文本节点
   			  var row, cell, txtNode;
   			  for (var i = 0; i < size; i++) {
   			    //名字的内容
   			    var nextNode = the_names[i].split(":")[0];
   			    //alert("nextNode:"+nextNode);
   			    //建立一行
   			    row = document.createElement("tr");
   			    cell = document.createElement("td");
   			     //设置单元格的属性
   			    cell.setAttribute("bgcolor", "#FFFFFF");
   			    cell.setAttribute("border", "0");
   			    cell.setAttribute("id",(i+1)+"");
   			    cell.setAttribute("height","20px");
   			    cell.setAttribute("lang",the_names[i].split(":")[1]);
   			    //匿名函数
   			    cell.onmouseout = function() {this.className = 'mouseOver';inputField.onblur=hideNames;} ;
   			    cell.onmouseover = function() {
   			    	this.className = 'mouseOut';
   			    	for(var j=0;j<names.length+1;j++) {
   			    		if(this.id == j) {
   			    			this.className = 'mouseOut';
   			    			k = j+1;
   			    		}
   			    		else {
   			    			if(document.getElementById((j+1)+"")) {
   			    				var text = document.getElementById((j+1)+"");
           						text.className = 'mouseOver';
   			    			}
   			    		}
           			}
           			inputField.onblur=null;
   			    };
   			  
   			    k=1;
   			    //点击，选到文本框中
   			    cell.onclick = function() {populateName3(this);};
   			
   			    txtNode = document.createTextNode(nextNode);
   			    //文本加到单元格
   			    cell.appendChild(txtNode);
   			    //单元格加到表格行
   			    row.appendChild(cell);
   			    //行加到表格
   			    nameTableBody.appendChild(row);
   			    //alert(nameTableBody.innerHTML);
   			    if(i==0) {
   			    	document.getElementById((i+1)+"").className = "mouseOut";
   			    }
   			   
   			  }
      	}
    	function callback4(Emails){
      		 //清除表格原有的内容
   			  clearNames();
   			  //滚动条置顶
   			  document.getElementById("popup").scrollTop = 0;
   			  completeDiv.style.display = "block";
   			  var el = Emails.lastIndexOf(",");
   			  Emails = Emails.substring(0,el);
   			  var the_names = Emails.split(",");
   			  names4 = the_names;
   			  
   			  var size = the_names.length;
   			  //alert("size"+size);
   			  //设置表格的位置
   			  setOffsets4();
   			
   			  //单元格的行，列，文本节点
   			  var row, cell, txtNode;
   			  for (var i = 0; i < size; i++) {
   			    //名字的内容
   			    var nextNode = the_names[i];
   			    //alert("nextNode:"+nextNode);
   			    //建立一行
   			    row = document.createElement("tr");
   			    cell = document.createElement("td");
   			     //设置单元格的属性
   			    cell.setAttribute("bgcolor", "#FFFFFF");
   			    cell.setAttribute("border", "0");
   			    cell.setAttribute("id",(i+1)+"");
   			    cell.setAttribute("height","20px");
   			    //匿名函数
   			    cell.onmouseout = function() {this.className = 'mouseOver';inputField4.onblur=hideNames;} ;
   			    cell.onmouseover = function() {
   			    	this.className = 'mouseOut';
   			    	for(var j=0;j<names4.length+1;j++) {
   			    		if(this.id == j) {
   			    			this.className = 'mouseOut';
   			    			k1 = j+1;
   			    		}
   			    		else {
   			    			if(document.getElementById((j+1)+"")) {
   			    				var text = document.getElementById((j+1)+"");
           						text.className = 'mouseOver';
   			    			}
   			    		}
           			}
           			inputField4.onblur=null;
   			    };
   			  
   			    k1=1;
   			    //点击，选到文本框中
   			    cell.onclick = function() {populateName4(this);};
   			
   			    txtNode = document.createTextNode(nextNode);
   			    //文本加到单元格
   			    cell.appendChild(txtNode);
   			    //单元格加到表格行
   			    row.appendChild(cell);
   			    //行加到表格
   			    nameTableBody.appendChild(row);
   			    //alert(nameTableBody.innerHTML);
   			    if(i==0) {
   			    	document.getElementById((i+1)+"").className = "mouseOut";
   			    }
   			   
   			  }
      	}
    	
    	function callback5(Emails){
     		 //清除表格原有的内容
  			  clearNames();
  			  //滚动条置顶
  			  document.getElementById("popup").scrollTop = 0;
  			  completeDiv.style.display = "block";
  			  var el = Emails.lastIndexOf(",");
  			  Emails = Emails.substring(0,el);
  			  var the_names = Emails.split(",");
  			  names4 = the_names;
  			  
  			  var size = the_names.length;
  			  //alert("size"+size);
  			  //设置表格的位置
  			  setOffsets5();
  			
  			  //单元格的行，列，文本节点
  			  var row, cell, txtNode;
  			  for (var i = 0; i < size; i++) {
  			    //名字的内容
  			    var nextNode = the_names[i];
  			    //alert("nextNode:"+nextNode);
  			    //建立一行
  			    row = document.createElement("tr");
  			    cell = document.createElement("td");
  			     //设置单元格的属性
  			    cell.setAttribute("bgcolor", "#FFFFFF");
  			    cell.setAttribute("border", "0");
  			    cell.setAttribute("id",(i+1)+"");
  			    cell.setAttribute("height","20px");
  			    //匿名函数
  			    cell.onmouseout = function() {this.className = 'mouseOver';inputField5.onblur=hideNames;} ;
  			    cell.onmouseover = function() {
  			    	this.className = 'mouseOut';
  			    	for(var j=0;j<names4.length+1;j++) {
  			    		if(this.id == j) {
  			    			this.className = 'mouseOut';
  			    			k1 = j+1;
  			    		}
  			    		else {
  			    			if(document.getElementById((j+1)+"")) {
  			    				var text = document.getElementById((j+1)+"");
          						text.className = 'mouseOver';
  			    			}
  			    		}
          			}
          			inputField5.onblur=null;
  			    };
  			  
  			    k1=1;
  			    //点击，选到文本框中
  			    cell.onclick = function() {populateName5(this);};
  			
  			    txtNode = document.createTextNode(nextNode);
  			    //文本加到单元格
  			    cell.appendChild(txtNode);
  			    //单元格加到表格行
  			    row.appendChild(cell);
  			    //行加到表格
  			    nameTableBody.appendChild(row);
  			    //alert(nameTableBody.innerHTML);
  			    if(i==0) {
  			    	document.getElementById((i+1)+"").className = "mouseOut";
  			    }
  			   
  			  }
     	}
    	
    	function setOffsets() {
    		if(inputField) {
    			 //文本框对象的可见宽度
    			  var end = inputField.offsetWidth;
    			  //alert("end"+end);
    			  //文本框
    			  var left = calculateOffsetLeft(inputField);
    			  //alert("left"+left);
    			  //层的顶部位置
    			  var top = calculateOffsetTop(inputField) + inputField.offsetHeight;
    			  //alert("top:"+top)
    			  //设置层的位置
    			  completeDiv.style.border = "black 1px solid";
    			  completeDiv.style.left = left + "px";
    			  completeDiv.style.top = top + "px";
    			  completeDiv.style.position = "absolute";
    			  completeDiv.style.height = "200px";
    			  //表格的宽度
    			  nameTable.style.width = end + "px";
    			  inputField.onblur = hideNames;
    		}
		}
		  function setOffsets1() {
			 if(inputField1) {
				//文本框对象的可见宽度
				  var end = inputField1.offsetWidth;
				  //文本框
				  var left = calculateOffsetLeft(inputField1);
				  //层的顶部位置
				  var top = calculateOffsetTop(inputField1) + inputField1.offsetHeight;
				  //设置层的位置
				  completeDiv.style.border = "black 1px solid";
				  completeDiv.style.left = left + "px";
				  completeDiv.style.top = top + "px";
				  completeDiv.style.position = "absolute";
				  completeDiv.style.height = "200px";
				  //表格的宽度
				  nameTable.style.width = end + "px";
				  completeDiv.style.display = "block";
				  inputField1.onblur = hideNames;
			  }
		}
		  function setOffsets2() {
			  if(inputField2) {
				  //文本框对象的可见宽度
				  var end = inputField2.offsetWidth;
				  //文本框
				  var left = calculateOffsetLeft(inputField2);
				  //层的顶部位置
				  var top = calculateOffsetTop(inputField2) + inputField2.offsetHeight;
				  //设置层的位置
				  completeDiv.style.border = "black 1px solid";
				  completeDiv.style.left = left + "px";
				  completeDiv.style.top = top + "px";
				  completeDiv.style.position = "absolute";
				  completeDiv.style.height = "200px";
				  //表格的宽度
				  nameTable.style.width = end + "px";
				  inputField2.onblur = hideNames;
			  }
			}
			function setOffsets4() {
	    		if(inputField4) {
	    			 //文本框对象的可见宽度
	    			  var end = inputField4.offsetWidth;
	    			  //alert("end"+end);
	    			  //文本框
	    			  var left = calculateOffsetLeft(inputField4);
	    			  //alert("left"+left);
	    			  //层的顶部位置
	    			  var top = calculateOffsetTop(inputField4) + inputField4.offsetHeight;
	    			  //alert("top:"+top)
	    			  //设置层的位置
	    			  completeDiv.style.border = "black 1px solid";
	    			  completeDiv.style.left = left + "px";
	    			  completeDiv.style.top = top + "px";
	    			  completeDiv.style.position = "absolute";
	    			  completeDiv.style.height = "200px";
	    			  //表格的宽度
	    			  nameTable.style.width = end + "px";
	    			  inputField4.onblur = hideNames;
	    		}
			}
			function setOffsets5() {
	    		if(inputField5) {
	    			 //文本框对象的可见宽度
	    			  var end = inputField5.offsetWidth;
	    			  //alert("end"+end);
	    			  //文本框
	    			  var left = calculateOffsetLeft(inputField5);
	    			  //alert("left"+left);
	    			  //层的顶部位置
	    			  var top = calculateOffsetTop(inputField5) + inputField5.offsetHeight;
	    			  //alert("top:"+top)
	    			  //设置层的位置
	    			  completeDiv.style.border = "black 1px solid";
	    			  completeDiv.style.left = left + "px";
	    			  completeDiv.style.top = top + "px";
	    			  completeDiv.style.position = "absolute";
	    			  completeDiv.style.height = "200px";
	    			  //表格的宽度
	    			  nameTable.style.width = end + "px";
	    			  inputField5.onblur = hideNames;
	    		}
			}
		function calculateOffsetLeft(field) {
		  return calculateOffset(field, "offsetLeft");
		}
		
		function calculateOffsetTop(field) {
		  return calculateOffset(field, "offsetTop");
		}
		
		//计算位置的函数：元素，属性
		function calculateOffset(field, attr) {
		  var offset = 0;
		  while (field) {
		    //文本框[属性]，这种写法得到当前元素相对于父元素的偏移值
		    offset += field[attr];
		    field = field.offsetParent;
		  }
		  return offset;
		}
		  
		function populateName(cell) {
			inputField.onblur = hideNames;
			if(receivervalue) {
				  //选中的单元格的值放到文本框中
				  if(receivervalue.indexOf(",")==-1){
				  	inputField.value = "";
				  	if(inputField.name=="name1"||inputField.name=="value3"){
				  		inputField.value += cell.firstChild.nodeValue;
				  		try{
							var zy = document.getElementById("names");
							if(zy&&zy.name=="value3"){
								var zyId= sendSync("checkZY.jsp?webClassName="+encodeURI(trim(zy.value)));
								document.getElementById("id1").value = zyId ;
								document.getElementById("zyxgk").value=inputField.value;
							}
						}catch(e){}
				  	}else{
				  		inputField.value += cell.firstChild.nodeValue+",";
				  	}
						receivervalue = inputField.value;
					inputField.focus();
				  	var r =inputField.createTextRange(); 
				  	r.moveStart('character',inputField.value.length); 
				  	r.collapse(true); 
				  	r.select();
				  }else {
				  	var ii = receivervalue.lastIndexOf(",");
				  	inputField.value = receivervalue.substring(0,ii+1);
				  	if(cell.firstChild.nodeValue=="") receivervalue ="";
				  	else {
				  		inputField.value += cell.firstChild.nodeValue+",";
					  	receivervalue = inputField.value;
				  	}
				  	inputField.focus();
				  	var r =inputField.createTextRange(); 
				  	r.moveStart('character',inputField.value.length); 
				  	r.collapse(true); 
				  	r.select();
				  }
					clearNames();
			}
		}
		function populateName1(cell) {
			if(receivervalue1) {
				//选中的单元格的值放到文本框中
				  if(receivervalue1.indexOf(",")==-1){
					  	inputField1.value = "";
					  	inputField1.value += cell.firstChild.nodeValue+",";
					  	receivervalue1 = inputField1.value;
					  	inputField1.focus();
					  	var r =inputField1.createTextRange(); 
					  	r.moveStart('character',inputField1.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  }else {
					  	var ii = receivervalue1.lastIndexOf(",");
					  	inputField1.value = receivervalue1.substring(0,ii+1);
					  	if(cell.firstChild.nodeValue=="") receivervalue1 ="";
					  	else {
					  		inputField1.value += cell.firstChild.nodeValue+",";
						  	receivervalue1 = inputField1.value;
					  	}
					  	//inputField1.value += cell.firstChild.nodeValue+",";
					  	//receivervalue1 = inputField1.value;
					  	inputField1.focus();
					  	var r =inputField1.createTextRange(); 
					  	r.moveStart('character',inputField1.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  }
				clearNames();
			}
		}
		function populateName2(cell) {
			if(receivervalue2) {
				//选中的单元格的值放到文本框中
				  if(receivervalue2.indexOf(",")==-1){
					  	inputField2.value = "";
					  	inputField2.value += cell.firstChild.nodeValue;
						var i = inputField2.value.indexOf("<");
					  	var j = inputField2.value.indexOf(">");
					  	inputField2.value = inputField2.value.substring((i+1),j)+",";
					  	receivervalue2 = inputField2.value;
					  	inputField2.focus();
					  	var r =inputField2.createTextRange(); 
					  	r.moveStart('character',inputField2.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  }else {
					  	var ii = receivervalue2.lastIndexOf(",");
					  	inputField2.value = receivervalue2.substring(0,ii+1);
					  	inputField2.value += cell.firstChild.nodeValue;
					  	var mu="";
					  	var mobile = inputField2.value.split(",");
					  	for(var k=0;k<mobile.length;k++) {
					  		var i = mobile[k].indexOf("<");
						  	var j = mobile[k].indexOf(">");
						  	if(i>-1&&j>-1) {
						  		mobile[k] = mobile[k].substring((i+1),j);
						  	}
						  	mu += mobile[k]+",";
					  	}
					  	inputField2.value = mu;
					  	receivervalue2 = inputField2.value;
					  	inputField2.focus();
					  	var r =inputField2.createTextRange(); 
					  	r.moveStart('character',inputField2.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  }
				clearNames();
			 }
		}
		function populateName3(cell) {
			if(receivervalue) {
				//选中的单元格的值放到文本框中
				 // if(receivervalue.indexOf(",")==-1){
					  	inputField.value = "";
					  	inputField.value = cell.firstChild.nodeValue;
					  	//document.getElementById("HN"+havenId).value = cell.lang;
						//var i = inputField.value.indexOf("<");
					  	//var j = inputField.value.indexOf(">");
					  	//inputField.value = inputField.value.substring((i+1),j)+",";
					  	//inputField.value = inputField.value ;
					  	receivervalue = inputField.value;
					  	inputField.focus();
					  	var r =inputField.createTextRange(); 
					  	r.moveStart('character',inputField.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  	try{
							var zy = document.getElementById("names");
							if(zy&&zy.name=="value3"){
								var zyId= sendSync("checkZY.jsp?webClassName="+encodeURI(trim(zy.value)));
								document.getElementById("id1").value = zyId ;
								document.getElementById("zyxgk").value=receivervalue;
							}
						}catch(e){}
					 // }else {
					  	/*
					  	var ii = receivervalue.lastIndexOf(",");
					  	inputField.value = receivervalue.substring(0,ii+1);
					  	inputField.value += cell.firstChild.nodeValue;
					  	var mu="";
					  	var mobile = inputField.value.split(",");
					  	for(var k=0;k<mobile.length;k++) {
					  		var i = mobile[k].indexOf("<");
						  	var j = mobile[k].indexOf(">");
						  	if(i>-1&&j>-1) {
						  		mobile[k] = mobile[k].substring((i+1),j);
						  	}
						  	mu += mobile[k]+",";
					  	}
					  	inputField.value = mu;
					  	receivervalue = inputField.value;
					  	inputField.focus();
					  	var r =inputField.createTextRange(); 
					  	r.moveStart('character',inputField.value.length); 
					  	r.collapse(true); 
					  	r.select();
					  	
					  }
					  */
				clearNames();
			 }
		}
		function populateName4(cell) {
			if(receivervalue4) {
					  	inputField4.value = "";
					  	inputField4.value = cell.firstChild.nodeValue;
					  	inputField4.value = inputField4.value;
					  	receivervalue4 = inputField4.value;
					  	inputField4.focus();
					  	var r =inputField4.createTextRange(); 
					  	r.moveStart('character',inputField4.value.length); 
					  	r.collapse(true); 
					  	r.select();
				clearNames();
			 }
		}
		function populateName5(cell) {
			inputField5.onblur = hideNames;
			if(receivervalue5) {
					  	inputField5.value = "";
					  	inputField5.value = cell.firstChild.nodeValue;
					  	inputField5.value = inputField5.value;
					  	receivervalue5 = inputField5.value;
					  	
					  	if(document.getElementById("gzsm")){
					  	   document.getElementById("gzsm").value = receivervalue5;
					  	   document.getElementById("gzerror").innerHTML="";
					  	}
					  	
					  	try{
					  		if(myForm.postname){
						  		if(myForm.postname.length>4){
									alert("最多只能选择五个求职意向！");
									return;
								}
								myForm.postname.add(new Option(receivervalue5,receivervalue5));
								myForm.value2.value=getvalue(myForm.postname);
								document.getElementById("qzgw").innerHTML=getvalue(myForm.postname);
								inputField5.value="";
					  	}
					  	}catch(e){}
					  	inputField5.focus();
					  	var r =inputField5.createTextRange(); 
					  	r.moveStart('character',inputField5.value.length); 
					  	r.collapse(true); 
					  	r.select();
				clearNames();
			 }
		}
		function clearNames() {
		  //有多少行
		  if(nameTableBody) {
		  	var ind = nameTableBody.childNodes.length;
		  for (var i = ind - 1; i >= 0; i--) {
		    //删除每一行
		    nameTableBody.removeChild(nameTableBody.childNodes[i]);
		  }
		  //层的外框
		  completeDiv.style.border = "none";
		  }
		  
		}
		function hideNames() {
			completeDiv.style.display = "none";
			try{
				var gz = document.getElementById("text2");
				if(gz){
				 if(trim(gz.value)==""){
					document.getElementById("gzerror").innerHTML="请先输入职位工种进行筛选匹配！";
				    try{gz.focus();}catch(e){}
				    return;
				 }else{
					 var result = sendSync("checkGZ.jsp?webClassName="+encodeURI(trim(gz.value)));
						if(result == "true"){
							document.getElementById("gzerror").innerHTML="抱歉！没有找到相匹配的职位工种，请输入其他的职位工种进行匹配！";
							try{gz.focus();}catch(e){}
							return;
						}else{
							document.getElementById("gzerror").innerHTML="";
							//return;
						}
				 }
				}
			}catch(e){}
			try{
				var zy = document.getElementById("names");
				if(zy&&zy.name=="value3"){
					if(trim(zy.value)!=""){
						var zyId= sendSync("checkZY.jsp?webClassName="+encodeURI(trim(zy.value)));
						if(zyId==""){
							document.getElementById("zyerror").innerHTML="<div>抱歉！没有找到与输入的专业关键字相匹配的专业，请输入其他的专业关键字！</div>";
						}else document.getElementById("zyerror").innerHTML="";
					}else document.getElementById("zyerror").innerHTML="";
				}
			}catch(e){}
		}
		function postUrl(obj,ajaxUrl) {
			email = ajaxUrl.substring(ajaxUrl.indexOf("?")+1);
			url = ajaxUrl.substring(0,ajaxUrl.indexOf("?")+1);
			if(obj.id=="names")
			upFindNames();
			else if(obj.id=="names1"){upFindNames1();}
			else if(obj.id=="mobilePhone") {upFindNames2();}
			else if(obj.id=="names4"){upFindNames4();}
			else if(obj.id=="text2"){upFindNames5();}
			else {
				//截取'toHarbor_nouse"+id+"'中的id
				havenId =  obj.id.substring(14);
				upFindNames3(obj.id);
			}
		}
		function returnAjaxValue(value,number) {
			value = value.replace(/\n/g,"").replace(/\r/g,"");
			if(number==0) {
				if(value!="") callback(value);
				else completeDiv.style.display = "none";
			}
			else if(number==1) {
				if(value!="") callback1(value);
				else completeDiv.style.display = "none";
			}
			else if(number==2){
				if(value!="") callback2(value);
				else completeDiv.style.display = "none";
			}
			else if(number==3) {
				if(value!="") callback3(value);
				else completeDiv.style.display = "none";
			}
			else if(number==4){
				if(value!="") callback4(value);
				else completeDiv.style.display = "none";
			}else if(number==5){
				if(value!="") callback5(value);
				else completeDiv.style.display = "none";
			}
		}
		function getFocus() {
			//alert("ss");
			document.getElementById("mobilePhone").focus();
		}