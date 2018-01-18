require(["script/config.js"],function(){
	require(["jquery","cookie","mustcheck"],function($,cookie,mustcheck){
		mustcheck.init($(".must_check_container"))   
	})
})