var RequestManager = require('../lib/request_manager');


var Puller = module.exports = function(server) {
	// Создание менеджера закачек для прематча
	this.prematchManager = new RequestManager({
		command: 'line',
		onSuccess: this.onSuccess,
		onError: this.onError
	});

	this.liveManager = new RequestManager({
		command: 'live',
		onSuccess: this.onSuccess,
		onError: this.onError
	});

};

Puller.prototype.run = function() {
	console.log('run puller');
	this.prematchManager.run();
	this.liveManager.run();
};

Puller.prototype.onSuccess = function(tournaments) {
	console.log(tournaments);
};

Puller.prototype.onError = function(error) {
	console.log(error);
};
