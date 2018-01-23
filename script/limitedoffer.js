define(["jquery"],function(){     //功能模块
	function limit(){
		//console.log(1)
	}
	limit.prototype={   //限时特卖模块
		constructor:limit,
		init:function(dom){
			this.box=dom;
			setInterval($.proxy(this.countdown,this),500)
			this.reload()
		},
		reload:function(){   //请求json数据
			var _this=this;
			$.ajax({
				url: 'json/limitedoffer.json',
				type: 'GEt'
			})
			.then(function(res) {
				//console.log(res)
				_this.create(res)
			})
		},
		countdown:function(){
			//console.log(this)
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
			this.endhour=endhour;
			this.endminutes=endminutes;
			this.endseconds=endseconds;
			$(".endhou",".counttime").html(ad(this.endhour));
			$(".endmin",".counttime").html(ad(this.endminutes));
			$(".endsen",".counttime").html(ad(this.endseconds));
			function ad(a){
				if(a<10){
					return "0"+a
				}else{
					return a
				}
			}
		},
		create:function(data){   //将请求的数据输出在页面中
			//console.log(data.length)
			for(i=0;i<data.length;i++){   //字符串拼接
				var $html="<a href="+data[i].url+">"
				               +"<div class="+"limit_item"+">"
									+"<div class="+"limit_weapper"+">"
										+"<img src="+data[i].src+">"
										+"<i><b>"+data[i].sale+"<span>"+"折"+"</span>"+"</b></i>"
									+"</div>"
									+"<div class="+"limitinfo"+">"
								+"<div class="+"counttime"+">"
									+"剩余&nbsp;"
									+"<span class="+"endhou"+">"+"</span>"
									+"&nbsp;:&nbsp;"
									+"<span class="+"endmin"+">"+"</span>"
									+"&nbsp;:&nbsp;"
									+"<span class="+"endsen"+">"+"</span>"
								+"</div>"
								+"<div class="+"limitinfo_intro"+">"
									+"<i class="+"iconfont"+">"+"</i>"
									+data[i].title
								+"</div>"
								+"<div class="+"limitinfo_title"+">"
									+data[i].subtit
								+"</div>"
								+"<div class="+"limitinfo_price"+">"
									+"<div class="+"limitinfo_price_cur"+">"
										+"<span class="+"price_cur_sig"+">"+"￥"+"</span>"
										+"<span class="+"price_cur_num"+">"+data[i].price+"</span>"
									+"</div> "
									+"<div class="+"limitinfo_price_old"+">"
										+"<span class="+"price_old_sig"+">"
											+"￥"
											+"<span class="+"price_old_num"+">"+data[i].oldprice+"</span>"
										+"</span>"
									+"</div>"
								+"</div>"
							+"</div>"
							+"<div class="+"limit_bottom"+">"
								+"<div class="+"limit_bottom_sold"+">"
									+"已售"
									+"<span>"+data[i].soldnum+"</span>"
									+"件"
								+"</div>"
								+"<button class="+"limitbtn"+" data-id="+data[i].data+">"+"加入购物车"+"</button>"
							+"</div>"
						+"</div>"
					+"</a>"
					$($html).appendTo(this.box)
			}
			this.onhover()
		},
		onhover:function(){
			var $dom=$(".limit_item")
			$dom.on("mouseover",function(){
				$(this).css({
					boxShadow:"0 0 5px #ddd"
				})
			}) 
			$dom.on("mouseout",function(){
				$(this).css({
					boxShadow:"none"
				})
			})
			$(".limitbtn").on("mouseover",function(){
				$(this).css({
					background:"rgb(197,50,101)"
				})
			})
			$(".limitbtn").on("mouseout",function(){
				$(this).css({
					background:"#e93b78"
				})
			})
		}
	}
   return new limit()
})