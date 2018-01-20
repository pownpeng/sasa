require(["script/config.js"],function(){  //逻辑调用模块
	require(["jquery","cookie","mustcheck","limit","ranklist","newbase","stairs"],function($,cookie,mustcheck,limit,ranklist,newbase,stairs){
		mustcheck.init($(".must_check_container"));
		limit.init($(".limitcommodity"));
		ranklist.init($(".ranklist"));
		newbase.init($(".newlist"));
		stairs.init()
	})
})