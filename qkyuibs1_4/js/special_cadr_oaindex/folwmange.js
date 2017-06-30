// oa通讯录交互
define(function(require,exports) {
	
	var cal=require("./oacalendar");
	var comfun=require("../common_cadr/com_function");
	var dw=require("../common_cadr/dropdown_havevalue");
	var rach=require("../common_cadr/radio_checkbox1.4");
	var poptips=require("../common_cadr/poptips");
	var uch=require("./userchoose");
/*表单模块*/
	exports.flowmange_mbgl_run=function(){
		comfun.search_box_oc();
		cal.OA_calendar_run({
		   boxid:".inmail_calendar_box.one",
		   cilckid:".inmail_calendar_btn.s",
		   drawid:".OA_calendar.ss",

		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		
		cal.OA_calendar_run({
		   boxid:".inmail_calendar_box.two",
		   cilckid:".inmail_calendar_btn.e",
		   drawid:".OA_calendar.ee",
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"删除数据",modalcontent:"是否删除选中的数据？",modalcontent_color:"error_color",buttons:true});
		comfun.mask_poptips(".tofabu","发布成功");
		comfun.mask_poptips(".erfabu","发布失败，请检查表单模板信息是否完整");
		create_moule("#create_moule","#table_mould");
		
	}
	/*表单模块添加/编辑*/
	exports.flowmange_mbgladd_run=function(){
		poptips.poptips_run($("body"),{
			modalid:"backtips",
			modaltitle:"退出提示",
			modalcontent:"是否保存表单模板？",
			modalcontent_color:"mian_color",
		    okeybutton_click:function(thisok){
				$("#backtips").modal("hide");
				comfun.tips("保存成功");
		    }
		});
		poptips.poptips_run($("body"),{
			modalid:"datacheck",
			modaltitle:"数据验证",
			modalcontent:"表单模板不能为空",
			modalcontent_color:"error_color",
			buttons_name:["确定"],
			okeybutton_click:function(thisok){
				$("#datacheck").modal("hide");
			}
		});
	}
	
	exports.flowmange_gzldy_run=function(){
		dw.havevalue();
		comfun.search_box_oc();
		uch.userChoose_ajaxrun(function(t){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"删除数据",modalcontent:"是否删除选中的数据？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"li_delete",modaltitle:"删除数据",modalcontent:"是否删除此数据？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"im_delete",modaltitle:"强制删除数据",modalcontent:"是否强制删除此数据？",modalcontent_color:"error_color",buttons:true});
		create_moule(".create_moule","#table_mould");
		
	}
	exports.flowmange_lcfl_run=function(){
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"删除数据",modalcontent:"是否删除选中的数据？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"li_delete",modaltitle:"删除数据",modalcontent:"是否删除此数据？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"save",modaltitle:"保存数据",modalcontent:"是否保存表单内的填写信息？",modalcontent_color:"mian_color",buttons:true,
		okeybutton_click:function(thisok){
			$("#save").modal("hide");
			$("#add_lcfl,#edit_lcfl").modal("hide");
			comfun.tips("保存成功");
		}
		});
	}
	exports.flowmange_gwzhgl_run=function(){
		comfun.search_box_oc();
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"删除数据",modalcontent:"是否删除选中的数据？",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"li_delete",modaltitle:"删除数据",modalcontent:"是否删除此数据？",modalcontent_color:"error_color",buttons:true});
		
		poptips.poptips_run($("body"),{modalid:"save",modaltitle:"保存数据",modalcontent:"是否保存表单内的填写信息？",modalcontent_color:"mian_color",buttons:true,
		okeybutton_click:function(thisok){
			$("#save").modal("hide");
			$("#add_gwmb,#edit_gwmb,#add_gwzh,#edit_gwzh").modal("hide");
			comfun.tips("保存成功");
		}
		});
		//comfun.mask_poptips("#save .okeybtn","保存成功");
	}
	
	function create_moule(btnid,mouldid){
		$("body").on("click",btnid,function(){
			var xh=Number($(this).parents("tr").find(".xh").html())+1;
			$(mouldid).find(".xh").html(xh);
			$(mouldid).find(".checkbox-qky").attr("lj","mail_list");
			$(this).parents("tbody").prepend($(mouldid+" table tbody").html());
			$(mouldid).find(".checkbox-qky").attr("lj","");
			comfun.mask_poptips(".tofabu","发布成功");	
		})
	}

	
})