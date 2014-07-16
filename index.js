var
	express = require('express'),
	logger = require('morgan'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
  redis = require('redis'),
	pusher = require('./app/controllers/pusher')(server),
	puller = require('./app/controllers/puller'),
  tournaments = require('./app/collections/tournaments')
  ;


server.redisClient = redis.createClient();
console.log(tournaments);
server.prematchTournaments = tournaments.createTournaments();
server.liveTournaments = tournaments.createTournaments();

var pullController = new puller(server);

pullController.run();

app.use(logger());


server.listen(process.env.PORT || 8000);

console.log('Server Start on port: ' + (process.env.PORT || 8000));