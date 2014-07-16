// Коллекция событий
Collections.Events = Backbone.Collection.extend({
	model: Models.Event,

	initialize: function (data) {

		var _this = this;

		_this.search_index = [];

		// Создаем индекс для поиска по линии
		data.each(function(event) {
			_this.search_index.push(event.home, event.away)
		});
	},

	comparator: function (event) {
		return event.get('time');
	},

	merge: function (events) {
		var _this = this;
		// Обновляем события
		events.forEach(function (event) {
			var existEvent = @get(event.id);
			if (existEvent) {
				existEvent.merge(event);
				_this.trigger('merge', event);
			} else {
				_this.add(event);
			}
		});

		return _this;
	}

});
