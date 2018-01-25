define(["jquery"],function(){
	function Motion(){

	}
	Motion.prototype={  //二级菜单及模糊搜索模块,以及其他特效,比如移动上去改变字体颜色
		constructor:Motion,
		init:function(){
			this.$lis=$("#sasacategory>ul>li")
			this.$tabs=$("#bar>ul>li")
			this.hove()
			this.tab()
			this.ho()
			this.search()
			this.mohu()
		},
		hove:function(){
			this.$lis.on("mouseover",function(){
				$(this).css({
					background:"#fff"
				})
				$(this).find("a").css({
					color:"#fa3778"
				})
				$(this).find("i").css({
					color:"#fa3778"
				})
				$(this).find("ul").css({
					display:"block"
				})
			})
			this.$lis.on("mouseout",function(){
				$(this).css({
					background:"#fa3778"
				})
				$(this).find("a").css({
					color:"#fff"
				})
				$(this).find("i").css({
					color:"#fff"
				})
				$(this).find("ul").css({
					display:"none"
				})
			})
		},
		tab:function(){
			var timer;
			this.$tabs.on("mouseenter",function(){
				$(this).css({
					background:"#fff"
				})
				var _this=this;
				clearTimeout(timer)
				timer=setTimeout(function(){
					$(_this).find("ul").stop(true,true).animate({
						height:"150px"
					})
					.css({
						padding:"5px 10px 10px 10px"
					})
				},1000/60)
			})
			this.$tabs.on("mouseleave",function(){
				$(this).css({
					background:"#f2f2f2"
				})
				$(this).find("ul").animate({
					height:"0"
				})
				$(this).find("ul").animate({
					padding:"0"
				})
			})
		},
		ho:function(){
			$("#sasacategory").delegate("span","mouseover",function(){ //事件委托
				$(this).css({
					color:"#fa3778"
				})
			});
			$("#sasacategory").delegate("span","mouseout",function(){ //事件委托
				$(this).css({
					color:"#999"
				})
			})
			if(!$(".cate").attr("data-id")){
				//console.log(1)
				$("#category").on("mouseover",function(){
					$("#sasacategory>ul").css({
						display:"block",
						zIndex:"1000"
					})
				})
				$("#category").on("mouseout",function(){
					$("#sasacategory>ul").css({
						display:"none"
					})
				})
			}
		},
		search:function(){
			var _this=this
			$(".searchinput input").on("focus",function(){
				$(".searchinput ul").css({
					display:"block"
				})
			})
			$(".searchinput input").on("blur",function(){
				$(".searchinput ul").css({
					display:"none"
				})
				$(".searchinput ul").html("")
				$(".searchinput input").val("")
			})
			
		},
		mohu:function(){
			var _this=this
			$(".searchinput input").on("input",function(){
				var item=$(this).val()
				_this.jsonp("http://suggestion.baidu.com/","cb",function(res){
					_this.create(res.s)
				},"wd="+item)

			})
		},
		create:function(data){
			//console.log(data)
			var $html="";
			data.forEach(function(item){
				$html+= "<li><a href='#'>"+item+"</a></li>"
			})
			$(".searchinput ul").html($html)
		},
		jsonp:function (url,string_callback,fn_callback){
				var fn_name =("jsonp_callback_" + Math.random()).replace(/\./g,"");
				window[fn_name] = function(res){
					fn_callback(res);
					delete window[fn_name];
				}
				url =url+ "?" + string_callback + "=" +fn_name;
				if(arguments.length > 3){
					for(var i = 3 ; i < arguments.length ; i++){
						url =url + "&"+arguments[i]
					}
				}
				var old_script = document.querySelector("[json_script_data]");
				if(old_script){
					old_script.remove();
				}
				var script = document.createElement("script");
				script.src = url;
				script.setAttribute("json_script_data",fn_name);
				document.documentElement.appendChild(script);
		}
	}

	return new Motion()
})