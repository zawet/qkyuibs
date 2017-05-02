
/****
默认数据存放
****/ 

define({
	navdata:{/*导航数据*/
		"logosrc":"images/nav_logo/logo.png",
		"pjname":"校园办公",
		"navli":[["值班安排","href='index.html'"],["值班记录表","href='index_jlb.html'"],["处理反馈","href='index_cl.html'"],["历史记录","href='index_ls.html'"],["基础设置","href='index_jc.html'"]],
		"navli_active":0,
		"morebtn":true,
		"common":[//常用app
			["电子图书馆","href='#'"],["校友家园","href='#'"],
			["考勤管理","href='#'"],["党工团管理","href='#'"],
			["一卡通","href='#'"],["校园缴费","href='#'"],
			["车辆预约管理","href='#'"],["教育大数据分析","href='#'"],
			["校园服务岗","href='#'"],["校产管理","href='#'"]
		],
		"lately":[//最近使用app
			["教育大数据分析","href='#'"],["校园缴费","href='#'"],
			["就餐管理","href='#'"],["电子班牌","href='#'"],
			["车辆预约管理","href='#'"],["教师培训","href='#'"],
			["空间预约管理","href='#'"],["教师业务档案","href='#'"],
			["校园服务岗","href='#'"]
		],
		"allapp":{//所有app
			"教育管理":[["校园办公","href='#'"],["校产管理","href='#'"],["基础数据管理","href='#'"]],
			"教育大数据":[["基础数据分析","href='#'"],["综合素质分析","href='#'"],["学业水平分析","href='#'"],["微校园使用分析","href='#'"]],
			"教务管理":[["课务管理","href='#'"],["考务管理","href='#'"],["成绩管理","href='#'"],["资源中心","href='#'"],["个人资源","href='#'"]],
			"资源平台":[["资源中心","href='#'"],["个人资源","href='#'"]],
			"教师专业发展":[["教师业务档案","href='#'"],["教师成长档案","href='#'"],["教师培训","href='#'"],["教师考勤","href='#'"],["教师家访","href='#'"]],
			"学生学业成长":[["学生电子信息","href='#'"],["综合素质评价","href='#'"],["学生成绩","href='#'"],["班级圈","href='#'"],["学生请假","href='#'"]],
			"校园管理":[
				["校园迎新","href='#'"],["门户管理","href='#'"],["校园缴费","href='#'"],
				["就餐管理","href='#'"],["宿舍管理","href='#'"],["电子图书馆","href='#'"],
				["空间预约管理","href='#'"],["车辆预约管理","href='#'"],["党工团管理","href='#'"],
				["信访管理","href='#'"],["运动会管理","href='#'"],["条形码打印管理","href='#'"],
				["校园服务岗","href='#'"],["校园吉尼斯","href='#'"],["校友家园","href='#'"],
				["电子班牌","href='#'"],["一卡通","href='#'"],["考勤管理","href='#'"]
			],
			"通用功能":[["通知公告","href='#'"],["通讯录","href='#'"],["行事历","href='#'"],["个人网盘","href='#'"],["调查问卷","href='#'"]],
			},
		"isinfo":true,//是否支持登录显示个人信息
		"tea_info":{"name":"张晓明","isphoto":true,"photo":"images/tx01.png"},
		"otherli":[["切换身份","href='switch_user.html'"],["账户设置","href='account_settings.html'"],["个人设置","href='#'"],["退出","href='login.html'"]],
		setup:function(){
			$(".setup").on("click",function(){
				$("#comapp_setup").modal('show');
			});	
		},
		qkynavafter:function(){},
	isnews:true,
	news_analogdata:[/*推送消息模拟数据*/
		{
			appname:"学习管理平台",
			newsname:"在线测试开放答题",
			newsgettime:"2017-03-28 13:00",
			newscont:"课程西方近代史的测试第一阶段测试已于2017-03-28 13:00开放答题"
		},
		{
			appname:"考务管理",
			newsname:"测试已截止",
			newsgettime:"2017-03-28 13:00",
			newscont:"课程中国文化概论的测试课后小练习已于2017-03-28 10:30截止"
		},
		{
			appname:"作业管理",
			newsname:"课程成员加入",
			newsgettime:"2017-03-28 09:12",
			newscont:"新的成员学生张小画加入课程设计概论"
		},
		{
			appname:"校园办公",
			newsname:"作业互评已经截止",
			newsgettime:"2017-03-27 15:00",
			newscont:"课程西方近代史的作业课后作业已于2017-03-27 15:00截止互评，去查看互评结果并批改作业吧"
		},
		{
			appname:"考务管理",
			newsname:"作业提交",
			newsgettime:"2017-03-27 11:00",
			newscont:"课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
		},
		{
			appname:"考务管理",
			newsname:"作业提交",
			newsgettime:"2017-03-27 11:00",
			newscont:"课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
		}
	]
	},
	//已经有的图标名记录数组;
	haveicon:["changyongshezhi","wangshangwenjuan","xiaoyuanbangong","xiaoyuanzhifu","yidongxiaoyuan","zhihuikongjian","zhihuixiaoyuan","zhinengpaike","zhinengxiaoyuan","zonghepingjia","zonghesuzhifenxi","zonghesuzhipingjia","jichushujufenxi","jiaoshichengchangdangan","xuexiguanlipingtai"],

	
	table_data:{/*日历表格数据*/
		"2016-12-1":[["上学秩序","href='#'"],["放学秩序","href='#'"]],
		"2016-12-3":[["上学秩序","href='#'"],["放学秩序","href='#'"]],
		"2016-12-4":[["上学秩序","href='#'"],["放学秩序","href='#'"],["校园环境","href='#'"],["车辆停放","href='#'"]],
		"2016-12-20":[["上学秩序","href='#'"],["放学秩序","href='#'"],["你丫的放学别走啊","href='#'"],["不走就不走,你能拿我怎么样，小样","href='#'"]],
		"2016-12-10":[["上学秩序","href='#'"],["放学秩序","href='#'"]],
		"2016-12-29":[["上学秩序","href='#'"],["放学秩序","href='#'"],["你丫的放学别走啊","href='#'"],["不走就不走,你能拿我怎么样，小样","href='#'"]]
	},
	
	cadr_data:{/*值班安排数据*/
		"星期一":["董建，赵广荣，许志勤","许志勤"],
		"星期二":["董建，赵广荣，许志勤","许志勤"],
		"星期三":["董建，赵广荣，许志勤","许志勤"],
		"星期四":["董建，赵广荣，许志勤","许志勤"],
		"星期五":["董建，赵广荣，许志勤","许志勤"],
		"星期六（单周）":["董建，赵广荣，许志勤","许志勤"],
		"星期六（双周）":["董建，赵广荣，许志勤","许志勤"],
		"星期日（单周）":["董建，赵广荣，许志勤","许志勤"],
		"星期日（双周）":["董建，赵广荣，许志勤","许志勤"]
	},
	cho_data:{
		"tit":"值班人员",
		"tit_left":"学校人员",
		"tit_right":"值班人员",
		"leftli":["张某某","李某某","王某某","千某某","好大大"],
		"rightli":["陈某某"],
	}
});