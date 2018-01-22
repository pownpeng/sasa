function Sign(){
	this.init()
}
Sign.prototype={
	constryctor:Sign,
	init:function(){
		this.ele=$("a",".sn_tab")
		this.code=$(".sn_code")
		this.user=$(".sn_accountuser")
		this.even();
		this.focu();
		$("button",".sn_accountuser").on("click",$.proxy(this.sign,this))
	},
	even:function(){
		var _this=this;
		this.ele.on("click",function(e){
			e.preventDefault()
			_this.index=$(this).index()
			_this.ele.css({
				color:"#666",
				fontWeight:"400"
			})
			$(this).css({
				color:"#e4393c",
				fontWeight:"700"
			})
			if(_this.index==0){
				_this.code.css({
					display:"block"
				})
				_this.user.css({
					display:"none"
				})
			}else{
				_this.code.css({
					display:"none"
				})
				_this.user.css({
					display:"block"
				})
			}
		})
	},
	focu:function(){
		var val=[]
		for(var i=0;i<$("input",".sn_accountuser").length;i++){
			val.push($($("input",".sn_accountuser")[i]).attr("placeholder"))
		}
		$("input",".sn_accountuser").on("focus",function(){
				$(this).attr("placeholder","")
		})
		$("input",".sn_accountuser").on("blur",function(){
			var index =parseInt($(this).attr("data-id"))
			$(this).attr("placeholder",val[index])
		})
	},
	sign:function(){
		var loginreg=/^[1][3,4,5,7,8][0-9]{9}$/g;
		var passreg=/^[a-z\d_\-!@#\$%\^&\*\(\).]{6,20}$/gi;
		var login=$(".sn_usertext").val()
		var pass=$(".sn_upasstext").val()

		if(loginreg.test(login)){
			$(".sn_user").css({
				border:"1px solid #c3fec3"
			})
		}else{
			$(".sn_user").css({
				border:"1px solid #fec3c3"
			})
		}
		if(passreg.test(pass)){
			$(".sn_password").css({
				border:"1px solid #c3fec3"
			})
		}else{
			$(".sn_password").css({
				border:"1px solid #fec3c3"
			})
		}
	}
}

new Sign()









