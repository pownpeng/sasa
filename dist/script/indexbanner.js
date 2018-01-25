define(["jquery"],function(){   //轮播图模块
	function Banner(){

	}
	Banner.prototype={
		constructor:Banner,
		init:function(dom){
			this.box=dom;
			this.index=0;
			this.cspan()
		},
		cspan:function(){  //播放
			this.lis=this.box.find("li")
			this.spans=this.box.find("span")
			//console.log(this.lis)
			var _this=this
			this.timer;
			clearInterval(this.timer)
			this.timer=setInterval(function(){
				//console.log(new Date())
				_this.index++
				if(_this.index>=5){
					_this.index=0
				}
				for(var i=0;i<_this.lis.length;i++){  //清除样式
					$(_this.lis[i]).css({
						opacity:0,
						zIndex:"0"
					})
					$(_this.spans[i]).removeClass("active")
				}
				$(_this.lis[_this.index]).css({
					opacity:0,
					zIndex:"1"
				})
				$(_this.lis[_this.index]).stop(true,true).animate({
					opacity:1
				},500)
				$(_this.spans[_this.index]).addClass("active")
			},4000)
			this.movehov()
		},
		movehov:function(){  //下方按钮操作区
			var _this=this
			this.box.on("mouseenter",function(){
				clearInterval(_this.timer)
			})
			this.spans.on("mouseover",function(){
				_this.index=$(this).index()
				for(var i=0;i<_this.lis.length;i++){
					$(_this.lis[i]).css({
						opacity:0,
						zIndex:"0"
					})
					$(_this.spans[i]).removeClass("active")
				}
				$(_this.lis[_this.index]).css({
					opacity:0,
					zIndex:"1"
				})
				$(_this.lis[_this.index]).stop(true,true).animate({
					opacity:1
				},500)
				$(_this.spans[_this.index]).addClass("active")
			})
			this.box.on("mouseleave",function(){
				_this.cspan()
			})
		}
	}
 return new Banner()
})