
//单选按钮事件

define(function(require) {
	$(".radio-inline").on("click",function(){
		if(!$(this).hasClass("disabled"))
		$(this).toggleClass("select").siblings().removeClass("select");
	});
	$(".checkbox-inline").on("click",function(){
		if(!$(this).hasClass("disabled"))
		$(this).toggleClass("select");
	})

})