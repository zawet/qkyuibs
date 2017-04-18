// oa日程渲染交互js模块
define(function(require,exports) {
	
	
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var rach_run=require("../common_cadr/radio_checkbox1.2");
	var poptips=require("../common_cadr/poptips");
	var comfun=require("../common_cadr/com_function");
	
	
	exports.message_run=function(){
	   cal.OA_calendar_run({isshowtime:"hms"});
		uch.userChoose_ajaxrun(function(t){},function(t){});
		
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"send",modaltitle:"发送提示",modalcontent:"短信发送成功，用户可以在<a>已发短信</a>中查看",modalcontent_color:"",buttons:false});
		poptips.poptips_run($("body"),{modalid:"return",modaltitle:"重置页面",modalcontent:"是否清空页面内容？",modalcontent_color:"error_color",buttons:true});
	}
	exports.message_sendrun=function(){
		comfun.search_box_oc();
	   cal.OA_calendar_run({
		   isshowtime:"hms",
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		rach_run.rach_run(function(t){},function(t){});
		
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"delete_message",modaltitle:"删除短信",modalcontent:"是否删除选择的短信？",modalcontent_color:"error_color",buttons:true});
	}
	exports.message_inforun=function(){
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"delete_message",modaltitle:"删除短信",modalcontent:"是否删除选择的短信？",modalcontent_color:"error_color",buttons:true});
	}
	
})