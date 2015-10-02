app.map = {
	init: function() {
		var para = "p.sri-lanka,p.mexico,p.usa,p.chile,p.saudiarabia,p.oman,p.kuwait,p.pakistan,p.india,p.netherlands,p.switerland,p.malaysia,p.philippines,p.southkorea,p.australia,p.newzeland,p.singapor,p.sirlanka,p.nigeria,p.egypt,p.ireland,p.unitedkingdom",
			map = "#mexico_svg,#unitedkingdom_svg,#ireland_svg,#egypt_svg,#nigeria_svg,#usa_svg,#chile_svg,#sri-lanka_svg,#singapor_svg,#newzeland_svg,#australia_svg,#southkorea_svg,#philippines_svg,#malaysia_svg,#switerland_svg,#netherlands_svg,#india_svg,#pakistan_svg,#kuwait_svg,#oman_svg,#saudiarabia_svg,#canada_svg,#colombia_svg,#guyana_svg,#germany_svg,#iran_svg,#israel_svg";

		$(map).click(app.map.countryclick).mouseover(app.map.countryclick); //.mouseout(app.map.nocountry)
		// $(para).click(app.map.countryclick).mouseover(app.map.countryclick);
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