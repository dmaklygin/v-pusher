Models.Tournament = Backbone.Model.extend({

	parse: function (model, resp) {

		model.version = new Date().getTime();
		model.search_index = [ model.name ];
		model.near_datetime = 0;

		model.events.each(function (event) {
			model.search_index.push(event.home, event.away)
		});

		var
			existModel = resp.collection.get(model['id']);
		if (existModel) {
			model.events = existModel.get('events').merge(model.events);
		} else {
			model.events = new Collections.Events(model.events)
		}

		return model;
	}
});