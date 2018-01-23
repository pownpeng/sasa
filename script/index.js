require(["script/config.js"],function(){  //逻辑调用模块
	require(["jquery","cookie","mustcheck","limit","ranklist","newbase","stairs","banner","shopcar","cookie"],function($,cookie,mustcheck,limit,ranklist,newbase,stairs,banner,shopcar,cookie){
		mustcheck.init($(".must_check_container"));
		limit.init($(".limitcommodity"));
		ranklist.init($(".ranklist"));
		newbase.init($(".newlist"));   //上面都是请求json数据和进行字符串拼接,以及一些小特效
		stairs.init();        //楼梯
		banner.init();
		shopcar.init();
	})
})