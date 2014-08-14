var metro = require('./index');

// entities

metro.coin = function(){
	this.used = false;
};

metro.tourniquet = function(){
	this.coins = [];
	this.waste = [];
	this.people = 0;
};

// coins

metro.coin.prototype.use = function(){
	this.used = true;
};

metro.tourniquet.prototype.check = function(coin){
	return !!(coin && coin instanceof metro.coin && !coin.used);
};

metro.tourniquet.prototype.consume = function(coin){
	coin.use();
	this.coins.push(coin);
};

metro.tourniquet.prototype.reject = function(coin){
	this.waste.push(coin);
};

// people

metro.tourniquet.prototype.gate = function(){
	return this.people < 1;
};

metro.tourniquet.prototype.admit = function(){
	this.people++;
};

metro.tourniquet.prototype.omit = function(){
	this.people--;
};
