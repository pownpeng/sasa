define(["jquery"],function(){    //首页json请求模块
	function Ranklist(){
		//console.log(1)
	}
	Ranklist.prototype={
		constructor:Ranklist,
		init:function(dom){
			this.reload()
			this.box=dom
		},
		reload:function(){   //请求json数据
			var _this=this;
			$.ajax({
				url: 'json/sales.json',
				type: 'GEt',
			})
			.then(function(res) {
				_this.create(res)
			})
		},
		create:function(data){   //将请求的数据输出在页面中
			//console.log(data)
			for(var i=0;i<3;i++){   //字符串拼接
					if(i===0){
						var $abox=$(".skinranklist",this.box);
							datas=data.skin
							//console.log(0,datas)
					}else if(i===1){
						var $abox=$(".makeupranklist",this.box);
							datas=data.makeup
							//console.log(1,datas)
					}else{
						var $abox=$(".nurseranklist",this.box);
							datas=data.nurse
							//console.log(2,datas)
					}
				for(var j=0;j<datas.length;j++){
					//console.log(data)
					var $html="<div class='"+"rankitem"+"'>"
					     			+"<a href='"+datas[j].url+"''>"
					     				+"<img src='"+datas[j].src+"' class='"+"rankitemimg'"+" alt='"+datas[j].alt+"'>"
					     			+"</a>"
					     			+"<div class='"+"rankiteminfo"+"'>"
					     				+"<div class='"+"rankiteminfoname"+"'>"
					     					+"<a href='"+datas[j].url+"'>"+datas[j].name+"</a>"
					     				+"</div>"
					     				+"<div class="+"rankiteminfoprice"+">"
					     					+"<span class="+"curnum"+">"+datas[j].curnum+"</span>"
					     					+"<span class="+"oldnum"+">"+datas[j].oldnum+"</span>"
					     					+"<span class="+"soldnum"+">"
					     						+"已售"
					     						+"<span class="+"itemsoldnum"+">"+datas[j].soldnum+"</span>"
					     					+"</span>"
					     				+"</div>"
					     			+"</div>"
					     		+"</div>"
					$($html).appendTo($abox)
				}
			}
		}
	}
   return new Ranklist()
})