// oa首页日历渲染
define(function(require,exports) {
	var myDate = new Date();
		var toy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var tom=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
		var tod=myDate.getDate();        //获取当前日(1-31)
		
		var datas={
		"2017-3-1":[" 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"],
		"2017-3-3":["08：00 例会","10：00 A项目会议","14：00  B项目会议","15：30  C项目会议","17：30  D项目会议"],
		"2017-3-4":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-8":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-16":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-10":[" 08:00 QQ会议","10:00 例会"],
		"2017-3-29":[" 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"," 08:00 QQ会议","10:00 例会"]
		}
		
		
		//日历月份选择
		OA_calendar_choose=function(id,type){
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
			OA_calendar_opt(thisyear,thismoon,tod,id.parents(".OA_calendar"));
		}
		
		//日历整体渲染
		OA_calendar_opt=function(y,m,d,id){
			var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]	;
			var thisdata=new Date(y,m-1,d);
			var weeks=thisdata.getDay();
			id.find(".OA_calendar_day label").html(d);
			id.find(".OA_calendar_day span").html(week[weeks]);
			id.find(".OA_calendar_years .year").html(y);
			id.find(".OA_calendar_years .moon").html(m);
			OA_calendar(y,m,d,id.find(".OA_calendar_mian .table"));
		}
		
		//日历表格渲染
		function OA_calendar(y,m,d,id){
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
			
			//增加数据条数
			id.find("a").each(function(i) {
				var thisrl=$(this).attr("date");
				for(var key in datas){
					if(key==thisrl){
						$(this).addClass("havedata").attr("title","有"+datas[key].length+"条数据");
						//$(this).append("<div class='databox'>有"+hwrldatas[key].length+"条数据</div>");
					}
				}
			});
		}
		
		//获取指定年月的天数
		function DayNumOfMonth(Year,Month){
			  var d = new Date(Year,Month,0);
			  return d.getDate();
		}
		
		//暴露执行体
		exports.OA_calendar_implement =function(){
			OA_calendar_opt(toy,tom+1,tod,$(".OA_calendar"));
			 $(".OA_calendar_chooose_button").on("click",function(){
					if($(this).hasClass("perv")) OA_calendar_choose($(this),"perv");
					if($(this).hasClass("next")) OA_calendar_choose($(this),"next");
			 });
		
		}
		
		
		
})