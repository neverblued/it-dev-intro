var metro = require('./index');

// status

metro.tourniquet.denial = function(){
	this.message = metro.message.denial;
};
metro.tourniquet.denial.prototype = Error.prototype;

metro.tourniquet.injury = function(){
	this.message = metro.message.injury;
};
metro.tourniquet.injury.prototype = Error.prototype;

// process

metro.tourniquet.prototype.process = function(action){
	try{
		action && action.call(this);
	}catch(status){
		this.message(status);
		throw status;
	}
};
