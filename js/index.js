$(function() {
	//模拟数据
	var todoList = [
	]
	//加载网页数据
	function loadData(){
		var collection=localStorage.getItem('todo');
		if(collection){
			return JSON.parse(collection);
		}else{
			return [];
		}
	}
	
	load();
	
	function load() {
		var todoCount = 0;
		var doneCount = 0;
		var doneStr = '';
		var todoStr = '';
		if (todoList && todoList.length > 0) {
			//有数据
			todoList.forEach(function(data, i) {
				if (data.done) {
					//已经完成
					doneStr +=
						`
					<li>
						<input type="checkbox" index=${i} checked="checked" />
						<p id='p-${i}'>${data.title}</p>
						<a href="javascript:;">-</a>
					</li>
					`;
					doneCount++;
				} else {
					//正在进行
					todoStr +=
						`
					<li>
						<input type="checkbox" index=${i}  />
						<p id='p-${i}'>${data.title}</p>
						<a href="javascript:;">-</a>
					</li>
					`;
					todoCount++;
				}
				$('#todolist').html(todoStr);
				$('#donelist').html(doneStr);
				$('#todocount').html(todoCount);
				$('#donecount').html(doneCount);
			})
			
		} else {
			//无数据
			$('#todolist').html('');
			$('#donelist').html('');
			$('#todocount').html(todoCount);
			$('#donecount').html(doneCount);
		}
	}

	//添加数据的方法
	$('#title').keydown(function(event) {
		if (event.keyCode === 13) {
			//获取输入的值
			var val = $(this).val();
			if (!val) {
				alert('不能为空,请重新输入');
			} else {
				todoList.unshift({
					title: val,
					done: false
				});
				//清空输入框的值
				$(this).val('');
				load();
			}
		}
	})

	//删除数据
	//通过事件代理的方式删除操作
	$('#todolist').on('click','a',function(){
		var i=$(this).parent().index();
		todoList.splice(i,1);
		load();
	})
	 
	//更新数据
	$('#todolist').on('change','input[type=checkbox]',function(){
		var i=parseInt($(this).attr('index'));
		update(i,'done',true);
	})
	$('#donelist').on('change','input[type=checkbox]',function(){
		var i=parseInt($(this).attr('index'));
		update(i,'done',false);
	})
	function update(i,key,value){
		var todo=todoList.splice(i,1)[0];
		todo[key]=value;
		todoList.splice(i,0,todo);
		load();
	}

	
	//编辑操作
	$('#todolist').on('click','p',function(){
		var i=$(this).parent().index();
		var title=$(this).html();
		var $p=$(this);
		$p.html(`
		<input type="text" id='input-${i}' value=${title}>
		`)
		//选中
		$(`#input-${i}`)[0].setSelectionRange(0,$(`#input-${i}`).val().length);
		//获取焦点
		$(`#input-${i}`).focus();
		
		//失去焦点保存更改的数据
		$(`#input-${i}`).blur(function(){
			if($(this).val().length===0){
				$p.html(title);
				alert('内容不能为空');
			}else{
				update(i,'title',$(this).val())
			}
		})
	})
	
		
		

})
