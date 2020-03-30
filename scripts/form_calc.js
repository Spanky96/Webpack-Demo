form_calc="yes";
function getInputsById(parentTag,eId){
	var items=new Array();
	var inputs=parentTag.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].id==eId) items.push(inputs[i]);
	}
	return items;
}

/////////////////////////////////////////for preview mainly//////////////////////
function getInsertIndex(theTable){
  var items=getInputsById(theTable,"item");  //theTable.all["item"];
  rowIndex=-1;
  for(i=items.length-1;i>=0;i--){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT" && theCheck.getAttribute("ROWCHECK") && theCheck.getAttribute("ROWCHECK")=="true"){
      var theTr=findParent(theCheck,"TR");
      rowIndex=theTr.rowIndex;
      break;
    }
  }
  if(rowIndex<0) rowIndex=getClonedIndex(theTable)-1;
  return rowIndex;
}

function rowAdd(){
//var butt = document.createElement('BUTTON');
//tag.parentNode.insertBefore(butt,tag);

  var theTable=findParent(this,"TABLE","TBODY");
  var theTr=findParent(this,"TR");
  var clonedTr=getClonedTr(theTable);
  if(clonedTr==null){
    alert("找不到明细表对应的行！");
    return;
  }
//  var theTable=findParent(tag,"TABLE");
//  var r = theTable.insertRow(theTr.rowIndex);
//  for (var i = 0; i < theTr.childNodes.length; i++) {
//    var c = r.appendChild( document.createElement("TD") );
//c.appendChild(document.createElement("BUTTON"));
//    if (theTr.parentNode.childNodes[i].colSpan)
//    c.colSpan = theTr.parentNode.childNodes[i].colSpan;
//  }

  rowIndex=getInsertIndex(theTable);
  var newTr=clonedTr.cloneNode(true);
  theTr.parentNode.insertBefore(newTr,theTr.parentNode.rows[rowIndex+1]);

  initCalcEvent();
  calcAll(theTable);
  //menuInit();
  //if(opener) resize();
}

function rowDel(){
  var theTable=findParent(this,"TABLE","TBODY");
  if(theTable==null) return null;

  var items=getInputsById(theTable,"item");//theTable.all["item"];
  for(i=items.length-1;i>=0;i--){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.getAttribute("ROWCHECK")&&theCheck.getAttribute("ROWCHECK")=="true"&&theCheck.checked){
      var theTr=findParent(theCheck,"TR")
      theTr.parentNode.deleteRow(theTr.rowIndex);
    }
  }

  calcAll(theTable);
//  menuInit();
//  if(opener) resize();
}

function oneRowMove(theTable,rowIndex,offset){
  var theTr=theTable.rows[rowIndex];
  var items=getInputsById(theTr,"item");//theTr.all["item"];
  var values=new Array();
  k=0;
  for(i=0;i<items.length;i++){
    var item=items[i];
    if(item.tagName=="INPUT" && item.type && (item.type=="checkbox"||item.type=="radio")){
      values[k]=new Array(item,item.checked);
  //tagInfo(item,"k:"+k+",length:"+items.length+",i:"+i);
      k++;
    }
  }
  theTable.moveRow(rowIndex,rowIndex+offset);
  for(i=0;i<k;i++){
    values[i][0].checked=values[i][1];
  }
}

function rowUp(){
  var theTable=findParent(this,"TABLE","TBODY");
  if(theTable==null) return null;

  firstRowIndex=getClonedIndex(theTable);
  var trs=new Array();
  j=0;

  var items=getInputsById(theTable,"item");//theTable.all["item"];
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.getAttribute("ROWCHECK")&&theCheck.getAttribute("ROWCHECK")=="true"&&theCheck.checked){
      var theTr=findParent(theCheck,"TR")
      trs[j]=theTr.rowIndex;
      j++;
    }
  }
  for(ii=0;ii<j;ii++){
//document.write(trs[i]+"<br>");
//tagInfo(trs[i],"j:"+j+",length:"+trs.length+",i:"+i+","+trs[i]+","+firstRowIndex);
      if(trs[ii]<=firstRowIndex) return;
      oneRowMove(theTable,trs[ii],-1);
  }
}

