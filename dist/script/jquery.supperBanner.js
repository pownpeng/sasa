

		/*
		v:0.9.0
		轮播图插件;    把这个插件绑定到jQuery中,所以调用的时候直接调用$().supperbanner就行
		src:[]         必选参数:传入图片链接数组;
		create_btn     默认为true,是否创建控空间 激活按钮用 class supperbanner_active;
		movement_mode  运动模式默认为 fade 提供选项 slide scroll 
		autoplay       默认为false,自动播放选项;
		

		__by:huaizhi 2018年1月10日15:51:39
	*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
})((function($,window){

		//默认参数;
		var defaults = {
			src:[],
			create_btn:true,
			movement_mode:"fade",
			autoplay:false
		}

		var index = 0;//默认显示的图片;
		var prev = 0; //上一张图片;
		var next = 0; //下一张图片;
		var out = 0;

		function Banner(opts,ele){
			this.init(opts,ele)
		}
		Banner.prototype = {
			constructor:Banner,
			init:function(opts,ele){
				// 参数判断;
				// 让 opt 一定为大于1项的数组;
				if(!(opts instanceof Object) || opts==undefined || opts == "string"){
					throw "请输入正确的配置参数，要求配置参数为Object类型";
				} 
				if(!(opts.src instanceof Array)){
					throw "请输入正确的src配置,src必须为大于1项的数组";
				}
				//参数合并;
				this.opts = $.extend(defaults,opts);
				this.ele = ele;
				this.callme = "";
				this.rendring_pag();
				//console.log(this.$ul,this.$btn_box);
				this.$btn_box.children().on("mouseenter",$.proxy(this.moveTo,this))
				/*
					{
						"mosueover":function(){},
						"mosueout":function(){}
					}
				*/
				if(this.opts.autoplay){
					this.autoplay();
				}
			},
			moveTo:function(e){
				if(e instanceof Object){
					var $btn = $(e.target);
					out = index;//决定谁出厂;
					if(index == $btn.index()){
						return 0;
					}
					index = $btn.index();//获取当前下标;
					this.callme = "event";
				}else{
					var $btn = this.$btn_box.children().eq(index);
					this.callme = "interval";
				}
				
				$btn.addClass("supperbanner_active")
				.siblings()
				.removeClass("supperbanner_active");
				switch(this.opts.movement_mode){
					case "fade":this.fade();break;
					case "slide":this.slide();break;
					case "scroll":this.scroll();break;
				}
			},
			rendring_pag:function(){
				//和forEach一样;
				this.$ul = $("<ul></ul>");
				//装按钮的盒子;
				var $btn_box = $("<div></div>");
				this.$ul.addClass("supperbanner_img_contants");
				$btn_box.addClass("supperbanner_btn_wrap");
				var _this = this;
				$.each(this.opts.src,function(index,src){
					var $li = $("<li></li>")
					var $img = $("<img>")
					$img.attr("src",src);
					$li.append($img);
					_this.$ul.append($li);
					//按钮；
					var $span = $("<span></span>");
					//$span.html(index);
					$btn_box.append($span);
				})
				//console.log($ul[0]);
				this.ele.append(this.$ul);
				this.ele.append($btn_box);

				this.$btn_box = $btn_box;
				this.$btn_box.children().eq(index).addClass("supperbanner_active")

				this.reset_ele();//结构结束 =>初始化样式;
			},
			reset_ele:function(){
				//初始化样式;
				var $ele = this.ele;
				var $ul = this.ele.find(".supperbanner_img_contants");
				var $li = $ul.find("li");
				var $width = $ele.width(); //当前元素的
				var $height = $ele.height(); //当前元素的
				$ele.css({
					position:"relative",
					overflow:"hidden"
				})
				$li.css({
					width:$width,
					height:$height
				})
				$li.find("img").css({
					width:$width,
					height:$height,
				})
				//根据不同的动画执行不同的初始化样式方法;
				if(this.opts.movement_mode == "scroll"){
					// $ul.width( $width * $li.length);
					// $li.css({
					// 	float:"left"
					// })
					$li.css({
						position:"absolute",
						top:-$li.height()
					})
					$li.eq(0).css({
						top:0
					})

				}else if(this.opts.movement_mode == "fade" || this.opts.movement_mode == "slide"){
					$ul.width($width)
					$li.width($width)
					$li.css({
						position:"absolute",
						left:0,
						top:0
					})
					$li.eq(0).css({
						zIndex:1
					})
					.siblings()
					.css({
						display:"none"
					})
				}
			},
			prev:function(){

			},
			next:function(){

			},
			fade:function(){
				this.$ul.children().eq(index)
				.stop()
				.fadeIn()
				.siblings().stop()
				.fadeOut()
			},
			slide:function(){
				this.$ul.children().eq(index)
				.stop()
				.slideDown()
				.siblings().stop()
				.slideUp()
			},
			scroll:function(){
				var $li = this.$ul.children();
				
				$li.eq(index).css({
					top:-$li.height(),
					zIndex:1
				}).stop(true).animate({
					top:0
				})

				$li.eq(out).css({
					top:0
				}).animate({
					top:$li.height()
				})

				// this.$ul.animate({
				// 	marginLeft:-this.$ul.children().eq(0).width() * index
				// })
			},
			autoplay:function(){
				var _this = this;
				this.timer = setInterval(function(){
					if(index == _this.$ul.children().length - 1){
						index = 0;
					}else{
						index++;
					}
					_this.rangIndex();
					//console.log(index,prev,next);
					_this.moveTo();
				},2000)
			},
			rangIndex:function(){
				//1.计算出 上一张;
				//2.计算出下一张;
				if(index == 0){
					out = this.$ul.children().length - 1;//最后一张;
				}else{
					out = index - 1;
				}
				if(index == this.$ul.children().length - 1){
					next = 0;
				}else{
					next = index + 1;
				}
			}

		}
		$.fn.extend({
			supperBanner:function(opts){
				return new Banner(opts,this);
			}
		})
	
}))
	
