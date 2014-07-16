// Коллекция Турниров
Collections.Tournaments = Backbone.Collection.extend({

	model: Models.Tournament,

	parse: function (data) {

		this.version = data.line_version;

		data.tournaments = data.tournaments || [];

		return data.tournaments;
	}

});