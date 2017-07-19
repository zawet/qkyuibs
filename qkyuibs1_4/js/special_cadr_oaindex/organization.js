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
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除选中的对象？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		poptips.poptips_run($("body"),{modalid:"Cz",modaltitle:"提示",modalcontent:"是否确认重置用户密码?",buttons:true});
		isSelect("#isTy","#Ty","#tipsOnly");
		isSelect("#isQy","#Qy","#tipsOnly");
		isSelect("#isDel","#delete","#tipsOnly");
		$("#quyu").click(function(){
			comfun.tipsFun("正在同步，请稍后...",function(){
				$("#tipsTb").modal("show");
			});
		})
		
		$("#inputOk").click(function(){
			comfun.tipsFun("正在处理数据，请稍后...",function(){
				
				$("#Dr").modal("hide");
				$("#inputInfo").modal("show");
			});
		})
	}
	
	exports.orgJob_run=function(){          
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"tipsOnly",modaltitle:"提示",modalcontent:"请至少选择一条记录",buttons:true,buttons_name:["确定"]});
		isSelect("#isDel","#delete","#tipsOnly");
	}
	
		
	exports.orgGroup_run=function(){
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除？",buttons:true});
		uch.userChoose_ajaxrun(function(i){},function(t){});
	}
	
	exports.orgOut_run=function(){
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"提示",modalcontent:"是否确认删除？",buttons:true});
		poptips.poptips_run($("body"),{modalid:"noDel",modaltitle:"提示",modalcontent:"该组织下有部门，不能进行删除",buttons:true,buttons_name:["确定"]});
		poptips.poptips_run($("body"),{modalid:"sucDel",modaltitle:"提示",modalcontent:"删除成功!",buttons:true,buttons_name:["确定"]});
	}	
			
	exports.orgOutLock_run=function(){
		rach.rach_run(function(i){},function(t){});	
	}
	exports.orgOutAdd_run=function(){
		rach.rach_run(function(i){},function(t){});
		poptips.poptips_run($("body"),{modalid:"saveSuccess",modaltitle:"提示",modalcontent:"保存成功",buttons:true});
		$("input.neetCheck").keyup(function(){
			showFormError($(this));
		});	
		$("#toSave").click(function(){
			if(CheckForm("#addzz .neetCheck")){
				$("#saveSuccess").modal("show");
			}else{
				$("input.neetCheck").each(function(i){
					showFormError($(this));
				});	
			}
		});
	}
	
	function showFormError(id){
		var thisVal=id.val();
			if(thisVal==""||thisVal=="null"||thisVal=="undefind"){
				id.parents(".form-group").find(".error_color").html("此项不能为空");
			}else{
				id.parents(".form-group").find(".error_color").html("");
			}
	}
	function CheckForm(id){
		var isPass;
		var errorNumber=0;
		$(id).each(function(i) {
			var thisVal=$(this).val();
			var thisId=$(this).attr("id");
			if(thisVal==""||thisVal=="null"||thisVal=="undefind"){
				errorNumber++;
			}
        });
		console.log(errorNumber);
		if(errorNumber<=0){isPass=true;}else{isPass=false;}
		return isPass;
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