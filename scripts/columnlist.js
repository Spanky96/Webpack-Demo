var SORT_ASCENDING  = 0;
var SORT_DESCENDING = 1;

var COL_HEAD_NONE = 0;
var COL_HEAD_EDGE = 1;
var COL_HEAD_OVER = 2;
var COL_HEAD_SIZE = 3;
var COL_HEAD_DOWN = 4;
var COL_HEAD_MOVE = 5;

var thisId=null;
var thisIds=null;
var thisvalues="";
/*
 * oColumnList = new WebFXColumnList()
 * Default constructor
 */
function WebFXColumnList() {

	/* public properties */
	this.multiple       = true;                                                   // Allow multiple selection (true or false)
	this.colorEvenRows  = true;                                                   // Mark even rows with different color (true or false)
	this.resizeColumns  = true;                                                   // Enable column resizing (true or false)
	this.bodyColResize  = true;                                                   // Resize body columns duing resize operation (true or false)
	this.moveColumns    = true;                                                   // Enable column moving (true or false)
	this.rowSelection   = true;                                                   // Enable row selection (true or false)
	this.columnSorting  = true;                                                   // Enable sorting (true or false)
	this.columnAlign    = true;                                                   // Enable column text alignment (true or false)

	this.sortAscImage   = '/images/asc.png';                                       // Image used to indicate ascending sort order
	this.sortDescImage  = '/images/desc.png';                                      // Image used to indicate descending sort order

	/* public read only properties */
	this.sortCol        = -1;                                                     // Column index currently sorted by, read only
	this.sortDescending = 0;                                                      // Column sort direction, read only (SORT_ASCENDING or SORT_DESCENDING)
	this.error          = '';                                                     // Error message set if an error code was returned, read only.
	this.selectedRows   = [];                                                     // Currently selected rows, read only.

	/* events */
	this.onresize       = null;
	this.onsort         = null;
	this.onselect       = null;

	/* private properties */
	this._eCont         = null;
	this._eHead         = null;
	this._eBody         = null;
	this._eHeadTable    = null;
	this._eBodyTable    = null;
	this._eHeadCols     = null;
	this._eBodyCols     = null;

	this._aColumnTypes  = [];
	this._aColumnAlign  = [];
	this._rows          = 0;
	this._cols          = 0;
	this._headerOper    = COL_HEAD_NONE;
	this._headerData    = null;
}

/*
 * iError = bind(eContainer, eHeader, eBody)
 * Binds column list to an existing HTML structure. Use create
 * to generate the strucutr automatically.
*/
WebFXColumnList.prototype.bind = function(eCont, eHead, eBody) {
	try {
		this._eCont      = eCont;
		this._eHead      = eHead;
		this._eBody      = eBody;
		this._eHeadTable = this._eHead.getElementsByTagName('table')[0];
		this._eBodyTable = this._eBody.getElementsByTagName('table')[0];
	 	this._eHeadCols  = this._eHeadTable.tBodies[0].rows[0].cells;
		this._eBodyCols  = this._eBodyTable.tBodies[0].rows[0].cells;
	}
	catch(oe) {
		this.error = 'Unable to bind to elements: ' + oe.message;
		return 1;
	}
	if (this._eHeadCols.length != this._eBodyCols.length) {
		this.error = 'Unable to bind to elements: Number of columns in header and body does not match.';
		return 2;
	}

	this._eHeadCols  = this._eHeadTable.tBodies[0].rows[0].cells;
	this._eBodyCols  = this._eBodyTable.tBodies[0].rows[0].cells;

	this._cols = this._eHeadCols.length;
	this._rows = this._eBodyTable.tBodies[0].rows.length;
	
	/* Set column class names (used for alignment in mozilla) */
	if ((!document.all) && (this.columnAlign)) {
		aRows = this._eBodyTable.tBodies[0].rows;
		this._rows = aRows.length;
		for (i = 0; i < this._rows; i++) {
			for (j = 0; j < this._cols; j++) {
				aRows[i].cells[j].className = 'webfx-columnlist-col-' + j;
	}	}	}
	this._init();
	return 0;
};


/*
 * void _init(iWidth, iHeight)
 * Initializes column list, called by create and bind
*/
WebFXColumnList.prototype._init = function(iWidth, iHeight) {
	if (navigator.product == 'Gecko') {
		/*
		 * Mozilla does not allow the scroll* properties of containers with the
		 * overflow property set to 'hidden' thus we'll have to set it to
		 * '-moz-scrollbars-none' which is basically the same as 'hidden' in IE,
		 * the container has overflow type 'scroll' but no scrollbars are shown.
		*/
		for (var n = 0; n < document.styleSheets.length; n++) {
			if (document.styleSheets[n].href&&document.styleSheets[n].href.indexOf('columnlist.css') == -1) { continue; }
			var rules = document.styleSheets[n].cssRules;
			for (var i = 0; i < rules.length; i++) {
				if ((rules[i].type == CSSRule.STYLE_RULE) && (rules[i].selectorText == '.webfx-columnlist-head')) {
					rules[i].style.overflow = '-moz-scrollbars-none';
	}	}	}	
	}
	
	/*
	 * Set tab index to allow element to be focused using keyboard, also allows
	 * keyboard events to be captured for Mozilla.
	 */
	this._eCont.tabIndex = '0';
	this.calcSize();
	this._assignEventHandlers();
	if (this.colorEvenRows) { this._colorEvenRows(); }
}


