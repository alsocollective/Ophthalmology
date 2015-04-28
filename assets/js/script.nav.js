app.nav = {
	SET: {
		parent: null,
		nav: null
	},
	init: function() {
		app.nav.SET.parent = $("#nav");
		app.nav.SET.nav = $("#nav > div");
		app.nav.setParentHeight();
		$(window).resize(app.nav.setParentHeight);
	},
	setParentHeight: function() {
		app.nav.SET.parent.height(app.nav.SET.nav.outerHeight())
	}
};