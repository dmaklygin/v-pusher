var
	express = require('express'),
	logger = require('morgan'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	pusher = require('./app/controllers/pusher')(server),
	puller = require('./app/controllers/puller');

//require('./lib/request');

var pullController = new puller(server);

pullController.run();

app.use(logger());

server.listen(process.env.PORT || 8000);

console.log('Server Start on port: ' + (process.env.PORT || 8000));


