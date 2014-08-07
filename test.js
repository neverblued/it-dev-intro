var metro = require('./model');

var nextPerson = (function(){
	var people = ['Василий Пупкин', 'Надежда Крупская', 'Вера Брежнева'];
	return function(){
		return people.shift();
	};
})();

require('should');

describe('Модель', function(){
	it('описывает сущности', function(){
		metro.bank.should.be.type('object');
		metro.coin.should.be.type('function');
		metro.tourniquet.should.be.type('function');
	});
	it('описывает протокол жетонов', function(){
		metro.bank.check.should.be.type('function');
		metro.bank.activate.should.be.type('function');
	});
	it('описывает методы турникета', function(){
		['feed', 'pass', 'consume', 'reject', 'grant', 'let', 'access'].forEach(function(method){
			metro.tourniquet.prototype[method].should.be.type('function');
		});
	});
});

describe('Жетоны', function(){
	
	it('проверяются', function(){
		metro.bank.check(undefined).should.be.false;
		metro.bank.check('фальшивка').should.be.false;
	});
	
	var coin = new metro.coin;
	
	it('производятся', function(){
		metro.bank.check(coin).should.be.true;
	});
	
	it('используются', function(){
		coin.use();
		metro.bank.check(coin).should.be.false;
	});
});

describe('Турникет', function(){
	var tourniquet = new metro.tourniquet;
		
	it('готов', function(){
		tourniquet.access().should.be.false;
	});

	it('принимает два жетона', function(){
		var processCoin = function(){
			var coin = new metro.coin;
			(function(){
				tourniquet.feed(coin);
			}).should.not.throw();
			metro.bank.check(coin).should.be.false;
			tourniquet.access().should.be.true;
		};
		processCoin();
		processCoin();
	});

	it('не принимает фальшивку', function(){
		(function(){
			tourniquet.feed('фальшивка');
		}).should.throw(metro.message.injury);
	});

	it('пропускает двоих людей за два жетона', function(){
		var letPerson = function(){
			tourniquet.access().should.be.true;
			(function(){
				tourniquet.pass(nextPerson());
			}).should.not.throw();
		};
		letPerson();
		letPerson();
	});
	
	it('не пропускает зайца', function(){
		tourniquet.access().should.be.false;
		(function(){
			tourniquet.pass(nextPerson());
		}).should.throw(metro.message.denial);
	});
});
