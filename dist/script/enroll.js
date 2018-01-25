	function Prompt(dom,p){
		this.init(dom,p)
	}
	Prompt.prototype={
		constructor:Prompt,
		init:function(dom,p){
			this.dom=dom;
			this.p=p;
			this.focusp()
		},
		focusp:function(){  //获得焦点失去焦点的时候.显示隐藏提示
			this.val=[]
			for(var i=0;i<this.dom.length;i++){
				this.val.push($(this.dom[i]).val())
			}
			var _this=this
			this.dom.on("focus",function(){
				var index =parseInt($(this).attr("data-id"))
				var newvalue=$(_this.dom[index]).val()
				$(_this.p[index]).css({
					display:"block"
				})
				if(newvalue==_this.val[index]){
					$(_this.dom[index]).val("")
				}
			})
			_this.dom.on("blur",function(){
				var index =parseInt($(this).attr("data-id"))
				var oldvalue=$(_this.dom[index]).val()
				$(_this.p[index]).css({
					display:"none"
				})
				if(oldvalue==""&&oldvalue.length<1){
					$(_this.dom[index]).val(_this.val[index])
				}
			})
			$("button",".en_main_form").on("click",$.proxy(this.marry,this))
		},
		marry:function(){
			var reg1=/^[\u4e00-\u9fa5a-zA-Z0-9_\-]{4,20}$/; //账号正则
			var reg2_1=/[a-z]/gi;    //密码正则
			var reg2_2=/\d/g;
			var reg2_3=/[!@#\$%\^&\*\(\).]/g;
			var reg2_4=/^[a-z\d_\-!@#\$%\^&\*\(\).]{6,20}$/gi;
			var val=[]
			for(var i=0;i<this.dom.length;i++){  //取得所有value值
				val.push($(this.dom[i]).val())
			}
			console.log(val[1],val.length)
			for(var j=0;j<val.length;j++){
				if(j==0){   //账号验证
					if(reg1.test(val[j])==true){
						console.log("账号正确")
					}else{
						console.log("账号错误")
						return 0;
					}
				}
				if(j==1){  密码验证
					var count=0;
					if(reg2_1.test(val[j])==true){
						count+=1;
					}
					if(reg2_2.test(val[j])==true){
						count+=1;
					}
					if(reg2_3.test(val[j])==true){
						count+=1;
					}
					if(reg2_4.test(val[j])==false){
						count=0;
					}
					switch(count){
						case 0: console.log("请输入正确的密码格式");break;
						case 1: console.log("有被盗风险,建议使用字母,数字和符号两种以上组合");break;
						case 2: console.log("密码强度适中,可以使用三种以上的组合来提高安全强度");break;
						case 3: console.log("你的密码很安全");break;
					}
				}
				if(j==2){  //再次输入密码验证
					if(val[j]==val[j-1]){
						console.log(密码正确)
					}else{
						console.log(两次密码输入不一致)
					}
				}
				if(j==3){  //手机号码验证
					var pnone=/^1[34578]\d{9}$/
					if(pnone.text(val[j])){
						console.log(格式正确)
					}else{
						console.log(格式有误)
					}
				}
				if(j==4){  //验证码验证
					var yzmreg=/YMR5/i
					if(val[j]==yzmreg){
						console.log("1")
					}
				}
			}
		}
	}
 new Prompt($("input",".en_main_form"),$("p",".en_main_form"))