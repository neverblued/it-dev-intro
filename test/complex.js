var expect = require('chai').expect;
var should = require('chai').should();

var metro = require('../domain');
var tourniquet;

describe('Экспериментальное окружение', function(){
		
	it('турникет установлен', function(){
		tourniquet = new metro.tourniquet;
		expect(tourniquet).to.be.an.instanceOf(metro.tourniquet);
		expect(tourniquet.gate()).to.be.true;
	});

	it('жетоны есть', function(){
		expect(new metro.coin).to.be.ok;
	});

	it('жетоны используются', function(){
		var coin = new metro.coin;
		expect(tourniquet.check(coin)).to.be.true;
		coin.use();
		expect(tourniquet.check(coin)).to.be.false;
	});

	it('жетоны проверяются', function(){
		expect(tourniquet.check('обычный пластиковый кружочек')).to.be.false;
		expect(tourniquet.check({used: false})).to.be.false;
		expect(tourniquet.check(undefined)).to.be.false;
	});
});

describe('Турникет', function(){
		
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
	
	it('пропускает двоих', function(){
		var passNext = function(){
			tourniquet.gate().should.be.false;
			(function(){
				metro.protocol.welcome.pass(tourniquet, nextPassenger());
			}).should.not.throw();
		};
		passNext();
		passNext();
	});
	
	it('ловит зайца', function(){
		tourniquet.gate().should.be.true;
		(function(){
			metro.protocol.welcome.pass(tourniquet, nextPassenger());
		}).should.throw(tourniquet.message('stop'));
	});
});
