// Коллекция Турниров
Collections.Tournaments = Backbone.Collection.extend({

	model: Models.Tournament,

  initialize: function (options) {},

	parse: function (data) {
		return data.tournaments;
	}

});