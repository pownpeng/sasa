define(["jquery"],function(){
function Waterfull(){

}
Waterfull.prototype={
	constructor:Waterfull,
	init:function(dom){
		this.box=dom;
		//console.log(this.box)
		this.count=0;
		this.reload(this.count);
		this.srcol();
	},
	reload:function(count){
		$.ajax({
			url:"json/Waterfull.json",
			type:"GET",
			context:this
		})
		.then(function(res){
			//console.log(res.length)
			var data=res.slice((count)*20,(count+1)*20)
			this.create(data)
		})
	},
	create:function(data){  //根据取得的数据进行拼接
		var _this=this;
		data.forEach(function(item){
			var $html=`<li>
						<div class="li_country">
							<img src="${item.countryicon}" alt="">
							${item.country}
						</div>
						<div class="li_commit">
							<a href="${item.url}"><img src="${item.src}" alt=""></a>
						</div>
						<div class="li_sale_price">
							<span class="li_new_price">￥${item.price}</span>
							<span class="li_old_price">￥${item.oldprice}</span>
							<span class="li_dis">${item.sale}折</span>
						</div>
						<div class="li_des">
							<b class="li_yew">[保税仓直送]</b>
							<a href="${item.url}" class="li_brand">${item.subtit}</a>
						</div>
						<div class="li_title">
							<p class="li_name">${item.title}</p>
							<p class="li_milliliter">330毫升</p>
							<p class="li_sold">已售<span>${item.soldnum}</span>件</p>
						</div>
						<button class="li_btn" data-id="${item.data}">加入购物车</button>
					</li>`
					//console.log(this, _this)
					_this.box.append($html)
		})
	},
	srcol:function(){
		var timer;
		var _this=this;
		$(document).on("scroll",function(){
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
			var footertop=$(".footer").offset().top;
			//console.log(footertop,scrolltop)
			if(footertop-scrolltop<500){
				clearTimeout(timer)
				timer=setTimeout(function(){
					_this.count++;
					if(_this.count>=21){
						_this.count=0
					}
					_this.reload(_this.count)
				},500)
			}
		})
	}
}
 return new Waterfull()
})
