// oa通讯录交互
define(function(require,exports) {
	
	var con=require("./oacontacts");
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var comfun=require("../common_cadr/com_function");
	var dw=require("../common_cadr/dropdown_havevalue");
	
	exports.oadocument_run=function(){
	    dist_onepage();
		onepage(); 
		twopage();
		uch.userChoose_ajaxrun();
	}
	exports.oadocument_list_run=function(hasuch){
		dw.havevalue();
		onepage(); 
		comfun.search_box_oc();
		if(hasuch){uch.userChoose_ajaxrun();}
	}
	
	function twopage(){
		$(".twopage_btn").on("click",function(){
		 	$(".twopage").removeClass("open");
			$(".twopage."+$(this).attr("pageid")).addClass("open");
		 });
	}
	function onepage(){
		$(".doc_nav li").on("click","a",function(){
		 	$(this).parent().addClass("active").siblings().removeClass("active");
			$(".onepage").removeClass("open");
			$(".onepage."+$(this).attr("pid")).addClass("open");
		 });
	}
	function dist_onepage(){
		var url = getQueryString("pid");
		 if(url!=null){
			 $(".onepage").removeClass("open");
			 $(".onepage."+url).addClass("open");
			 $(".doc_nav li").removeClass("active");
			 $(".doc_nav li a[pid='"+url+"']").parent().addClass("active");
		 }else{
			 $(".onepage").eq(0).addClass("open");
			 $(".doc_nav li").eq(0).addClass("active");
		 }
	}
	
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	
	
})