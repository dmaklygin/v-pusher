var RequestManager = require('../lib/request_manager');


var Puller = module.exports = function(server) {

  // Инициализация переменной для объекта кеширования
//  this.redis = server.redisClient;

  // Создание менеджера закачек для прематча
	this.prematchManager = new RequestManager({
		command: 'line',
		onSuccess: this.onSuccess,
		onError: this.onError,
    redis: server.redisClient,
    tournaments: server.prematchTournaments
	});

	this.liveManager = new RequestManager({
		command: 'live',
		onSuccess: this.onSuccess,
		onError: this.onError,
    redis: server.redisClient,
    tournaments: server.liveTournaments
	});

};

Puller.prototype.run = function() {
	console.log('run puller');
	this.prematchManager.run();
	this.liveManager.run();
};

Puller.prototype.onSuccess = function(tournaments) {

//  this.redis.set();


//  console.log(tournaments);
};

Puller.prototype.onError = function(error) {
	console.log(error);
};
