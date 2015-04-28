app.map = {
	init: function() {
		var para = "p.sirlanka,p.mexico,p.usa,p.chile,p.saudiarabia,p.oman,p.kuwait,p.pakistan,p.india,p.netherlands,p.switerland,p.malaysia,p.philippines,p.southkorea,p.australia,p.newzeland,p.signapor,p.sirlanka,p.nigeria,p.egypt,p.ireland,p.unitedkingdom",
			map = "#sirlanka_svg,#mexico_svg,#usa_svg,#chile_svg,#saudiarabia_svg,#oman_svg,#kuwait_svg,#pakistan_svg,#india_svg,#netherlands_svg,#switerland_svg,#malaysia_svg,#philippines_svg,#southkorea_svg,#australia_svg,#newzeland_svg,#signapor_svg,#sirlanka_svg,#nigeria_svg,#egypt_svg,#ireland_svg,#unitedkingdom_svg";

		$(map).click(app.map.countryclick).mouseover(app.map.countryclick); //.mouseout(app.map.nocountry)
		$(para).click(app.map.countryclick).mouseover(app.map.countryclick);
	},
	current: "",
	countryclick: function(event) {
		var country = this.id.split("_"),
			parent = $("#map");
		if (country.length > 1) {
			country = country[0]
		} else {
			country = this.className
		}

		parent.removeClass(app.map.current);
		app.map.current = country;
		parent.addClass(app.map.current);
	},
	nocountry: function(event) {
		$("#map").removeClass(app.map.current);
		app.map.current = "";
	}
}