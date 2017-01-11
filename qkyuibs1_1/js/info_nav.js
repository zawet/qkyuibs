/****
特殊模块，信息导航交互
****/ 

define(function(require,exports) {
	//信息导航列点击
	$(".info_nav").on("click","a",function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".info_main").hide();
		$("."+$(this).attr("id")).slideDown(200);
	});	
	
	//保存并继续点击
	$(".info_next").on("click",function(){
		$(".info_main").hide();
		var nextClass=$(this).parents(".info_main").next(".info_main").first();
		var infoid=nextClass.attr("infoid");//获取下一个信息框的id
		nextClass.slideDown(200);
		$(".info_nav #"+infoid).addClass("active").siblings().removeClass("active");
	});
});