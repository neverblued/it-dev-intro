var metro = require('./index');

metro.message = {
	denial: 'Прохода нет!',
	injury: 'Плохой жетон!'
};

metro.tourniquet.prototype.message = function(status){
	var text = status.message || status;
	console.log('|>| ' + text);
};
