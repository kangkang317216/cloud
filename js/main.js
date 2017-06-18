


//点击创建文件夹生成新数据并渲染
	creatFolder.onclick = function(e){
		//给新建文件夹添加一个布尔值状态，表明当前是否是在创建文件
		creatFolder.isCreate = true;
		
		if(fileListWrap.classList.contains('empty_file')){
			fileListWrap.classList.remove('empty_file')
		}
		//创建生成新的对象数据
		var newObj = createNewFileObj(data,currentClickId);
		//通过新的对象数据生成新的li结构
		var newLi = createFileArea(newObj);
		//将新生成的li结构添加至fileList的第一项去
		fileList.insertBefore(newLi,fileList.firstElementChild);
		
		var first = fileList.firstElementChild;
		var fileTitle = first.querySelector('.file-title');
		var fileEdtor = first.querySelector('.file-edtor');
		var edtor = first.querySelector('.edtor');
		fileTitle.style.display = 'none';
		fileEdtor.style.display = 'block';
		edtor.select();
		//当编辑器的焦点失去时
		edtor.onblur = function(){
			//创建成功或者失败都将创建文件夹按钮上的状态变成false;
			creatFolder.isCreate = false;
			var val = edtor.value;
			//如果编辑器的内容为空（没有取名字）那么就删除这个新创建的东西
			if(edtor.value === ''){
				fileList.removeChild(fileList.firstElementChild);
				
			}else{
				currentData = createFileList(data,currentClickId);
				if(canUseName(currentData,val)){
					//如果名字可用那么就创建这个数据添加至原数组并渲染；
					createNewFile(data,currentClickId,edtor.value);
					rendering(data,currentClickId);
				}else{
					alert('重名了');
					
				}
				
			}
		};
		
	};
//判断名字是否可以用	
	function canUseName(childData,val){
		if(childData){
			for (var i = 0 ;i < childData.length;i++) {
				if(childData[i].name == val){
					return false;
				}else{
					return true;
				}
			}
		}else{
			return true;
		}
		
	};
//重命名
	fileList.addEventListener('click',function(e){
		e.preventDefault()
		var target = e.target;
		if(target.nodeName.toUpperCase() === 'P' || target.className === 'file-title'){
			fileList.isResetName = true;
			if(tools.parents(target,'.file-title-box')){
				target = tools.parents(target,'.file-title-box');
				var resetPid = Number.parseInt(target.dataset.typePid);
				var resetId = Number.parseInt(target.dataset.typeId);
				var fileTitle = target.querySelector('.file-title');
				var fileEdtor = target.querySelector('.file-edtor');
				var edtor = target.querySelector('.edtor');
				fileTitle.style.display = 'none';
				fileEdtor.style.display = 'block';
				edtor.select();
				var val = edtor.value;
				edtor.onblur = function(){
					fileList.isResetName = false;
					if(edtor.value === ''){
						edtor.value = val;
						fileTitle.style.display = '';
						fileEdtor.style.display = '';
					}else{
						
						
						wy.getDataById(data,resetId).name = edtor.value;
						rendering(data,resetPid);
					}
				};
			}
		}
	});
	function canResetName(datas,val){
		if(datas){
			for (var i = 0 ; i < datas.length;i++) {
				if(datas[i].name == val){
					return false;
				}else{
					return true;
				}
			}
		}else{
			return true;
		}
	}

//文件列表区域点击进入文件夹
	fileList.addEventListener('dblclick',function(e){
		n = 0;
		var target = e.target;
		//判断当前的事件源是部是i标签或者className为file-img的div
		if(target.nodeName.toUpperCase() === 'I' || target.className === 'file-img'){
			//如果事件源是所需要的  那么就判断他是否有个className为file_item的父级
			if(tools.parents(target,'.file_item')){
				//如果有那么就把这个target变成这个父级；
				target = tools.parents(target,'.file_item');
				//target的id赋值到将全局变量下的currentClickId
				currentClickId = Number.parseInt(target.dataset.typeId);
				//重现渲染数据
				rendering(data,currentClickId);
				
			}
		}
	});


//树状菜单点击进入对应文件内	
	fileTreeMenu.addEventListener('click',function(e){
		n = 0;
		checkedAll.classList.remove('checked');
		e.stopPropagation();
		var target = e.target;
		//判断点击的元素是否有叫做h2的父级
		if(tools.parents(target,'h2')){
			//如果有那么就把target变成这个h2元素
			target = tools.parents(target,'h2');
			currentClickId = Number.parseInt(target.dataset['typeId']);
			rendering(data,currentClickId);
		}
		
		
	});
	
//导航菜单点击进入对应文件内	
	pathNav.addEventListener('click',function(e){
		n = 0;
		checkedAll.classList.remove('checked');
		
		var target = e.target;
		rendering(data,Number.parseInt(target.dataset['typeId']));
		currentClickId = Number.parseInt(target.dataset['typeId']);
		
	});	
	
	

	
	

