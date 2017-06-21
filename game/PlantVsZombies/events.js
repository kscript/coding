$(function(){

$(".mask").on("mouseup",function(e){
	if($(e.target).hasClass('mask')){
		console.log(~~(e.offsetX/84),~~(e.offsetY/103));
		e.preventDefault()
	}
	return false;
})

$(".plant-list").on("dragstart",".play",function(e){
	$parent=$(e.target).parent();
	if($(this).next().height()!=0){//重装中
		e.preventDefault();
		return false;
	};
	e.originalEvent.dataTransfer.effectAllowed = "move";
	e.originalEvent.dataTransfer.setData("index",$parent.index());
})
$(".mask,.zombies-list").on("dragover",function(e){
	e.preventDefault();
	return true;
})
$(".mask,.zombies-list").on("drop",function(e){
	
	var index=e.originalEvent.dataTransfer.getData("index");
	if(index=='')return;
	var x=~~(e.originalEvent.offsetX/84);
	var y=~~(e.originalEvent.offsetY/103);

	if(maps[x]){
		if(maps[x][y]){
			return;
		}
	}else{
		maps[x]=[];

	}
		
		conf.plant.children().eq(index).removeClass("reship");
		setTimeout(function(){
			conf.plant.children().eq(index).addClass("reship");
		})
		maps[x][y]=new Plant(conf.selectPlant[index||0],x,y,'seat',-1);
	
})
$(".seat-list").on("click",'.SunFlower',function(){
	$(this).toggleClass("fade");
})
$(".handle").on("click",'.shine',function(){
	$(this).fadeOut(1000,function(){
		$(this).remove();
	});
	gainSun&&gainSun($(this).data("shine"));
})


// var node=null;
// $(".plant-list").on("click",function(e){
// 	node=$(e.target);
// 	if(!node.hasClass("play")){
// 		node=null;
// 	}
// 	console.log(node,e)
// })
// $(".handle").on("mousemove",function(e){
// 	if(node){
// 		node.css({
// 			left:e.offsetX,
// 			top:e.offsetY
// 		})
// 	//	console.log(e)
// 	}
// })
// $(".handle").on("mouseup",function(e){
// 	//console.log(e)
// 	//node=null;
// })
});