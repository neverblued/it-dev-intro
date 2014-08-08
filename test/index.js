var should = require('should');
var assert = require('./assert');

var metro = require('../model');

describe('Модель пропускной системы метро', function(){
	
	it('описывает протокол взаимодействия пассажира с системой', function(){
		assert.protocol(metro.protocol.welcome, ['feed', 'pass']);
	});
	
	it('описывает сущности жетона и турникета', function(){
		assert.entity(metro.coin);
		assert.entity(metro.tourniquet);
	});
	
	it('описывает методы жетона', function(){
		assert.methods(metro.coin.prototype, ['use']);
	});
	
	it('описывает методы турникета', function(){
		assert.methods(metro.tourniquet.prototype, ['check', 'consume', 'reject', 'admit', 'omit', 'gate']);
	});
});

var tourniquet = new metro.tourniquet;

describe('Жетоны', function(){
	
	it('создаются и используются', function(){
		var coin = new metro.coin;
		tourniquet.check(coin).should.be.true;
		coin.use();
		tourniquet.check(coin).should.be.false;
	});
	
	it('отличаются от фальшивых', function(){
		tourniquet.check('обычный пластиковый кружочек').should.be.false;
		tourniquet.check({used: false}).should.be.false;
		tourniquet.check(undefined).should.be.false;
	});
});

describe('Турникет', function(){
		
	it('готов', function(){
		tourniquet.gate().should.be.true;
	});
	
	it('принимает два жетона', function(){
		var processCoin = function(){
			var coin = new metro.coin;
			(function(){
				metro.protocol.welcome.feed(tourniquet, coin);
			}).should.not.throw();
			tourniquet.check(coin).should.be.false;
			tourniquet.gate().should.be.false;
		};
		processCoin();
		processCoin();
	});
	
	it('не принимает фальшивку', function(){
		(function(){
			metro.protocol.welcome.feed(tourniquet, 'фальшивый жетон');
		}).should.throw(tourniquet.message('fake'));
	});
	
	var nextPassenger = (function(){
		var nicknames = ['Василий Пупкин', 'Надежда Крупская', 'Заяц'];
		return function(){
			return nicknames.shift();
		};
	})();
	
	it('пропускает двоих пассажиров за два жетона', function(){
		var passNext = function(){
			tourniquet.gate().should.be.false;
			(function(){
				metro.protocol.welcome.pass(tourniquet, nextPassenger());
			}).should.not.throw();
		};
		passNext();
		passNext();
	});
	
	it('не пропускает зайца', function(){
		tourniquet.gate().should.be.true;
		(function(){
			metro.protocol.welcome.pass(tourniquet, nextPassenger());
		}).should.throw(tourniquet.message('stop'));
	});
});
