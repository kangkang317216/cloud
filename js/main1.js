


//点击创建文件夹生成新数据并渲染
//	creatFolder.onclick = function(e){
//		//给新建文件夹添加一个布尔值状态，表明当前是否是在创建文件
//		creatFolder.isCreate = true;
//		if(fileListWrap.classList.contains('empty_file')){
//			fileListWrap.classList.remove('empty_file')
//		}
//		//创建生成新的对象数据
//		var newObj = createNewFileObj(data,currentClickId);
//		//通过新的对象数据生成新的li结构
//		var newLi = createFileArea(newObj);
//		//将新生成的li结构添加至fileList的第一项去
//		fileList.insertBefore(newLi,fileList.firstElementChild);
//		
//		var first = fileList.firstElementChild;
//		var fileTitle = first.querySelector('.file-title');
//		var fileEdtor = first.querySelector('.file-edtor');
//		var edtor = first.querySelector('.edtor');
//		fileTitle.style.display = 'none';
//		fileEdtor.style.display = 'block';
//		edtor.select();
//		//当编辑器的焦点失去时
//		edtor.onblur = function(){
//			//创建成功或者失败都将创建文件夹按钮上的状态变成false;
//			creatFolder.isCreate = false;
//			var val = edtor.value;
//			//如果编辑器的内容为空（没有取名字）那么就删除这个新创建的东西
//			if(edtor.value === ''){
//				fileList.removeChild(fileList.firstElementChild);
//				
//			}else{
//				currentData = createFileList(data,currentClickId);
//				if(canUseName(currentData,edtor.value)){
//					//如果名字可用那么就创建这个数据添加至原数组并渲染；
//					createNewFile(data,currentClickId,edtor.value);
//					rendering(data,currentClickId);
//				}else{
//					alert('重名了');
//					
//				}
//				
//			}
//		};
//		
//	};


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
	fileList.addEventListener('dblclick',function(e){
		e.stopPropagation();
		var target = e.target;
		//判断当前的事件源是部是i标签或者className为file-img的div
		if(target.nodeName.toUpperCase() === 'I' || target.className === 'file-img'){
			//如果事件源是所需要的  那么就判断他是否有个className为file_item的父级
			if(tools.parents(target,'.file_item')){
				//如果有那么就把这个target变成这个父级；
				target = tools.parents(target,'.file_item');
				prevId = currentClickId;
				//target的id赋值到将全局变量下的currentClickId
				currentClickId = Number.parseInt(target.dataset.typeId);
				//重现渲染数据
				rendering(data,currentClickId);
				
			}
		}
		currentData = rendering(data,currentClickId);
		clearPrevDataChecked(data,prevId);
	});


//树状菜单点击进入对应文件内	
	fileTreeMenu.addEventListener('click',function(e){
		e.stopPropagation();
		var target = e.target;
		//判断点击的元素是否有叫做h2的父级
		if(tools.parents(target,'h2')){
			//如果有那么就把target变成这个h2元素
			target = tools.parents(target,'h2');
			//如果目标上的id等于currentClickId 则不执行下面的逻辑
			if(target.dataset['typeId']*1 == currentClickId) return;
			prevId = currentClickId;
			currentClickId = Number.parseInt(target.dataset['typeId']);
			rendering(data,currentClickId);
			checkedAll.classList.remove('checked');
		}
		currentData = rendering(data,currentClickId);
		clearPrevDataChecked(data,prevId);
	});
	
//导航菜单点击进入对应文件内	
	pathNav.addEventListener('click',function(e){
		checkedAll.classList.remove('checked');
		var target = e.target;
		prevId = currentClickId;
		currentClickId = Number.parseInt(target.dataset['typeId']);
		rendering(data,currentClickId);
		currentData = rendering(data,currentClickId);
		clearPrevDataChecked(data,prevId);
	});	
	


