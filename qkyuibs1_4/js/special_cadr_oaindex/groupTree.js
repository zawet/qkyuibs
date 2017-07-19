// oa首页交互
define(function(require,exports) {

	<!--
	var zTree;
	var demoIframe;

	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: ""
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					return false;
				} else {
					demoIframe.attr("src",treeNode.file + ".html");
					return true;
				}
			}
		}
	};

	var zNodes =[
		{id:1, pId:0, name:"镇教办", open:true},
		{id:101, pId:1, name:"学习 查看", file:"core/standardData"},
		{id:102, pId:1, name:"默认部门", file:"core/simpleData"},
		{id:103, pId:1, name:"2级教办", file:"core/noline"}


		
	];

	var t = $("#tree");
	t = $.fn.zTree.init(t, setting, zNodes);

})