/*
 * void _assignEventHandlers()
 * Assigns event handlers to the grid elements, called by bind.
*/
WebFXColumnList.prototype._assignEventHandlers = function() {
	var oThis = this;
	this._eCont.onclick     = function(e) { 
		oThis._click(e); 
		if(document.getElementById("searchMenu")){
			document.getElementById("searchMenu").style.display="none";	
			if(document.getElementById("moreSearch")) document.getElementById("moreSearch").className="list-5";
		}
		
	}
	if (this.resizeColumns) {
		this._eCont.onmousedown = function(e) { oThis._mouseDown(e); }
		this._eCont.onmousemove = function(e) { oThis._mouseMove(e); }
	}
	this._eCont.onmouseup   = function(e) { oThis._mouseUp(e); }
	this._eCont.onselectstart = function(e) { return false; }
	this._eBody.onscroll = function() {
		oThis._eHead.scrollLeft = oThis._eBody.scrollLeft;
	};
	this._eCont.onkeydown = function(e) {
		var el = (e)?e.target:window.event.srcElement;
		var key = (e)?e.keyCode:window.event.keyCode;
		if (oThis._handleRowKey(key)) { return; }
		if (window.event) { window.event.cancelBubble = true; }
		else { e.preventDefault(); e.stopPropagation() }
		return false;
	};
	
	var eRows=this._eBodyTable.tBodies[0].rows;
	for(var i=0;i<eRows.length;i++){
		eRows[i].onmouseover=function(){
			this.className="over";
		}
		eRows[i].onmouseout=function(){
			var inputs=this.getElementsByTagName("input");
			if(inputs&&inputs.length>0){
				if(inputs[0].checked) this.className="selected";
				else this.className=(this.rowIndex&1)?"odd":"even";
			}else this.className=(this.rowIndex&1)?"odd":"even";
			
				
		}
		
	}
	
};


/*
 * void calcSize()
 * Used to calculate the desired size of the grid and size it accordingly.
 */
WebFXColumnList.prototype.calcSize = function() {
	
	if (this._eCont.offsetWidth >= 4) {
		
		try{
		/* Size body */
		var h = this._eCont.clientHeight - this._eHead.offsetHeight - 2;
		}catch(e){
		}
		
		if (h >= 0) { this._eBody.style.height = h + 'px'; }
		this._eBody.style.width = "100%";
		//this._eBody.style.paddingTop = this._eHead.offsetHeight + 'px';
		
		try{
		this._eBodyTable.style.width = "100%";
		}catch(e){
		}
		
		/* Size header */
		var bNoScrollbar = ((this._eBody.offsetWidth - this._eBody.clientWidth) == 2);
	
		try{
		this._eHeadTable.style.width = "100%";
		}catch(e){
		}
		
		/* Size columns */
		if (this._eBodyCols) {
			var length = this._eBodyCols.length;
			for (var i = 0; i < length; i++){
				if(((this._eBodyCols[i].offsetWidth - 4) + ((bNoScrollbar) && (i == length - 1)?2:0))<0) continue;
				this._eHeadCols[i].style.width = (this._eBodyCols[i].offsetWidth - 4) + ((bNoScrollbar) && (i == length - 1)?2:0) + 'px';				
			}
		}	
	}
	try{
		this._eHeadTable.style.width = '100%';
	}catch(e){
	}
};



/*
 * iErrorCode = selectRow(iRowIndex, bMultiple)
 * Selects the row identified by the sequence number supplied,
 *
 * If bMultiple is specified and multi-select is allowed the
 * the previously selected row will not be deselected. If the
 * specified row is already selected it will be deselected.
 */
