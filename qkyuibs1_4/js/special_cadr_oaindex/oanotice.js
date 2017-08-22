// oa通讯录交互
define(function(require,exports) {
	
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var rach_run=require("../common_cadr/radio_checkbox1.2");
	var poptips=require("../common_cadr/poptips");
	var comfun=require("../common_cadr/com_function");
	
	exports.oanotice_send_run=function(){
		uch.userChoose_run(function(t){},function(t){});
		cal.OA_calendar_run({isshowtime:"hms"});
	}
	
	exports.oanotice_lirun=function(){
		comfun.search_box_oc();
		cal.OA_calendar_run({
		   boxid:".inmail_calendar_box.one",
		   cilckid:".inmail_calendar_btn.s",
		   drawid:".OA_calendar.ss",
		   isinput:true,
		   isshowtime:"hms",
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		
		cal.OA_calendar_run({
		   boxid:".inmail_calendar_box.two",
		   cilckid:".inmail_calendar_btn.e",
		   drawid:".OA_calendar.ee",
		   isinput:true,
		   isshowtime:"hms",
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		rach_run.rach_run(function(t){},function(t){});
		
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除所选记录？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"recoverySuss",modaltitle:"提示",modalcontent:"回收成功！",modalcontent_color:"mian_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"recovery",modaltitle:"提示",modalcontent:"是否确认收回公告？",modalcontent_color:"error_color",buttons:true,okeybutton_click:function(){
			$("#recoverySuss").modal("show");
			$("#recovery").modal("hide");
			
		}});
		poptips.poptips_run($("body"),{modalid:"deleteSige",modaltitle:"提示",modalcontent:"是否确认删除？",modalcontent_color:"error_color",buttons:true});
		isSelect("#isDel","#delete","#tipsOnly");
	}
	
	exports.oanotice_lirun2=function(){
		comfun.search_box_oc();
		rach_run.rach_run(function(t){},function(t){});
		
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		poptips.poptips_run($("body"),{modalid:"tips",modaltitle:"提示",modalcontent:"是否确认再次提醒所选记录？",modalcontent_color:"",buttons:true});
		poptips.poptips_run($("body"),{modalid:"tipsSige",modaltitle:"提示",modalcontent:"是否确认再次提醒？",modalcontent_color:"",buttons:true});
		isSelect("#isTip","#tips","#tipsOnly");
	}
	
	function isSelect(id,yId,nId){
		$(id).click(function(){
			if($(".checkbox-qky.child.select").length>0){
				$(yId).modal("show");
			}else{
				$(nId).modal("show");
			}
		});
	}
})