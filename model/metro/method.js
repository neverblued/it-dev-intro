var metro = require('./index');

// coins

metro.bank.check = function(coin){
	return coin && coin.active === true;
};

metro.bank.activate = function(coin){
	coin.active = true;
};

metro.coin.prototype.use = function(){
	this.active = false;
};

metro.tourniquet.prototype.consume = function(coin){
	coin.use();
	this.coins.push(coin);
};

metro.tourniquet.prototype.reject = function(coin){
	this.waste.push(coin);
	throw new metro.tourniquet.report;
};

// people

metro.tourniquet.prototype.grant = function(){
	this.people++;
	this.message('Открыто для ' + this.people);
};

metro.tourniquet.prototype.let = function(person){
	this.people--;
	this.message(person + ', проходите! (ещё ' + this.people + ')');
};

metro.tourniquet.prototype.access = function(){
	return this.people > 0;
};

metro.tourniquet.prototype.message = function(status){
	var text = status.message || status;
	console.log('|>| ' + text);
};

// inside

metro.tourniquet.prototype.process = function(action){
	try{
		action && action.call(this);
	}catch(status){
		this.message(status);
		throw status;
	}
};