WebFXColumnList.prototype.selectRow = function(iRowIndex, bMultiple) {

	if (!this.rowSelection) {return; }
	if ((iRowIndex < 0) || (iRowIndex > this._rows - 1)) {
		this.error = 'Unable to select row, index out of range.';
		return 1;
	}
	var eRows = this._eBodyTable.tBodies[0].rows;
	var bSelect = true;
	
	/* Normal */
	if ((!bMultiple) || (!this.multiple)) {
		/* Deselect previously selected rows */
		if(document.selectAll!=null && document.selectAll.checked==true)selectAll.checked=false;
		while (this.selectedRows.length) {

			if (this.colorEvenRows) {
			eRows[this.selectedRows[0]].className = (this.selectedRows[0] & 1)?'odd':'even';
			 }
			else { eRows[this.selectedRows[0]].className = ''; }
			this.selectedRows.splice(0, 1);
	}	}

	/* Control + Click */
	else {
		for (var i = 0; i < eRows.length; i++) {

			/* Deselect clicked row */
			if (this.selectedRows[i] == iRowIndex) {
				if (this.colorEvenRows) {  eRows[iRowIndex].className = (iRowIndex & 1)?'odd':'even';  }
				else {
				eRows[this.selectedRows[i]].className = ''; }
				this.selectedRows.splice(i, 1);
				bSelect = false;
				break;
	}	}	
	}

	/* Select clicked row */
	if (bSelect) {   
	    if(eRows[iRowIndex].className == 'selected'){   
	       eRows[iRowIndex].className = (iRowIndex & 1)?'odd':'even';
	    }else{
		   this.selectedRows.push(iRowIndex);
		   eRows[iRowIndex].className = 'selected'; 
		}
	}
	
	for(var j = 0; j < eRows.length; j++){
	   if(eRows[j].className != 'selected')
	   if(document.getElementById('selectAll')!=null && document.getElementById('checkbox')!=null){
		   //eRows[j].childNodes[0].childNodes[0].checked = false;
		   eRows[j].getElementsByTagName("TD")[0].getElementsByTagName("INPUT")[0].checked= false;
	   }
	}
	
	var a = (eRows[iRowIndex].offsetTop + this._eHead.offsetHeight) + eRows[iRowIndex].offsetHeight + 1;
	var b = (this._eBody.clientHeight + this._eBody.scrollTop);
	
	if (a > b) {
		this._eBody.scrollTop = (a - this._eBody.clientHeight);
	}
	
	var c = eRows[iRowIndex].offsetTop;
	var d = this._eBody.scrollTop;
	if (c < d) {
		this._eBody.scrollTop = c;
	}
	
	setIds(eRows,this.selectedRows);
	/* Call onselect if defined */
//	if (this.onselect) { this.onselect(thisId); }

	return 0;
};
/*
*点击多选框事件
*/
WebFXColumnList.prototype.checkbox = function(iRowIndex, bMultiple){
	if (!this.rowSelection) {return; }
	if ((iRowIndex < 0) || (iRowIndex > this._rows - 1)) {
		this.error = 'Unable to select row, index out of range.';
		return 1;
	}
	var eRows = this._eBodyTable.tBodies[0].rows;
	var bSelect = true;
			for (var i = 0; i < eRows.length; i++) {

			/* Deselect clicked row */
			if (this.selectedRows[i] == iRowIndex) {
				if (this.colorEvenRows) {  eRows[iRowIndex].className = (iRowIndex & 1)?'odd':'even';  }
				else {
				eRows[this.selectedRows[i]].className = ''; }
				this.selectedRows.splice(i, 1);
				bSelect = false;
				break;
	}	}
	if (bSelect) {   
	    if(eRows[iRowIndex].className == 'selected'){   
	       eRows[iRowIndex].className = (iRowIndex & 1)?'odd':'even';
	    }else{
		   this.selectedRows.push(iRowIndex);
		   eRows[iRowIndex].className = 'selected'; 
		}
	}
	for(var j = 0; j < eRows.length; j++){
	   if(eRows[j].className != 'selected')
	   if(document.getElementById('selectAll')!=null && document.getElementById('checkbox')!=null){
		   //eRows[j].childNodes[0].childNodes[0].checked = false;
		   eRows[j].getElementsByTagName("TD")[0].getElementsByTagName("INPUT")[0].checked= false;
	   }
	}
	var a = (eRows[iRowIndex].offsetTop + this._eHead.offsetHeight) + eRows[iRowIndex].offsetHeight + 1;
	var b = (this._eBody.clientHeight + this._eBody.scrollTop);
	if (a > b) {
		this._eBody.scrollTop = (a - this._eBody.clientHeight);
	}
	var c = eRows[iRowIndex].offsetTop;
	var d = this._eBody.scrollTop;
	if (c < d) {
		this._eBody.scrollTop = c;
	}

setIds(eRows,this.selectedRows);
	/* Call onselect if defined */
//	if (this.onselect) { this.onselect(thisId); }

	return 0;	
}
//taotao
function setIds(rows,sRows){
thisId=null;
thisIds=null;
thisvalues="";
var ids=[];
var values=[];
if(sRows.length>=1){//当被选中的记录大于或等于一条
	for(var i=0; i<sRows.length; i++){
	  ids.push(rows[sRows[i]].id);
	  var namevalue = document.getElementById(rows[sRows[i]].id+"_namevalue");
	  if(namevalue!=null){
		  var name = namevalue.innerHTML;
		  if(name.length>50)name = name.substring(0,49)+"......";
		  values.push(name);
	  }
	  
	  if(document.getElementById('selectAll')!=null && document.getElementById('checkbox')!=null){
		  var box = getCheckBox();
		  if(rows.length>1) {
			  box[sRows[i]].checked = true;
		   }else{
		  	 checkbox.checked=true;
		   }
	  }
	 
	}
	
	if(values.length==1){
		thisvalues += values[0]+"\n";
	}else{
		for(var i=0;i<values.length;i++){
			var n= i+1;
			thisvalues += n+"、"+values[i]+"\n";
		}
	}
	thisIds=ids.join(",");
	if(sRows.length>0){
	  thisId=rows[sRows[sRows.length-1]].id;
	  afterClick(rows[sRows[sRows.length-1]]);
	} 
	//alert(thisId+";"+thisIds);
}
	if(tp1) tp1.select();
}


