app.nav = {
	SET: {
		parent: null,
		nav: null
	},
	init: function() {
		app.nav.SET.target = $("#wrapper > section:first");
		app.nav.SET.nav = $("#nav > div");
		app.nav.setParentHeight();
		$(window).resize(app.nav.setParentHeight);
	},
	setParentHeight: function() {
		app.nav.SET.target.css("margin-top", app.nav.SET.nav.outerHeight());
	}
};