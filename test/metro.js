var metro = require('../model/metro');

var tourniquet;
var coin;
var fake = "фальшивка";
var people = ['Василий Пупкин', 'Надежда Крупская', 'Вера Брежнева'];
var next = function(){
	return people.shift();
};

require('should');

describe('Метро', function(){
	it('Проверка сущностей', function(){
		metro.bank.should.be.type('object');
		metro.coin.should.be.type('function');
		metro.tourniquet.should.be.type('function');
	});
});
	
describe('Жетоны', function(){
	
	it('производятся', function(){
		coin = new metro.coin;
		metro.bank.check(coin).should.be.true;
	});
	
	it('проверяются', function(){
		coin = undefined;
		metro.bank.check(coin).should.be.false;
	});
});
	
describe('Турникет', function(){
		
	it('готов', function(){
		tourniquet = new metro.tourniquet;
		tourniquet.access().should.be.false;
	});

	it('принимает жетоны', function(){
		var processCoin = function(){
			coin = new metro.coin;
			(function(){
				tourniquet.feed(coin);
			}).should.not.throw();
			metro.bank.check(coin).should.be.false;
			tourniquet.access().should.be.true;
		};
		processCoin();
		processCoin();
	});

	it('не принимает использованнные жетоны', function(){
		metro.bank.check(coin).should.be.false;
		(function(){
			tourniquet.feed(coin);
		}).should.throw(metro.message.injury);
	});

	it('не принимает фальшивые жетоны', function(){
		metro.bank.check(fake).should.be.false;
		(function(){
			tourniquet.feed(fake);
		}).should.throw(metro.message.injury);
	});

	it('пропускает двоих', function(){
		var letPerson = function(){
			tourniquet.access().should.be.true;
			(function(){
				tourniquet.pass(next());
			}).should.not.throw();
		};
		letPerson();
		letPerson();
	});
	
	it('не пропускает зайца', function(){
		tourniquet.access().should.be.false;
		(function(){
			tourniquet.pass(next());
		}).should.throw(metro.message.denial);
	});
});
