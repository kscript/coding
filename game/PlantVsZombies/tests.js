//游戏测试
//plants,zombies已改为对象存储,故测试暂不可用
(function(){
	var data={};
	window.tests={
		//植物位置测试 
		// 1 刷新  
		// 调用示例:tests.refresh()/tests.refresh(1)
		refresh:function (num){
			$(".seat-list").html("");
			$.each(new Array(45),function(i){
				plants.push(new Plant(num||0,i%9,i%5,'seat'));
			})
		},
		// 2 测试下一种植物 
		// 调用示例:tests.autoplus()/tests.autoplus(1)
		autoplus:function(num){
			if(num||num===0){data.t0=num}
			this.refresh(data.t0);
			if(data.t0){
				data.t0++;
			}else{
				data.t0=1;
			}
			console.log(data.n0=conf.plants.list[data.t0].name);
		},
		// 3 快速设置植物信息
		// 调用示例: 
		setPlantInfo:function(num,info){
			num=num||0;
			info=info||{};
			num++;
			var key=data['n'+num];
			if(!key){
				key=conf.plants.list[num].name;
			}
			//console.log(key,plants_info[key])
			this.setInfo(plants_info[key],info);
			this.autoplus(num-1);
		},
		// 通用1 读取data变量中的信息
		get:function(key){
			return data[key];
		},
		// 通用2 读取data变量中的信息
		set:function(key,val){
			data[key]=val
		},
		// 通用3 批量修改配置信息
		setInfo:function(obj,conf){
			for(var k in conf){
				obj[k]=conf[k];
			}
		}

	}

})();