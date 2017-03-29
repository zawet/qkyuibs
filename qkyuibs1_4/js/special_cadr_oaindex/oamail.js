// oa通讯录交互
define(function(require,exports) {
	
	var con=require("./oacontacts");
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	
	exports.oamail_run=function(){
	   con.search_box_oc();
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
		uch.userChoose_run();
		cal.OA_calendar_run({isshowtime:"hms"});
	}
})