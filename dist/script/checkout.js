define(["jquery","cookie"],function(){   //结算页模块
	function Checkout(){

	}
	Checkout.prototype={
		constructor:Checkout,
		init:function(){
			this.box=$(".check_shopbox_ul")
			this.readycookie()
			this.readcookie()
		},
		readycookie:function(){  //读取cookie
			var acookie=$.cookie("shop")
			//console.log(acookie)
			if(acookie!=null){
				var shop=JSON.parse($.cookie("shop"))
				for(var i=0;i<shop.length;i++){
						this.limit(shop[i].id,shop[i].num)
				}
			}
		},
		limit:function(datas,num){  //请求数据
			var _this=this;
			$.ajax({
				url:"json/limitedoffer.json",
				type:"GET",
				context:this
			}).then(function(res){
				res.forEach(function(item){
					if(item.data==datas){
						_this.create(item,num)
					}
				})
				_this.removecokie()
				_this.moneytotal()
			})
		},
		create:function(item,num){//进行字符串拼接
			var $html=`<li data-id="${item.data}">
		                 <input class="check_check" type="checkbox" checked="checked">
		                 <img src="${item.src}" alt="">
		                 <p class="check_shop_subtit">${item.subtit}</p>
		                 <p class="check_shop_title">${item.title}</p>
		                 <p class="check_shop_price" data-id="${item.price}">${item.price}</p>
		                 <p class="check_shop_num">
		                 	 <a class="check_reduce" href="#javascript"  data-id="${item.data}">-</a>
		                	 <input class="check_shop_denum" type="text" data-id="${num}" value="${num}">
		                	 <a class="check_add"  data-id="${item.data}" href="#javascript">+</a> </p>
		                 <p class="check_shop_operation"><a class="check_shop_remove" href="#javascript" data-id="${item.data}">删除</a></p>
		             </li>`
		        this.box.append($html)
		},
		removecokie:function(){//点击时删除cookie
			this.remo=$(".check_shop_remove")
			var _this=this;
			var lis=this.box.find("li")
				lis=[].slice.call(lis)
			this.box.delegate(this.remo,"click",function(){ //事件委托
				var targrt=$(event.target);
				_this.shopid=targrt.attr("data-id")
				lis.forEach(function(item){
					if($(item).attr("data-id")==_this.shopid){
						$(item).remove()
						//console.log(_this.shopid)
					}
				})
				_this.moneytotal()
				_this.setcookie(_this.shopid)
			})
		},
		setcookie:function(shopid,num){//读取cookie,将点击删除的cookie删除
			var acookie=JSON.parse($.cookie("shop"));
			if(acookie){    
				acookie.forEach(function(item,index){
					if(item.id==shopid){
						acookie.splice(index,1)
					}
				})
				var strshopnum=JSON.stringify(acookie);
				$.cookie("shop",strshopnum)
				this.readcookie()
			}
		},
		readcookie:function(){  //读取cookie总数
			var cnum=0;
			var acookie=JSON.parse($.cookie("shop"));
			acookie.forEach(function(item){
				cnum+=parseInt(item.num)
			})
			$.cookie("quantity",cnum)
			var shopquantity=$.cookie("quantity");  //将购物车的商品总数量输出到index页面中
			//console.log($.cookie("shop"))      
			if($.cookie("quantity")==undefined){
				$(".shopnum").html(0)
				$(".check_total").html(0)
				$(".cart_info_num").html(0)
			}else{
				$(".shopnum").html(shopquantity)
				$(".check_total").html(shopquantity)
				$(".cart_info_num").html(shopquantity)
			}
		},
		moneytotal:function(){   //计算总价格
			var lis=this.box.find("li")
				lis=[].slice.call(lis)
			var prices=this.box.find(".check_shop_price")
				prices=[].slice.call(prices)
			var nums=this.box.find(".check_shop_denum")
				nums=[].slice.call(nums)
				console.log(lis,prices,nums)
			var total=0;
			for(var i=0;i<lis.length;i++){
				total+=$(prices[i]).attr("data-id")*$(nums[i]).attr("data-id")
			}
			$(".cart_info_price").html("￥"+total)
		}
}

return new Checkout()

})