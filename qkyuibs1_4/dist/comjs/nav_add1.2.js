
/****
导航生成和交互js模块

1.2版本增加是否显示个人信息模块
1.3版本新增主导航超出宽度部分变更多
****/ 

define(function(require) {
	var qkydata=require("../define/qkydata");//获取默认数据
	var qkyhtml=require("../define/qkyhtml");//获取默认要加载html
	var opts=qkydata.navdata;
	
	$.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				$(this).html(qkyhtml.navhtml);
				$(".nav_logo img").attr("src",opts.logosrc);
				$(".nav_pjname").html(opts.pjname);
				$(".other_name").html(opts.tea_info.name);
				if(opts.tea_info.isphoto)$(".user_photo").removeClass("dist").html("<img src='"+opts.tea_info.photo+"' />");
				else $(".user_photo").addClass("dist");
				tofor($("#navbar .nav"),opts.navli,"lia",opts.navli_active);
				tonavhtml();
				tofor($("#common"),opts.common,"a");
				tofor($("#lately"),opts.lately,"a");
				if(opts.isinfo){
					$(".nav_other").removeClass("yc");
					tofor($("#otherli"),opts.otherli,"lia");
				}
				for(var key in opts.moreli){
					var liahtml="";
					for(var k=0;k<opts.moreli[key][1].length;k++){
						liahtml+="<a "+opts.moreli[key][1][k][1]+">"+opts.moreli[key][1][k][0]+"</a>"
					}
					$("#moreli_box").append(qkyhtml.navmoreli_s+"<use xlink:href='#icon-"+opts.moreli[key][0]+"'></use>"+qkyhtml.navmoreli_m+key+qkyhtml.navmoreli_m2+liahtml+qkyhtml.navmoreli_e);
				}
				if(opts.morebtn)$(".navbtn").on("click",function(){$(".nav_more").slideToggle(300);});
				else $(".navbtn").hide();
		    })
		}
	});
	
	
	tofor = function(id,data_arr,type,avt) {
		if(data_arr.length!=0){
		for(var i=0;i<data_arr.length;i++){
			var thishtml="";
			if(type=="lia"){
				thishtml="<li><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";
				if(i==avt)thishtml="<li class='active'><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";	
			}else{
			thishtml="<a "+data_arr[i][1]+">"+data_arr[i][0]+"</a>";
			}
			id.append(thishtml);
		}
		}
	};
	
	tonavhtml =function(){
		var leftwidth;
		if(opts.morebtn)leftwidth=$(".navbtn").outerWidth(true)+$(".nav_pjname").outerWidth(true)+$(".nav_logo").width()+1;
		else leftwidth=$(".nav_pjname").outerWidth(true)+$(".nav_logo").width()+1;
		
		if(navigator.userAgent.indexOf("MSIE 8.0")>0) leftwidth=leftwidth+40;
		
		var havewidth=$("#navbar").width()-(leftwidth+$(".nav_other").width());
		
		havewidth=havewidth/2;

		var temwidth=0;
		var muchli=[];
		var onefor=true;
		$("#navbar .nav li").each(function(i) {
            temwidth+=$(this).width();
			if(havewidth<=temwidth){
				if(onefor){
					muchli.push(opts.navli[i-1]);
					onefor=false;
				}
				muchli.push(opts.navli[i]);
				$(this).prev().hide();
				$(this).hide();	
			}
        });
		if(muchli.length!=0){
			$("#navbar .nav").append(qkyhtml.navmuchhtml);
			tofor($("#navmuchli"),muchli,"lia");
		}
	}
	

	//私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    } 
	
	
})