var metro = require('./index');

metro.tourniquet.prototype.feed = function(coin){
	this.process(function(){
		if(metro.bank.check(coin)){
			this.consume(coin);
			this.grant();
		}else{
			this.reject(coin);
		}
	});
};

metro.tourniquet.prototype.pass = function(person){
	this.process(function(){
		if(!this.access()){
			throw new metro.tourniquet.denial;
		}
		this.let(person);
	});
};
