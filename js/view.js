//加载文件数据
	var data = user_data.files;
//获取树状菜单的父级
	var fileTreeMenu = document.querySelector('.file_tree_menu');
//获取文件列表的父级	
	var fileList = document.querySelector('.file_list');
//获取导航菜单的父级	
	var pathNav = document.querySelector('.path_nav');
//获取新建文件夹按钮	
	var creatFolder = document.querySelector('#creatfolder');
//获取重命名按钮	
	var resetName  = document.querySelector('#resetname');
//获取到删除按钮
	var deleteFolder = document.querySelector('#delete-folder');
//获取到移动按钮
	var moveFolder = document.querySelector('#move-folder');

	var fileListchildren = fileList.children;
	
	var fileTreeMenu = document.querySelector('.file_tree_menu');
	
	var pathNav = document.querySelector('.path_nav');
	
	var fileListWrap = document.querySelector('.file_list_wrap');
	
	var zheZhao = document.querySelector('.zhezhao');
	
	var moveHead = document.querySelector('.move-head');
	
	var moveList = document.querySelector('.move-list');
	
	var moveSure = document.querySelector('.move-sure');
	
	var moveCancel = document.querySelector('.move-cancel');
	
	var tip = document.querySelector('.tip');
	var tipTitle = document.querySelector('.tip-title');
//获取全选按钮	
	var checkedAll = document.querySelector('.checked-all');
//用来存储当前点击的文件  菜单  导航的id;
	var currentClickId = 0;
//用来缓存当前点击状态下的所有子集的数据	
	var currentData = null;
	
	currentData = rendering(data,currentClickId);
	
	var n = 0;
	
	var isNaming = false;
	
	var prevId = null;
//树状菜单结构生成
	
	function createFileMenu(data,id){
		
		fileTreeMenu.innerHTML = createTreeMenuHtml(data,id);
	}



//生成文件列表内容	
	function createFileList(data,id){
		var child = wy.getChildrenById(data,id);
		fileList.innerHTML = '';
		if(child.length){
			fileListWrap.classList.remove('empty_file');
			child.forEach(function(item,i){
				var newEle = createFileArea(item);
				fileList.appendChild(newEle);
			});
			
		}else{
			fileListWrap.classList.add('empty_file');
		}
		
		return child;
	}
//生成导航列表结构
	
	function creatPathNav(data,id){
		
		pathNav.innerHTML = createPathNav(data,id);
	}

//渲染树状菜单、导航栏、文件列表
	
	function rendering(data,id){
		createFileMenu(data,id);
		createFileList(data,id);
		creatPathNav(data,id);
		return createFileList(data,id);
	}

//清除上一次点击id下所有数据的checked状态
	function clearPrevDataChecked(data,previd){
		var prevData = wy.getChildrenById(data,previd);
		prevData.forEach(function(item,i){
			item.checked = false;
		});
	}

//生成移动列表

function createMoveList(data,id){
	moveList.innerHTML = createTreeMenuHtml(data,id);
}

//检测当前目录下所有数据check状态
	function itemIsCheckedAll(data){
		for(var i = 0 ; i < data.length;i++){
			if(!data[i].checked){
				return false;
			}
		}
		return true;
	};

// 获取被选中的数据
	function isCheckedFile(data){
	    var arr = [];
	    for(var i=0; i<data.length; i++){
	        if(data[i].checked){
	        arr.push(data[i]);
	    	}
	    }
	  return arr;
	}
	
// 根据数据查找对应的节点
function getChildNode(parentNode, id){
  var children = parentNode.children;
  for(var i=0; i<children.length; i++){
    if(getDataSetId(children[i]) === id){
      return children[i];
    }
  }
  return null;
}

// 获取到元素身上dataset里面的id，并转换为数字类型
function getDataSetId(obj){
  return obj.dataset.typeId * 1;
}
