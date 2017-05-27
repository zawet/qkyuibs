

//公用函数

define(function(require,exports) {
	var qkycal=require("../plug-in/qky_calendar/qky_calendar2.0");
	var dw=require("../common_cadr/dropdown_havevalue");
	
	exports.mygzt_run=function(){
		qkycal.qkycalendar({boxid:".qkycalendar_box.default",isshowday:false});
		$("#search_btn").on("click",function(){
			$(".search_box").slideToggle(200);
		})
	}
	
	
});