function afterClick(thisTR){
}

WebFXColumnList.prototype.focus = function() {
  try {
     if(this._eCont) this._eCont.focus();
  }catch(oe){
  
  }
}
/*
 * iErrorCode = selectRange(iRowIndex[])
 * iErrorCode = selectRange(iFromRowIndex, iToRowIndex)
 * Selects all rows between iFromRowIndex and iToRowIndex.
 */
WebFXColumnList.prototype.selectRange = function(a, b) {
	var aRowIndex;

	if (!this.rowSelection) { return; }

	if (typeof a == 'number') {
		aRowIndex = new Array();
		for (var i = a; i <= b; i++) { aRowIndex.push(i); }
		for (var i = b; i <= a; i++) { aRowIndex.push(i); }
	}
	else { aRowIndex = a; }

	for (var i = 0; i < aRowIndex.length; i++) {
		if ((aRowIndex[i] < 0) || (aRowIndex[i] > this._rows - 1)) {
			this.error = 'Unable to select rows, index out of range.';
			return 1;
	}	}

	/* Deselect previously selected rows */
	var eRows = this._eBodyTable.tBodies[0].rows;
	while (this.selectedRows.length) {
		if (this.colorEvenRows) { eRows[this.selectedRows[0]].className = (this.selectedRows[0] & 1)?'odd':'even'; }
		else { eRows[this.selectedRows[0]].className = ''; }
		this.selectedRows.splice(0, 1);
	}

	/* Select all rows indicated by range */
	var eRows = this._eBodyTable.tBodies[0].rows;
	var bMatch;
	for (var i = 0; i < aRowIndex.length; i++) {
		bMatch = false;
		for (var j = 0; j < this.selectedRows.length; j++) {
			if (this.selectedRows[j] == aRowIndex[i]) { bMatch = true; break; }
		}
		if (!bMatch) {
			/* Select row */
			this.selectedRows.push(aRowIndex[i]);
			eRows[aRowIndex[i]].className = 'selected';
	}	}
//taotao
setIds(eRows,this.selectedRows);
	/* Call onselect if defined */
//	if (this.onselect) { this.onselect(thisId); }

	return 0;
};


/*
 * void resize(iWidth, iHeight)
 * Resize the grid to the given dimensions, the outer (border) size is given, not the inner (content) size.
 */
WebFXColumnList.prototype.resize = function(w, h) {

	this._eCont.style.width = "96%";
	if(h <0) return;
	this._eCont.style.height = h + 'px';

	this.calcSize();

	/* Call onresize if defined */
	if (this.onresize) { this.onresize(); }
};


/*
 * void _colorEvenRows()
 * Changes the color of even rows (usually to light yellow) to make it easier to read.
 * Also updates the id column to a sequence counter rather than the row ids.
 */
WebFXColumnList.prototype._colorEvenRows = function() {
	if (this._eBodyTable.tBodies.length) {
		var nodes = this._eBodyTable.tBodies[0].rows;
		var len = nodes.length;
		for (var i = 0; i < len; i++) {
			if (nodes[i].className != 'selected') {
				nodes[i].className = (i & 1)?'odd':'even';
	}	}	}
};

/*
 * void _colorEvenRows()
 * Changes the color of even rows (usually to light yellow) to make it easier to read.
 * Also updates the id column to a sequence counter rather than the row ids.
 */
WebFXColumnList.prototype._colorEvenRows = function() {
	if (this._eBodyTable.tBodies.length) {
		var nodes = this._eBodyTable.tBodies[0].rows;
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].className != 'selected') {
				nodes[i].className = (i & 1)?'odd':'even';
	}	}	}
};

/*
 * iRowIndex getSelectedRow()
 * Returns the index of the selected row or -1 if no row is selected.
 */
WebFXColumnList.prototype.getSelectedRow = function() {
	return (this.selectedRows.length)?this.selectedRows[this.selectedRows.length-1]:-1;
};


/*
 * iRowIndex[] getSelectedRange()
 * Returns an array with the row index of all selecteds row or null if no row is selected.
 */
WebFXColumnList.prototype.getSelectedRange = function() {
	return (this.selectedRows.length)?this.selectedRows:-1;
};


/*
 * iRows getRowCount()
 * Returns the nummer of rows.
 */
WebFXColumnList.prototype.getRowCount = function() {
	return this._rows;
};


/*
 * iRows getColumnCount()
 * Returns the nummer of columns.
 */
WebFXColumnList.prototype.getColumnCount = function() {
	return this._cols;
};


/*
 * sValue = getCellValue(iRowIndex, iColumnIndex, bHTML)
 * Returns the content of the specified cell.
 */
WebFXColumnList.prototype.getCellValue = function(iRowIndex, iColIndex, bHTML) {
	var el;

	if ((iRowIndex < 0) || (iRowIndex > this._rows - 1)) {
		this.error = 'Unable to get cell value , row index out of range.';
		return null;
	}
	if ((iColIndex < 0) || (iColIndex > this._cols - 1)) {
		this.error = 'Unable to get cell value , row index out of range.';
		return null;
	}

	el = this._eBodyTable.tBodies[0].rows[iRowIndex].cells[iColIndex];

	return (bHTML)?el.innerHTML:getInnerText(el);
};


