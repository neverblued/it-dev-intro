var metro = require('./index');

metro.protocol = {};

metro.protocol.welcome = {};

metro.protocol.welcome.feed = function(tourniquet, coin){
	tourniquet.try(function(){
		if(this.check(coin)){
			this.consume(coin);
			this.admit();
			this.display('limit');
		}else{
			this.reject(coin);
			this.signal('fake', coin);
		}
	});
};

metro.protocol.welcome.pass = function(tourniquet, person){
	tourniquet.try(function(){
		if(this.gate()){
			this.signal('stop');
		}else{
			this.omit(person);
			this.display('pass', person);
		}
	});
};
