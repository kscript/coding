function Zombie(id,x,y,mod) {
	id=id||0;
	this.id=id;
	this.lv=id;
	this.mod=mod||'zombie';
	this.sid=this.mod+'-'+Math.random().toString(36).slice(2);
	this.name=conf.zombies.list[this.id].name;
	this.x=x||0;
	this.y=y||0;
	this.left=this.x;//这里的left/top和植物的不同,植物的xy固定,所以指向实际位置,但僵尸这里的left/top实际上还是按格记录的
	this.top=this.y;
	this.info=zombies_info[this.name]||[];
	
	this._except_=this.info._except_||{};

	this.areaX=80;						//攻击范围
	this.areaY=1;
	this.price=25;						//被消灭时转化的金币数
	this.hp=this.lv*2+10;				//生命值
	this.aggress=2;						//攻击力
	this.defense=12;					//防御力
	this.die=false;						//是否死亡
	this.type=1;						//所属阵营 0植物 1僵尸
	this.start=+new Date;				//创建时间
	this.oldTime=this.start;
	this.interval=1;					//刷新频次 单位:秒
	this.speed=1; 						//发射/移动的速度
	this.attack=null;					//攻击函数
	this.groups=[];						//记录被send方法push到其它组的索引信息,便于clear
	this.init();
	return this;
}
Zombie.prototype={
	constructor:Zombie,
	init:function(){
		this.ele=$("<div class='col1 "+this.name+"'><img class='run play offY"+this.y+"' src='"+conf.zombies.path+this.name+"/"+this.name+".gif"+"'></div>").appendTo(conf[this.mod])
			.css({
				top:this.y*(this.info.y||103)+(this.info.offY||0),
				right:this.x+(this.info.offX||0),
				zIndex:this.y*10+100
			});
		this.setEvent();
		this.send();
		if(coors){
			coors[this.y]=coors[this.y]||[];
			coors[this.y].push(this);
		}
	},
	extend:function(obj,target){
		if(obj){
			target=target||this;
			for(var key in obj){
				if(key!='_except_'&&obj.hasOwnProperty(key)){
						target[key]=obj[key];
				}
			}
		}
	},
	//将其push到预设组
	send:function(obj,index){
		if(arguments.length<1){
			var that=this;
			if(conf['_'+this.mod+'_']){
				$.each(conf['_'+this.mod+'_'].groups,function(index,item){
					that.send(item,index);
				})
			}
			
			return;
		}
		if(obj instanceof Array){
			this.groups.push({
				key:obj.push(this)-1,
				index:index
			});
		}else if(obj instanceof Object){
			obj[this.sid]=this;
			this.groups.push({
				key:this.sid,
				index:index
			});
		}

	},
	clear:function(key,index){
		var that=this;
		if(arguments.length<1){
			if(player){
				player.price=player.price||conf.price||1000;
				player.price+=this.price;
			}
			$.each(that.groups,function(index,item){
				that.clear(item.key,item.index);
			});
			(function(ele){
				ele.fadeOut(500,function(){
					ele.remove();
				})
			})(that.ele)
			that.groups=[];
			return;
		}

		var obj=conf['_'+this.mod+'_'].groups[index];

		if(obj instanceof Array){
			obj.splice(key,1);
		}else{
			delete obj[key];
		
		}
	},
	sendAttack:function(target){
		//if(this.attack){
			if(target.hp<1){
				target.clear();
				this.ele.removeClass("pause");
			}else{
				target.hp-=this.aggress;
				this.attack&&this.attack(target);
			}
			
		//}
	},
	setEvent:function(){
		this.events=events_list['zombies'];
//		this.events=events_list[this.name];
	}

}
function Plant(id,x,y,mod,drag) {
	this.id=id;
	this.lv=~~(id/3);
	this.mod=mod||"seat";
	this.sid=this.mod+'-'+Math.random().toString(36).slice(2);
	this.name=conf.plants.list[this.id].name;
	this.x=x||0;
	this.y=y||0;
	this.rate=1;
	this.drag=drag==-1?false:true;
	this.info=plants_info[this.name]||[];
	
	//同名键值不能直接继承的例外情况
	this._except_=this.info._except_||{};
	this.top=this.y*(this._except_.y||103)+(this.info.offY||10);
	this.left=this.x*(this._except_.x||82)+(this.info.offX||10);

	this.price=25;						//种植所需阳光值
	this.areaX=300;						//攻击范围
	this.areaY=100;
	this.hp=this.lv*2+10;				//生命值
	this.aggress=3;						//攻击力
	this.defense=12;					//防御力
	this.die=false;						//是否死亡
	this.type=1;						//所属阵营 0植物 1僵尸
	this.start=+new Date;				//创建时间
	this.oldTime=this.start;			//更新前时间
	this.interval=50;					//刷新频次 单位:秒
	this.speed=1;						//发射/移动的速度
	this.attack=null;					//攻击函数
	this.target=null;					//攻击目标
	this.src=conf.plants.path+this.name+"/"+(this.mod=='seat'?this.name:0)+".gif";
	this.groups=[];

	this.init();
	return this;
}
Plant.prototype={
	constructor:Plant,
	init:function(){
		this.extend(this.info);
		this.ele=$("<div class='col1 "+this.name+"'><img draggable='"+this.drag+"' class='run play offY"+this.y+"' src='"+this.src+"'><div class='mk lv"+this.lv+"'></div></div>").appendTo(conf[this.mod])
			.css(this.mod=='seat'?{
				top:this.top,
				left:this.left,
				zIndex:15
			}:{}).addClass("reship");
		this.offset=this.ele.offset();
		this.setEvent();
		this.send();
	},
	extend:function(obj,target){
		if(obj){
			target=target||this;
			for(var key in obj){
				if(key!='_except_'&&obj.hasOwnProperty(key)){
						target[key]=obj[key];
				}
			}
		}
	},
	send:function(obj,index){
		var that=this;
		if(arguments.length<1){
			if(conf['_'+this.mod+'_']){
				//index是conf[].groups的索引
				$.each(conf['_'+this.mod+'_'].groups,function(index,item){
					that.send(item,index);
				})
			}
			
			return;
		}
		if(obj instanceof Array){
			this.groups.push({
				key:obj.push(this)-1,
				index:index
			});
		}else if(obj instanceof Object){
			obj[this.sid]=this;
			this.groups.push({
				key:this.sid,
				index:index
			});
		}

	},
	clear:function(key,index){
		if(arguments.length<1){
			var that=this;

			$.each(that.groups,function(index,item){
				that.clear(item.key,item.index);
			});
			(function(ele){
				ele.fadeOut(500,function(){
					ele.remove();
				})
			})(that.ele)
			delete maps[that.x][that.y]//=undefined;//plant需要多一步,删除maps中的引用
			that.groups=[];
			return;
		}

		var obj=conf['_'+this.mod+'_'].groups[index];

		if(obj instanceof Array){
			obj.splice(key,1);
		}else{
			delete obj[key];
		
		}
	},
	sendAttack:function(target){
		if(this.attack){
			this.target=target;
			this.oldTime=+new Date;
			var bullet=this.attack(target);
			//如果没有目标
			// if(!this.attackTarget){
			// 	this.attackTarget=target;
			// }
			// if(!target||target.hp<1){
			// 	delete this.attackTarget;
			// }
			// if(this.attackTarget==target){
				sendBullet({
					die:false,
					start:+new Date,
					source:this,
					ele:bullet
				})
			//}
			
		}
	},
	setEvent:function(){
		if(this.mod=='plant')return ;//只有被种植的植物才有事件属性
		this.events=function(){
			//这里可以做一些统一的处理,然后再调用各自的事件
			if(events_list['plant']&&events_list['plants']()){
				return events_list[this.name];
			}else{

			}
		};
		//this.events=events_list[this.name];
	}
}
