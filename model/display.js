var metro = require('./index');

metro.tourniquet.format = {
	limit: function(){
		return 'Проходите ' + this.people;
	},
	pass: function(person){
		var text = person + ', проходите!';
		if(this.people > 0){
			text += ' (ещё ' + this.people + ')';
		}
		return text;
	},
	stop: function(){
		return 'Закрыто!';
	},
	fake: function(){
		return 'Жетон не опознан!';
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
