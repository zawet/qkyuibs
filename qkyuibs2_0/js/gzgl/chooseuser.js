

//公用函数

define(function(require,exports) {
	var data=[];
	var com=require("../common_default/com_function");
	var thisclick;
	
	exports.chooseuser=function(src){
		com.htmlajax(src,function(thishtml){
			
			$("body").append(thishtml);
			
			$("input[use-plug='chooseuser']").on("click",function(){
				thisclick=$(this);
				$('#chooseuser').modal('show');
			});
			
			$(".infinite_lia").not('.wf-icon').on("click",function(){
				if($(this).attr("isc")=="no"){
					choose_on_up($(this),true);
					choose_on_up($(this).parent().find(".infinite_lia"),true);
				}else{
					choose_on_up($(this),false);
					choose_on_up($(this).parent().find(".infinite_lia"),false);
				}
				if(!$(this).parent().parent().hasClass("intop")){
					var temid=$(this).parent().parent();
					while(!temid.hasClass("intop")){
						p_c(temid);
						temid=temid.parent().parent();
					}
				}
			});
			$(".infinite_box .wf-icon").on("click",function(event){
				event.stopPropagation();
				$(this).toggleClass("r90");
				$(this).parent().next(".infinite_box").slideToggle(200);
			});
			$("#okeychoose").on("click",function(){
				var choosecont="";
				$(this).parents("#chooseuser").find(".lowest .infinite_lia.chooseon").each(function(i) {
                    choosecont+=$(this).find("span").html()+",";
                });
				thisclick.val(choosecont);
				$('#chooseuser').modal('hide');
			});
			
		});
		

	}
	function p_c(id){
        var thisanum=id.find(".infinite_lia").length;
        var thischooseonnum=id.find(".infinite_lia.chooseon").length;
        var par_a=id.parent().find(".infinite_lia").first();
        if(thischooseonnum==thisanum){
            choose_on_up(par_a,true);
        }else{
            choose_on_up(par_a,false);
        }
    }
	
	function choose_on_up(id,type){
        if(type){//选中状态
			id.attr("isc","yes").addClass("chooseon").find(".radio-qky").addClass("select");
        }else{//反选状态
            id.attr("isc","no").removeClass("chooseon").find(".radio-qky").removeClass("select");
        }
    }
	
});