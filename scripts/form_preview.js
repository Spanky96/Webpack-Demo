
function getInsertIndex(theTable){
  var items=theTable.all["item"];
  rowIndex=-1;
  for(i=items.length-1;i>=0;i--){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT" && theCheck.ROWCHECK && theCheck.ROWCHECK=="true"){
      var theTr=findParent(theCheck,"TR");
      rowIndex=theTr.rowIndex;
      break;
    }
  }
  if(rowIndex<0) rowIndex=getClonedIndex(theTable)-1;
  return rowIndex;
}

function rowAdd(tag){
//var butt = document.createElement('BUTTON');
//tag.parentNode.insertBefore(butt,tag);

  var theTable=findParent(tag,"TABLE","TBODY");
  var theTr=findParent(tag,"TR");
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
  theTr.parentNode.insertBefore(newTr,theTr.parentNode.childNodes[rowIndex+1]);

  calcAll(theTable);
  //menuInit();
  //if(opener) resize();
}

function rowDel(tag){
  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return null;

  var items=theTable.all["item"];
  for(i=items.length-1;i>=0;i--){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"&&theCheck.checked){
      var theTr=findParent(theCheck,"TR")
      theTr.parentNode.deleteRow(theTr.rowIndex);
    }
  }

  calcAll(theTable);
  //menuInit();
  //if(opener) resize();
}

function oneRowMove(theTable,rowIndex,offset){
  var theTr=theTable.childNodes[rowIndex];
  var items=theTr.all["item"];
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

function rowUp(tag){
  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return null;

  firstRowIndex=getClonedIndex(theTable);
  var trs=new Array();
  j=0;

  var items=theTable.all["item"];
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"&&theCheck.checked){
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

function rowDown(tag){
  var theTable=findParent(tag,"TABLE","TBODY");
  if(theTable==null) return null;

  lastRowIndex=-1;
  var trs=new Array();
  j=0;

  var items=theTable.all["item"];
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(theCheck.tagName=="INPUT"&&theCheck.ROWCHECK&&theCheck.ROWCHECK=="true"){
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


var detailTables=new Array();
function initDetails(){
  var items=document.all["item"];
  index=0;
  for(i=0;i<items.length;i++){
    var theCheck=items[i];
    if(theCheck && theCheck.tagName && theCheck.tagName=="INPUT" && theCheck.ROWCHECK && theCheck.ROWCHECK=="true"){
      var theTable=findParent(theCheck,"TABLE","TBODY");
      var theTr=findParent(theCheck,"TR");
      if(theTable && theTr){
        detailTables[index]=new Array(theTable,theTr.cloneNode(true),theTr.rowIndex);
//        calcAll(theTable);
        index++;
      }
    }
  }
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

//parentTagName2可选，1或2满足一个即可
function findParent(theTag,parentTagName1,parentTagName2){
  var result=null;
  var parentTag=theTag;
  do{
    parentTag=parentTag.parentElement;
    if(parentTag.tagName==parentTagName1){
      result=parentTag;
      break;
    }else if(parentTagName2 && parentTag.tagName==parentTagName2){
      result=parentTag;
      break;
    }
  }while(parentTag.parentElement)

  return result;
}