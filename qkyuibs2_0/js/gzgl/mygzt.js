

//公用函数

define(function(require,exports) {
	var qkycal=require("../plug-in/qky_calendar/qky_calendar2.0");
	var dw=require("../common_cadr/dropdown_havevalue");
	
	exports.mygzt_run=function(){
		qkycal.qkycalendar({boxid:".qkycalendar_box.default",isshowday:false});
		$("#search_btn").on("click",function(){
			$(".search_box").slideToggle(200);
		})
		$(".gzmould_box .btn.gzmould").on("click",function(){
			$(this).addClass("btn-primary").removeClass("btn-default").siblings(".btn").removeClass("btn-primary").addClass("btn-default");
		});
		
		//工资模板自动只显示两行，多了变更多
		var allw=$(".gzmould_box").width();
		var btnw=0;
		var onestpe=true;
		var onerowmorew=0;//第一行排列的时候多出来的宽度
		$(".gzmould_box .btn.gzmould").each(function(i) {
			var thisw=Math.ceil($(this).outerWidth())+15;
            btnw+=thisw;
			
			if(btnw>(allw)&&onestpe){
				var thw=Math.ceil($(this).outerWidth())+15;
				onerowmorew=allw-(btnw-thw);
				btnw+=onerowmorew;
				onestpe=false;
			}
			if(btnw>(allw*2)){
				$(this).hide().addClass("moreshow").prev().hide().addClass("moreshow");
				$(".gzmould_more").removeClass("yc");
				//console.log(btnw,i,"yc");
			};
        });
		$(".gzmould_more").on("click",function(){
			$(this).toggleClass("zd");
			$(".gzmould_box").toggleClass("auto");
			$(".gzmould_box .gzmould.moreshow").toggle();
		});
	}
	
	
});