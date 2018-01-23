define(["jquery"],function(){
	function reloadimg(){
		//console.log(1)
	}
	reloadimg.prototype={
		constructor:reloadimg,
		init:function(dom){
			this.reload()
			this.box=dom
			//console.log(this.box)
		},
		reload:function(){   //请求json数据
			var _this=this;
			$.ajax({
				url: 'json/mustcheck.json',
				type: 'GEt'
			})
			.then(function(res) {
				_this.create(res)
			})
		},
		create:function(data){   //将请求的数据输出在页面中
			//console.log(data)
			for(i=0;i<data.length;i++){   //字符串拼接
				var $html="<a href="+data[i].url+">"
						  +"<div class="+'must_check_item'+">"
						  +"<img src="+data[i].src+">"
						  +"<div class="+'must_check_info'+">"
						  +"<p class="+'must_check_title'+">"+data[i].title+"</p>"
						  +"<p class="+'must_check_subtit'+">"+data[i].subtit+"</p>"
						  +"<p class="+'must_check_date'+">"+data[i].date+"</p>"
					 	  +"<button class="+'must_check_btn'+" data-id="+data[i].data+">"+"立即疯抢"+"</button>"
					 	 +"</div>"
					 	 +"</div>"
					 	 +"</a>"
			    $($html).appendTo(this.box)
			}
			this.onhover()
		},
		onhover:function(){
			var $dom=$(".must_check_item")
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
			var $a=$("a:odd",this.box);
			for(i=0;i<$a.length;i++){
				$($a[i]).css({
					float:"right"
				})
			}
			$(".must_check_btn").on("mouseover",function(){
				$(this).css({
					background:"rgb(197,50,101)"
				})
			})
			$(".must_check_btn").on("mouseout",function(){
				$(this).css({
					background:"#e93b78"
				})
			})
		}
	}
   return new reloadimg()
})