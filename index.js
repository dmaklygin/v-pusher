var http = require('http'),
	faye = require('faye');

var server = http.createServer(),
	bayeux = new faye.NodeAdapter({mount: '/faye'});


bayeux.on('handshake', function(clientId) {
	console.log('handshake new user = ' + clientId);

});

bayeux.on('subscribe', function(clientId, channel) {
	console.log('subscribe = ', clientId, channel);
	switch (channel) {
		case '/fullPrematch':
			bayeux.getClient().publish('/fullPrematch', 'full prematch');
			break;
	}

});

//bayeux.on('publish', function(clientId, channel, data) {
//	console.log('publish = ', clientId, channel, data);
////	bayeux.getClient().publish('/channel', 'some data');
//});

require('./lib/request');

bayeux.attach(server);
server.listen(8000);
console.log('server start');