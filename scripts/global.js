
function checkDate(it){
	var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})$/;
   	if (!re_date.exec(it.value.trim())){
		alert("日期格式不正確！");
		it.focus();
		return false;
	}
	return true;
}
function checkTime(it){
	var re_date =/^(\d{1,2})\:(\d{1,2})$/;
   	if (!re_date.exec(it.value.trim())){
		alert("時間格式不正確！");
		it.focus();
		return false;
	}
	return true;
}
function checkTs(it){
	var re_date =/^(\d+)\-(\d{1,2})\-(\d{1,2})\ (\d{1,2})\:(\d{1,2})$/;
   	if (!re_date.exec(it.value)){
		alert("日期或時間格式不正確！");
		it.focus();
		return false;
	}
	return true;
}
function checkNull(it,str){
    if(it.value=="")
    { alert(str+"不能為空！");
        it.focus();
        return (false);
    }
	return true;
}




function send()
{
 if(CheckForm())
 {
   document.myForm.content.value=document.myForm.EDIT_HTML.html;
   document.myForm.submit();   
 }
}

function Load_Do()
{
  document.myForm.EDIT_HTML.html=document.myForm.content.value;
}

function trim(sstr)
{
var astr="";
var dstr="";
var flag=0;
for (i=0;i<sstr.length;i++)
{if ((sstr.charAt(i)!=' ')||(flag!=0)) 
{dstr+=sstr.charAt(i);
flag=1;
}
}
flag=0;
for (i=dstr.length-1;i>=0;i--)
{if ((dstr.charAt(i)!=' ')||(flag!=0)) 
{astr+=dstr.charAt(i);
flag=1;
}
}
dstr="";
for (i=astr.length-1;i>=0;i--) dstr+=astr.charAt(i);
return dstr;
} 

function document.onreadystatechange(){
if(!opener) return;
if(document.readyState != "complete") return;

x=35;
y=80;
l=200;
t=100;
w=0;
h=0;
var tags=document.body.childNodes;
for(i=0;i<tags.length;i++){
 var tag=tags[i];
 if(tag.offsetHeight && tag.offsetHeight>h){
   h=tag.offsetHeight;
   w=tag.offsetWidth
 }
}
w+=x;
h+=y;
if(w>screen.availWidth) w=screen.availWidth;
if(h>screen.availHeight) h=screen.availHeight;
l=(screen.availWidth-w)/2;
t=(screen.availHeight-h)/2;

window.moveTo(l,t);
window.resizeTo(w,h);
var win=window.open("");
win.document.write("w:"+w+"<br>");
win.document.write("h:"+h+"<br>");
win.document.write("l:"+l+"<br>");
win.document.write("t:"+t+"<br>");
}
