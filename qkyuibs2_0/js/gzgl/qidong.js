

//公用函数

define(function(require,exports) {
	
	exports.qidong_run=function(){
		$(".qidong").on("click",function(){
			var isqi=$(this).attr("isqi");
			if(isqi=="no"){
				qidong($(this),true);
			}else{
				qidong($(this),false);
			}
		});
		
		var lookdelete;
		$(".mould_delete").on("click",function(){
			lookdelete=$(this);
			var sta=$(this).attr("sta");
			$("#"+sta).modal("show");
			
		});
		
		$(".modal_ty").on("click",function(){
			qidong(lookdelete.parents("tr").find(".qidong"),false);
		});
	}
	
	function qidong(id,type){
		if(type){
				id.html('<i class="qkyicon_14 mr5">&#xe673;</i>停用');
				id.parents("tr").find(".qistart").removeClass("error_color").addClass("mian_color").html("已启动");
				id.parents("tr").find(".mould_delete").attr("sta","delete_toty");
				id.attr("isqi","yes");
			}else{
				id.html('<i class="qkyicon_14 mr5">&#xe619;</i>启用');
				id.parents("tr").find(".qistart").removeClass("mian_color").addClass("error_color").html("已停用");
				id.parents("tr").find(".mould_delete").attr("sta","delete_ty");
				id.attr("isqi","no");
			}
	}
});