function rowDown(){
  var theTable=findParent(this,"TABLE","TBODY");
  if(theTable==null) return null;

  lastRowIndex=-1;
  var trs=new Array();
  j=0;

  var items=getInputsById(theTable,"item");//theTable.all["item"];
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.getAttribute("ROWCHECK")&&theCheck.getAttribute("ROWCHECK")=="true"){
      var theTr=findParent(theCheck,"TR");
      if(theTr.rowIndex>lastRowIndex) lastRowIndex=theTr.rowIndex;
      if(theCheck.checked){
        trs[j]=theTr.rowIndex;
        j++;
      }
    }
  }

  for(ii=j-1;ii>=0;ii--){
//alert(trs[ii]);
    if(trs[ii]>=lastRowIndex) return;
    oneRowMove(theTable,trs[ii],1);
  }
}
//just for test
//   function buildTable(pnt) {
//      var t = pnt.appendChild( document.createElement("TABLE") );
//      t.border=1;
//      t.cellPadding=2;
//      t.cellSpacing=0;
//      var tb = t.appendChild( document.createElement("TBODY") );
//      for(var r = 0; r < 10; r++) {
//         var tr = tb.appendChild( document.createElement("TR") );
//         for(var c = 0; c < 10; c++) {
//            var cell = tr.appendChild( document.createElement("TD") );
//            cell.appendChild( document.createTextNode(r+"-"+c) );
//         }
//      }
//   }
function checkAll(){
  var theTable=findParent(this,"TABLE","TBODY");
  var items=getInputsById(theTable,"item");//theTable.all["item"];
  for(i=0;i<items.length;i++){
    var item=items[i];
    if(item && item.tagName && item.tagName=="INPUT" && item.getAttribute("ROWCHECK") && item.getAttribute("ROWCHECK")=="true"){
      if(item.name==this.name) item.checked=this.checked;
    }
  }
}
function clone(theTr){
  var newTr=theTr.cloneNode(true);
  var itms=getInputsById(newTr,"item");//newTr.all["item"];
  for(var j=0;j<itms.length;j++){
    var itm=itms[j];
    if(itm.value) itm.value="";
  }
  return newTr;
}

var detailTables=new Array();
function initDetails(){
  var items=getInputsById(document,"item");//document.all["item"];
  index=0;
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(!theCheck) continue;

    if(theCheck && theCheck.tagName && theCheck.tagName=="INPUT" && theCheck.getAttribute("ROWCHECK") ){
      if(theCheck.getAttribute("ROWCHECK")=="true"){
        var theTable=findParent(theCheck,"TABLE","TBODY");
        var theTr=findParent(theCheck,"TR");
        if(theTable && theTr){
          detailTables[index]=new Array(theTable,clone(theTr),theTr.rowIndex);
//        initCalcEvent(theTr);
//        calcAll(theTable);
          index++;
        }
        if(theCheck.getAttribute("ROWSIZE")) theTr.setAttribute("ROWSIZE",theCheck.getAttribute("ROWSIZE"));
      }else if(theCheck.getAttribute("ROWCHECK")=="all"){
        theCheck.onclick=checkAll;
      } 
    }
  }

  for(j=0;j<detailTables.length;j++){
    var theTable=detailTables[j][0];
    var theTr=theTable.rows[detailTables[j][2]];
    if(theTr.getAttribute("ROWSIZE")){
      for(i=1;i<theTr.getAttribute("ROWSIZE");i++){
        var newTr=theTr.cloneNode(true);
        theTr.insertAdjacentElement("afterEnd",newTr);
      }
    }
  }
  initCalcEvent();
  
  
//  if(opener) resize();
}

function getClonedTr(theTable){
  for(i=0;i<detailTables.length;i++){
    if(theTable==detailTables[i][0]) return detailTables[i][1];
  }
  return null;
}

function getClonedIndex(theTable){
  for(i=0;i<detailTables.length;i++){
    if(theTable==detailTables[i][0]) return detailTables[i][2];
  }
  return -1;
}

