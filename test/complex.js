var should = require('should');
var metro = require('../model');
var tourniquet;

describe('Экспериментальное окружение', function(){
	(function(){
		
		it('турникет установлен', function(){
			should(tourniquet = new metro.tourniquet).be.ok;
			tourniquet.gate().should.be.true;
		});
		
		it('есть жетоны', function(){
			should(new metro.coin).be.ok;
		});
		
		it('жетоны используются', function(){
			var coin = new metro.coin;
			coin.use();
			tourniquet.check(coin).should.be.false;
		});
		
		it('жетоны проверяются', function(){
			tourniquet.check('обычный пластиковый кружочек').should.be.false;
			tourniquet.check({used: false}).should.be.false;
			tourniquet.check(undefined).should.be.false;
		});
		
	}).should.not.throw();
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
