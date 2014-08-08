var should = require('should');
var assert = module.exports;

assert.entity = function(target){
	should(target).be.ok.and.type('function');
	should(new target).be.ok.and.instanceOf(target);
};

assert.method = function(target){
	should(target).be.ok.and.type('function');
};

assert.methods = function(target, list){
	list.forEach(function(method){
		assert.method(target[method]);
	});
};

assert.protocol = function(protocol, methods){
	should(protocol).be.type('object').with.properties(methods);
};