/////////////////////////////////////////for calculation mainly//////////////////////
var re_calc = /([^\+\-\*\/\(\)\,]+)/g;
var re_sum = /(sum\(\S+\))/gi;
//var re_calc = /^\S*$/;
function calc(tag) {
  if(tag.getAttribute("DATAEXPR")){
    var tagValue
    str="with(Math){\n";
    str+="tagValue=makeExpr(handleSum(tag.getAttribute('DATAEXPR'),tag),tag)\n";
    str+="}";
    eval(str);

    if(tag.getAttribute('DATAFORMAT') && (!isNaN(parseFloat(tag.getAttribute('DATAFORMAT'))))){
      format=tag.getAttribute('DATAFORMAT');
      index0=format.indexOf(".");
      len=parseInt(format.substr(index0+1));
      tag.value=FormatNumber(tagValue,len);
    }else tag.value=tagValue;
  }
}
function myEval(inStr){
  var tagValue;
  str="with(Math){\n";
  str+="tagValue="+inStr+"\n";
  str+="}";
//alert("myEval:"+str);
  eval(str);
  return tagValue;
}

//when inStr is float, we will change it to str, otherwise trim will return ""
function makeExpr(inStr,tag) {
//alert("makeExpr1:"+inStr);
    ss = trim(""+inStr);
//alert("ss:"+ss);
//    if(!isNaN(parseFloat(ss))) return parseFloat(ss);

    str= ss.replace(re_calc,
      function(str, p1, p2){
        pp=trim(p1);
	if(isNaN(parseFloat(pp))) return getValueOne(pp,tag);
        else return parseFloat(pp);
      });
//alert("makeExpr2:"+str);
    return myEval(str);
//tag.value= eval(str);
}

function handleSum(inStr,tag){
//alert("handleSum:"+inStr);
  level=0;
  var index0;
  if((index0=inStr.indexOf("sum("))>=0){
    index1=index0+4;
    index2=index1;
    for (;index2<inStr.length;index2++){
      if(inStr.charAt(index2)=='(') level++;
      else if(inStr.charAt(index2)==')'){
        if(level==0) break;
        else level--;
      }
    }
    sumStr=inStr.substring(index1,index2);
    reStr=inStr.substring(0,index0)+makeSum(sumStr,tag)+inStr.substr(index2+1);
    return handleSum(reStr,tag);
  }else if((index0=inStr.indexOf("avg("))>=0){
    index1=index0+4;
    index2=index1;
    for (;index2<inStr.length;index2++){
      if(inStr.charAt(index2)=='(') level++;
      else if(inStr.charAt(index2)==')'){
        if(level==0) break;
        else level--;
      }
    }
    sumStr=inStr.substring(index1,index2);
    reStr=inStr.substring(0,index0)+makeAvg(sumStr,tag)+inStr.substr(index2+1);
    return handleSum(reStr,tag);
  }else if((index0=inStr.indexOf("count("))>=0){
    index1=index0+6;
    index2=index1;
    for (;index2<inStr.length;index2++){
      if(inStr.charAt(index2)=='(') level++;
      else if(inStr.charAt(index2)==')'){
        if(level==0) break;
        else level--;
      }
    }
    sumStr=inStr.substring(index1,index2);
    reStr=inStr.substring(0,index0)+makeCount(sumStr,tag)+inStr.substr(index2+1);
    return handleSum(reStr,tag);
  }else  return inStr;
}

function makeSum(inStr,tag){
//  alert(inStr);
  index0=inStr.indexOf("sum(");
  if(index0>=0){
    alert("对不起，目前不支持嵌套的聚合函数！");
    return "";
  }

  var result=0;

  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return "";

//  var items=theTable.all["item"];
//  for(ij=0;ij<items.length;ij++){
//    var theCheck=items[ij];
//    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"){
//      result+=makeExpr(inStr,theCheck);
//    }
//  }
  theInputName=findInputName(inStr);
  var items=getInputsById(theTable, "item")//theTable.all["item"];
  for(ij=0;ij<items.length;ij++){
    var theInput=items[ij];
    if(theInput.name&&theInput.name==theInputName){
      result+=makeExpr(inStr,theInput);
    }
  }
  return result;
}

function makeAvg(inStr,tag){
//    alert(inStr);
  index0=inStr.indexOf("avg(");
  if(index0>=0){
    alert("对不起，目前不支持嵌套的聚合函数！");
    return "";
  }

  var result=0;

  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return "";

//  var items=theTable.all["item"];
//  var count=0;
//  for(ij=0;ij<items.length;ij++){
//    var theCheck=items[ij];
//    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"){
//      result+=makeExpr(inStr,theCheck);
//      count++;
//    }
//  }
  theInputName=findInputName(inStr);
  var items=getInputsById(theTable, "item");//theTable.all["item"];
  var count=0;
  for(ij=0;ij<items.length;ij++){
    var theInput=items[ij];
    if(theInput.name&&theInput.name==theInputName){
      result+=makeExpr(inStr,theInput);
      count++;
    }
  }
  return result/count;
}

