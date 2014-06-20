var request = require('request');

request.get('http://preproduction.crwn42.badbin.ru/api/index.php?version=v1.1&language=ru&command=live', function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var data = JSON.parse(body);
		console.log(data.tournaments);
	}
});