var metro = require('./index');

metro.bank = {};

metro.coin = function(){
	metro.bank.activate(this);
};

metro.tourniquet = function(){
	this.coins = [];
	this.waste = [];
	this.people = 0;
};

// coins

metro.bank.fake = function(coin){
	return !coin || !coin.active;
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
};

// people

metro.tourniquet.prototype.grantAccess = function(){
	this.people++;
};

metro.tourniquet.prototype.letGo = function(){
	this.people--;
};

metro.tourniquet.prototype.gate = function(){
	return !this.people;
};
