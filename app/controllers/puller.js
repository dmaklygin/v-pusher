var RequestManager = require('../lib/request_manager');


var Puller = module.exports = function(server) {

	this.prematchManager = new RequestManager({ command: 'line' });

	this.liveManager = new RequestManager({ command: 'live' });

};


Puller.prototype.load = function() {



};