/*
 * void _handleRowKey(iKeyCode)
 * Key handler for events on row level.
 */
WebFXColumnList.prototype._handleRowKey = function(iKeyCode, bCtrl, bShift) {
	var iActiveRow = -1;
	if (this.selectedRows.length != 0) { iActiveRow = this.selectedRows[this.selectedRows.length-1]; }
	if ((!bCtrl) && (!bShift)) {
		if (iKeyCode == 38) {                                                       // Up
			if (iActiveRow > 0) { this.selectRow(iActiveRow - 1); }
		}
		else if (iKeyCode == 40) {                                                  // Down
			if (iActiveRow < this._rows - 1) { this.selectRow(iActiveRow + 1); }
		}
		else if (iKeyCode == 33) {                                                  // Page Up
			if (iActiveRow > 10) { this.selectRow(iActiveRow - 10); }
			else { this.selectRow(0); }
		}
		else if (iKeyCode == 34) {                                                  // Page Down
			if (iActiveRow < this._rows - 10) { this.selectRow(iActiveRow + 10); }
			else { this.selectRow(this._rows - 1); }
		}
		else if (iKeyCode == 36) { this.selectRow(0); }                             // Home
		else if (iKeyCode == 35) { this.selectRow(this._rows - 1); }                // End
		else { return true; }
		return false;
	}
};

var creenX = "";
var creenY = ""; 

WebFXColumnList.prototype._mouseMove = function(e) {
    var el, x, w, tw, ox, rx, i, l;
    el = (e)?e.target:window.event.srcElement;
    x = (e)?e.pageX:window.event.x + this._eBody.scrollLeft;

    /*
     * Column move operation started, create elements required to indicate moving
     * and set operation flag to COL_HEAD_MOVE.
     */
    if ((this._headerOper == COL_HEAD_DOWN) && (this.moveColumns)) {
    	var browser = checkBrowser();
    	var cX;
    	var cY;
    	if(browser!=null){
        if(browser.indexOf("IE")!=-1){
        	cX = window.event.x;
        	cY = window.event.y;
        }else{
        	cX = e.pageX;
        	cY = e.pageY;
        }
    	}
        if((creenX == cX) && (creenY == cY)){
          this._headerOper = COL_HEAD_DOWN;
        }else{
            this._headerOper = COL_HEAD_MOVE;
            this._eCont.style.cursor = 'move';
            w = this._headerData[2] + (x - this._headerData[1]);
           if (!this._moveEl) {
                this._moveEl = document.createElement('div');
                this._moveEl.appendChild(document.createTextNode(this._headerData[0].firstChild.nodeValue));
                this._moveEl.className = 'webfx-columnlist-move-header';
                this._eHead.appendChild(this._moveEl);
            }
            else {this._moveEl.firstChild.nodeValue = this._headerData[0].firstChild.nodeValue; }
            this._moveEl.style.width = this._headerData[0].clientWidth + 'px';
    
            if (!this._moveSepEl) {
                      
                this._moveSepEl = document.createElement('div');
                this._eHead.appendChild(this._moveSepEl);
                this._moveSepEl.className = 'webfx-columnlist-separator-header';
            }
        }
   }

    /*
     * Column move operation, determine position of column and move place holder
     * to that position. Also indicate in between which columns it will be placed.
     */
     else if ((this._headerOper == COL_HEAD_MOVE) && (this.moveColumns)) {
        ox = this._headerData[1] + (x - this._headerData[2]);
        this._moveEl.style.left = ox + 'px';

        ox = 0, rx = x - this._headerData[3];
        for (i = (document.getElementById('selectAll')!=null || (document.getElementById("attach")!=null))?2:0; i < this._cols; i++) { 
            ox += this._eHeadCols[i].offsetWidth;
            if (ox >= rx) { break; }
        }
        if (i == this._cols) { this._moveSepEl.style.left = (this._eHeadCols[this._cols-1].offsetLeft + this._eHeadCols[this._cols-1].offsetWidth - 1) + 'px'; }
        else { this._moveSepEl.style.left = this._eHeadCols[i].offsetLeft + 'px'; }

        this._headerData[4] = i;
    }

    /*
     * Column resize operation, determine and set new size based on the original
     * size and the difference between the current mouse position and the one that
     * was recorded once the resize operation was started.
     */
    else if (this._headerOper == COL_HEAD_SIZE) {
        if((this._headerData[0].id=='select' && this._headerData[0].cellIndex==0)||(this._headerData[0].id=='attach' && this._headerData[0].cellIndex==1))return;
        w = this._headerData[1] + x - this._headerData[2];
        tw = ((w - this._headerData[1]) + this._headerData[3]) + 1;
        this._eHeadTable.style.width = tw + 'px';
        if (w > 5) {
            this._headerData[0].style.width = w + 'px';
            if (this.bodyColResize) {
                this._eBodyTable.style.width = tw + 'px';
                this._eBodyTable.getElementsByTagName('colgroup')[0].getElementsByTagName('col')[this._headerData[0].cellIndex].style.width = w + 'px';
            }    
         }
    }

    else { this._checkHeaderOperation(el, x);}
    
}; 
/*
 * Event Handlers
 */
