/**
 * Created by dmitrymaklygin on 24.06.14.
 */

module.exports = function (server) {

  var
    faye = require('faye'),
    redis = require("redis"),
    redisClient = redis.createClient(),
    pusher
    ;

  pusher = new faye.NodeAdapter({mount: '/faye'});

  redisClient.subscribe('line');
  redisClient.subscribe('live');

  redisClient.on('message', function (channel, version) {
    var
      tournaments;

    server.redisClient.get(channel + '_' + version, function (err, data) {

      tournaments = JSON.parse(data);

      if (err) {
        return;
      }

      pusher.getClient().publish('/' + channel, {tournaments: tournaments, version: version});
      console.log('push to ' + channel);
    });
  });

  pusher.on('handshake', function (clientId) {
    console.log('handshake new user = ' + clientId);
  });

  pusher.on('subscribe', function (clientId, channel) {
    console.log('[SUBSCRIBE] ' + clientId + ' -> ' + channel);

    switch (channel) {
      case '/fullPrematch':
        pusher.getClient().publish('/fullPrematch', {tournaments: server.prematchTournaments.toJSON()});
        break;
      case '/fullLive':
        pusher.getClient().publish('/fullLive', {tournaments: server.liveTournaments.toJSON()});
        break;
    }
  });

  pusher.on('unsubscribe', function (clientId, channel) {
    console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
  });

  pusher.on('disconnect', function (clientId) {
    console.log('[DISCONNECT] ' + clientId);
  });

  // Listen server events
  pusher.attach(server);

  this.pusher = pusher;
};
