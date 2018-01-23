function seckill(){
	this.init()
}
seckill.prototype={
	constructor:seckill,
	init:function(){
		setInterval(this.endtime,500)
	},
	endtime:function(){
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
	}
}
new seckill()