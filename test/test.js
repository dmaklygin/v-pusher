/**
 * Created by dmitrymaklygin on 25.06.14.
 */
var
	express = require('express'),
	app = express(),
	backbone = require('backbone')
	;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use('/libs',  express.static(__dirname + '/bower_components'));
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(process.env.PORT || 8001, function() {
	console.log('server for tests started on port: ' + (process.env.PORT || 8001));
});
