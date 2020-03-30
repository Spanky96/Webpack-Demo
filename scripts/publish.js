function GetColor(img_val,input_val){
	var PaletteLeft,PaletteTop
	var obj = document.getElementById("colorPalette");
	ColorImg = img_val;
	ColorValue = document.getElementById(input_val);	
	if (obj){
		PaletteLeft = getOffsetLeft(ColorImg)
		PaletteTop = (getOffsetTop(ColorImg)-250)
		if (PaletteTop<0)PaletteTop+=ColorImg.offsetHeight+165;
		if (PaletteLeft+260 > parseInt(document.body.clientWidth)) PaletteLeft = parseInt(event.clientX)-280;
		obj.style.left = PaletteLeft + "px";
		obj.style.top = PaletteTop + "px";
		if (obj.style.visibility=="hidden")
		{
			obj.style.visibility="visible";
		}else {
			obj.style.visibility="hidden";
		}
	}
}
function getOffsetLeft(elm) {
	var mOffsetLeft = elm.offsetLeft;
	var mOffsetParent = elm.offsetParent;
	while(mOffsetParent) {
		mOffsetLeft += mOffsetParent.offsetLeft;
		mOffsetParent = mOffsetParent.offsetParent;
	}
	return mOffsetLeft;
}
function getOffsetTop(elm) {
	var mOffsetTop = elm.offsetTop;
	var mOffsetParent = elm.offsetParent;
	while(mOffsetParent){
		mOffsetTop += mOffsetParent.offsetTop;
		mOffsetParent = mOffsetParent.offsetParent;
	}
	return mOffsetTop;
}
function setColor(color)
{
	if(ColorImg.id=="FontColorShow"&&color=="#") color='#000000';
	if(ColorImg.id=="FontBgColorShow"&&color=="#") color='#FFFFFF';
	if (ColorValue){ColorValue.value = color.substr(1);}
	if (ColorImg && color.length>1){
		ColorImg.src=src='/images/selcolor.gif';
		ColorImg.style.backgroundColor = color;
	}else if(color=='#'){
	 ColorImg.src='/images/selcolor.gif';
	 ColorImg.style.backgroundColor = 'transparent';
	}
	document.getElementById("colorPalette").style.visibility="hidden";
}
function noSelColor(){
   document.getElementById("colorPalette").style.visibility="hidden";
}
function setTitle(box,id){
  if(box.checked)document.getElementById(id).value = "1";
  else document.getElementById(id).value = "";
}
function setZhehang(box,id){
	  if(box.checked){
		  document.getElementById(id).value = "1";
		  document.getElementById("titleBlankNum").value = "1";
	  }
	  else {
		  document.getElementById(id).value = "";
		  document.getElementById("titleBlankNum").value = "0";
	  }
}