//新建文件夹
	creatFolder.addEventListener('mouseup',function(e){
		//给新建按钮添加一个自定属性，表明当前正在处于创建状态与否
		creatFolder.onCreate = true;
		e.preventDefault();
		if(fileListWrap.classList.contains('empty_file')){
			fileListWrap.classList.remove('empty_file');
		}
		var newObj = createNewFileObj(data,currentClickId);
		var newLi = createFileArea(newObj);
		//将新生成的li结构添加至fileList的第一项去
		fileList.insertBefore(newLi,fileList.firstElementChild);
		var fileTitle = fileList.querySelectorAll('.file-title')[0];
		var fileEdtor = fileList.querySelectorAll('.file-edtor')[0];
		var edtor = fileList.querySelectorAll('.edtor')[0];
		fileTitle.style.display = 'none';
		fileEdtor.style.display = 'block';
		edtor.select();
		document.onmousedown = function(){
			var first = fileList.firstElementChild;
			var edtor = fileList.querySelectorAll('.edtor')[0];
			var val = edtor.value.trim();
			if(val === ''){
				fileList.removeChild(first);
				if(fileList.innerHTML === ''){
					fileListWrap.classList.remove('empty_file');
				}
				
			}else{
				if(canUseName(currentData,val)){
					createNewFile(data,currentClickId,val);
					rendering(data,currentClickId);
					currentData = rendering(data,currentClickId);
					
				}else{
					edtor.select()
				}
				
			}
		};
	});
	

//给document绑定一个mousedown事件用来创建文件
//	document.addEventListener('mousedown',function(e){
//		
//		if(creatFolder.onCreate && fileList.firstElementChild){
//			var first = fileList.firstElementChild;
//			var edtor = fileList.querySelectorAll('.edtor')[0];
//			var val = edtor.value.trim();
//			if(val === ''){
//				fileList.removeChild(first);
//				if(fileList.innerHTML === ''){
//					fileListWrap.classList.remove('empty_file');
//				}
//				
//			}else{
//				if(canUseName(currentData,val)){
//					createNewFile(data,currentClickId,val);
//					rendering(data,currentClickId);
//					currentData = rendering(data,currentClickId);
//					
//				}else{
//					
//					
//				}
//				
//			}
//			
//		}
//	});
	
//单选文件
	fileList.addEventListener('click',function(e){
		e.stopPropagation();
		
		var target = e.target;
		if(target.nodeName.toUpperCase() === 'LABLE'){
			if(tools.parents(target,'.file_item')){
				target = tools.parents(target,'.file_item');
				target.classList.toggle('file-checked');
				if(target.classList.contains('file-checked')){
					wy.getDataById(data,target.dataset.typeId*1).checked = true;
					
				}else{
					wy.getDataById(data,target.dataset.typeId*1).checked = false;
					
				}
				if(itemIsCheckedAll(currentData)){
					checkedAll.classList.add('checked');
				}else{
					checkedAll.classList.remove('checked');
				}
			}
		}
	});

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

//检测当前目录下所有数据check状态
	function itemIsCheckedAll(data){
		for(var i = 0 ; i < data.length;i++){
			if(!data[i].checked){
				return false;
			}
		}
		return true;
	};

	
//重命名
	resetName.addEventListener('click',function(e){
		
	});

//狂选框
	fileListWrap.addEventListener('mousedown',function(e){
		
		e.preventDefault();
		var positionX = e.pageX - fileListWrap.getBoundingClientRect().left;
		var positionY = e.pageY - fileListWrap.getBoundingClientRect().top;
		var newDiv = document.createElement('div');
		newDiv.style['background-color'] = 'rgba(0,30,255,.2)';
		newDiv.style.position = 'absolute';
		newDiv.style.zIndex = '999';
		fileListWrap.insertBefore(newDiv,fileListWrap.firstElementChild);
		document.onmousemove = function(e){
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
			
			fileListWrap.removeChild(newDiv);
			document.onmousemove = document.onmouseup = null;
		};
		
	});
	

