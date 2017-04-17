// oa日程渲染交互js模块
define(function(require,exports) {
	var myDate=new Date();
	var toy=myDate.getFullYear()    //获取完整的年份(4位,1970-????)
	var tom=myDate.getMonth()       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate()       //获取当前日(1-31)
	
	var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
	var even = new Array("（单周）","（双周）");  
	
	var cal=require("./oacalendar");
	var uch=require("./userchoose");
	var rach_run=require("../common_cadr/radio_checkbox1.2");
	var poptips=require("../common_cadr/poptips");
	var comfun=require("../common_cadr/com_function");
	
	/*1、subject（标题）
	2、content（内容）
	3、startTime（开始时间）
	4、endTime（结束时间）
	5、address（地址）
	6、shareUsers（共享人员）
	7、scheduleType（日程所属：个人日程、共享日程）
	8、scheduleContentType（日程类型，下拉选择）
	9、REMIND_TYPE（提醒类型，就是下面那个提醒时间）
	10、IS_NEED_SMS（是否发送短信*/
	var weekdata=[
			{
			subject:"月度总结文案",
			content:"月度总结文案编写",
			startTime:"2017-4-10 15:00",
			endTime:"2017-4-10 16:00",
			address:"会议室",
			shareUsers:null,
			scheduleType:false,
			scheduleContentType:"会议"
			},
			{
			subject:"全校动员大会",
			content:"汇报材料准备工作",
			startTime:"2017-4-13 15:00",
			endTime:"2017-4-13 17:00",
			address:"体育馆",
			shareUsers:"全体师生",
			scheduleType:true,
			scheduleContentType:"活动"
			},
			{
			subject:"汇报材料",
			content:"汇报材料准备工作",
			startTime:"2017-4-13 14:00",
			endTime:"2017-4-13 15:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:true,
			scheduleContentType:"会议"
			},
			{
			subject:"跨上午下午的事件",
			content:"汇报材料准备工作",
			startTime:"2017-4-12 10:00",
			endTime:"2017-4-12 15:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:false,
			scheduleContentType:"会议"
			},
			{
			subject:"连续一天的会议",
			content:"汇报材料准备工作",
			startTime:"2017-4-14 14:00",
			endTime:"2017-4-15 14:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:true,
			scheduleContentType:"会议"
			},
			{
			subject:"连续几天的会议",
			content:"汇报材料准备工作",
			startTime:"2017-4-14 14:00",
			endTime:"2017-4-18 16:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:true,
			scheduleContentType:"会议"
			},
			{
			subject:"跨天跨上下午的示例",
			content:"汇报材料准备工作",
			startTime:"2017-4-11 10:00",
			endTime:"2017-4-12 16:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:false,
			scheduleContentType:"会议"
			},
			{
			subject:"纯上午的事件",
			content:"汇报材料准备工作",
			startTime:"2017-4-9 10:00",
			endTime:"2017-4-9 11:00",
			address:"会议室",
			shareUsers:"王老师,李老师",
			scheduleType:false,
			scheduleContentType:"会议"
			},
			
	];

	
	exports.schedule_add_run=function(){
	   cal.OA_calendar_run({
		   isshowtime:"hms",
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		uch.userChoose_ajaxrun(function(t){
			if($("#share_radio").hasClass("select")){$("#shareUsers_box,#share_remind").removeClass("yc");}
			else{$("#shareUsers_box,#share_remind").addClass("yc");}
		},function(t){});
		
		//创建弹层
		poptips.poptips_run($("body"),{modalid:"timesover",modaltitle:"时间冲突",modalcontent:"该时间区间内已有日程，是否仍要保存?",modalcontent_color:"error_color",buttons:true});
		poptips.poptips_run($("body"),{modalid:"save",modaltitle:"保存页面",modalcontent:"日程已经创建成功",buttons:false});
		poptips.poptips_run($("body"),{modalid:"return",modaltitle:"重置页面",modalcontent:"是否清空页面内容？",modalcontent_color:"error_color",buttons:true});
	}
	
	
	exports.schedule_list_run=function(){
		cal.OA_calendar_run({
		   isshowtime:false,
		   clickday:function(id,istime,thisday){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   //choosetimes:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));},
		   calendarhide:function(id,istime){$(id).parent().find("input.inmail_calendar_btn").val(cal.redate($(id),istime));}
		});
		comfun.search_box_oc();
		rach_run.rach_run(function(t){},function(t){});
		poptips.poptips_run($("body"),{modalid:"delete",modaltitle:"删除日程",modalcontent:"是否删除该项日程？",modalcontent_color:"error_color",buttons:true});
	}
	exports.schedule_week_run=function(){
		cal.OA_calendar_run({
			clickday:function(id,istime,thisday){
				var chooseday=thisday.attr("date").split("-");
				goweek(Number(chooseday[0]),Number(chooseday[1]),Number(chooseday[2]),"");
				id.slideUp(200);
				id.parent().find(".inmail_calendar_btn").removeClass("active").attr("isc","no");
			}
		});
		rach_run.rach_run(function(t){},function(t){});
		goweek(toy,tom+1,tod,"");//初始化
		$(".perweek").click(function(){goweek("","","","prv")});
        $(".nextweek").click(function(){goweek("","","","next")});
		$(".thisweek").click(function(){goweek(toy,tom+1,tod,"")});
	}
	//周数跳转和初始化
	function goweek(y,m,d,type){
		//判断输入类型进行年月日的更新
		var thisy,thism,thisd;
		if(y!=''&&m!=''&&d!=''){
			thisy=y;thism=m;thisd=d;	
		}else{
			var y_m=$(".week_s").html().split("-");
			y_m[0]=Number(y_m[0]);
			y_m[1]=Number(y_m[1]);
			y_m[2]=Number(y_m[2]);
			thisy=Number(changeweek(y_m[0],y_m[1],y_m[2],type).split("-")[0]);
			thism=Number(changeweek(y_m[0],y_m[1],y_m[2],type).split("-")[1]);
			thisd=Number(changeweek(y_m[0],y_m[1],y_m[2],type).split("-")[2]);
		}
		
		//头部一周数据的起始信息更新	
		$(".week_s").html(week_seday(thisy,thism,thisd,"s"));
		
		//通过一周开始日期获取整周数据并进行模块渲染
		var sday=week_seday(thisy,thism,thisd,"s");
		 sday=sday.split("-");
		$(".sch_week.table tbody").html(ap_addhtml(sday));
		
		//传进数据
		indata();
	}
	
	function indata(){
		$(".sch_week.table tbody tr").each(function(i) {
            var thisdate=$(this).attr("date");
			
			for( var j=0;j<weekdata.length;j++){
				var sdate=weekdata[j].startTime.split(" ")[0];
				var stimes=weekdata[j].startTime.split(" ")[1];
				var edate=weekdata[j].endTime.split(" ")[0];
				var etimes=weekdata[j].endTime.split(" ")[1];
				var shours=weekdata[j].startTime.split(" ")[1].split(":")[0];
				var ehours=weekdata[j].endTime.split(" ")[1].split(":")[0];
				var hm="";
				var ds = new Date(sdate.split("-")[0],sdate.split("-")[1],sdate.split("-")[2]);
				var de = new Date(edate.split("-")[0],edate.split("-")[1],edate.split("-")[2]);
				var days = Number(Math.abs(de-ds)/86400000);
				var s_edays=getoneweek(Number(sdate.split("-")[0]),Number(sdate.split("-")[1]),Number(sdate.split("-")[2]),days+1);//获取开始与结束时间不在同一天之间的日期

				//开始时间跟结束时间不在同一天的时候
				if(edate!=sdate){
					if($.inArray(thisdate,s_edays)>-1){
					xr_basedata(weekdata[j],j);
					var times_html=""
					if($.inArray(thisdate,s_edays)==0){
						hm=am_pm(shours,ehours);
						times_html="今天"+stimes+"开始";	
					}else if($.inArray(thisdate,s_edays)==days){
						if(ehours>=12)hm="";else hm=".am"; 
						times_html="今天"+etimes+"结束";		
					}else{
						hm="";
						times_html="全天进行";
					}

					$("#sch_listbox_mould .times").html(times_html);
					$(this).find(".sch_listbox"+hm).append($("#sch_listbox_mould").html());
					}
				}else{
					if(sdate==thisdate){
						xr_basedata(weekdata[j],j);
						hm=am_pm(shours,ehours);
						$("#sch_listbox_mould .times").html(stimes+"-"+etimes);
						$(this).find(".sch_listbox"+hm).append($("#sch_listbox_mould").html());
					}
				}
			}
        });
		//统一的悬停效果
		$(".sch_list").hover(function(){
			var isn=$(this).attr("isn");
			$(".sch_list[isn='"+isn+"']").addClass("hover");
		},function(){
			var isn=$(this).attr("isn");
			$(".sch_list[isn='"+isn+"']").removeClass("hover");
		});
	}
	
	//获取当前日的一周日期
	function getoneweek(sy,sm,sd,days){
		var thisweek=[];
		
		var tmpd=sd;var tmpm=sm; var tmpy=sy;
		for(var i=0;i<days;i++){
			if(tmpd>DayNumOfMonth(tmpy,tmpm)){
				tmpd=tmpd-DayNumOfMonth(tmpy,tmpm);
				//console.log(DayNumOfMonth(tmpy,tmpm),tmpd);
				tmpm=tmpm+1;
				if(tmpm>12){
					tmpy=tmpy+1;tmpm=1;
				}else{
					tmpy=tmpy;
				}			
		    }else{
				tmpm=tmpm;tmpy=tmpy;tmpd=tmpd
			}
			thisweek[i]=tmpy+"-"+tmpm+"-"+tmpd;
			tmpd=tmpd+1;
		}
		return thisweek;
	}
	
	
	function am_pm(s,e){
		var hm="";
		if(s>=12&&e>=12)hm=".pm";
		else if(s<12&&e>=12)hm=".pm,.sch_listbox.am";
		else hm=".am";
		return hm;
	}
	
	function xr_basedata(data,j){
		$("#sch_listbox_mould .subject").html(data.subject);
		$("#sch_listbox_mould .sch_list").attr("isn",j)
		//判断是否共享日程
		if(data.scheduleType){
		$("#sch_listbox_mould .sch_icon").html("&#xe607;");
		$("#sch_listbox_mould .sch_list").addClass("group");
		}else{
		$("#sch_listbox_mould .sch_icon").html("&#xe61e;");
		$("#sch_listbox_mould .sch_list").removeClass("group");
		}
	}

	
	//指定一周开始日期改变周数据
	function changeweek(y,m,d,type){
		var thisy,thism,thisd;
		thisy=y;thism=m;thisd=d;
		if(type=="prv"){
					thisd=thisd-7;
					if(thisd<1){
						thism--;	
						if(thism<1){thisy--;thism=12;}else{thisy=thisy;thism=thism;}
						thisd=DayNumOfMonth(thisy,thism)+thisd;	
					}else{
						thisd=thisd;thisy=thisy;thism=thism;
					}
					
		}else if(type=="next"){
					thisd=thisd+7;
					if(thisd>DayNumOfMonth(thisy,thism)){
						thisd=thisd-DayNumOfMonth(thisy,thism);
						thism++;if(thism>12){thisy++;thism=1;}else{thisy=thisy;thism=thism;}	
					}else{
						thisd=thisd;thisy=thisy;thism=thism;
					}		
		}
		return thisy+"-"+thism+"-"+thisd;
	}
	
	//获取指定日当周的起始日期
	function week_seday(y,m,d,se){
		//执行获取一周数据起始日期
		var thisy,thism,thisd;
		thisy=y;thism=m;thisd=d;
		
		var tweek_sd=tweek_sm=tweek_sy=tweek_ed=tweek_em=tweek_ey=0;
		var week=new Date(thisy,thism-1,thisd).getDay();	
		tweek_sd=thisd-week;
		if(tweek_sd<1){
			tweek_sm=thism-1;
			if(tweek_sm<1){tweek_sy=thisy-1;tweek_sm=12;}else{tweek_sy=thisy}
			tweek_sd=DayNumOfMonth(tweek_sy,tweek_sm)+tweek_sd;
		}else{tweek_sm=thism;tweek_sy=thisy;}
		
		tweek_ed=thisd+(6-week);
		if(tweek_ed>DayNumOfMonth(thisy,thism)){
			tweek_ed=tweek_ed-DayNumOfMonth(thisy,thism);
			tweek_em=thism+1;
			if(tweek_em>12){tweek_ey=thisy+1;tweek_em=1;}else{tweek_ey=thisy;}	
		}else{
			tweek_em=thism;tweek_ey=thisy;
	    }
		
		if(se=="s")return tweek_sy+"-"+tweek_sm+"-"+tweek_sd;
		else return tweek_ey+"-"+tweek_em+"-"+tweek_ed;
	}
	
	//叠加安排信息卡片html
	function ap_addhtml(sdate){
		var y=Number(sdate[0]);var m=Number(sdate[1]);var d=Number(sdate[2]);
		var week=getoneweek(y,m,d,7);//通过传进来的一周开始日期获取整周日期
		var allhtml="";
		for(var i=0;i<week.length;i++){
			var fl_cal=week[i].split("-");
			$("#sch_table tr").attr("date",week[i]);
			$("#sch_table").find(".sch_date").html(week[i]);
			$("#sch_table").find(".sch_daysweek").html(thisweek(fl_cal[0],fl_cal[1],fl_cal[2]));
			if(fl_cal[0]==toy&&fl_cal[1]==(tom+1)&&fl_cal[2]==tod){
				$("#sch_table tr").addClass("today");
			}
			allhtml+=$("#sch_table table tbody").html();
			$("#sch_table tr").attr("date","").removeClass("today");
		}
		return  allhtml;
	}

	//获取今天星期几并星期六日返回双周或者单周
	function thisweek(y,m,d){
		var thisweek=new Date(y,m-1,d).getDay();
		var evens=0;
		if(getWeekNumber(y,m,d)%2==0){evens=1;}else{evens=0}
		if(thisweek!=0&&thisweek!=6){
			return dayNames[thisweek]
		}else{
			return dayNames[thisweek]+even[evens];
		}
	}
	
	//获取指定年月的天数
	function DayNumOfMonth(Year,Month){
		var d = new Date(Year,Month,0);
		return d.getDate();
	}
	
	//获取指定日是一年中第几周
	function getWeekNumber(y, m, d) {
		var now = new Date(y, m - 1, d),
			year = now.getFullYear(),
			month = now.getMonth(),
			days = now.getDate();
		//那一天是那一年中的第多少天
	   for (var i = 0; i < month; i++) {
			days += getMonthDays(year, i);
		}
		//那一年第一天是星期几
		var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
		var week = null;
	   if (yearFirstDay == 1) {
			week = Math.ceil(days / yearFirstDay);
	   } else {
		   days -= (7 - yearFirstDay + 1);
		   week = Math.ceil(days / 7) + 1;
	   }
	   return week;
	}
	//获取整年每月天数
	function getMonthDays(year, month) {
     return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
    }
	//判断今年是否闰年
	function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
	
})