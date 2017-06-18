

//渲染所有结构
rendering(data,currentClickId);


//判断名字是否可以用	
	function canUseName(childData,val){
		if(childData){
			for (var i = 0 ;i < childData.length;i++) {
				if(childData[i].name == val){
					return false;
				}
			}
			return true;
		}
		return true;
	};

	

//文件列表区域点击进入文件夹
	fileList.addEventListener('click',function(e){
		e.stopPropagation();
		var target = e.target;
		
		//判断当前的事件源是部是i标签或者className为file-img的div
		if(target.nodeName.toUpperCase() === 'I' || target.className === 'file-img'){
			//如果事件源是所需要的  那么就判断他是否有个className为file_item的父级
			if(tools.parents(target,'.file_item')){
				//如果有那么就把这个target变成这个父级；
				target = tools.parents(target,'.file_item');
				
				//target的id赋值到将全局变量下的currentClickId
				currentClickId = target.dataset.typeId * 1;
				//重现渲染数据
				initCheckedAll();
				currentData = rendering(data,currentClickId);
				
			}
		}
		//点击labal选中文件
		if(target.nodeName.toUpperCase() === 'LABLE'){
			selectFile(target);
			
		}
		//点击文件名字区域重命名
		if(tools.parents(target,'.file-title-box')){
			target = tools.parents(target,'.file-title-box');
			resetNaming(target,getDataSetId(target))
		}
	});
//选中文件夹功能
	function selectFile(ele){
		if(tools.parents(ele,'.file_item')){
			ele = tools.parents(ele,'.file_item');
			ele.classList.toggle('file-checked');
			
			var check = ele.classList.contains('file-checked');
			ele.dataset.typeChecked = check;
			
			var targetData = wy.getDataById(currentData,ele.dataset.typeId * 1);
			targetData.checked = check;
			if(itemIsCheckedAll(currentData)){
				checkedAll.classList.add('checked');
				
			}else{
				checkedAll.classList.remove('checked');
			}
		}
		
	}

//树状菜单点击进入对应文件内	
	fileTreeMenu.addEventListener('click',function(e){
		e.stopPropagation();
		var target = e.target;
		//判断点击的元素是否有叫做h2的父级
		if(tools.parents(target,'h2')){
			//如果有那么就把target变成这个h2元素
			target = tools.parents(target,'h2');
			//如果目标上的id等于currentClickId 则不执行下面的逻辑
			if(target.dataset.typeId * 1 == currentClickId) return;
			
			currentClickId = target.dataset.typeId * 1;
			
			initCheckedAll();
			currentData = rendering(data,currentClickId);
			
		}
		
		
	});
	
//导航菜单点击进入对应文件内	
	pathNav.addEventListener('click',function(e){
		checkedAll.classList.remove('checked');
		var target = e.target;
		currentClickId = target.dataset.typeId * 1;
		initCheckedAll();
		currentData = rendering(data,currentClickId);
		
	});	
	


//新建文件夹按钮点击事件
	creatFolder.addEventListener('click',function(e){
		if(isNaming) return;
		
		e.preventDefault();
		initCheckedAll();
		createNewFolder();
		
	});
//新建文件夹函数	
	function createNewFolder(){
		isNaming = true;
		if(fileListWrap.classList.contains('empty_file')){
			fileListWrap.classList.remove('empty_file');
		}
		var newObj = createNewFileObj(data,currentClickId);
		var newLi = createFileArea(newObj);
		//将新生成的li结构添加至fileList的第一项去
		fileList.insertBefore(newLi,fileList.firstElementChild);
		isNamingFile(newLi,data);
	}
//新建文件重命名
	function isNamingFile(ele,data){
		var fileTitle = ele.querySelector('.file-title');
		var fileEdtor = ele.querySelector('.file-edtor');
		var edtor = ele.querySelector('.edtor');
		fileTitle.style.display = 'none';
		fileEdtor.style.display = 'block';
		edtor.select();
		edtor.onblur = function(){
			var edtor = ele.querySelector('.edtor');
			var val = edtor.value.trim();
			if(val === ''){
				tipShow(tip,'faild','文件名不能为空创建失败');
				fileList.removeChild(fileList.firstElementChild);
				if(fileList.innerHTML === ''){
					fileListWrap.classList.remove('empty_file');
				}
				isNaming = false;
			}else{
				if(canUseName(currentData,val)){
					tipShow(tip,'success','文件创建成功');
					createNewFile(data,currentClickId,val);
					currentData = rendering(data,currentClickId);
					isNaming = false;
				}else{
					tipShow(tip,'faild','名称重复');
					edtor.select()
				}
				
			}
		};
	}


