/****
下拉菜单可选择值到输入框
****/ 

define(function(require,exports) {
	exports.socrll = function() {
		$(window).scroll(function(){
			var body_scr_a=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			if(body_scr_a>=230){
				$(".po_fi").addClass("fi");
			}else{
				$(".po_fi").removeClass("fi");
			}
		});
	};
	
	exports.ajax_left = function(i) {
		htmlajax("mould/lefthtml.html",function(thishtml){
		 $("#left").html(thishtml);
		 exports.socrll();
		 $("#left").find(".container_left_nav li").eq(i).addClass("active");
		});
	}
	
	var htmlajax=function(url,sucfun){
		var urlhtml="";
		$.ajax({
		  url: url,
		  cache: false,
		  success: function(html){
			 sucfun(html);
		  }
		});	
	}
	
});
