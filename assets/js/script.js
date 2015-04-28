var app = {
	init: function() {
		app.nav.init();
		app.map.init();
		app.blur.init();
		app.slides.init();
		app.scroll.init();
	},
	detectMobile: function() {
		// check the useragent this is a bit problematic... but hey...
		var testone = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		// remove devices with huge screens such as smart tvs or others...
		var testtwo = window.matchMedia("only screen and (max-width: 760px)");
		// check if it's a touch screen
		var testthree = false
		try {
			document.createEvent("TouchEvent");
			testthree = true;
		} catch (e) {
			testthree = false;
		}
		return (testone && testtwo && testthree);
	}
};


app.analytics = {
	init: function() {

	},
}