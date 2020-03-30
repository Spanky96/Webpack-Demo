/**
 * TabView 配置参数
 * 
 * @return
 */

var TabOption = function() {
};
/**
 * TabView 配置参数
 */
TabOption.prototype = {
	containerId :'',// 容器ID,
	pageid :'',// pageId 页面 pageID
	cid :'',// 指定tab的id
	position :top,
	// tab位置，可为top和bottom，默认为top
	action : function(e, p) {
		
	}
};
/**
 * Tab Item 配置参数
 * 
 * @return
 */
var TabItemOption = function() {
}
/**
 * Tab Item 配置参数
 */
TabItemOption.prototype = {
	id :'tab_',// tabId
	title :'',// tab标题
	url :'',// 该tab链接的URL
	isClosed :true,
	clicknum:0
// 该tab是否可以关闭
}
/**
 * @param {}
 *            option option 可选参数 containerId tab 容器ID pageid pageId 页面 pageID
 *            cid cid tab ID
 */
function TabView(option) {
	var tab_context = {
		current :null,
		current_index :0,
		current_page :null
	};
	var op = new TabOption();
	$.extend(op, option);
	var bottom =  "";
	this.id = op.cid;
	this.pid = op.pageid;
	this.tabs = null;
	this.tabContainer = null;
	var tabTemplate = '<li class="index-10" id="{0}">{1}<div><img src="/images_0/046.gif"/></img></div></li>';
	var tabContainerTemplate = '<ul id="{0}"></ul>';
	var page = '<iframe id="{0}" name="{2}" width="100%" frameborder="0" scrolling="no" allowtransparency="true" src=""></iframe>';

	$("#" + op.containerId).append(tabContainerTemplate.replace("{0}", this.id));
	function initTab(el) {
		var tt = $("#"+el.id);
		var theTab = $(tt);
		var tabs = $(theTab).find("li");
		if (tab_context.current == null || tab_context.current != this) {
			$(theTab).click( function() {
				//tab_context.current = this;
				el.clicknum++;
				if(el.clicknum == 2){
				$("#page_"+el.id).attr("src",el.url);
				}
				activate($(this).attr("id"), false);
			});
			var tab_close = $(theTab).find("div").click( function() {
				close(theTab.attr("id"));
			});
		}
	}
	
	function activate(id, isAdd) {
		if (isAdd) {
//			$("#" + id).trigger("click");
		}
		if (tab_context.current_page) {
			tab_context.current_page.hide();
		}
		tab_context.current_page = $("#page_" + id);
		tab_context.current_page.show();
		op.action($("#" + id), tab_context.current_page);
		if(tab_context.current_page.attr("style") == "display: inline;" ||tab_context.current_page.attr("style") == "DISPLAY: inline"){
			$("#"+id).attr("className","index-11").siblings().attr("className","index-10");
		}
	}
	function close(id) {
		var close_page = $("#page_" + id);
		var close_tab = $("#" + id);
		var next = close_tab.next();
			if (next.attr("id")) {
				next.click();
				activate(next.attr("id"), true);
			} else {
				var pre = close_tab.prev();
				if (pre.attr("id")) {
					pre.click();
					activate(pre.attr("id"), true);
				}
			}

		reset(id);
		close_page.remove();
		close_tab.remove();
		
	}
	
	function close2(id) {
		var close_page = $("#page_" + id);
		var close_tab = $("#" + id);

		reset(id);
		close_page.remove();
		close_tab.remove();
		
	}
	
	
	this.init = function() {
		this.tabContainer = $("#" + this.id);
		this.tabs = this.tabContainer.find("li");
		this.tabs.each( function() {
			initTab(this);
		});
	}
	this.add = function(option) {
		var op1 = new TabItemOption();
		$.extend(op1, option);
		if (op1.title.length > 6) {
			op1.title = op1.title.substring(0, 6);
		}
		if (op1.title.length < 4) {
			op1.title = "&nbsp;" + op1.title + "&nbsp;";
		}

//		var pageHtml = page.replace("{0}", "page_" + op1.id).replace("{1}", op1.url).replace("{2}", "page_" + op1.id);
		var pageHtml = page.replace("{0}", "page_" + op1.id).replace("{2}", "page_" + op1.id);
		$("#" + this.pid).append(pageHtml);
		if(op1.id == "iFrameTab1"){
		var html = tabTemplate.replace("{0}", op1.id).replace("{1}", op1.title+"&nbsp;&nbsp;<img class='index-68' id='img"+op1.id+"' src='/general_0/tip.png'/>");
		}else {
		var html = tabTemplate.replace("{0}", op1.id).replace("{1}", op1.title);
		}
		this.tabContainer.append(html);
//		initTab($("#" + op1.id));
		initTab(op1);
		var winHeight = 0;
		if(document.documentElement.clientHeight > document.body.clientHeight) winHeight = document.documentElement.clientHeight;
		else winHeight = document.documentElement.clientHeight;
		$("#page_"+op1.id).attr("height",winHeight-30);
		if (!op1.isClosed) {
			$($("#" + op1.id)).find("img").hide();
		}else{
			document.getElementById(op1.id).oncontextmenu=function(){showMenu(op1.id)};
		}
		this.activate(op1.id);
	}
	this.update = function(option) {
		var id = option.id;
		$("#" + id).find(".tab_title").html(option.title);
		$("#" + id).trigger("click");
		$("#page_" + id).attr("src", option.url);
	}
	this.activate = function(id) {
		$("#" + id).trigger("click");
	}
	this.close = function(id) {
		close(id);
	}
	this.close2 = function(id){
		close2(id);
	}
	this.init();
}
