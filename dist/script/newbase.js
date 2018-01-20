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
			//console.log(data.length)
			var count=0;
			for(i=0;i<data.length;i++){   //字符串拼接
				var $html="<div class='"+"newitem"+"'>"
			     				+"<div class='"+"newitem_img"+"'>"
			     					+"<a href="+data[i].url+">"+"<img src="+data[i].src+"></a>"
			     					+"<div class="+"newicon"+">"
			     						+"<span>"+"新品"+"<br />"+"上市"+"</span>"	
			     					+"</div>"
			     					+"<div class="+"country_brand"+">"
			     						+"<i>"+"</i>"
			     						+"<span>"+data[i].country+"</span>"
			     					+"</div>"
			     				+"</div>"
			     				+"<div class="+"newiteminfo"+">"
			     					+"<a href="+data[i].url+" targrt='_blank'>"+data[i].newitem+"</a>"
			     				+"</div>"
			     				+"<div class="+"newitemprice"+">"
			     					+"<span class="+"pricesign"+">"+"￥"+"</span>"
			     					+"<span class="+"newprice"+">"+data[i].pricenum+"&nbsp;"+"</span>"
			     					+"<span class="+"oldprice"+">"+data[i].oldprice+"</span>"
			     				+"</div>"
			     			+"</div>"
			  $($html).appendTo(this.box)
			 // console.log(data[i].countryicon,$("i",this.box)[i])
			  $("i",this.box)[i].style.background="url("+data[i].countryicon+")";
			  count++;
			  if(count%4==0){
			  		$(".newitem")[i].style.marginRight="0";
			  }
			}
			this.onhover()
		},
		onhover:function(){
			$(".newitem").on("mouseenter",function(){
				$(this).css({
					border:"1px solid #fc3f83"
				})
			})
			$(".newitem").on("mouseleave",function(){
				$(this).css({
					border:"1px solid #fff"
				})
			})
		}
	}
   return new Base()
})