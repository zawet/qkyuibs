// oa通讯录交互
define(function(require,exports) {
	
	var con=require("./oacontacts");
	var cal=require("./oacalendar");
	
	exports.oamail_run=function(){
	   con.search_box_oc();
	   cal.OA_calendar_implement(false,function(clickday){
			//日数点击后，可自行再次添加执行函数，已经把当前点击的日数提来作为参数了
			clickday.parents(".inmail_calendar_box").find(".inmail_calendar_dateshow").html(clickday.attr("date"));//这里执行的是，在图标旁边加上选中日期显示
	   });
	   
	   
	   $(".collect_list_box td").on("click",function(){
			var loadtype=$(this).parent().attr("mail_loadstate");
			if(!$(this).hasClass("noclick")){
				if(loadtype=="check"){
				window.location.href="oa_mail_check.html?id="+$(this).parent().attr("mail_listid"); 	
				}
				if(loadtype=="edit"){
				window.location.href="oa_mail_send.html?id="+$(this).parent().attr("mail_listid"); 	
				}
			}
	   });
		
	}
   

})