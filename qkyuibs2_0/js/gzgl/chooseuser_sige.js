

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
			
			$(".infinite_lia").on("click",function(){
				if($(this).parent().hasClass("lowest")){
				$(".infinite_lia").removeClass("chooseon").find(".radio-qky").removeClass("select");
				$(this).addClass("chooseon").find(".radio-qky").addClass("select");
				}else{
				$(this).find(".wf-icon").toggleClass("r90");
				$(this).next(".infinite_box").slideToggle(200);
				}	
			});

			$("#okeychoose").on("click",function(){
				var choosecont="";
				$(this).parents("#chooseuser").find(".lowest .infinite_lia.chooseon").each(function(i) {
                    choosecont+=$(this).find("span").html();
                });
				thisclick.val(choosecont);
				$('#chooseuser').modal('hide');
			});
			
		});
		

	}
	
});