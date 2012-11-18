var Models = {
	Food: Backbone.Model.extend({})
};

var Collections = {
	Foods: Backbone.Collection.extend({
		sync: function(method, collection, options) {
			$.ajax({
				url: "https://spreadsheets.google.com/feeds/list/" + options.key + "/" + options.sheet + "/public/values",
				data: { alt: "json" },
				dataType: "json",
				statusCode: {
					200: function(data) {
						options.success(data.feed.entry);
					}
				}
			});
		},

		parse: function(data) {
			var items = $.map(data, function(data) {
				var item = {
					name: data.gsx$name.$t,
					time: data.gsx$timemins.$t,
					notes: data.gsx$notes.$t,
					min: 0
				};

				var matches = item.time.match(/\d+/);
				if (matches) {
					item.min = matches[0];
				}

				return item;
			});

			items.sort(function(a, b) {
				return a.min - b.min;
				//return a.name - b.name;
			});

			return items;
		}
	})
};