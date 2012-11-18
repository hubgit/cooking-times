var key = "0AjePz4Y_bB3hdFEzclVZc3lLMWFvaW1IYTBzV3Mwb0E";

var app = {
	init: function() {
		app.collections = {
			vegetables: new Collections.Foods({ model: Models.Food }),
			meats: new Collections.Foods({ model: Models.Food })
		};

		app.templates = {
			food: Handlebars.compile($("#template-food").html()),
			foods: Handlebars.compile($("#template-foods").html())
		};

		app.views = {
			vegetables: new Views.Foods({ id: "vegetables", collection: app.collections.vegetables }),
			meats: new Views.Foods({ id: "meats", collection: app.collections.meats })
		};

		app.collections.vegetables.fetch({ key: key, sheet: "od6" });
		app.collections.meats.fetch({ key: key, sheet: "od7" });

		app.views.vegetables.$el.prepend("<h2>Vegetables <span class='help'>time in minutes</span></h2>");
		app.views.meats.$el.prepend("<h2>Meats <span class='help'>time in minutes</span></h2>");
	}
}

$(app.init);