 var FirstLoad = true;
  function fnGrab(){
    var oEl = event.srcElement; 
    var bCollapsed
	var oTableRow2
	if(("img" == oEl.tagName.toLowerCase())||("a" == oEl.tagName.toLowerCase()))
		oEl = oEl.parentElement;
	oTableRow2 = oEl.parentElement.parentElement.rows[1];
    var bCollapsed = ( (oTableRow2.style.display == "none") ? true : false);
    oEl.parentElement.children(1).children(0).attachEvent( "onblur"  , fnBlur );
    fnShowHideContent(oEl,bCollapsed);       
  }
	      
    function fnShowHideContent(oEl,bCollapsed)
    {
		var oPart = fnGetPart( oEl );
		if(bCollapsed)
		{
			oPart.rows[1].style.display='';
			oPart.rows[0].title='';
			oPart.rows[0].cells[1].children[0].src='/images/GroupOpenArr.gif';
			oPart.state = "open";		
		}
		else
		{
			oPart.rows[1].style.display='none';
			oPart.rows[0].title='';
			oPart.rows[0].cells[1].children[0].src='/images/GroupCloseArr.gif';
			oPart.state = "close";
		}
		
		if(!FirstLoad){
			oPart.rows[0].cells[1].children[0].focus();
			oPart.rows[0].cells[1].children[0].className='GroupHead1';
		}
    }

	function fnGetPart( oEl )
    {
		try{ 
			while( null != oEl && oEl.className != "Group" )
			{
				oEl = oEl.parentElement;
			}
			return oEl;
		}
		catch(e)
		{
			return null;
		}
    }

	function fnBlur()
	{
		var regstr=/Arr_sel.gif$\b/i;
		var obj = event.srcElement;
		var activeobj = window.document.activeElement;
		if((activeobj==obj.parentElement.parentElement.children[0])||(activeobj==obj.parentElement.parentElement.children[0].children[0])||(activeobj==obj.parentElement)||(activeobj==obj))
			obj.focus();
		else
		{
			if(obj.parentElement.parentElement.children[0].children[0].tagName=="IMG") {
				obj.parentElement.parentElement.children[0].children[0].src = obj.parentElement.parentElement.children[0].children[0].src.replace(regstr, "Arr.gif");
			}
			obj.className='GroupHead';
			if((activeobj.className.indexOf("GroupHead")==-1)&&(MsgMain.style.display!='none')&&(activeobj.className.indexOf("dragdiv")==-1))
				obj.focus();
		}
	}
 //another 	
	function menuShow(obj,maxh,obj2)
{
  if(obj.style.pixelHeight<maxh)
  {
    obj.style.pixelHeight+=maxh/20;
    obj.filters.alpha.opacity+=5;
    obj2.background="/images/open.jpg";
    obj2.height="20";
    if(obj.style.pixelHeight==maxh/10)
      obj.style.display='block';
    myObj=obj;
    myMaxh=maxh;
    myObj2=obj2;
    setTimeout('menuShow(myObj,myMaxh,myObj2)','5');
  }
}
function menuHide(obj,maxh,obj2)
{
  if(obj.style.pixelHeight>0)
  {
    if(obj.style.pixelHeight==maxh/20)
      obj.style.display='none';
    obj.style.pixelHeight-=maxh/20;
    obj.filters.alpha.opacity-=5;
    obj2.background="/images/close.jpg";
    obj2.height="20";
    myObj=obj;
    myMaxh=maxh
    myObj2=obj2;
    setTimeout('menuHide(myObj,myMaxh,myObj2)','5');
  }
  else
    if(whichContinue)
      whichContinue.click();
}
function menuChange(obj,maxh,obj2)
{
  if(obj.style.pixelHeight)
  {
    menuHide(obj,maxh,obj2);
    whichOpen='';
    whichcontinue='';
  }
  else
    if(whichOpen)
    {
      whichContinue=obj2;
      whichOpen.click();
    }
    else
    {
      menuShow(obj,maxh,obj2);
      whichOpen=obj2;
      whichContinue='';
    }
}