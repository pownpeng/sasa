require(["script/config.js"],function(){  //逻辑调用模块
	require(["jquery","cookie","mustcheck","limit","ranklist","newbase"],function($,cookie,mustcheck,limit,ranklist,newbase){
		mustcheck.init($(".must_check_container"));
		limit.init($(".limitcommodity"));
		ranklist.init($(".ranklist"));
		newbase.init($(".newlist"))
	})
})