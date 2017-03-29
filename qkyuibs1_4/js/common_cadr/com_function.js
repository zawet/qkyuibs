

//公用函数

define(function(require,exports) {
	
	exports.htmlajax=function(url,sucfun){
		var urlhtml="";
		$.ajax({
		  url: url,
		  cache: false,
		  success: function(html){
			 sucfun(html);
		  }
		});	
	}
	
	exports.isNull=function (data){ 
    	return (data == "" || data == undefined || data == null) ? "kong" : data; 
	}
});