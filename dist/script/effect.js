define(["jquery","cookie"],function(){     //购物车特效
	function Effect(){

	}
	Effect.prototype={
		constructor:Effect,
		init:function(){
			var _this=this
			$(".cart_checkbox").on("click",function(event){
				if($(this).attr("checked")){
					var flag=true;
					_this.clin(flag,_this)
				}else{
					var flag=false;
					_this.clin(flag,_this)
				}
			})
			$(".cart_eleinput").on("click",function(event){
				if($(this).attr("checked")){
					$(this).attr("checked",false)
				}else{
					$(this).attr("checked",true)
				}
			})
			$(".shopcarlist").on("mouseenter",$.proxy(this.selectinput,this))
		},
		clin:function(flag,_this){
			//console.log(flag)
			if(!flag){
				$(".cart_checkbox").attr("checked",true)
				$(".cart_eleinput").attr("checked",true)
			}else{
				$(".cart_checkbox").attr("checked",false)
				$(".cart_eleinput").attr("checked",false)
			}
			$.proxy(_this.selectinput(),_this)
		},
		selectinput:function(){
			var total_price=0;
			var num_shop=0;
			var ele=$(".cart_eleinput")
			for(var i=0;i<ele.length;i++){
				total_price+=parseInt($($(".price")[i]).attr("data-id"))*parseInt($($(".number")[i]).attr("data-id"))
				num_shop+=parseInt($($(".number")[i]).attr("data-id"))
			}	
			//console.log(total_price,num_shop)
			var spans=$(".cart_checkout span")
			$(spans[0]).html(num_shop);
			$(spans[1]).html("￥"+total_price);
			//console.log(this)
			this.remo()
		},
		remo:function(){
			var remocart=$(".cart_remove")
			//console.log(remocart.length)
			if(remocart.length>0){
				remocart.on("click",function(){
					var $key=$(this).attr("data-id")
					var jsonarr=JSON.parse($.cookie("shop"))
					var num=jsonarr.length;
					var shopim=$(".cart_shop_list")
					//console.log($key)
					jsonarr.forEach(function(item,index){
						if(item.id==$key){
							//console.log(index)
							shopim[index].remove()
							jsonarr.splice(index,1)
							num--
						}
					})
					jsonarr=JSON.stringify(jsonarr)
					$.cookie("shop",jsonarr)
					$.cookie("quantity",num)
					$(".shopnum").html(num)
				})
			}
		}
	}


return new Effect()
})