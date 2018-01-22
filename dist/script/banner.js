define(["jquery"],function(){
	function Banner(){

	}
	Banner.prototype={
		constructor:Banner,
		init:function(){
			this.index=1;
			this.move()
			var _this=this
			$("li","#imgnav").on("mouseover",function(){
				_this.index=$(this).index()
				$.proxy(_this.move(_this.index),_this)
			})
		},
		move:function(index){
			var timer;
			var _this=this;
			this.dom=$("li",".ban")
			clearInterval(timer)
			timer=setInterval(function(){
				$.proxy(_this.anim(index),_this)
			},4000) 
		},
		anim:function(index){
				if(!index){
					this.index=index
				}
				if(this.index==this.dom.length){
					this.index=0
				}
				for(var i=0;i<this.dom.length;i++){
					this.dom[i].style.zIndex="0";
					this.dom[i].style.opacity="0"
				}
				$(this.dom[this.index]).animate({
					opacity:"1"
				},1000)
				$(this.dom[this.index]).css({
					zIndex:"1"
				})
				$("li","#imgnav").removeClass()
				$($("li","#imgnav")[this.index]).addClass("active")
				this.index++;
		}
	}





	return new Banner()
})