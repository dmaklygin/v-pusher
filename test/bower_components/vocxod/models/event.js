Models.Event = Backbone.Model.extend({

	initialize: function (event, options) {
//		this._prepare_data();
//		this._update_cse_length();
	},

	_prepare_data: function () {

		if (!this.attributes.cs) this.attributes.cs = {};
		if (!this.attributes.cse) this.attributes.cse = {};

		if (!this.attributes.time || '0000-00-00 00:00:00' == this.attributes.time)
			this.attributes.time = false;

		if (this.attributes.time)
			this.attributes.time += '+04:00';

		this.attributes.rolled_id = this.attributes.short_number;

//		if (this.attributes.finished == 1 && this.attributes.home == "BetRat")
//			this._prepareRatsResults()

	},

	// Мердж существующей модели и новой
	merge: function(event) {
		var
			value, key,
			new_event = this.attributes;

		for (key in event) {
			value = event[key];
			if (key !== 'cs' && key !== 'cse') {
				new_event[key] = value;
			}
		}

		if (event.cs) {
			var old_cs = this.get('cs') || {};
			for (key in event.cs) {
				value = event.cs[key];


				if (old_cs[key]) {
					var old_cs_value = old_cs[key];
					if (old_cs_value[2] != null) {
						var direction = old_cs_value[2] - value[2];
					}
				}
				old_cs[key] = value;

				if (direction)
					old_cs[key].push(direction);
			}
			new_event.cs = old_cs;
		}

		if (event.cse) {
			var old_cse = this.get('cse') || {}
      for (key in event.cse) {
        value = event.cse[key];
        old_cse[key] = value;
      }
      new_event.cse = old_cse
    }

    this.set(new_event, { silent: true });

	}

});