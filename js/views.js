var Views = {
	Foods: Backbone.View.extend({
		className: "foods",

		initialize: function() {
			this.collection.on("reset", this.reset, this);
			this.collection.on("add", this.add, this);

			this.$el.html(app.templates.foods()).appendTo("body");
		},

		reset: function() {
			this.$("tbody").empty();
			this.collection.each(this.add, this);
		},

		add: function(item) {
			var view = new Views.Food({ model: item });
			this.$("tbody").append(view.render().el);
		}
	}),

	Food: Backbone.View.extend({
		tagName: "tr",
		className: "food",

		render: function() {
			var data = this.model.toJSON();

			var matches = data.time.match(/(\d+)(?:-\d+)? per (\d+)g/);
			if (matches) {
				data.calc = {
					mins: matches[1],
					weight: matches[2],
				}
			}

			this.$el.html(app.templates.food(data));
			return this;
		}
	})
};
