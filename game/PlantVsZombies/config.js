var conf={
	lv:0,//场景等级
	index:0,//当前场景背景组索引
	width:1320,//游戏场景宽
	height:600,//高
	scene:$(".scene"),//场景容器
	seat:$(".seat-list"),//植物放置容器
	plant:$(".plant-list"),//植物选择列表
	zombie:$(".zombies-list"),//僵尸容器
	interface:{
		path:'./images/interface/',//界面游戏背景
		list:[
			["background1.jpg","background1unsodded.jpg","background1unsodded_1.jpg","background1unsodded2.jpg"],
			["background2.jpg"],
			["background3.jpg"],
			["background4.jpg"],
			["background5.jpg"],
			["background6.jpg"]
		]
	},
	zombies:{
		path:'./images/Zombies/',
		list:[
			{name:"BackupDancer"},
			{name:"BucketheadZombie"},
			{name:"ConeheadZombie"},
			{name:"DancingZombie"},
			// {name:"DolphinRiderZombie"},
			// {name:"DuckyTubeZombie1"},
			// {name:"DuckyTubeZombie2"},
			// {name:"DuckyTubeZombie3"},
			{name:"FlagZombie"},
			{name:"FootballZombie"},
			{name:"Imp"},
			{name:"JackinTheBoxZombie"},
			{name:"NewspaperZombie"},
			{name:"PoleVaultingZombie"},
			{name:"ScreenDoorZombie"},
			{name:"SnorkelZombie"},
			{name:"Zombie"},
			{name:"Zomboni"}
		]
	},
	plants:{
		path:"./images/Plants/",
		list:[
			{name:"SunFlower"},
			{name:"Blover"},
			{name:"Cactus"},
			{name:"CherryBomb"},
			{name:"Chomper"},
			// {name:"CoffeeBean"},
			{name:"DoomShroom"},
			{name:"FlowerPot"},
			{name:"FumeShroom"},
			{name:"Garlic"},
			{name:"GatlingPea"},
			{name:"GloomShroom"},
			{name:"GraveBuster"},
			{name:"HypnoShroom"},
			{name:"IceShroom"},
			{name:"Jalapeno"},
			{name:"LilyPad"},
			{name:"Peashooter"},
			{name:"Plantern"},
			{name:"PotatoMine"},
			{name:"PuffShroom"},
			{name:"PumpkinHead"},
			{name:"Repeater"},
			{name:"ScaredyShroom"},
			{name:"SeaShroom"},
			{name:"SnowPea"},
			{name:"Spikerock"},
			{name:"Spikeweed"},
			{name:"SplitPea"},
			{name:"Squash"},
			{name:"Starfruit"},
			{name:"SunShroom"},
			{name:"TallNut"},
			{name:"TangleKlep"},
			{name:"Threepeater"},
			{name:"Torchwood"},
			{name:"TwinSunflower"},
			{name:"WallNut"}
		]
	},
	card:{}
}
//修正位置
var zombies_info={
	Imp:{
		offY:40
	},
	DancingZombie:{
		offY:-20
	},
	FootballZombie:{
		offY:-10
	},
	JackinTheBoxZombie:{
		offY:-20
	},
	NewspaperZombie:{
		offY:-10
	},
	PoleVaultingZombie:{
		offY:-50
	},
	ScreenDoorZombie:{
		attack:function(target){
			console.log(target.mod+"|"+target.name+" 剩余生命值:"+target.hp)
		}
	}
}
var plants_info={
	SunFlower:{
		offY:0,
		shine:25,
		interval:30
	},
	Blover:{
		offY:0
	},
	Cactus:{
		_except_:{
			y:100
		},
		offY:0,
		interval:1.5,
		attack:function(target){
			var offset=this.ele.offset();
			return $("<img class='bullet' src='"+conf.plants.path+"PB00.gif'>").appendTo($(".handle")).css({
				left:offset.left+40,
				top:offset.top+10
			})
		}
	},
	CherryBomb:{
		_except_:{
			y:100
		},
		offY:20,
		attack:function(target){

		}
	},
	Chomper:{
		_except_:{
			x:82,
			y:100
		},
		offX:25,
		offY:10
	},
	// CoffeeBean:{
	// 	x:83,
	// 	offX:5,
	// 	offY:0
	// },
	DoomShroom:{
		_except_:{
			x:80
		}
	},
	FlowerPot:{
		offY:0
	},
	FumeShroom:{
		offY:0,
		offX:20
	},
	Garlic:{
		_except_:{
			x:82
		},
		offX:20,
		offY:0
	},
	GatlingPea:{
		offY:0
	},
	GloomShroom:{
		offY:0
	},
	GraveBuster:{
		offY:0
	},
	HypnoShroom:{
		offY:0
	},
	IceShroom:{
		offY:0
	},
	Jalapeno:{
		offY:0
	},
	LilyPad:{
		offY:0
	},
	Peashooter:{
		offY:0,
		areaX:500,
		interval:1.6,
		attack:function(target){
			var offset=this.ele.offset();
			var bullet=$("<img class='bullet' src='"+conf.plants.path+"PB00.gif'>").appendTo($(".handle")).css({
				left:offset.left+40,
				top:offset.top-10
			})
			return bullet;
			//console.log(target.mod+"|"+target.name+" 剩余生命值:"+target.hp)
		}
	},
	Plantern:{
		offY:0
	},
	PotatoMine:{
		offY:0
	},
	PuffShroom:{
		offY:0
	},
	PumpkinHead:{
		offY:0
	},
	Repeater:{
		offY:0
	},
	ScaredyShroom:{
		offY:0
	},
	SeaShroom:{
		offY:0
	},
	SnowPea:{
		offY:0
	},
	Spikerock:{
		offY:0
	},
	Spikeweed:{
		offY:0
	},
	SplitPea:{
		offY:0
	},
	Squash:{
		offY:0
	},
	Starfruit:{
		offY:0
	},
	SunShroom:{
		offY:0
	},
	TallNut:{
		offY:0
	},
	TangleKlep:{
		offY:0
	},
	Threepeater:{
		offY:0
	},
	Torchwood:{
		offY:0
	},
	TwinSunflower:{
		offY:0
	},
	WallNut:{
		offY:0
	}
}

