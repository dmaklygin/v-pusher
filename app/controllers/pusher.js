/**
 * Created by dmitrymaklygin on 24.06.14.
 */

module.exports = function(server) {

	var faye = require('faye');

	var pusher = new faye.NodeAdapter({ mount: '/faye' });

	pusher.on('handshake', function(clientId) {
		console.log('handshake new user = ' + clientId);
	});

	pusher.on('subscribe', function(clientId, channel) {
		console.log('[SUBSCRIBE] ' + clientId + ' -> ' + channel);

		switch (channel) {
			case '/fullPrematch':
				pusher.getClient().publish('/fullPrematch', 'full prematch');
				break;
		}
	});

	pusher.on('unsubscribe', function(clientId, channel) {
		console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
	});

	pusher.on('disconnect', function(clientId) {
		console.log('[DISCONNECT] ' + clientId);
	});

	// Listen server events
	pusher.attach(server);

	this.pusher = pusher;
};