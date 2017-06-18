
//准备左侧树状菜单的html结构
	function createTreeMenuHtml(datas,currentId){
		var str = `<ul class = "tree_menu">`;
		datas.forEach(function(item,i){
			var currentLevel = wy.getLevelById(data,item.id);
			
			str += `
					<li>
						<h2 class="${item.id === currentId ? 'tree_active' : ''}" data-type-id = "${item.id}" style="padding-left:${currentLevel*12}px">
							<i class="${item.child.length ? 'openfile' : ''}"></i>
							<span class="ellipsis">${item.name}</span>
						</h2>`;
			str += item.child.length ? createTreeMenuHtml(item.child,currentId) : '';
			
			str += `</li>`
		})
		str += `</ul>`
		return str;
	};
	
//右侧文件区域的html结构	
	function createFileAreaMain(dataObj){
		var str =  `
					<div class="item">
                        <lable class="checkbox"></lable>
                        <div class="file-img">
                            <i></i>
                        </div>
                        <p class="file-title-box" data-type-id = "${dataObj.id}" data-type-pId = "${dataObj.pId}">
                            <span class="file-title ellipsis" data-type-id = "${dataObj.id}">${dataObj.name}</span>
                            <span class="file-edtor">
                                <input class="edtor" value="${dataObj.name}" type="text"/>
                            </span>
                        </p>
                    </div>
					
			`;
		return str;	
	}
//DOM生成右侧结构
	function createFileArea(dataObj){
		var newLi = document.createElement('li');
		newLi.innerHTML = createFileAreaMain(dataObj);
		newLi.className = 'file_item';
		
		newLi.dataset.typeChecked = dataObj.checked;
		newLi.dataset['typeId'] = dataObj.id;
		return newLi;
	}





	
	
//准备导航菜单数据以及生成对应的html结构;	
	function createPathNav(data,id){
	//通过id找到自己以及所有的父级(得到一个数组)...........
		var pathArr = wy.getParentsById(data,id);
		var len = pathArr.length;
	//将这个数组倒序................................
		pathArr = pathArr.reverse();
	//通过循环这个数组的每一项得到对应的结构..................
		var str = ``;
		pathArr.forEach(function(item,i){
			str += `
				<li class="${item.id === id ? 'current_path' : ''}" style="z-index: ${len--}" data-type-id = "${item.id}">${item.name}</li>
			`;
		});
		return str;
	};

//新建文件夹按钮点击通过对应id生成对应的数据对象
	function createNewFileObj(data,currentId,value){
		var newObj = {};
		newObj.name = value ? value : '';
		newObj.pId = currentId;
		newObj.id = ++user_data.maxId;;
		newObj.type = 'folder';
		newObj.checked = false;
		newObj.child = [];
		return newObj;
	}
	
//将创建的新数据通过对应id添加至当前id数据子集中
	function createNewFile(data,currentId,value){
		var newObj = createNewFileObj(data,currentId,value);
	//如果当前id有子集那么就直接添加
		if(wy.getChildrenById(data,currentId)){
			wy.getChildrenById(data,currentId).unshift(newObj);
		}else{
			//没有则给他创建一个子集并添加进去
			wy.getDataById(data,currentId).child = [];
			wy.getChildrenById(data,currentId).unshift(newObj);
		}
		
		
	};

//创建空文件夹进入时里面为空的empty结构
	function createEmptyHtml(){
		var newLi = document.createElement('li');
		newLi.className = 'empty';
		return newLi;
	}
	  
