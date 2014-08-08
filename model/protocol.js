var metro = require('./index');

metro.tourniquet.prototype.feed = function(coin){
	this.try(function(){
		if(metro.bank.fake(coin)){
			this.reject(coin);
			this.signal('fake', coin);
		}else{
			this.consume(coin);
			this.grantAccess();
			this.display('limit');
		}
	});
};

metro.tourniquet.prototype.pass = function(person){
	this.try(function(){
		if(this.gate()){
			this.signal('stop');
		}else{
			this.letGo(person);
			this.display('pass', person);
		}
	});
};
