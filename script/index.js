require(["script/config.js"],function(){  //逻辑调用模块
	require(["jquery","cookie","mustcheck","limit"],function($,cookie,mustcheck,limit){
		mustcheck.init($(".must_check_container"));
		limit.init($(".limitcommodity"))  
	})
})