var events_list={
	SunFlower:function(now){
		var that=this;
		var shine=null;
		var offset=that.ele.offset();

		that.ele.addClass("fade");
		setTimeout(function(){
			shine=$("<img class='shine' data-shine='"+(that.shine||25)+"' src='"+conf.interface.path+"Sun.gif'>").appendTo($(".handle")).css({
				left:offset.left+30,
				top:offset.top-40
			}).addClass("reship")
			that.ele.removeClass("fade");
		},3000);
		setTimeout(function(){
			shine.remove();
		},30000);
	},
	Peashooter:function(now){

	},
	CherryBomb:function(){

	},
	plants:function(now){
		/*if(this.die||this.hp<=0){
			this.clear();
			this.attackSource.ele.removeClass("pause");
			return false;
		}
		var that=this;*/

	},
	zombies:function(now){
		if(this.die||this.hp<=0){
			this.clear();
			return false;
		}
		var that=this;
		var target=null;
		var offset=this.ele.offset()
		var left=~~((offset.left-160)/84);
		this.left=left;
		this.offset=offset;
		//console.log(left)
		var isHit=false;
		//通过僵尸的位置探测同一条线上可以攻击或被攻击到的植物
		//为了不浪费内存,这里不会对上下方探测,当遇到樱桃炸弹时,樱桃炸弹也会主动探测
		$.each(maps,function(index,item){
			if(item&&item[that.y]!=undefined){//如果探测到植物
				target=item[that.y];
				if(!notes[that.sid]){
					notes[that.sid]={
						that:that,
						target:target
					}
				}
				//console.log(target);
				// if(that.left-target.x==0){//如果在同一格,可以相互攻击
				// 	target.attack&&target.attack(that);
				// 	that.attack&&that.attack(target);
				// }
				var t=offset.left-target.offset.left;
				if(t<0){
					
				}

				//如果在植物的攻击范围内
				if(t<=target.areaX){
					//如果不在植物后面
					if(left>=target.x){
						//如果之前的目标已死亡
						if(target.target&&target.target.hp<1){
							target.target=null;
						}
						//如果植物目标未变或没有攻击目标
						if(target.target===that||target.target===null){
							//如果植物冷却时间已过
							if(now-target.oldTime>target.interval*1000){
								target.sendAttack(that);
							}
						}
					}
				}
				if(left==target.x){//如果可以攻击到植物
					target.attackSource=that;
					that.attackTarget=target;
					if(now-that.oldTime>1000){
						that.sendAttack(target);
						that.oldTime=now;
					}
						isHit=true;
				}
				//console.log(offset.left)
			}
			if(that.hp<=0){
				that.die=true;
				return ;
			}
		})
		if(maps[left]&&maps[left][this.y]){
			this.ele.addClass("pause");
		}
		/*$.each(maps,function(index,item){
			if(item&&item[that.y]!=undefined){//如果探测到植物
				target=item[that.y];
				if(!notes[that.sid]){
					notes[that.sid]={
						that:that,
						target:target
					}
				}
				//console.log(target);
				// if(that.left-target.x==0){//如果在同一格,可以相互攻击
				// 	target.attack&&target.attack(that);
				// 	that.attack&&that.attack(target);
				// }
				var t=offset.left-target.offset.left;
				if(t<0){
					//console.log(111)
				}

				if(t<=target.areaX){//如果会被植物攻击
					if(target.target&&target.target.hp<1){
						target.target=null;
					}
					//如果植物没有攻击目标
					if(target.target===that||target.target===null){
						//if(now-target.oldTime>target.interval*1000){
							target.sendAttack(that);
						//}
					}
				}
				if(t<=that.areaX){//如果可以攻击到植物
					that.sendAttack(target);
					isHit=true;
				}
				//console.log(offset.left)
			}
			if(that.hp<=0){
				that.die=true;
				return ;
			}
		})
		if(maps[left]&&maps[left][this.y]){
			this.ele.addClass("pause");
		}*/
	}
}