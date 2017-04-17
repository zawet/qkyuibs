// oa通讯录交互
define(function(require,exports) {
	
	var userchoose=require("./userchoose");
	
    //通讯录高级搜索交互开关
	exports.search_box_oc=function(){
		$("#search_box_oc").click(function(){
			$(".search_box").slideToggle(200);
		});
	}
	
	//通讯录群组，人员双选交互
	exports.contacts_run=function(){
		exports.search_box_oc();
		//改变框架交互
		$(".changebox_button").on("click",function(){
			$(".group_changebox").removeClass("open");
			$(".group_changebox[changebox_id='"+$(this).attr("changebox_id")+"']").addClass("open");
		});
		userchoose.userChoose_run(function(t){},function(t){});
	}

})