var request = require('request');

//http://preproduction.crwn42.badbin.ru/api/index.php?revision=&version=v1.1&language=ru&auth={%22login%22:%22test%22,%22hash%22:%22test%22}&command=live&line_version=2458653050
//http.get({
//	hostname: 'preproduction.crwn42.badbin.ru',
//	path: '/api/index.php?version=v1.1&language=ru&command=live'
//}, function(res) {
//	res.on('data', function(chunk) {
//		console.log(chunk);
//	});
//
//	console.log("Got response: " + res.httpVersion);
//}).on('error', function(e) {
//	console.log("Got error: " + e.message);
//});

request.get('http://preproduction.crwn42.badbin.ru/api/index.php?version=v1.1&language=ru&command=live', function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var data = JSON.parse(body);
		console.log(data.tournaments);
	}
});