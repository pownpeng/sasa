define(["jquery","cookie"],function(){
	function Shoppingcar(){

	}
	Shoppingcar.prototype={
		constructor:Shoppingcar,
		init:function(){
			this.box=$(".commodity")
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
			if($.cookie("quantity")!=null){
				var count=$.cookie("quantity");
					count++;
				$.cookie("quantity",count)
			}else{
				$.cookie("quantity",1)
			}
			if($.cookie(shopid)!=null){
				var num=$.cookie(shopid)
				num++;
				$.cookie(shopid,num)
			}else{
				$.cookie(shopid,1)
			}
			this.readcookie()
		},
		readcookie:function(){
			var shopquantity=$.cookie("quantity");
			if($.cookie("quantity")==undefined){
				$(".shopnum").html(0)
			}else{
				$(".shopnum").html(shopquantity)
			}
		}
	}













	return new Shoppingcar()
})