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
