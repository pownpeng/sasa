define(["jquery"],function(){
	function Shoppingcar(){

	}
	Shoppingcar.prototype={
		constructor:Shoppingcar,
		init:function(){
			this.box=$("button",".commodity")
			this.even()
		},
		even:function(){
			console.log(this.box)
		}
	}













	return new Shoppingcar()
})