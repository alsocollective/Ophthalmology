app.scroll = {
	init: function() {
		if ($(".touch").length) {
			return false;
		}
		if ($(".no-cssfilters").length > 0) {
			$(".titlepage .backgroundimage").attr("data-0-top", "opacity:0.2;").attr("data--300-top", "opacity:1;")
		} else {

		}


		var s = skrollr.init({
			forceHeight: false
		});
	}
}