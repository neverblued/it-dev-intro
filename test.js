var should = require('should');
var metro = require('./model');

describe('Модель', function(){
	
	it('сущности', function(){
		should(metro.bank).be.type('object');
		should(metro.coin).be.type('function');
		should(metro.tourniquet).be.type('function');
	});
	
	var assertMethods = function(target, list){
		list.forEach(function(method){
			should(target[method]).be.ok.and.type('function');
		});
	};
	
	it('протокол жетонов', function(){
		assertMethods(metro.bank, [
			'fake', 'activate'
		]);
	});
	
	it('методы турникета', function(){
		assertMethods(metro.tourniquet.prototype, [
			'feed', 'pass', 'consume', 'reject', 'grantAccess', 'letGo', 'gate'
		]);
	});
});

describe('Жетоны', function(){
	
	it('проверяются', function(){
		metro.bank.fake(undefined).should.be.true;
		metro.bank.fake('фальшивка').should.be.true;
	});
	
	var coin = new metro.coin;
	
	it('производятся', function(){
		metro.bank.fake(coin).should.be.false;
	});
	
	it('используются', function(){
		coin.use();
		metro.bank.fake(coin).should.be.true;
	});
});

describe('Турникет', function(){
	var tourniquet = new metro.tourniquet;
		
	it('готов', function(){
		tourniquet.gate().should.be.true;
	});
	
	it('принимает два жетона', function(){
		var processCoin = function(){
			var coin = new metro.coin;
			(function(){
				tourniquet.feed(coin);
			}).should.not.throw();
			metro.bank.fake(coin).should.be.true;
			tourniquet.gate().should.be.false;
		};
		processCoin();
		processCoin();
	});
	
	it('не принимает фальшивку', function(){
		(function(){
			tourniquet.feed('фальшивка');
		}).should.throw(tourniquet.message('fake'));
	});
	
	var nextPerson = (function(){
		var people = ['Василий Пупкин', 'Надежда Крупская', 'Вера Брежнева'];
		return function(){
			return people.shift();
		};
	})();
	
	it('пропускает двоих людей за два жетона', function(){
		var letPerson = function(){
			tourniquet.gate().should.be.false;
			(function(){
				tourniquet.pass(nextPerson());
			}).should.not.throw();
		};
		letPerson();
		letPerson();
	});
	
	it('не пропускает зайца', function(){
		tourniquet.gate().should.be.true;
		(function(){
			tourniquet.pass(nextPerson());
		}).should.throw(tourniquet.message('stop'));
	});
});
