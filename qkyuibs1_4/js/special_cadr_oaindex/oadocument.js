// oa通讯录交互
define(function(require,exports) {
	
	var con=require("./oacontacts");
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var comfun=require("../common_cadr/com_function");
	var dw=require("../common_cadr/dropdown_havevalue");
	
	exports.oadocument_run=function(){
	    dist_onepage();
		onepage(); 
		twopage();
		uch.userChoose_ajaxrun(function(t){},function(t){});
		following_view();
	}
	exports.oadocument_list_run=function(hasuch){
		dw.havevalue();
		onepage(); 
		comfun.search_box_oc();
		if(hasuch){uch.userChoose_ajaxrun(function(t){},function(t){});}
	}
	
	function twopage(){
		$(".twopage_btn").on("click",function(){
		 	$(".twopage").removeClass("open");
			$(".twopage."+$(this).attr("pageid")).addClass("open");
		 });
	}
	function onepage(){
		$(".doc_nav li").on("click","a",function(){
		 	$(this).parent().addClass("active").siblings().removeClass("active");
			$(".onepage").removeClass("open");
			$(".onepage."+$(this).attr("pid")).addClass("open");
		 });
	}
	function dist_onepage(){
		var url = getQueryString("pid");
		 if(url!=null){
			 $(".onepage").removeClass("open");
			 $(".onepage."+url).addClass("open");
			 $(".doc_nav li").removeClass("active");
			 $(".doc_nav li a[pid='"+url+"']").parent().addClass("active");
		 }else{
			 $(".onepage").eq(0).addClass("open");
			 $(".doc_nav li").eq(0).addClass("active");
		 }
	}
	
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	function following_view(){
		 var following_viewdata=[
		 {txt:"[拟办]-王老师",time:"2017-05-15 10:39:07",state:"",stateicon:"&#xe759;"},
		 {txt:"[部门审批]-李主任",time:"2017-05-15 10:39:07",state:"",stateicon:"&#xe759;"},
		 {txt:"[领导审批]-王校长",time:"",state:"wait",stateicon:"&#xe617;"}
		 ]
		 
		$(".showtable").on("click",function(){
			$(".following_table").slideToggle(100);
		});
		$(".showtype").on("click",function(){
			$(this).parent().parent().addClass("yc");
			$("."+$(this).attr("type")).removeClass("yc")
		});
		
		/*总宽度*/  
	 	var ulw=Math.floor((($("body").outerWidth(true)-96)*88)/100); 
		/*一个半list宽度*/
		var liw=$(".following_viewinfo").outerWidth(true)+45;
		/*一行有多少个一个半list*/
		var linum_ban=Math.floor(ulw/liw);
		/*一行能放list的最大数*/
		var linum=linum_ban*2;
		/*所有list能排多少行*/
		var lirow=Math.ceil(following_viewdata.length/linum);
		for(var i=0;i<following_viewdata.length;i++){
			$("#following_viewlist_mould .onetxt").html(following_viewdata[i].txt);
			$("#following_viewlist_mould .twotime").html(following_viewdata[i].time);
			$("#following_viewlist_mould .stateicon").html(following_viewdata[i].stateicon);
			$("#following_viewlist_mould .following_viewlist").addClass(following_viewdata[i].state);

			if(i%2!=0){$("#following_viewlist_mould .following_viewlist").addClass("down")}
			$(".following_viewul").append($("#following_viewlist_mould").html());
		
			$("#following_viewlist_mould .onetxt").html("");
			$("#following_viewlist_mould .twotime").html("");
			$("#following_viewlist_mould .stateicon").html("");
			$("#following_viewlist_mould .following_viewlist").removeClass(following_viewdata[i].state).removeClass("down").removeClass("right");
			
			
			$("#following_viewlist_s_mould .onetxt").html(following_viewdata[i].txt);
			$("#following_viewlist_s_mould .twotime").html(following_viewdata[i].time);
			$("#following_viewlist_s_mould .stateicon").html(following_viewdata[i].stateicon);
			$("#following_viewlist_s_mould .following_viewlist_s").addClass(following_viewdata[i].state);
			
			$(".following_viewul_s").append($("#following_viewlist_s_mould").html());
			
			$("#following_viewlist_s_mould .onetxt").html("");
			$("#following_viewlist_s_mould .twotime").html("");
			$("#following_viewlist_s_mould .stateicon").html("");
			$("#following_viewlist_s_mould .following_viewlist_s").removeClass(following_viewdata[i].state);
		}
	 }
	
	
})