//WebFXColumnList.prototype._mouseMove = function(e) {
//	var el, x, w, tw, ox, rx, i, l;
//
//	el = (e)?e.target:window.event.srcElement;
//	x = (e)?e.pageX:window.event.x + this._eBody.scrollLeft;
//	/*
//	 * Column move operation started, create elements required to indicate moving
//	 * and set operation flag to COL_HEAD_MOVE.
//	 */
//	if ((this._headerOper == COL_HEAD_DOWN) && (this.moveColumns)) {
//		this._headerOper = COL_HEAD_MOVE;
//		this._eCont.style.cursor = 'move';
//
//		w = this._headerData[2] + (x - this._headerData[1]);
//
//		if (!this._moveEl) {
//			this._moveEl = document.createElement('div');
//			this._moveEl.appendChild(document.createTextNode(this._headerData[0].firstChild.nodeValue));
//			this._moveEl.className = 'webfx-columnlist-move-header';
//			this._eHead.appendChild(this._moveEl);
//		}
//		else { this._moveEl.firstChild.nodeValue = this._headerData[0].firstChild.nodeValue; }
//		this._moveEl.style.width = this._headerData[0].clientWidth + 'px';
//
//		if (!this._moveSepEl) {
//			this._moveSepEl = document.createElement('div');
//			this._moveSepEl.className = 'webfx-columnlist-separator-header';
//			this._eHead.appendChild(this._moveSepEl);
//	}	}
//
//	/*
//	 * Column move operation, determine position of column and move place holder
//	 * to that position. Also indicate in between which columns it will be placed.
//	 */
//	if (this._headerOper == COL_HEAD_MOVE) {
//		ox = this._headerData[1] + (x - this._headerData[2]);
//		this._moveEl.style.left = ox + 'px';
//
//		ox = 0, rx = x - this._headerData[3];
//		for (i = 0; i < this._cols; i++) {
//			ox += this._eHeadCols[i].offsetWidth;
//			if (ox >= rx) { break; }
//		}
//		if (i == this._cols) { this._moveSepEl.style.left = (this._eHeadCols[this._cols-1].offsetLeft + this._eHeadCols[this._cols-1].offsetWidth - 1) + 'px'; }
//		else { this._moveSepEl.style.left = this._eHeadCols[i].offsetLeft + 'px'; }
//
//		this._headerData[4] = i;
//	}
//
//	/*
//	 * Column resize operation, determine and set new size based on the original
//	 * size and the difference between the current mouse position and the one that
//	 * was recorded once the resize operation was started.
//	 */
//	else if (this._headerOper == COL_HEAD_SIZE) {
//		w = this._headerData[1] + x - this._headerData[2];
//		tw = ((w - this._headerData[1]) + this._headerData[3]) + 1;
//		this._eHeadTable.style.width = tw + 'px';
//		if (w > 5) {
//			this._headerData[0].style.width = w + 'px';
//			if (this.bodyColResize) {
//				this._eBodyTable.style.width = tw + 'px';
//				this._eBodyTable.getElementsByTagName('colgroup')[0].getElementsByTagName('col')[this._headerData[0].cellIndex].style.width = w + 'px';
//	}	}	}
//
//	else { this._checkHeaderOperation(el, x); }
//
//};

WebFXColumnList.prototype._mouseDown = function(e) {
    var el = (e)?e.target:window.event.srcElement;
    if(el.id == 'select'||el.id=='attach' ){
    	return;
    }
    var x = (e)?e.pageX:window.event.x + this._eBody.scrollLeft;
    var browser = checkBrowser();
    if(browser!=null){
    if(browser.indexOf("IE")!=-1){
    	creenX = window.event.x;
    	creenY = window.event.y;
    }else{
    	creenX = e.pageX;
    	creenY = e.pageY;
    }
    }
    if ((el.tagName == 'TD') && (el.parentNode.parentNode.parentNode.parentNode.className == 'webfx-columnlist-head')) {
        this._checkHeaderOperation(el, x);
        if (this._headerOper == COL_HEAD_EDGE) {
            if (this.bodyColResize) { this._sizeBodyAccordingToHeader(); }
            this._headerOper = COL_HEAD_SIZE;
        }
        else if (this._headerOper == COL_HEAD_OVER) {
            this._headerOper = COL_HEAD_DOWN;
            this._headerData[0].className = 'webfx-columnlist-active-header';
       }    
    }
}; 

