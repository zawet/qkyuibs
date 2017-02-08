/*2.初始化数据*/
	var myDate=new Date();
	var toy=myDate.getFullYear()    //获取完整的年份(4位,1970-????)
	var tom=myDate.getMonth()       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate()       //获取当前日(1-31)
	
	var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
	var even = new Array("（单周）","（双周）");  

/******************************************日交互*****************************************************/		
	//日数跳转
	function goday(y,m,d,type){
		var thisy,thism,thisd;
		//初始化输入指定日期的数据和样式
		if(y!=''&&m!=''&&d!=''){
			thisy=y;thism=m;thisd=d;
			jl_cadr(thisy,thism,thisd);
		}else{
			//获取保存中的年月日，没有就默认今天
			if($(".year").html()!=''&&$(".moon").html()!=''&&$(".day").html()!=''){
				thisy=$(".year").html();thism=$(".moon").html();thisd=$(".day").html();
			}else{
				thisy=toy;thism=tom;thisd=tod;
			}
			//指定动作后改变年月如
			thisy=changday(thisy,thism,thisd,type).split("-")[0];
			thism=changday(thisy,thism,thisd,type).split("-")[1];
			thisd=changday(thisy,thism,thisd,type).split("-")[2];
			jl_cadr(thisy,thism,thisd,type);//渲染一个新的记录信息
		}
		//新年年月日后进行头部信息更换
		$(".thisweek").html(thisweek(thisy,thism,thisd));
		$(".thisday .year").html(thisy);
		$(".thisday .moon").html(thism);
		$(".thisday .day").html(thisd);	
	}

	//记录样式结构渲染与数据添加
	function jl_cadr(y,m,d,type){ 
		var haveday=new Array();
		var j=0;
		var thisdaykey=y+"-"+m+"-"+d;
		//获取有数据日期的数据
		for(var key in jl_datas){
			haveday[j]=key;
			j++;	
		}
		
		if(type=="prv"){
			var fkey=$(".swiper-slide").eq(0).attr("data").split("-");//获取当前slide中第一个的日期
			var prvdaykey=changday(fkey[0],fkey[1],fkey[2],"prv");//增加一个日期变成第一个日期的前一天
			//如果这个新增的日期有数据进行数据添加
			for(var key in jl_datas){
				if(key==prvdaykey){swiper.prependSlide('<div class="swiper-slide"  data="'+prvdaykey+'">'+jl_addhtml(prvdaykey)+'</div>');}
			}
			//无数据进行空数据样式添加
			if($.inArray(prvdaykey,haveday)==-1){swiper.prependSlide('<div class="swiper-slide" data="'+prvdaykey+'">'+$("#ji_cadr_mb_dist").html()+'</div>');}	
		}
		
		else if(type=="next"){
			var ekey=$(".swiper-slide").eq($(".swiper-slide").length-1).attr("data").split("-");//获取当前slide中最后一个的日期
			var nextdaykey=changday(ekey[0],ekey[1],ekey[2],"next");//增加一个日期变成最后一个日期的后一天
			//如果这个新增的日期有数据进行数据添加
			for(var key in jl_datas){
				if(key==nextdaykey){swiper.appendSlide('<div class="swiper-slide" data="'+nextdaykey+'">'+jl_addhtml(nextdaykey)+'</div>');}
			}
			//无数据进行空数据样式添加
			if($.inArray(nextdaykey,haveday)==-1){swiper.appendSlide('<div class="swiper-slide" data="'+nextdaykey+'">'+$("#ji_cadr_mb_dist").html()+'</div>');}	
		}
		
		else{
			//初始化指定日期的数据和样式框架
			for(var key in jl_datas){
				if(key==thisdaykey){
					$(".mobile_mian .inbox").html(jl_addhtml(thisdaykey)).attr("data",thisdaykey);}
				}
			if($.inArray(thisdaykey,haveday)==-1){$(".mobile_mian .inbox").html($("#ji_cadr_mb_dist").html()).attr("data",thisdaykey);}	
		}
	}
	
	//记录列表的编辑事件
	function jl_edit(id){
		if(id.attr("isc")=="no"){
			id.parents(".mobile_cadr").find(".txt2").each(function(j) {
				var thihtml=$(this).html();
				$(this).html($("#jl_input").html());
				$(this).find(".list_input").val(thihtml);
			});
			id.attr("isc","yes");	
		}else{
			id.parents(".mobile_cadr").find(".txt2").each(function(k) {
				var thival=$(this).find(".list_input").val();
				$(this).html(thival);
			});
			id.attr("isc","no");
		}
	}
	
	//获取指定日的前一天和后一天
	function changday(y,m,d,type){
		var thisy,thism,thisd;
		thisy=y;thism=m;thisd=d;
		
		if(type=="prv"){
			thisd--;
			if(thisd<1){
				thism--;	
				if(thism<1){thisy--;thism=12;}else{thisy=thisy;thism=thism;}
				thisd=DayNumOfMonth(thisy,thism);	
			}else{
				thisd=thisd;thisy=thisy;thism=thism;
			}
		}else if(type=="next"){
			thisd++;
			if(thisd>DayNumOfMonth(thisy,thism)){
				thisd=1;
				thism++;if(thism>12){thisy++;thism=1;}else{thisy=thisy;thism=thism;}
			}else{
				thisd=thisd;thisy=thisy;thism=thism;
			}		
		}
		return(thisy+"-"+thism+"-"+thisd);
	}
	
	//组装记录信息的所有的html
	function jl_addhtml(daykey){
		var allhtml="";
		for(var i=0;i<jl_datas[daykey].length;i++){
			$("#ji_cadr_mb .content").html(jl_datas[daykey][i].content);
			$("#ji_cadr_mb .problem").html(jl_datas[daykey][i].problem);
			$("#ji_cadr_mb .result").html(jl_datas[daykey][i].result);
			$("#ji_cadr_mb .feedback").html(jl_datas[daykey][i].feedback);
			allhtml+=$("#ji_cadr_mb").html();
		}
		return allhtml;
	}
	
