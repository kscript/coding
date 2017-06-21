//冒泡排序
function bubbleSort(ary,fn){
	ary=[].concat(ary||this);
	fn=fn||function(a,b){return a-b;}
	var count=ary.length;
	while(count--){
		for(var i=0;i<count;i++){
			if(fn(ary[i],ary[i+1])>0){
				ary.splice(i,2,ary[i+1],ary[i])
			}
		}
	}
	return ary;
}