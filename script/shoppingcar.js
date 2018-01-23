define(["jquery","cookie"],function(){     //设置cookie模块
	function Shoppingcar(){

	}
	Shoppingcar.prototype={
		constructor:Shoppingcar,
		init:function(){
			this.box=$(".limit")
			this.even();
			this.readcookie();
		},
		even:function(){
			var _this=this;
			this.box.delegate("button","click",function(event){
				var targrt=$(event.target);
				_this.shopid=targrt.attr("data-id")
				_this.setcookie(_this.shopid)
			})
		},
		setcookie:function(shopid){
			if($.cookie("quantity")!=null){   //这个cookie是记录总数量
				var count=$.cookie("quantity");
					count++;
				$.cookie("quantity",count)
			}else{
				$.cookie("quantity",1)
			}
			if($.cookie("shop")){    //这个cookie是保存商品和商品数量
				var shopnum=JSON.parse($.cookie("shop"))
				var flag=false;   //判断cookie里面是否有这件商品
				shopnum.forEach(function(item){
					if(item.id==shopid){
						item.num++;
						flag=true;
					}
				})
				if(!flag){
					var item={
						"id":shopid,
						"num":"1"
					}
					shopnum.push(item)
				}
				var strshopnum=JSON.stringify(shopnum);
				$.cookie("shop",strshopnum)
			}else{
				$.cookie("shop",'[{"id":"'+shopid+'","num":"1"}]')
			}
			this.readcookie()
		},
		readcookie:function(){
			var shopquantity=$.cookie("quantity");  //将购物车的商品总数量输出到index页面中
			//console.log($.cookie("shop"))      
			if($.cookie("quantity")==undefined){
				$(".shopnum").html(0)
			}else{
				$(".shopnum").html(shopquantity)
			}
		}
	}













	return new Shoppingcar()
})