define(["jquery"],function(){
	function Stairs(){
	}
	Stairs.prototype={
		constructor:Stairs,
		init:function(){
			//console.log(1);
			this.even()
		},
		even:function(){
			$(document).on("scroll",$.proxy(this.scroll,this))
		},
		scroll:function(){
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
			this.mixtop=$(".must_check").offset().top;   //让楼梯隐藏的最大高度和最小高度
			this.maxtop=$(".base").offset().top;
			//console.log(this.mixtop,this.maxtop)
			//console.log(scrolltop,this.mixtop,this.maxtop)
			var timer;
			var _this=this
			clearTimeout(timer)
			timer=setTimeout(function(){		
				if(scrolltop>=_this.mixtop&&scrolltop<=_this.maxtop){
					$(".stairs").css({
						display:"block"
					})
				}else{
					$(".stairs").css({
						display:"none"
					})
				}
			})
		}
	}







	return new Stairs()
})