//WebFXColumnList.prototype._mouseDown = function(e) {
//	var el = (e)?e.target:window.event.srcElement;
//	var x = (e)?e.pageX:window.event.x + this._eBody.scrollLeft;
//	if ((el.tagName == 'TD') && (el.parentNode.parentNode.parentNode.parentNode.className == 'webfx-columnlist-head')) {
//		this._checkHeaderOperation(el, x);
//
//		if (this._headerOper == COL_HEAD_EDGE) {
//			if (this.bodyColResize) { this._sizeBodyAccordingToHeader(); }
//			this._headerOper = COL_HEAD_SIZE;
//		}
//		else if (this._headerOper == COL_HEAD_OVER) {
//			this._headerOper = COL_HEAD_DOWN;
//			this._headerData[0].className = 'webfx-columnlist-active-header';
//	}	}
//};


WebFXColumnList.prototype._mouseUp = function(e) {
	var el = (e)?e.target:window.event.srcElement;
	var x = (e)?e.pageX:window.event.x + this._eBody.scrollLeft;
	if (this._headerOper == COL_HEAD_SIZE) {
		setUserParam(this._eHeadCols);
	}
	else if (this._headerOper == COL_HEAD_MOVE) {
		if (this._moveEl)    { this._eHead.removeChild(this._moveEl);    this._moveEl    = null; }
		if (this._moveSepEl) { this._eHead.removeChild(this._moveSepEl); this._moveSepEl = null; }
		this._moveColumn(this._headerData[0].cellIndex, this._headerData[4]);
		setUserParam(this._eHeadCols);
	}
	else if (this._headerOper == COL_HEAD_DOWN) {
        order=document.pageForm.order.value;
//        zsCol=zsCols[el.cellIndex];
		zsCol=el.id;
        ad=" asc";
        if(order==zsCol+ad) ad=" desc";
	    orderBy(zsCol+ad);
	}

	if (this._headerOper != COL_HEAD_NONE) {
		this._headerOper = COL_HEAD_NONE;
		this._eCont.style.cursor = 'default';
		this._headerData[0].className = '';
		this._headerData = null;
		this._sizeBodyAccordingToHeader();
	}
};

WebFXColumnList.prototype._click = function(e) {
	var el = (e)?e.target:window.event.srcElement;
	if(el.tagName == 'INPUT') {
		if(el.id == 'selectAll'){
			if(el.checked == true){
				this.selectRange(0,this._rows-1);
			}else{
				this.selectRange(0,0);
			}		
			return;
		}
		else{
		el=el.parentNode;
		this.checkbox(el.parentNode.rowIndex, (e)?e.ctrlKey:window.event.ctrlKey);
		return;
		}
	}
	if (el.tagName == 'A'){ el = el.parentNode; }
	if (el.tagName == 'NOBR') { el = el.parentNode; }
	if (el.tagName == 'IMG') { el = el.parentNode; }
	if (el.tagName == 'DIV') { el = el.parentNode; }
	if ((el.tagName == 'TD') && (el.parentNode.parentNode.parentNode.parentNode.className == 'webfx-columnlist-body')) {
		if (((e)?e.shiftKey:window.event.shiftKey) && (this.selectedRows.length) && (this.multiple)) {
			this.selectRange(this.selectedRows[this.selectedRows.length-1], el.parentNode.rowIndex);
		}else {
			this.selectRow(el.parentNode.rowIndex, (e)?e.ctrlKey:window.event.ctrlKey); 
		}
}	
	};


/*
 * Event handler helpers
 */

WebFXColumnList.prototype._checkHeaderOperation = function(el, x) {
	var prev, next, left, right, l, r;

	/*
	 * Checks if the mouse cursor is near the edge of a header
	 * cell, in that case the cursor is set to 'e-resize' and
	 * the operation is set to COL_HEAD_EDGE, if it's over the
	 * header but not near the edge it's set to COL_HEAD_OVER
	 * and finnaly if it's not over the header it's set to
	 * COL_HEAD_NONE. The operation value is used to trigger
	 * column resize, move and sort commands.
	 */

	if ((el.tagName == 'TD') && (el.parentNode.parentNode.parentNode.parentNode.className == 'webfx-columnlist-head')) {
		if (el.tagName == 'IMG') { el = el.parentNode; }

	    prev = el.previousSibling;
	    if(prev!=null&&typeof(prev)!="undefined"&&prev!=""){
	    if(prev){
		    while (prev.nodeType!=1) {
		    	prev=prev.previousSibling;
			}
	    }
	    }
		next = el.nextSibling;
		left = getLeftPos(el);
		right = left + el.offsetWidth;
		l = (x - 5) - left;
		r = right - x;
		if ((l < 5) && (prev)) {
			this._eCont.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [prev, prev.offsetWidth - 5, x, this._eHeadTable.offsetWidth];
		}
		else if (r < 5) {
			this._eCont.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [el, el.offsetWidth - 5, x, this._eHeadTable.offsetWidth];
		}
		else {
			this._eCont.style.cursor = 'default';
			this._headerOper         = COL_HEAD_OVER;
			this._headerData         = [el, el.offsetLeft, x, getLeftPos(this._eHead), el.cellIndex];
	}	}
	else {
		this._eCont.style.cursor = 'default';
		this._headerOper         = COL_HEAD_NONE;
		this._headerData         = null;
}	
};