/******************************************周交互*****************************************************/	

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
		$(".week_e").html(week_seday(thisy,thism,thisd,"e"));
		
		//通过一周开始日期获取整周数据并进行模块渲染
		var sday=week_seday(thisy,thism,thisd,"s");
		ap_xr(sday,type);
		
		//模块渲染加强，数据添加
		cadr();
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
	
	//渲染DOM树框架基础（今天，昨天，明天的dom框架一开始就初始化）
	function ap_xr(startday,type){
		if(type=="prv"){
			var fkey=$(".swiper-slide").eq(0).attr("weeksd").split("-");
			fkey[0]=Number(fkey[0]); fkey[1]=Number(fkey[1]); fkey[2]=Number(fkey[2]);
			var prvweeksd=changeweek(fkey[0],fkey[1],fkey[2],"prv");
			swiper.prependSlide('<div class="swiper-slide"  weeksd="'+prvweeksd+'">'+ap_addhtml(prvweeksd.split("-"))+'</div>');
		}else if(type=="next"){
			var ekey=$(".swiper-slide").eq($(".swiper-slide").length-1).attr("weeksd").split("-");
			ekey[0]=Number(ekey[0]);ekey[1]=Number(ekey[1]);ekey[2]=Number(ekey[2]);
			var nextweeksd=changeweek(ekey[0],ekey[1],ekey[2],"next");
			swiper.appendSlide('<div class="swiper-slide" weeksd="'+nextweeksd+'">'+ap_addhtml(nextweeksd.split("-"))+'</div>');
		}else{
			$(".mobile_mian .inbox").html(ap_addhtml(startday.split("-"))).attr("weeksd",startday);//渲染今天dom树
		}
	}
	
	//叠加安排信息卡片html
	function ap_addhtml(sdate){
		var y=Number(sdate[0]);var m=Number(sdate[1]);var d=Number(sdate[2]);
		var week=getoneweek(y,m,d);//通过传进来的一周开始日期获取整周日期
		var allhtml="";
		for(var i=0;i<week.length;i++){
			var fl_cal=week[i].split("-");
			$("#cadr_mb .mobile_cadr").attr("cal_date",week[i]);
			$("#cadr_mb").find(".cal").html(week[i]);
			$("#cadr_mb").find(".week").html(thisweek(fl_cal[0],fl_cal[1],fl_cal[2]));
			allhtml+=$("#cadr_mb").html();
			$("#cadr_mb .mobile_cadr").attr("cal_date","");
		}
		return  allhtml;
	}
	
	//获取当前日的一周日期
	function getoneweek(sy,sm,sd){
		var thisweek=[];
		for(var i=0;i<7;i++){
			var tmpd=tmpm=tmpy=0;
			tmpd=sd+i;
			if(tmpd>DayNumOfMonth(sy,sm)){
			tmpm=sm+1;
			if(tmpm>12){tmpy=sy+1;tmpm=1}else{tmpy=sy}
			tmpd=tmpd-DayNumOfMonth(sy,sm);
		    }else{tmpm=sm;tmpy=sy;tmpd=tmpd}
			thisweek[i]=tmpy+"-"+tmpm+"-"+tmpd;
		}
		return thisweek;
	}
	
	//卡添加数据和交互事件
	function cadr(){
		//每个slide的开头卡片添加样式
		$(".swiper-slide").each(function(j) {
            $(this).find(".mobile_cadr").eq(0).addClass("mtt10")
        });
		
		$(".mobile_cadr").each(function(i) {
			//样式加强
			var fl_cal=$(this).find(".cal").html().split("-");
            if(fl_cal[0]==toy&&fl_cal[1]==(tom+1)&&fl_cal[2]==tod){
				$(this).addClass("today").append($("#today_mb").html());
				$(this).next(".mobile_cadr").first().addClass("mt10").removeClass("die");
			}
			
			//添加数据
			var thiscal=$(this).attr("cal_date");
			for(var key in zb_data){
				if(key==thiscal){
					$(this).find(".zb").html(zb_data[key].zb);
					$(this).find(".jl").html(zb_data[key].jl);
					if(zb_data[key].isjl){$(this).find(".btn").removeClass("btn-default").addClass("btn-success").html("已记录");$(this).addClass("have");}
					else{$(this).find(".btn").addClass("btn-default").removeClass("btn-success").html("未记录");$(this).removeClass("have");}	
				}
			}
			
			//点击交互事件
			$(this).click(function(){
				if(i!=$(".mobile_mian .mobile_cadr").length-1){
					$(this).next(".mobile_cadr").first().removeClass("die").addClass("mt10");
					$(this).next(".mobile_cadr").first().siblings().removeClass("mt10").addClass("die");
				}else{
					$(".mobile_cadr").addClass("die").removeClass("mt10");
				}
			});
        });	
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