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

metro.tourniquet.denial = function(){
	this.message = 'Прохода нет!';
};
metro.tourniquet.denial.prototype = Error.prototype;

metro.tourniquet.report = function(){
	this.message = 'Плохой жетон!';
};
metro.tourniquet.report.prototype = Error.prototype;