//全选文件
	checkedAll.addEventListener('click',function(e){
		this.classList.toggle('checked');
		for (var i = 0;i < fileList.children.length;i++) {
			if(checkedAll.classList.contains('checked')){
				fileList.children[i].classList.add('file-checked');
				currentData[i].checked = true;
				
			}else{
				fileList.children[i].classList.remove('file-checked');
				currentData[i].checked = false;
			}
		}
		
	});

//取消全选
	function initCheckedAll(){
		checkedAll.classList.remove('checked');
		for (var i = 0;i<currentData.length;i++) {
			currentData[i].checked = false;
			fileList.children[i].classList.remove('file-checked');
		}
		
	};

	
//重命名按钮点击事件
	resetName.addEventListener('click',function(e){
		if(isNaming) return;
		var selectItems = isCheckedFile(currentData);
		if(selectItems.length === 0){
			tipShow(tip,'faild','请选择文件');
		}
		if(selectItems.length > 1){
			tipShow(tip,'faild','只能选择一个文件');
		}
		if(selectItems.length === 1){
			initCheckedAll();
			var resetNamingChild = getChildNode(fileList, selectItems[0].id);
			resetNaming(resetNamingChild,getDataSetId(resetNamingChild))
			
		}
	});
//重命名功能
	function resetNaming(ele,id){
		isNaming = true;
		var fileTitle = ele.querySelector('.file-title');
		var fileEdtor = ele.querySelector('.file-edtor');
		var edtor = ele.querySelector('.edtor');
		fileTitle.style.display = 'none';
		fileEdtor.style.display = 'block';
		edtor.select();
		edtor.onblur = function(){
			var edtor = ele.querySelector('.edtor');
			var val = edtor.value.trim();
			if(val === '' || val == fileTitle.innerHTML){
				fileTitle.style.display = 'block';
				fileEdtor.style.display = 'none';
				fileTitle.innerHTML = fileTitle.innerHTML;
				isNaming = false;
			}else{
				if(canUseName(currentData,val)){
					tipShow(tip,'success','重命名成功');
					var currentItemData = wy.getDataById(currentData,id);
					fileTitle.style.display = 'block';
					fileEdtor.style.display = 'none';
					fileTitle.innerHTML = val;
					currentItemData.name = val;
					rendering(data,currentClickId);
					isNaming = false;
				}else{
					tipShow(tip,'faild','名字重复不可用');
					edtor.select();
				}
				
			}
		};
	
	}
	
//删除文件按钮事件
	deleteFolder.addEventListener('click',function(e){
		var selectItems = isCheckedFile(currentData);
		if(selectItems.length === 0){
			tipShow(tip,'faild','请选择文件');
			
		}else{
			deleteFolderFn(currentData)	
			tipShow(tip,'success','删除成功');
		}
		
		initCheckedAll();	
		
		
	});
//删除文件功能	
	function deleteFolderFn(datas){
		datas.forEach(function(item,i){
			if(item.checked){
				item.index = i
				datas.splice(item.index,1);
				deleteFolderFn(datas);
				rendering(data,currentClickId);
			}
			
		})
		
	};


