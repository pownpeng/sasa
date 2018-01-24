define(["jquery"],function(){
	function seckill(){    //详情页模块
		
	}
	seckill.prototype={
		constructor:seckill,
		init:function(){
			setInterval(this.endtime,500)
			var _this=this;
			$(".se_magnifier").on("mouseenter",function(event){
				$.proxy(_this.move(),_this)
			})
			$(".se_magnifier").on("mouseleave",function(){
					$("#se_mag").css({
						display:"none"
					})
					$("#se_bag").css({
						display:"none"
					})
			})
		},
		endtime:function(){   //倒计时模块
			var date=new Date();
			var year=date.getFullYear();  //年月日
			var month=date.getMonth()+1;
			var day=date.getDate()+1;
			//console.log(year,month,day)
			var end=year+"-"+month+"-"+day
			var enddate=new Date(end).getTime()+9*60*60*1000
			//console.log(enddate,date.getTime())
			var cuttime=enddate-(date.getTime())
			//console.log(cuttime)
			var endhour=parseInt(cuttime/(60*60*1000));
			var endminutes=parseInt(cuttime%(60*60*1000)/(1000*60));
			var endseconds=parseInt(cuttime%(60*1000)/1000)
			//console.log(endhour,endminutes,endseconds)
			$("b").html(ad(endhour)+":"+ad(endminutes)+":"+ad(endseconds))
			function ad(a){
				if(a<10){
					return "0"+a
				}else{
					return a
				}
			}
		},
		move:function(){  //放大镜模块
			//console.log($("#se_mag").attr("width"),$("#se_mag").attr("height"))
			$(".se_magnifier").on("mousemove",function(event){
				var e=event||window.event
				var $offsetx=parseInt(e.offsetX-$("#se_mag").width()/2);
				var $offsety=parseInt(e.offsetY-$("#se_mag").height()/2);
				$offsetx=$offsetx<=0?0:$offsetx;
				$offsety=$offsety<=0?0:$offsety;
				$offsetx=$offsetx>$(".se_magnifier").width()-$("#se_mag").width()?$(".se_magnifier").width()-$("#se_mag").width():$offsetx;
				$offsety=$offsety>$(".se_magnifier").height()-$("#se_mag").height()?$(".se_magnifier").height()-$("#se_mag").height():$offsety;
				//console.log($offsetx,$offsety,$(".se_magnifier").width()-$("#se_mag").width()/2)
				$("#se_mag").css({
					top:$offsety,
					left:$offsetx
				})
				$(".se_bgimg").css({
					top:-$offsety*3,
					left:-$offsetx*3
				})
			})
			$("#se_mag").css({
				display:"block"
			})
			$("#se_bag").css({
				display:"block"
			})
		}
	}
	return new seckill()
})