//选中文件
	fileList.addEventListener('click',function(e){
		e.preventDefault();
		var target = e.target;
		if(target.nodeName.toUpperCase() === 'I' || target.classList.contains('file-img') || target.classList.contains('checkbox')){
			if(tools.parents(target,'.file_item')){
				target = tools.parents(target,'.file_item');
				target.classList.toggle('file-checked')
				if(target.classList.contains('file-checked')){
					target.dataset.typeChecked = true;
					n++;
					
				}else{
					target.dataset.typeChecked = false;
					n--;
				}
				if(n == fileList.children.length){
					checkedAll.classList.add('checked');
					
				}else{
					checkedAll.classList.remove('checked');
					
				}
				
				target.querySelector('.checkbox').classList.toggle('checked');
			}
		}
	});


//框选框
//	document.onmousedown = function(e){
//		if(!creatFolder.isCreate && !fileList.isResetName){
//			e.preventDefault();
//			var positionX = e.pageX;
//			var positionY = e.pageY;
//			var newDiv = document.createElement('div');
//			newDiv.style['background-color'] = 'rgba(0,30,255,.2)';
//			newDiv.style.border = '1px solid blue';
//			newDiv.style.position = 'absolute';
//			newDiv.style.zIndex = '999';
//			document.body.insertBefore(newDiv,document.body.firstElementChild);
//			document.onmousemove = function(e){
//				var w = e.pageX - positionX;
//				var h = e.pageY - positionY;
//				newDiv.style.width = Math.abs(w) + 'px';
//				newDiv.style.height = Math.abs(h) + 'px';
//				newDiv.style.left = Math.min(positionX,e.pageX) + 'px';
//				newDiv.style.top = Math.min(positionY,e.pageY) + 'px';
//				//添加一个碰撞检测
//				for (var i = 0;i<fileList.children.length;i++) {
//					var isDuang = fq.duang(newDiv,fileList.children[i]);
//					if(isDuang){
//						fileList.children[i].classList.add('file-checked');
//						fileList.children[i].querySelector('.checkbox').classList.add('checked');
//					}else{
//						fileList.children[i].classList.remove('file-checked');
//						fileList.children[i].querySelector('.checkbox').classList.remove('checked');
//					}
//					
//					
//				}
//				if(collectSelectedFile().length == fileList.children.length && !fileListWrap.classList.contains('empty_file')){
//						checkedAll.classList.add('checked');
//					}else{
//						checkedAll.classList.remove('checked');
//					}
//				
//			};
//			document.onmouseup = function(e){
//				document.body.removeChild(newDiv);
//				document.onmousemove = document.onmouseup = null;
//			};
//		}
//		
//		
//	};
	
//	document.addEventListener('mousedown',function(e){
//		e.preventDefault();
//		if(!creatFolder.isCreate && !fileList.isResetName){
//			
//			var positionX = e.pageX;
//			var positionY = e.pageY;
//			var newDiv = document.createElement('div');
//			newDiv.style['background-color'] = 'rgba(0,30,255,.2)';
//			newDiv.style.border = '1px solid blue';
//			newDiv.style.position = 'absolute';
//			newDiv.style.zIndex = '999';
//			document.body.insertBefore(newDiv,document.body.firstElementChild);
//			document.onmousemove = function(e){
//				var w = e.pageX - positionX;
//				var h = e.pageY - positionY;
//				newDiv.style.width = Math.abs(w) + 'px';
//				newDiv.style.height = Math.abs(h) + 'px';
//				newDiv.style.left = Math.min(positionX,e.pageX) + 'px';
//				newDiv.style.top = Math.min(positionY,e.pageY) + 'px';
//				//添加一个碰撞检测
//				for (var i = 0;i<fileList.children.length;i++) {
//					var isDuang = fq.duang(newDiv,fileList.children[i]);
//					if(isDuang){
//						
//						fileList.children[i].classList.add('file-checked');
//						fileList.children[i].querySelector('.checkbox').classList.add('checked');
//					}else{
//						
//						fileList.children[i].classList.remove('file-checked');
//						fileList.children[i].querySelector('.checkbox').classList.remove('checked');
//					}
//					
//					
//				}
//				if(collectSelectedFile().length == fileList.children.length && !fileListWrap.classList.contains('empty_file')){
//						checkedAll.classList.add('checked');
//					}else{
//						checkedAll.classList.remove('checked');
//					}
//				
//			};
//			document.onmouseup = function(e){
//				document.body.removeChild(newDiv);
//				document.onmousemove = document.onmouseup = null;
//			};
//		}
//	})
	
	
	
//全选文件
	checkedAll.addEventListener('click',function(e){
		
		this.classList.toggle('checked');
		var hasClass = this.classList.contains('checked');
		for (var i = 0;i<fileList.children.length;i++) {
			if(hasClass){
				fileList.children[i].classList.add('file-checked');
				fileList.children[i].querySelector('.checkbox').classList.add('checked');
			}else{
				fileList.children[i].classList.remove('file-checked');
				fileList.children[i].querySelector('.checkbox').classList.remove('checked');
			}
		}		
	});

//找到所有被全选的文件
	function collectSelectedFile(){
		var selectedArr = [];
		var checkBoxs = fileList.querySelectorAll('.checkbox');
		for (var i = 0;i<checkBoxs.length;i++) {
			if(checkBoxs[i].classList.contains('checked')){
				selectedArr.push(checkBoxs[i]);
			}
		}
		return selectedArr;
	};

	