//狂选框
	fileListWrap.addEventListener('mousedown',function(e){
		
		if(isNaming) return;
		var positionX = e.pageX - fileListWrap.getBoundingClientRect().left;
		var positionY = e.pageY - fileListWrap.getBoundingClientRect().top;
		var newDiv = document.createElement('div');
		newDiv.style['background-color'] = 'rgba(0,30,255,.2)';
		newDiv.style.position = 'absolute';
		newDiv.style.zIndex = '999';
		fileListWrap.insertBefore(newDiv,fileListWrap.firstElementChild);
		fileListWrap.onmousemove = function(e){
			e.preventDefault();
			var dx = e.pageX - fileListWrap.getBoundingClientRect().left;
			var dy = e.pageY - fileListWrap.getBoundingClientRect().top;
			var w = dx - positionX;
			var h = dy - positionY;
			newDiv.style.border = '1px solid blue';
			newDiv.style.width = Math.abs(w) + 'px';
			newDiv.style.height = Math.abs(h) + 'px';
			newDiv.style.left = Math.min(positionX,dx) + 'px';
			newDiv.style.top = Math.min(positionY,dy) + 'px';
			for (var i = 0;i<fileList.children.length;i++) {
				var isDuang = fq.duang(newDiv,fileList.children[i]);
				if(isDuang){
					fileList.children[i].classList.add('file-checked');
					fileList.children[i].querySelector('.checkbox').classList.add('checked');
					currentData[i].checked = true;
				}else{
					fileList.children[i].classList.remove('file-checked');
					fileList.children[i].querySelector('.checkbox').classList.remove('checked');
					currentData[i].checked = false;
				}
				if(itemIsCheckedAll(currentData)){
					checkedAll.classList.add('checked');
				}else{
					checkedAll.classList.remove('checked');
				}
			}
			
		};	
		document.onmouseup = function(e){
			fileListWrap.onmousemove = document.onmouseup = null;
			fileListWrap.removeChild(newDiv);
			
		};
		
	});
	
//移动到按钮点击事件
	moveFolder.addEventListener('click',function(e){
		var selectItems = isCheckedFile(currentData);
		if(selectItems.length === 0){
			tipShow(tip,'faild','请选择文件');
			
		}else{
			//使遮罩打开并且显示目标文件夹列表
			zheZhao.style.display = 'block';
			createMoveList(data,currentClickId);
			moveList.onclick = function(e){
				var target = e.target;
				target = tools.parents(target,'h2');
				createMoveList(data,target.dataset.typeId * 1);
				
				var MoveTargetId = target.dataset.typeId * 1;
				
				moveSure.onclick = function(e){
					//若以上条件都不成立则直接return掉不进行后面的逻辑
					if(MoveTargetId === currentClickId){
						tipShow(tip,'faild','移动到自己所在目录无效');
						return;
					}

					var targetParentArr = wy.getParentsById(data,MoveTargetId)
					targetParentArr.splice(0,1)
					for (var i = 0;i<targetParentArr.length;i++) {
						for (var j = 0;j<selectItems.length;j++) {
							if(targetParentArr[i].id == selectItems[j].id){
								tipShow(tip,'faild','不能移动到自己的子集中');
								return;
							}
							if(selectItems[j].id == MoveTargetId){
								tipShow(tip,'faild','不能到自己身上');
								return;
							}
						}
					}
					//若以上条件都不成立则表示可以移动直接执行以下逻辑
					deleteFolderFn(currentData);
					for (var i = 0;i<selectItems.length;i++) {
						selectItems[i].pId = MoveTargetId;
						selectItems[i].checked = false;
						wy.getChildrenById(data,MoveTargetId).unshift(selectItems[i]);
						
					}
					tipShow(tip,'success','成功移动到');
					zheZhao.style.display = 'none';
					currentData = rendering(data,currentClickId);
					initCheckedAll();
				};
				
				
				
			}
			moveCancel.onclick = function(){
				tipShow(tip,'faild','取消移动');
				zheZhao.style.display = 'none';
				initCheckedAll();
			};
			
			
//			moveToTarget(currentData,selectItems,5);
//			rendering(data,currentClickId);
		}
		
	});
	
	
	
//选中文件移动到指定id的子集中功能函数
	function moveToTarget(datas,movedata,targetId){
		deleteFolderFn(datas);
		movedata.forEach(function(item,i){
			if(targetId === item.pId){
				alert('不能放进自己的子集')
				return;
			}
			item.checked = false;
			item.pId = targetId;
		});
		wy.getChildrenById(data,targetId).concat(movedata);
		
	}


//封装提醒框
	function tipShow(ele,className,val){
		ele.classList.add(className);
		tipTitle.innerHTML = val;
		fq.animate(ele,{top : 0},200,'linear',function(){
			clearTimeout(timer);
			var timer = setTimeout(function(){
				fq.animate(ele,{top : -50},200,'linear',function(){
					ele.classList.remove(className)
				});
			},1500)
			
		});
	}
