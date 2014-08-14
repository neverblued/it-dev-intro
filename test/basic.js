var expect = require('chai').expect;

var metro = require('../domain');

describe('Модель пропускной системы метро', function(){
	
	describe('описывает протокол взаимодействия', function(){
		it('пассажира с системой при входе', function(){
			expect(metro.protocol).to.have.keys('welcome');
			expect(metro.protocol.welcome).to.have.keys('feed', 'pass');
		});
	});
	
	describe('описывает сущности', function(){
		it('жетон', function(){
			expect(metro.coin).to.be.a('function');
			expect(metro.coin.prototype).to.have.keys('use');
			expect(new metro.coin).to.be.an.instanceOf(metro.coin);
		});
		it('турникет', function(){
			expect(metro.tourniquet).to.be.a('function');
			expect(metro.tourniquet.prototype).to.contain.keys(
				'check', 'consume', 'reject', // for coins
				'gate', 'admit', 'omit', // for people
				'signal', 'display' // for interaction
			);
			expect(new metro.tourniquet).to.be.an.instanceOf(metro.tourniquet);
		});
	});
});
