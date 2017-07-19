// oa通讯录交互
define(function(require,exports) {
	
	var cal=require("./oacalendar");
	var comfun=require("../common_cadr/com_function");
	var dw=require("../common_cadr/dropdown_havevalue");
	var rach=require("../common_cadr/radio_checkbox1.4");
	var poptips=require("../common_cadr/poptips");
	var uch=require("./userchoose");
	
	exports.orgUser_run=function(){
		comfun.search_box_oc();              
		rach.rach_run(function(i){},function(t){});
		
		poptips.poptips_run($("body"),{modalid:"Ty",modaltitle:"提示",modalcontent:"是否确认停用用户？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"Qy",modaltitle:"提示",modalcontent:"是否确认启用用户？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		poptips.poptips_run($("body"),{modalid:"tipsTb",modaltitle:"提示",modalcontent:"同步完成!",buttons:true});
		isSelect("#isTy","#Ty","#tipsOnly");
		isSelect("#isQy","#Qy","#tipsOnly");
		$("#quyu").click(function(){
			comfun.tipsFun("正在同步，请稍后...",function(){
				$("#tipsTb").modal("show");
			});
		})
	}
	
	exports.orgUserTb_run=function(){
		comfun.search_box_oc();              
		rach.rach_run(function(i){},function(t){});
		
		$(".nav-btnDlink .btn").click(function(){
			$(".task").addClass("yc");
			$(this).addClass("active").siblings().removeClass("active");
			$("."+$(this).attr("toShow")).removeClass("yc");
        });
		
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
		poptips.poptips_run($("body"),{modalid:"Zz",modaltitle:"提示",modalcontent:"是否确认终止任务？",buttons:true});
		
		var logss=["从UC接口获取schoolCode=7711300-2的学校信息成功。","获取组织编码=7711300-2的部门架构树成功。","从UC接口中获取学校（编码：7711300-2)的教师信息"];
		var logs=logsFormat(logss);
		poptips.poptips_run($("body"),{modalid:"log",modaltitle:"同步日志",modalcontent:logs,buttons:true,modalsize:"modal-sm"});
		poptips.poptips_run($("body"),{modalid:"restart",modaltitle:"提示",modalcontent:"是否确认重启任务？",buttons:true});
		
		
	}
	
	exports.orgJob_run=function(){          
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		isSelect("#isDel","#delete","#tipsOnly");
	}
	exports.orgOutLock_run=function(){
		rach.rach_run(function(i){},function(t){});
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
	
	function logsFormat(logData){
			var logs="";
			for(var i=0;i<logData.length;i++){
			logs+='<div class="t_l">信息'+(i+1)+'：'+logData[i]+'</div>';
			}	
			return logs;
		}

})