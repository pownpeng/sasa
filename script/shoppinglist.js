define(["jquery","cookie"],function(){   //读取cookie模块
	function Shoplist(){

	}
	Shoplist.prototype={
		constructor:Shoplist,
		init:function(){
			this.turn=$(".closeshop");
			this.shopingcar=$(".shopcarlist");
			this.close=$(".cart_close");
			this.even();
			this.box=$(".commodity")
		},
		even:function(){
			var _this=this;
			this.count=0;
			this.turn.on("click",function(){
				if(_this.count==0){
					_this.shopingcar.css({
						display:"block"
					})
					_this.item()
					_this.count=1;
				}else{
					return 0;
				}
			})
			this.close.on("click",function(){
				_this.shopingcar.css({
					display:"none"
				})
				$(".cart_item_list").html("")
				_this.count=0;
			})
		},
		item:function(){
			var acookie=$.cookie("shop")
			if(acookie!=null){
				var shop=JSON.parse($.cookie("shop"))
				//console.log(shop)
				for(var i=0;i<shop.length;i++){
						this.limit(shop[i].id,shop[i].num)
				}
			}
		},
		limit:function(datas,num){
			var _this=this;
			$.ajax({
				url:"json/limitedoffer.json",
				type:"GET"
			}).then(function(res){
				//console.log(res)
				res.forEach(function(item){
					if(item.data==datas){
						_this.create(item,num)
					}
				})
			})
		},
		create:function(item,num){
			var $html= `<div class="cart_shop_list" data-id="${item.data}">
                            <input class="cart_eleinput" type="checkbox" checked="checked">
                            <div class="cart_shop_item">
                                 <img src="${item.src}" alt="">
                                 <p>${item.title}</p>
                                 <span class="price" data-id="${item.price}">￥${item.price}</span>
                                 <span class="number" data-id="${num}">x${num}</span>
                                 <i class="iconfont cart_remove" title="点击删除" data-id="${item.data}">&#xe61e;</i>
                           </div>                                  
                       </div>`
            $(".cart_item_list").append($html)
		}
	}


return new Shoplist()
})