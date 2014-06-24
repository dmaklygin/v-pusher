/**
 * Created by dmitrymaklygin on 24.06.14.
 */
var
	request = require('request'),
	qs = require('qs'),
	_ = require('./utils'),
	settings = require('../settings/settings')
	;

var Manager = module.exports = function (options) {

	this.requestParams = _.extend({
		command: options.command
	}, {
		'version': 'v1.1',
		'language': 'ru'
	});

	this.options = {
		onSuccess: options.onSuccess,
		onError: options.onError
	};

	this.version = null;
};

Manager.prototype.run = function() {
	this.loadTournaments(this.onSuccess, this.onError);
};

Manager.prototype.onSuccess = function(response) {

	var _this = this,
			success = this.options.onSuccess;

	_this.version = response.line_version;

	success && success(response.tournaments);

	// load tournaments
	setTimeout(function() {
		_this.run();
	}, 100);
};

Manager.prototype.onError = function(error) {
	// @todo handle errors
	console.log('Server Error: ', error);
};

Manager.prototype._request = function (params, callback, fail) {

	var
		_this = this,
		queryString = qs.stringify(params || {});

	request.get(settings.api.url + '?' + queryString, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			try {
				var data = JSON.parse(body);

				return callback && callback.call(_this, data);

			} catch (exception) {
				return fail && fail.call(_this, exception);
			}
		} else if (error) {
			return fail && fail.call(_this, error);
		}
		return fail && fail.call(_this, new Error("Server Error. Status Code: " + response.statusCode));
	});
};

Manager.prototype.loadTournaments = function (success, fail) {

	var
		_this = this,
		params = _.extend(this.requestParams, {
		line_version: this.version
	});

	this._request(params, function(response) {
		// @todo something actions
		success && success.call(_this, response);
	}, function(error) {
		fail && fail.call(_this, error);
	});
};