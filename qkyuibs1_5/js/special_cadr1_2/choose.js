
/****
人员双项选择模块
****/ 
define(function(require) {
	//var qkydata=require("define/qkydata");//获取默认数据
	var cho_data={
		"tit":"值班人员",
		"tit_left":"学校人员",
		"tit_right":"值班人员",
		"leftli":{
			"安保部":["张某某","李某某","王某某","千某某","陈某某","好大大"],
			"行政部":["王大大","力王","隆则天","千陌阳","上官右侧"],
			},
		"rightli":["陈某某(安保部)"],
	}
	var opts=cho_data;
	$.fn.extend({
        "choosedraw": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				//console.log(opts);
				$(this).find("#choosename").html(opts.tit);
				$(this).find(".cho_titlt.left").html(opts.tit_left);
				$(this).find(".cho_titlt.right").html(opts.tit_right);
				
				$(this).find(".cho_name.left .cho_scroll").html("");
				$(this).find(".cho_name.right .cho_scroll").html("");
				for(var key in opts.leftli ){
					$(this).find(".cho_name.left .cho_scroll").append("<div group='"+key+"'><h5 class='ma0 pb10 pl5'>"+key+"</h5></div><hr class='mt0 mb15'>");
					for( var i=0;i<opts.leftli[key].length;i++){
						$(this).find(".cho_name.left .cho_scroll div[group='"+key+"']").append("<a ingroup='"+key+"'>"+opts.leftli[key][i]+"</a>");
					}
				}
				for( var i=0;i<opts.rightli.length;i++){
					$(this).find(".cho_name.right .cho_scroll").append("<a ingroup='"+opts.rightli[i].split("(")[1].split(")")[0]+"'>"+opts.rightli[i]+"</a>");
				}	
		    })
		}
	});
	//私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    } 
	
	return {
		ChooseDraw:function(id,opt){
			id.choosedraw(opt);
		},
		ChoClick:function(){
			$(".cho_name").on("click","a",function(){$(this).toggleClass("select")});
			$("#cho_join").on("click",function(){
				$(".cho_name.left a.select").each(function(i) {
                    $(this).append("("+$(this).attr("ingroup")+")").clone().prependTo(".cho_name.right .cho_scroll");
                });
				$(".cho_name.left a.select").remove();
			});
			$("#cho_remove").on("click",function(){
				$(".cho_name.right a.select").each(function(i) {
					//if($(this).attr("ingroup"))
					$(this).html($(this).html().split("(")[0]).clone().appendTo(".cho_name.left .cho_scroll div[group='"+$(this).attr("ingroup")+"']");
                });
				$(".cho_name.right a.select").remove();	
			});
			$("#cho_save").on("click",function(){
				var save_data="";
				$(".cho_name.right a").each(function(i) {
					save_data+=$(this).html()+",";
				});
				$(".cadr_cho[is_fo='yes']").val(save_data);
			});
		}
	};
})