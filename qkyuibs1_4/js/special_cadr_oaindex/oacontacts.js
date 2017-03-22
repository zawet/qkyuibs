// oa通讯录交互
define(function(require,exports) {
	
	var activeModal="";//缓存哪个元素点击弹窗的
	
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
		
		//部门，群组切换交互
		$(".userChoose_cont .nav-tabs li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(this).parent().next(".userChoose_ul").find(".userChoose_list").removeClass("open");
			$(this).parent().next(".userChoose_ul").find(".userChoose_list").eq($(this).index()).addClass("open");
		});
		
		//对应的复选框进行人员选进选区
		$(".userChoose_name .checkbox-qky ,.checkbox-qky.parent[lj='userchoose']").on("click",function(){
			userChoose_on();
		});
		
		userChoose_out("all");
		
		
		$(".showModal").on("click",function(){
			$("#groupuser_choose").modal("show");
			activeModal=$(this).attr("showid");
	    });
		userChoose_submit();
		
	}
	
	
	//人员选择进入选区
	function userChoose_on(){
		$(".userchoose_on").html("");//清空dom树
	 	$(".userChoose_name .checkbox-qky.select").each(function(i) {
            var thistext=$(this).find("span").text();//获取自生文字
			$("#userchoose_on_mould span").html(thistext);//给模板赋值
			$("#userchoose_on_mould a").attr("chooseid",$(this).index());//给模板附属加过去的选择id
			$(".userchoose_on").append($("#userchoose_on_mould").html());//把模板组装到dom树
        });
		$("#userNumber").html($(".userchoose_on a").length);//更新选中区的数量
		userChoose_out("sige");//给选中区的人员列表加上退出选区的事件
	 }
	 
	 //人员选择退出选区
	 function userChoose_out(type){
		if(type=="all"){
			$("#userchoose_allout").click(function(){
				$(".userchoose_on").html("");
				$(".userChoose_name .checkbox-qky").removeClass("select");
				$(".checkbox-qky.parent[lj='userchoose']").removeClass("select").attr("isc","no");
				$("#userNumber").html($(".userchoose_on a").length);//更新选中区的数量
			});
		}
		if(type=="sige"){
			$(".userchoose_on a i").on("click",function(){
				var removeid=$(this).parent().attr("chooseid");//获取退出选区后要移除的对应人员id
				$(".userChoose_name .checkbox-qky").eq(removeid).removeClass("select");//对应人员进行样式原始化
				child_in_parent($(".userChoose_name .checkbox-qky"));//影响父类
				$(this).parent().remove();//移除自身
				$("#userNumber").html($(".userchoose_on a").length);//更新选中区的数量
			});
		}
	 }
	 
	 //复选框的子类改变影响父类
	 function child_in_parent(id){
		var key=id.attr("lj");
		var childnumber=$(".checkbox-qky.child[lj="+key+"]").length;
		var selectnumber=$(".checkbox-qky.select.child[lj="+key+"]").length;
		if(selectnumber<childnumber){
			$(".checkbox-qky.parent[lj="+key+"]").removeClass("select").attr("isc","no");
		}
		if(selectnumber>=childnumber){
			$(".checkbox-qky.parent[lj="+key+"]").addClass("select").attr("isc","yes");
		}
	}
	
	//点击确认选择按钮的事件
	userChoose_submit=function (id){
		$("#userChoose_submit").on("click",function(){
			$('#groupuser_choose').modal('hide');
			var userdata=[];
			userdata=get_userChoose();
			var usertext="";
			for(var i=0;i<userdata.length;i++){
				if(activeModal!="tolist"){
					usertext+=userdata[i]+",";	
				}else{
					$("#userlist_mould tbody tr td").eq(0).html(userdata[i]);
					$("#userlist tbody").append($("#userlist_mould tbody").html());
				}
			}
			$("input[showid='"+activeModal+"']").val(usertext);
		})
	}
	
	//获取选区里的所有人员
	get_userChoose=function (){
		var userChoose_on=[];
		$(".userchoose_on a").each(function(i) {
            userChoose_on[i]=$(this).find("span").html();
        });
		return userChoose_on;
	}
	
	
	
	
})