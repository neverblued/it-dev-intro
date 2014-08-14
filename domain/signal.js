var metro = require('./index');

metro.tourniquet.prototype.try = function(action){
	try{
		action && action.call(this);
	}catch(status){
		this.catch(status);
	}
};

metro.tourniquet.prototype.catch = function(status){
	this.output(status);
	throw status;
};

metro.tourniquet.prototype.signal = function(){
	throw new Error(this.message.apply(this, arguments));
};