function makeCount(inStr,tag){
//  alert(inStr);
  index0=inStr.indexOf("count(");
  if(index0>=0){
    alert("对不起，目前不支持嵌套的聚合函数！");
    return "";
  }

  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return "";

//  var items=theTable.all["item"];
//  var count=0;
//  for(ij=0;ij<items.length;ij++){
//    var theCheck=items[ij];
//    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"){
//      count++;
//    }
//  }
  theInputName=findInputName(inStr);
  var items=getInputsById(theTable, "item");//theTable.all["item"];
  var count=0;
  for(ij=0;ij<items.length;ij++){
    var theInput=items[ij];
    if(theInput.name&&theInput.name==theInputName){
      count++;
    }
  }
  return count;
}

function getValueOne(itemName,tag){
  if(isReserved(itemName)) return itemName;
//alert("getValueOne:"+itemName);

  var theTr=findParent(tag,"TR");
  var items=getInputsById(theTr, "item");//theTr.all["item"];
  for(i=0;i<items.length;i++){
    var item=items[i];
    if(item.name && item.name==itemName && item.value) return parseFloat(item.value);
  }

  var item=getInputsById(document, itemName)[0];
  if(item && item.value) return parseFloat(item.value);
//alert("getValueOne:"+item.value+";parseFloat:"+parseFloat(item.value));
  return 0;
}
////////////////////////////////////////////////////
//str="XXzzzzXXzz".replace(/(X+)(z*)/g,function (str, p1, p2) {return str + " - " + p1+";"; })
//document.write(str)

var calcTags;
function initCalcEvent(){
//  calcTags=new Array();

//  if(theTr==null) return;
//  var theTable=findParent(theTr,"Table","TBODY");
//  if(theTable==null) return;

  var items=new Array();
  var allItems=getInputsById(document, "item");//document.all["item"];
  inc=0;
  for(var iu=0;iu<allItems.length;iu++){
    var item=allItems[iu];
    if(!item) continue;

    if(item.tagName&&item.tagName=="INPUT"){
      if(item.getAttribute("DATAEXPR")){
        items[inc]=item;
        inc++;
      }else if(item.type=="button" && item.getAttribute("BUTTONTYPE")){
//tagInfo(item);
	if(item.getAttribute("BUTTONTYPE")=="add") item.onclick=rowAdd;
	else if(item.getAttribute("BUTTONTYPE")=="del") item.onclick=rowDel;
	else if(item.getAttribute("BUTTONTYPE")=="up") item.onclick=rowUp;
	else if(item.getAttribute("BUTTONTYPE")=="down") item.onclick=rowDown;
      }
    }
  }

  allItems=getInputsById(document, "item");
  for(var iu=0;iu<allItems.length;iu++){
    var item=allItems[iu];
    if(!item) continue;

//    if(item.DATAEXPR){
//    }else if(item.tagName=="INPUT"&&isReferAny(item,items)){
    if(item.tagName=="INPUT"&&isReferAny(item,items)){
      item.onkeyup=onValueChanged;
    }
  }
}

function calcAll(theTable){
  calcTags=new Array();

  if(theTable==null) return;
  var items=new Array();
  var allItems=getInputsById(theTable, "item");//theTable.all["item"];
  inc=0;
  for(var iu=0;iu<allItems.length;iu++){
    var item=allItems[iu];
    if(item.tagName=="INPUT"&&item.getAttribute("DATAEXPR")){
      items[inc]=item;
      inc++;
    }
  }
//alert("items.length:"+items.length);
  var theTr=getClonedTr(theTable);
  if(theTr==null) return;

  allItems=getInputsById(theTr, "item");//theTr.all["item"];
  for(var iu=0;iu<allItems.length;iu++){
    var item=allItems[iu];
    if(item.getAttribute("DATAEXPR")){
    }else if(item.tagName=="INPUT"&&isReferAny(item,items)){
//alert(item.name);
      makeArray(items,item);
    }
  }

  for(var ih=0;ih<calcTags.length;ih++){
    var item=calcTags[ih];
//alert(item.name);
    calc(item);
  }
}
function onValueChanged(){
  calcTags=new Array();

  var allItems=getInputsById(document, "item");//document.all["item"];
  var items=new Array();
  inc=0;
  for(var iu=0;iu<allItems.length;iu++){
    var item=allItems[iu];
    if(!item) continue;

    if(item.tagName&&item.tagName=="INPUT"&&item.getAttribute("DATAEXPR")){
      items[inc]=item;
      inc++;
    }
  }
//alert("items.length:"+items.length);
  makeArray(items,this);
  for(var ih=0;ih<calcTags.length;ih++){
    var item=calcTags[ih];
//alert(item.name);
    calc(item);
  }
}

