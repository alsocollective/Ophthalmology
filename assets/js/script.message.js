app.message = {
	set: {},
	init: function() {
		app.message.set.img = $(".right-message img"),
		app.message.set.allimg = $("div.image"),
		app.message.set.parent = $(app.message.set.img.parent());
		app.message.set.telmedimg = $("#telemedimage");

		app.message.resize();


		$(window).resize(app.message.resize);

		$(".showmore a").click(app.message.readfullClick);
	},
	readfullClick: function(event) {
		event.preventDefault();
		$(this.parentNode).prev().toggleClass("hidden");
		$(this.parentNode).remove();
		return false;
	},
	resize: function() {
		var w = app.message.set.img.width();
		app.message.set.parent.width(w).height(w);

		app.message.set.allimg.height($(app.message.set.allimg[0]).width());

		app.message.set.telmedimg.height(app.message.set.telmedimg.width());
	}
}