WebFXColumnList.prototype._sizeBodyAccordingToHeader = function() {
	var aCols = this._eBodyTable.getElementsByTagName('colgroup')[0].getElementsByTagName('col');
	var length = aCols.length;
	var bNoScrollbar = ((this._eBody.offsetWidth - this._eBody.clientWidth) == 2);
	this._eBodyTable.style.width = this._eHeadTable.offsetWidth - ((bNoScrollbar)?2:0) + 'px';
	for (var i = 0; i < length; i++) {
		aCols[i].style.width = (this._eHeadCols[i].offsetWidth - ((document.all)?2:0)) - (((bNoScrollbar) && (i == (length - 1)))?2:0) + 'px';
	}
};


/*
 * void moveColumn(iColumnIndex, iNewColumnIndex)
 * Moves column from givin column index to new index.
 */
WebFXColumnList.prototype._moveColumn = function(iCol, iNew) {
	var i, oParent, oCol, oBefore, aRows, a;

	if (iCol == iNew) { return; }

	/* Move header */
	oCol    = this._eHeadCols[iCol];
	oParent = oCol.parentNode;
	if (iNew == this._cols) {
		oParent.removeChild(oCol);
		oParent.appendChild(oCol);
	}
	else {
		oBefore = this._eHeadCols[iNew];
		oParent.removeChild(oCol);
		oParent.insertBefore(oCol, oBefore);
	}

	/* Move cols */
	oCol    = this._eBodyTable.getElementsByTagName('colgroup')[0].getElementsByTagName('col')[iCol];
	oParent = oCol.parentNode;
	if (iNew == this._cols) {
		oParent.removeChild(oCol);
		oParent.appendChild(oCol);
	}
	else {
		oBefore = this._eBodyTable.getElementsByTagName('colgroup')[0].getElementsByTagName('col')[iNew];
		oParent.removeChild(oCol);
		oParent.insertBefore(oCol, oBefore);
	}

	/* Move cells */
	aRows = this._eBodyTable.tBodies[0].rows;
	this._rows = aRows.length;
	for (i = 0; i < this._rows; i++) {
		oCol    = aRows[i].cells[iCol];
		oParent = aRows[i];

		if (iNew == this._cols) {
			oParent.removeChild(oCol);
			oParent.appendChild(oCol);
		}
		else {
			oBefore = aRows[i].cells[iNew];
			oParent.removeChild(oCol);
			oParent.insertBefore(oCol, oBefore);
	}	}

	/* Reorganize column type and sort data */
	a = new Array();
	oCol = this._aColumnTypes[iCol];
	for (i = 0; i < this._aColumnTypes.length; i++) {
		if (i == iCol) { continue; }
		if (i == iNew) { a.push(oCol); }
		a.push(this._aColumnTypes[i]);
	}
	if (iNew == this._aColumnTypes.length - 1) { a.push(oCol); }
	this._aColumnTypes = a;

	/* If sorted by column, update sortCol property */
	if (iCol == this.sortCol) { this.sortCol = iNew; }
	
};

/*
 * Helper functions
 */

function getLeftPos(_el) {
	var x = 0;
	for (var el = _el; el; el = el.offsetParent) {
		x += el.offsetLeft;
	}
	return x;
}

function getInnerText(el) {
	if (document.all) { return el.innerText; }
	var str = '';
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
	}	}
	return str;
}

function setUserParam(headCols){
		var cols="";
		var widths="";
		for(i = (document.getElementById('selectAll')!=null)?1:0;i<headCols.length;i++){
			
			cols+=headCols[i].id+",";
			widths+=headCols[i].offsetWidth+",";
		}
//		alert(cols+widths);
		cols=cols.substring(0,cols.length-1);
		widths=widths.substring(0,widths.length-1);
		top.sendAsync("/common_0/setUserParam.jsp?path="+pathId+"&cols="+cols+"&widths="+widths);
}

function colSetShow(){
  var colSet=document.getElementById('colSet');
  if(!colSet) return;
  if(colSet.style.display=='none') colSet.style.display='block';
  else colSet.style.display='none';
}
function colFormSubmit(){
  var cForm=document.forms['colForm'];
  if(!cForm) return;
  var eles=cForm.elements['cols'];
  var cols=[];
  for(var i=0;i<eles.length;i++){
    var ele=eles[i];
    if(ele.checked) cols.push(ele.value);
  }
  if(cols.length<2) alert("选定显示列不能少于2个！");
  else{
    showInfo();
    parent.action_bar.location="/common_0/setUserParam.jsp?path="+pathId+"&cols="+cols.join(",")+"&reload=true";
  }
}


function checkBrowser(){
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    //以下进行测试
    if (Sys.ie) return "IE: " + Sys.ie;
    if (Sys.firefox) return "Firefox: " + Sys.firefox;
    if (Sys.chrome) return "Chrome: " + Sys.chrome;
    if (Sys.opera) return "Opera: " + Sys.opera;
    if (Sys.safari) return "Safari: " + Sys.safari;

}

function getCheckBox(){
	var inputs = document.getElementsByTagName("INPUT");
	var boxes=[];
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].type=="checkbox"&&inputs[i].id=="checkbox"){
			boxes.push(inputs[i]);
		}
	}
	return boxes;
}
