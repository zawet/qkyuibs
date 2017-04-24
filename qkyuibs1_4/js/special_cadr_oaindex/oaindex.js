// oa首页交互
define(function(require,exports) {

	var oacal=require("./oacalendar");//链接日历插件，获取日历插件暴露的执行体方法
	
	//主导航（头部导航点击）事件
	exports.windows_qkynav=function(){
		$("#qkynav .nav li").on("click",function(){
			if(!$(this).hasClass("dropdown")){
			//改变自身样式颜色先
			$(this).addClass("active").siblings().removeClass("active");
			//获取id和名字
			var mould_id=$(this).find("a").attr("id");
			var mould_name=$(this).find("a").text();
			//获取已有的模板id
			var mouldids=$(".windows_mian").map(function(){return $(this).attr("mould_id");}).get();
			//判断已经增加过的模板id就不进行再次添加
			if($.inArray(mould_id, mouldids)==-1){
				$("#windows_mian_mould .windows_mian").attr("mould_id",mould_id);
				$("#windows_bar_a_mould a").attr("bar_id",mould_id);
				$("#windows_bar_a_mould span").html(mould_name);
				$(".windows_bar").before($("#windows_mian_mould").html()).append($("#windows_bar_a_mould").html());
				$("#windows_mian_mould .windows_mian").attr("mould_id","");
				$("#windows_bar_a_mould a").attr("bar_id","");
				//对应模板叠加对于id的模块
				$(".windows_mian[mould_id='"+mould_id+"']").find(".windows_mian_left .scrrol_box").html(
					$("#"+mould_id+"_cadr").find(".left_cadr").html()
				);
				$(".windows_mian[mould_id='"+mould_id+"']").find(".windows_mian_right").html(
					$("#"+mould_id+"_cadr").find(".right_cadr").html()
				);
			}
			//对应的窗口和窗口标签开启
			$(".windows_bar a").removeClass("active");
			$(".windows_bar a[bar_id='"+mould_id+"']").addClass("active");
			$(".windows_mian").removeClass("open");
			$(".windows_mian[mould_id='"+mould_id+"']").addClass("open");
			$(".windows_mian[mould_id='"+mould_id+"'] .right_box.open iframe").attr("src",$("#"+$(".windows_mian[mould_id='"+mould_id+"'] .right_box.open").attr("box_id")).attr("ifsrc"));//默认打开第一个右窗的页面
			//窗口标签点击事件添加
			windows_bar();
			menu_list_item();
			}
			$(this).siblings().removeClass("active");
		});    
	}
	//窗口标签开关
	function windows_bar(){
		$(".windows_bar a").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".windows_mian").removeClass("open");
			$(".windows_mian[mould_id='"+$(this).attr("bar_id")+"']").addClass("open");
			$("#qkynav .nav li").removeClass("active");
			$("#"+$(this).attr("bar_id")).parent().addClass("active");
		});
		$(".windows_bar a i").on("click",function(){
			var delid=$(this).parent().attr("bar_id");
			if($(this).parent().hasClass("active")){
			$(".windows_bar a[bar_id='oa_index']").addClass("active");
			$(".windows_mian[mould_id='oa_index']").addClass("open");
			$("#"+delid).parent().removeClass("active");
			$("#oa_index").parent().addClass("active");
			}
			$(".windows_mian[mould_id='"+delid+"']").remove();
			$(this).parent().remove();
		})
	}
	
	//首页交互事件
	
	
	function navtabs(){
		$(".nav.nav-tabs li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(this).parents(".qkycadr").find(".table").removeClass("open");
			$(this).parents(".qkycadr").find(".table").eq($(this).index()).addClass("open");
		})
	}
	exports.right_boxoc=function(){
		$(".right_button").on("click",function(){
			$(this).parent().addClass("yc");
			$(this).parent().siblings().removeClass("yc");
			$(this).parents(".windows_mian").find(".right_box").removeClass("open");
			$(".windows_mian .right_box[box_id='"+$(this).attr("id")+"']").addClass("open");
		})
	}
	exports.tips_create=function(){
		$("#tips_create").focusout(function(){
			var thisval=$(this).val();
			if(isNull(thisval)!="kong"){
			$("#tips_box_label label span").html(thisval);
			$(".tips_box").append($("#tips_box_label").html());
			tips_close();
			}
		});
	}
	function tips_close(){
		$(".tips_box label i").on("click",function(){
			$(this).parent().remove();
		});
	}
	
	
	
	
	//本域公用函数
	function menu_list_item(){
		$(".menu_list_item").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(this).parents(".windows_mian").find(".right_box").removeClass("open");
			$(".windows_mian .right_box[box_id='"+$(this).attr("id")+"']").addClass("open").find("iframe").attr("src",$(this).attr("ifsrc"));
			//$('iframe[name="'+$(this).attr("id")+'"]').attr('src',$('iframe[name="'+$(this).attr("id")+'"]').attr('src'));
		})
	}
	
	function isNull(data){ 
    	return (data == "" || data == undefined || data == null) ? "kong" : data; 
	}	
	
	//暴露执行体
	exports.OA_index_implement=function(){
		/**首页交互**/
		oacal.OA_calendar_run({indata:true,boxid:".OA_calendar_box"});//渲染和执行日历插件
		navtabs();//首页表格导航条开关
	}
	

})