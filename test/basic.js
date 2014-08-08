var should = require('should');
var assert = {};

assert.protocol = function(protocol, methods){
	should(protocol).be.type('object').with.properties(methods);
};

assert.entity = function(target){
	(function(){
		should(target).be.ok.and.type('function');
		should(new target).be.ok.and.instanceOf(target);
	}).should.not.throw();
};

assert.method = function(target){
	should(target).be.ok.and.type('function');
};

assert.methods = function(target, list){
	list.forEach(function(method){
		assert.method(target[method]);
	});
};

var metro = require('../model');
describe('Модель пропускной системы метро', function(){
	
	it('описывает протокол взаимодействия пассажира с системой', function(){
		should(metro.protocol).be.ok;
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
