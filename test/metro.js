var assert = require('assert');
var metro = require('../model/metro');
var test = {};

describe('metro', function(){
	
	it('should be ready', function(){
		assert.equal(typeof metro.bank, 'object');
		assert.equal(typeof metro.coin, 'function');
		assert.equal(typeof metro.tourniquet, 'function');
	});
	
	it('should produce coins', function(){
		test.coin = new metro.coin;
		assert.equal(metro.bank.check(test.coin), true);
	});
	
	describe('tourniquet', function(){
		
		it('should be ready', function(){
			test.tourniquet = new metro.tourniquet;
			assert.equal(test.tourniquet.access(), false);
		});
		
		it('should consume coins and grant people to enter', function(){
			test.tourniquet.feed(test.coin);
			assert.equal(test.tourniquet.access(), true);
			assert.equal(metro.bank.check(test.coin), false);
		});

		it('should let people go through', function(){
			test.person = 'Василий Пупкин';
			test.tourniquet.pass(test.person);
			assert.equal(test.tourniquet.access(), false);
		});
	});
});
