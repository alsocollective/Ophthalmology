app.blur = {
	init: function() {
		$("#titlepage").click(app.blur.toggleShow);
	},
	toggleShow: function() {
		$(".backgroundimage").toggleClass("show")
	}
}