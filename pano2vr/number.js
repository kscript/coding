function Tree(){
	//根节点
	var root=null;
	var that=this;

	//节点插入方法
	this.insert=function(key){
		//实例化一个节点
		var newNode=new node(key);
		//如果根节点不存在
		if(root===null){
			root=newNode;
		}else{
			//将新节点插入到树中
			insertNode(root,newNode);
		}
		this.count=(this.count+1)||1;
	}
	//遍历
	this.forEach = function(callback,mod){
		//mod默认0 【0前序 1中序 2后序】
		forEach(root, callback,mod);
	};
	
	//返回树或子树的最小值
	this.min=function(node,mod){
		return mod?range(node||root,'left'):range(node||root,'left').key;
	}
	
	//返回树或子树的最大值
	this.max=function(node){
		return mod?range(node||root,'right'):range(node||root,'right').key;
	}

	//是否包含该值
	this.search=function(key,mod,fn){
		return fn?fn(has(key,root,mod)):has(key,root,mod);
	}
	this.remove=function(key,node){
		this.count--;
		removeNode(key,node||root);
	}
	this.set=function(key,val){
		this.search(key,1,function(item){
			if(val instanceof Object){
				//item=deepCopy.call(item,val);
				item=val;
				//item=val;
			}else{
				item=val;
			}
		})
	}

	function removeNode(key,node){
		var item=has(key,node,1);
		if(item.left&&item.right){
			//var min=that.min(item[key<item.parent.key?'left':'right'],1);
			var min=that.min(item.right,1);

			deepCopy(min,item,function(tmp){
				//tmp.right=null
			})
			
			min.parent.left=null

		}else{
			if(item.left){
				deepCopy(item.left,item);
				item.left=null;
			}else if(item.right){
				deepCopy(item.right,item);
				item.right=null;
				console.log(item)
			}
		}
	}

	function deepCopy(obj,target,fn){
		var res=target||{};
		for(var i in obj){
			//
			if(obj.hasOwnProperty(i)&&!/^(left|right)$/.test(i)){
				if(obj[i] instanceof Object){					
					res[i]=deepCopy(obj[i]);
				}else{
					res[i]=obj[i];
				}
			}
		}
		return fn?fn(res):res;
	}

	//搜索值是否存在
	function has(key,node,mod){
		/*if(node){
			if(key!==node.key){
				return has(key,node[key<node.key?'left':'right'],mod)
			}else{
				return mod?node:true;
			}
		}
		return false;*/
		return node?(key!==node.key?has(key,node[key<node.key?'left':'right'],mod):(mod?node:true)):false;
	}
	//递归获取最值
	function range(node,mod){
		return node[mod]?range(node[mod],mod):node;
	}

	//外部查看树
	this.display=function(node){
		return node||root;
	}
	
	//方法,参数数组
	this.run=function(fn,ary){
		for(var i=0;i<ary.length;i++){
			if(ary[i] instanceof Array){
				this[fn].apply(this,ary[i]);
			}else{
				this[fn](ary[i]);
			}
		}
	}

	//初始化节点
	function node(key){
		this.key=key;
		this.color=1;
		this.left=null;
		this.right=null;
	}
	//递归插入节点
	function insertNode(node,newNode){
		//如果新节点的key小于节点，进入左树
		if(node.key>newNode.key){
			//左树为空，直接赋值，不为空，左树作为节点继续向下
			if(node.left===null){
				newNode.parent=node;
				node.left=newNode;
			}else{
				insertNode(node.left,newNode);
			}
		}else{
			if(node.right===null){
				newNode.parent=node;
				node.right=newNode;
			}else{
				insertNode(node.right,newNode);
			}
		}
	}
	//遍历
	function forEach(node, callback,mod) {
		//mod默认0 【0前序 1中序 2后序 3左树 4右树】
		if (node !== null) {
			['acb','abc','bac','a','c'][mod||0].replace(/./g,function(m){
				switch(m){
					case 'a'://左树
						forEach(node.left, callback);
						break;
					case 'b'://根节点
						callback(node.key);
						break;
					case 'c'://右树
						forEach(node.right, callback);
						break;
					default:break;
				};
			})
		}
	}
}

function sort(ary,fn,mod){
	var len=~~((ary.length-1)/2);
	var res=[ary[len]];
	var count=0,num=0,index,min,mid,max;

	while(count<ary.length){
		if(count!==len){
			min=0;
			max=count+1;
			mid=~~(count/2);

			for(var i=mid;i<=max&&i>=min;i=mid=~~((max+min)/2)){
				num++
				if(fn?fn(ary[count],res[i]):ary[count]<res[i]){
					max=mid;
					if(i===1){
						num++
						index=(fn?fn(ary[count],res[0]):ary[count]<res[0])?0:i;
					}
				}else{
					min=mid;
					index=i+1;
				}
				if(1>=max-min){
					res.splice(index,0,ary[count]);
					break;
				}
			}
		}
		count++;
	}
	return mod?[res,num]:res;
}
Array.prototype.reduce=function(){
	if(!arguments)return this;
	var a=arguments;
	var target=a[1]||this;
	var index=a.length>1?0:1;
	for(var i=0;i<this.length;i++){
        a[0].apply(target,[target,this[i],i,this].slice(index));
    }
	return target;
}