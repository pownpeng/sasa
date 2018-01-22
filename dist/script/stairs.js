define(["jquery"],function(){
	function Stairs(){
	}
	Stairs.prototype={
		constructor:Stairs,
		init:function(){
			this.even()
		},
		even:function(){
			var _this=this;
			$("div",".stairs").on("click",function(e){
				e.preventDefault()
				_this.index=$(this).index();
				$.proxy(_this.move($(this).index()),this)
			})
			$(document).on("scroll",function(){
				$.proxy(_this.scroll(),_this)
			})
		},
		scroll:function(){
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
			this.mixtop=$(".must_check").offset().top;   //让楼梯隐藏的最大高度和最小高度
			this.maxtop=$(".base").offset().top;    //为什么要放在这?因为ajax请求是异步,如果放在前面,这两个值就会出现错误
			//console.log(this.mixtop,this.maxtop)
			//console.log(scrolltop,this.mixtop,this.maxtop)
			var clientwidth=document.documentElement.clientWidth||document.body.clientWidth;
			$(".stairs").css({
				left:clientwidth/2-1200/2+"px",
				top:40+"px"
			})
			var timer;
			var _this=this
			clearTimeout(timer)
			timer=setTimeout(function(){		
				if(scrolltop>=_this.mixtop&&scrolltop<=_this.maxtop){
					$(".stairs").css({
						position:"fixed",
						display:"block"
					})
				}else{
					$(".stairs").css({
						position:"absolute",
						display:"none"
					})
				}
			},30)
			this.floo()
		},
		floo:function(){
			var scrolltop=Math.round(document.documentElement.scrollTop||document.body.scrollTop);
			this.ele=$(".commodity>div")
			for(var i=0;i<$("div",".stairs").length;i++){
				$($("div",".stairs")[i]).css({
					background:"#fff",
					color:"#000"
				})
			}
			var stop1=this.ele[0].offsetTop
			var stop2=this.ele[1].offsetTop
			var stop3=this.ele[2].offsetTop
			var stop4=this.ele[3].offsetTop
			//console.log(scrolltop,stop1,stop2,stop3,stop4)
			if(scrolltop>=stop1&&scrolltop<stop2){
				this.index=0
			}else if(scrolltop>=stop2&&scrolltop<stop3){
				this.index=1
			}else if(scrolltop>=stop3&&scrolltop<stop4){
				this.index=2
			}else if(scrolltop>=stop4){
				this.index=3
			}
			$($("div",".stairs")[this.index]).css({
					background:"#ec3e7d",
					color:"#fff"
			})
			var _this=this
			$("div",".stairs").on("mouseover",function(){
				var num=$(this).index()
				if(_this.index!=num){
						$($("div",".stairs")[num]).css({
						background:"#ec3e7d",
						color:"#fff"
					})
				}
			})
			$("div",".stairs").on("mouseout",function(){
				var num=$(this).index()
				if(_this.index!=num){
						$($("div",".stairs")[num]).css({
						background:"#fff",
						color:"#000"
					})
				}
			})
		},
		move:function(index){
			var stop=$(".commodity>div")[index].offsetTop
			$("body,html").animate({"scrollTop":stop},300);
			this.sold(index)
		},
		sold:function(index){
			if(!index){
				for(var i=0;i<$("div",".stairs").length;i++){
					$($("div",".stairs")[i]).css({
						background:"#fff",
						color:"#000"
					})
				}
				$($("div",".stairs")[index]).css({
					background:"#ec3e7d",
					color:"#fff"
				})
			}
		}
	}
	return new Stairs()
})