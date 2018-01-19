define(["jquery"],function(){
	function Base(){
		//console.log(1)
	}
	Base.prototype={
		constructor:Base,
		init:function(dom){
			this.reload()
			this.box=dom
		},
		reload:function(){   //请求json数据
			var _this=this;
			$.ajax({
				url: 'json/newbase.json',
				type: 'GEt',
			})
			.then(function(res) {
				_this.create(res)
			})
		},
		create:function(data){   //将请求的数据输出在页面中
			console.log(data.length)
			for(i=0;i<data.length;i++){   //字符串拼接
				var $html="<div class='"+"newitem"+"'>"
			     				+"<div class='"+"newitem_img"+"'>"
			     					+"<a href="+data[i].url+">"+"<img src="+data[i].src+"></a>"
			     					+"<div class="+"newicon"+">"
			     						+"<span>"+"新品"+"<br />"+"上市"+"</span>"	
			     					+"</div>"
			     					+"<div class="+"country_brand"+">"
			     						+"<i>"+"</i>"
			     						+"<span>"+"欧美品牌"+"</span>"
			     					+"</div>"
			     				+"</div>"
			     				+"<div class="+"newiteminfo"+">"
			     					+"<a href="+data[i].url+" targrt='_blank'>"+data[i].newitem+"</a>"
			     				+"</div>"
			     				+"<div class="+"newitemprice"+">"
			     					+"<span class="+"pricesign"+">"+"￥"+"</span>"
			     					+"<span class="+"newprice"+">"+data[i].pricenum+"</span>"
			     					+"<span class="+"oldprice"+">"+data[i].oldprice+"</span>"
			     				+"</div>"
			     			+"</div>"
			  $($html).appendTo(this.box)
			  $($("i",this.box)[i]).css({
			  		background:data[i].countryicon
			  })
			}
			this.onhover()
		},
		onhover:function(){
		
		}
	}
   return new Base()
})