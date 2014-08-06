var metro = require('../model/metro');
var tourniquet, coin, person = 'Василий Пупкин';
require('should');

describe('metro', function(){
	
	it('should be ready', function(){
		metro.bank.should.be.type('object');
		metro.coin.should.be.type('function');
		metro.tourniquet.should.be.type('function');
	});
	
	it('should produce coins', function(){
		coin = new metro.coin;
		metro.bank.check(coin).should.be.true;
	});
	
	describe('tourniquet', function(){
		
		it('should be ready', function(){
			tourniquet = new metro.tourniquet;
			tourniquet.access().should.be.false;
		});
		
		it('should consume coins and grant people to enter', function(){
			tourniquet.feed(coin);
			tourniquet.access().should.be.true;
			metro.bank.check(coin).should.be.false;
		});

		it('should let people go through', function(){
			person = 'Василий Пупкин';
			tourniquet.pass(person);
			tourniquet.access().should.be.false;
		});
	});
});
