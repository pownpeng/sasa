require(["script/config.js"],function(){  //逻辑调用模块
	require(["jquery","cookie","mustcheck","limit","ranklist","newbase","stairs","banner","shopcar","cookie","shoplist","effect","motion"],function($,cookie,mustcheck,limit,ranklist,newbase,stairs,banner,shopcar,cookie,shoplist,effect,motion){
		mustcheck.init($(".must_check_container"));
		limit.init($(".limitcommodity"));
		ranklist.init($(".ranklist"));
		newbase.init($(".newlist"));   //上面都是请求json数据和进行字符串拼接,以及一些小特效
		stairs.init();        //楼梯
		shopcar.init($(".limit"),$(".shopnum"));
		shoplist.init(); 
		//console.log($(".in_shop")==undefined)
		effect.init();
		$(".box").supperBanner({//轮播图
			src:[
				"http://cn04.alicdn.sasa.com/public/images/5a/d9/27/0048166566152ec957a1a9146d31e34785dd6c32.png?1516672734#w",
				"http://cn03.alicdn.sasa.com/public/images/a4/30/e6/32baf24d8be1b00361494e8ffbac336da49729c1.jpg?1516613695#w",
				"http://cn02.alicdn.sasa.com/public/images/8d/f3/d1/90be77aa9e4a5d0f494112fe303d3965501c0c2f.jpg?1516359060#w",
				"http://cn02.alicdn.sasa.com/public/images/ec/16/bd/74d4c5a5ef1dd4d552c8bacf139f9724d9b987bb.jpg?1516257768#w",
				"http://cn03.alicdn.sasa.com/public/images/76/5b/b8/f7a55f6c57f29e51c89cbb9835150898a3716b57.jpg?1516347610#w"
			],
			autoplay:true
		});
		motion.init()
	})
})