function makeArray(items,tag){
  var count=0;
  for(var ij=0;ij<items.length;ij++){
    count++;
    if(count>=10000){
      alert("警告，可能出现了死循环！");
      return;
    }
//alert("ij:"+ij);
    var item=items[ij];
//    for(var ih=0;ih<calcTags.length;ih++){
//      var item0=calcTags[ih];
//      if(item==item0) return;
//    }
    if(isRefer(tag,item)){
      insertTag(item,findInsertPos(item));
      makeArray(items,item);
    }
  }
}
//tag2 参考 tag1
function isRefer(tag1,tag2){
  if(tag1.name&&tag2&&tag2.tagName=="INPUT"&&tag2.getAttribute("DATAEXPR")&&tag2.getAttribute("DATAEXPR").indexOf(tag1.name)>=0) return true;
  return false;
}
function isReferAny(tag1,items){
  for(var i=0;i<items.length;i++){
    var item=items[i];
    if(isRefer(tag1,item)) return true;
  }
  return false;
}

function findInsertPos(tag){
 for(var ih=0;ih<calcTags.length;ih++){
  var item=calcTags[ih];
  if(item==tag) return -1;
 }
 for(var ih=0;ih<calcTags.length;ih++){
  var item=calcTags[ih];
  if(isRefer(tag,item)) return ih;
 }
 return calcTags.length;
}

function insertTag(tag,pos){
  if(pos<0) return;
  for(var ik=calcTags.length;ik>pos;ik--){
    calcTags[ik]=calcTags[ik-1];
  }
  calcTags[pos]=tag;
}

var reservedWords=new Array("sqrt","pow","log","exp","sin","cos",
"tan","round","max","min","abs","floor","sum","avg","count");

function isReserved(str){
  for(var i=0;i<reservedWords.length;i++) if(str==reservedWords[i]) return true;
}

function FormatNumber(srcStr,nAfterDot){
　　var srcStr,nAfterDot;
　　var resultStr,nTen;
　　srcStr = ""+srcStr+"";
　　strLen = srcStr.length;
　　dotPos = srcStr.indexOf(".",0);
　　if (dotPos == -1){
　　　　resultStr = srcStr+".";
　　　　for (i=0;i<nAfterDot;i++){
　　　　　　resultStr = resultStr+"0";
　　　　}
　　　　return resultStr;
　　}
　　else{
　　　　if ((strLen - dotPos - 1) >= nAfterDot){
　　　　　　nAfter = dotPos + nAfterDot + 1;
　　　　　　nTen =1;
　　　　　　for(j=0;j<nAfterDot;j++){
　　　　　　　　nTen = nTen*10;
　　　　　　}
　　　　　　resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
　　　　　　return resultStr;
　　　　}
　　　　else{
　　　　　　resultStr = srcStr;
　　　　　　for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
　　　　　　　　resultStr = resultStr+"0";
　　　　　　}
　　　　　　return resultStr;
　　　　}
　　}
}

//找到表达式中的第一个非数据项，如 num*unit 返回 num
function findInputName(inStr){
  results = inStr.match(re_calc)
  for(var ri=0;ri< results.length;ri++){
    result=results[ri];
    if(isNaN(parseFloat(result))) return result;
  }
}

//parentTagName2可选，1或2满足一个即可
function findParent(theTag,parentTagName1,parentTagName2){
  var result=null;
  var parentTag=theTag;
  do{
    parentTag=parentTag.parentNode;//parentNode兼容FF
    if(parentTag.tagName==parentTagName1){
      result=parentTag;
      break;
    }else if(parentTagName2 && parentTag.tagName==parentTagName2){
      result=parentTag;
      break;
    }
  }while(parentTag.parentNode)

  return result;
}
