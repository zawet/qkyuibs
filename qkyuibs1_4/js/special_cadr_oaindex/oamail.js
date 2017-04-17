// oa通讯录交互
define(function(require,exports) {
	
	var con=require("./oacontacts");
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var rach_run=require("../common_cadr/radio_checkbox1.2");
	
	exports.oamail_run=function(){
	   con.search_box_oc();
	   rach_run.rach_run(function(tt){},function(tt){})
	   cal.OA_calendar_run({indata:false});
	   $(".collect_list_box td").on("click",function(){
			var loadtype=$(this).parent().attr("mail_loadstate");
			if(!$(this).hasClass("noclick")){
				if(loadtype=="check"){
				window.location.href="oa_mail_check.html"; 	
				}
				if(loadtype=="edit"){
				window.location.href="oa_mail_reply.html"; 	
				}
				if(loadtype=="tofile"){
				window.location.href="oa_mail_myfile_info.html"; 	
				}
			}
	   });
	}
	
	exports.oamail_send_run=function(){
		uch.userChoose_run(function(t){},function(t){});
		cal.OA_calendar_run({isshowtime:"hms"});
	}
})