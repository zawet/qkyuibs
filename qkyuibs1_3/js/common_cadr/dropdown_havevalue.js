/****
下拉菜单可选择值到输入框
****/ 

define(function(require,exports) {
	exports.havevalue = function() {
		$(".dropdown.havechoose").on('shown.bs.dropdown', function () {
			var value_box=$(this).find(".value");
			$(this).find(".dropdown-menu li").on("click","a", function() {
				value_box.html($(this).text());
			});
	    })
	};
	exports.havevalue();
});
