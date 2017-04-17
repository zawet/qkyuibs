// oa首页日历渲染
define(function(require,exports) {
	var myDate = new Date();
		var toy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var tom=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
		var tod=myDate.getDate();        //获取当前日(1-31)
		var hour = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
		var minute = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
		var second = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
		
		var comfun=require("../common_cadr/com_function");
		
		var datas={
		"2017-3-1":[" 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"],
		"2017-3-3":["08：00 例会","10：00 A项目会议","14：00  B项目会议","15：30  C项目会议","17：30  D项目会议"],
		"2017-3-4":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-8":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-16":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-10":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-29":[" 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"]
		}
		
		//日历默认参数
		var opts={
			 	"drawid":".OA_calendar",
				"cilckid":".inmail_calendar_btn",
				"hoverid":".inmail_calendar_btn_hover",
				"indata":false,
				"isshowtime":false,
				"clickday":function(id,istime,thisday){//日数点击，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
					$(id).find(".OA_calendar_ondate").html(exports.redate($(id),istime));
			    },
				"choosetimes":function(id,istime){//时间转换，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
					$(id).find(".OA_calendar_ondate").html(exports.redate($(id),istime));
				},
				"calendarhide":function(id,istime){//日历收起后，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
					$(id).find(".OA_calendar_ondate").html(exports.redate($(id),istime));
				}
		}

		
		//暴露执行体
		exports.OA_calendar_run =function(options){
			 
			 if (!isValid(options))
                return this;
			 opts = $.extend({}, opts, options);//有传值进来后，进行对默认覆盖
			 
			 comfun.htmlajax("../mould/calendar_mould.html",function(calhtml){//异步过来html主体
					$(opts.drawid).html(calhtml);
					//创建日历表格和左右换月执行事件
					OA_calendar_opt(toy,tom+1,tod,$(opts.drawid),opts.indata);
					 $(".OA_calendar_chooose_button").on("click",function(){
						if($(this).hasClass("perv")) OA_calendar_choose($(this),"perv",opts.indata);
						if($(this).hasClass("next")) OA_calendar_choose($(this),"next",opts.indata);
					 });
					 if(comfun.isNull(opts.isshowtime)!="kong"){
						$("."+opts.isshowtime).show();
						OA_calendar_times(hour,minute,second);
					 }
					 //在不传值的情况下，有点击元素才出来日历
					 if(!opts.indata){
						 $(opts.cilckid+","+opts.hoverid).attr("isc","no");
						 var huncundrawid= opts.drawid;
						 $(document).on("click",":not('.inmail_calendar_box')",function(){
								$(".OA_calendar").slideUp(200);
								$(opts.cilckid).removeClass("active").attr("isc","no");
								$(opts.hoverid).attr("isc","no");
							  })
							  $(".inmail_calendar_box").on("click",function(event){
								event.stopPropagation();
							  });	
						 
						  $(opts.cilckid).on("click",function(){
							  $(opts.cilckid).not($(this)).removeClass("active").attr("isc","no").next(".inmail_calendar").slideUp(0);
							  if($(this).attr("isc")=="no"){
								  $(this).addClass("active").next(".inmail_calendar").slideDown(100);
								  $(this).attr("isc","yes");
								  huncundrawid=$(this).next(opts.drawid);
							  }else{
								  $(this).removeClass("active").next(".inmail_calendar").slideUp(100,function(){opts.calendarhide($(this).next(opts.drawid),opts.isshowtime)});
								  $(this).attr("isc","no");
								  huncundrawid=opts.drawid;
							  }					  
						  });
						  
						  $(opts.hoverid).hover(function(){
							 $(opts.hoverid).not($(this)).removeClass("active").attr("isc","no").next(".inmail_calendar").slideUp(0);
							 if($(this).attr("isc")=="no"){
							  $(this).next(".inmail_calendar").slideDown(100);
							  $(this).attr("isc","yes");
							  huncundrawid=$(this).next(opts.drawid);
							  }else{
							  $(this).next(".inmail_calendar").slideUp(100,function(){opts.calendarhide($(this).next(opts.drawid),opts.isshowtime)});
							  $(this).attr("isc","no");
							  huncundrawid=opts.drawid;
							  }
							   
						   },function(){});
						   
						   /*$(".inmail_calendar_box").hover(function(){},function(){
							   $(this).find(opts.hoverid).attr("isc","no");
							   $(opts.cilckid).removeClass("active").attr("isc","no");
							   $(huncundrawid).slideUp(200,function(){ opts.calendarhide(huncundrawid,opts.isshowtime)});
							});*/
						  
					 }
			})
		}
		function getclass_indian(id){
			var classdata=id.attr("class").split(" ");
			var reclass="";
			for(var i=0;i<classdata.length;i++){
				reclass+="."+classdata[i];
			}
			return reclass;
		};

		//通过指定的日期元素和时间控件获取选中的日期和时间
		 exports.redate=function(id,istime){
			var data=[];
			var html="";
			var onday=id.find(".OA_calendar_mian .table a.active");
			if(comfun.isNull(onday.attr("date"))!="kong"){
				data.push(onday.attr("date"));
			}else{
				data.push(toy+"-"+(tom+1)+"-"+tod);
			}
			if(istime&&comfun.isNull(istime)!="kong"){
				data.push(id.find("."+istime+" .hour").html());
				data.push(id.find("."+istime+" .min").html());
				if(istime=="hms")
				data.push(id.find("."+istime+" .second").html());
			}
			for(var i=0;i<data.length;i++){
				if(i>0&&i<data.length-1)
				html+=data[i]+":";
				if(i==data.length-1&&i!=0)
				html+=data[i];
				if(i==0)
				html+=data[i]+" ";
			}
			return html;
		}	
	    
		//日历月份选择
		function OA_calendar_choose(id,type,indata){
			var thisyear=Number(id.parent().find("p .year").text());
			var thismoon=Number(id.parent().find("p .moon").text());
			//console.log(thisyear,thismoon);
			var addnumber;
			var ifcode;
			var distmoon;
			if(type=="perv"){addnumber=-1;ifcode=(thismoon<2);distmoon=12;}
			if(type=="next"){addnumber=1;ifcode=(thismoon>11);distmoon=1;}
			thismoon=thismoon+addnumber;
			if(ifcode){thismoon=distmoon;thisyear=thisyear+addnumber;}
			else{thismoon=thismoon;thisyear=thisyear;}
			OA_calendar_opt(thisyear,thismoon,tod,id.parents(opts.drawid),indata);
		}
		
		//日历整体渲染,输入年月日和渲染id和是否添加数据，是否显示时分秒
		function OA_calendar_opt(y,m,d,id,indata){
			var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]	;
			var thisdata=new Date(y,m-1,d);
			var weeks=thisdata.getDay();
			id.find(".OA_calendar_day label").html(d);
			id.find(".OA_calendar_day span").html(week[weeks]);
			id.find(".OA_calendar_years .year").html(y);
			id.find(".OA_calendar_years .moon").html(m);
			OA_calendar(y,m,d,id.find(".OA_calendar_mian .table"),indata);
			OA_calendar_dayclick();
			
		}
		
		function OA_calendar_dayclick(){
			if(!opts.indata){ 
				//日数点击
				$(".inmail_calendar_box .OA_calendar_mian table tbody tr td a").each(function(i) {
					$(this).click(function(){
						$(this).parents("tbody").find("a").removeClass("active");
						$(this).addClass("active");
						opts.clickday($(this).parents(opts.drawid),opts.isshowtime,$(this));
					});
				});
			}else{
				 //增加数据条数
				$(opts.drawid).find(".OA_calendar_mian .table a").each(function(i) {
					var thisrl=$(this).attr("date");
					for(var key in datas){
						if(key==thisrl){
							$(this).addClass("havedata").attr("title","有"+datas[key].length+"条数据");
							//$(this).append("<div class='databox'>有"+hwrldatas[key].length+"条数据</div>");
						}
					}
				});
			}
		}
		
		function OA_calendar_times(h,m,s){
			$(".OA_calendar_times .hour").html(h);
			$(".OA_calendar_times .min").html(m);
			$(".OA_calendar_times .second").html(s);
			
			$(".time_chooseicon i").on("click",function(){
				var level=Number($(this).parent().attr("level"));
				var minl=Number($(this).parent().attr("min"));
				var maxl=Number($(this).parent().attr("max"));
				var val=$(this).parents(".times_control").find(".time_val");
				var thisval=Number(val.html());
				var temval=0;
				if($(this).hasClass("timeup")){
					temval=thisval;
					temval=temval+level;
					if(temval>maxl)temval=0;
				}
				if($(this).hasClass("timedown")){
					temval=thisval
					temval=temval-level;
					if(temval<minl)temval=maxl;
				}
				temval=temval < 10 ? '0' + temval: temval;
				val.html(temval);
				opts.choosetimes($(this).parents(opts.drawid),opts.isshowtime);
				//opts.choosetimes(opts.drawid,opts.isshowtime);
			})
		}
		
		//日历表格渲染
		function OA_calendar(y,m,d,id,indata){
			
			var weekHtml="<tbody><tr>";
			var moomHtml="";
			md=DayNumOfMonth(y,m);//获取当前月天数
			var dates=new Date(y,m-1,1);
			var mfd=dates.getDay();//获取第一天星期几，0为星期天
			//获取此月周数
			var forweek=Math.ceil((md+mfd)/7);
			id.html('<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>'); 
			for(var i=0;i<forweek;i++){
				for(var j=0;j<7;j++){
					//j+(i*7)为加了前空白期的循环下标
					if((j+(i*7))<mfd){
					weekHtml+='<td>&nbsp;</td>';
					}else{
						var thisday=j+(i*7)-mfd+1;
						//(j+(i*7))-mfd+1为真正日数，即几号；
						if(thisday>md){
							weekHtml+='<td>&nbsp;</td>';
						}else {
							var ds='';
							if(thisday<10)ds="0"+thisday;else ds=thisday;
							if(thisday==d&&y==toy&&m==tom+1){
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today" title="今天">'+thisday+'</a></td>';
							}else{
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'">'+thisday+'</a></td>';
							}
						}
					}
				}
				moomHtml+=weekHtml+"</tr>";
				weekHtml="<tr>";
			}
			//console.log(moomHtml);
			id.append(moomHtml+"</tbody>");
			
			
		}
		
		//获取指定年月的天数
		function DayNumOfMonth(Year,Month){
			  var d = new Date(Year,Month,0);
			  return d.getDate();
		}
		
		//私有方法，检测参数是否合法
		function isValid(options) {
			return !options || (options && typeof options === "object") ? true : false;
		} 

})