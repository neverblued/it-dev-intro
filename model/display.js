var metro = require('./index');

metro.tourniquet.format = {
	limit: function(){
		return 'ещё ' + this.people;
	},
	pass: function(person){
		return person + ', проходите! (' + this.message('limit') + ')';
	},
	stop: function(){
		return 'Закрыто!';
	},
	fake: function(){
		return 'Плохой жетон!';
	}
};

metro.tourniquet.prototype.message = function(mode){
	var message = metro.tourniquet.format[mode];
	if(!message){
		throw new Error('bad mode = ' + mode);
	}
	return message.call(this, Array.prototype.slice.call(arguments, 1));
};

metro.tourniquet.prototype.display = function(){
	this.output(this.message.apply(this, arguments));
};

metro.tourniquet.prototype.output = function(status){
	var message = status.message || status;
	console.log('|>| ' + message);
};
