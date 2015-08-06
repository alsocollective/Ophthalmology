var app = {
	init: function() {

		// app.map.init();
		// app.blur.init();


		app.message.init();
		app.piegraph.init();
		app.analytics.init();
		app.setLocation(window.location.href.split("/").pop());

		if ($("#about").length) {
			app.about.init();
		} else if ($("#research").length) {
			app.research.init();
		} else if ($("#clinical").length) {
			app.clinical.init();
		} else if ($("#education").length) {
			app.education.init();
		}


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

app.setLocation = function(location) {
	var select = $('a[href$="' + location + '"]');
	if (select.length) {
		$(".currentpage").removeClass("currentpage");
		select.addClass("currentpage");
	}
}

app.about = {
	init: function() {
		app.about.docPics.init();
		app.about.readmore();
	},
	docPics: {
		init: function() {
			app.about.docPics.target = $("#doctorimages > div");
			$("#doc_image_table tr").mouseover(app.about.docPics.mouseOver);
		},
		mouseOver: function(event) {
			var el = $(this).find(".changeport")
			if (el.length) {
				el = el[0].id;
				app.about.docPics.target.css("background-image", "url(/assets/img/port/" + el + ".jpg)");
			}
		}
	},
	readmore: function() {
		$("#readmore_agnes").click(app.about.readmoreClick);
	},
	readmoreClick: function(event) {
		event.preventDefault();
		$("#readmore_agnes_text").toggleClass("show");
		return false;
	}
}


app.research = {
	init: function() {
		app.research.nurovision.init();
		app.research.piegraph.init();
		app.research.telemed.init();
		if ($(document.body).outerWidth() > 768) {
			$("#research_programs a").click(app.research.researchClick);
			$('.slideshow').slick({
				dots: false,
				infinite: false,
				arrows: true,
				speed: 300,
				centerMode: true,
				centerPadding: '10%',
				slidesToShow: 1
			});
			app.research.slides = $('.slides').slick({
				dots: false,
				infinite: true,
				arrows: false,
				speed: 300,
				centerMode: true,
				centerPadding: '0%',
				slidesToShow: 1,
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 15000,
				pauseOnHover: false
			});
		}
		app.research.slides.on('beforeChange', app.research.afterChange)
	},
	researchClick: function(event) {
		event.preventDefault();
		var page = parseInt(this.href.split("_")[1]);
		app.research.slides.slick("goTo", page)
		return false;
	},
	afterChange: function(event, slick, currentSlide, nextSlide) {
		$("#research_programs .active").removeClass("active");
		$('a[href$="#page_' + nextSlide + '"]').addClass("active");
	},

	nurovision: {
		init: function() {
			// app.research.nurovision.pie = $("#neurovision");
			app.research.nurovision.span = $("#neurovision span");
			app.research.nurovision.text = $("#neurovision_text tr");

			app.research.nurovision.span.mouseover(app.research.nurovision.mouseOver);
			app.research.nurovision.text.mouseover(app.research.nurovision.mouseOver);
		},
		mouseOver: function(event) {
			event.preventDefault();

			app.research.nurovision.span.removeClass("active");
			app.research.nurovision.text.removeClass("active");

			if (this.id) {
				var id = this.id
				if (id.substring(id.length - 5, id.length) == "_text") {
					id = id.substring(0, id.length - 5);
				}
				$("#neurovision #" + id + "").addClass("active");
				$("#neurovision_text #" + id + "_text").addClass("active");
			}
			// if(this.id){
			// 	var id = this.id
			// 	if (id.substring(id.length-4, id.length) == "_svg"){
			// 		id=id.substring(0,id.length-4);
			// 	}
			// 	app.research.nurovision.pie[0].className = "";
			// 	app.research.nurovision.pie.addClass(id);
			// } else {
			// 	app.research.nurovision.pie[0].className = "";
			// }
			return false;
		}
		// init:function(){
		// 	app.research.nurovision.targets = $("#neurovision span");
		// 	app.research.nurovision.targets.mouseover(app.research.nurovision.mouseOver).click(app.research.nurovision.mouseOver);			
		// },
		// mouseOver: function(){
		// 	app.research.nurovision.targets.removeClass("active");
		// 	$("#neurovision_text span").removeClass("active");
		// 	$(this).toggleClass("active");
		// 	$("#"+this.id+"_text").addClass("active");
		// }
	},

	piegraph: {
		makeClear: null,
		pie: null,
		init: function() {
			app.research.piegraph.pie = $("#piegraph");
			$("#piegraph tr").mouseover(app.research.piegraph.mouseOver);
			$("#piegraph path").mouseover(app.research.piegraph.mouseOver);
		},
		mouseOver: function(event) {
			event.preventDefault();
			if (this.id) {
				var id = this.id
				if (id.substring(id.length - 4, id.length) == "_svg") {
					id = id.substring(0, id.length - 4);
				}
				app.research.piegraph.pie[0].className = "";
				app.research.piegraph.pie.addClass(id);
			} else {
				app.research.piegraph.pie[0].className = "";
			}
			return false;
		}
	},

	telemed: {
		main: null,
		init: function() {
			app.research.telemed.main = $("#telemedicine");
			$("#telemedicine tr").mouseover(app.research.telemed.mouseOver);
			$("#telemedicine path").mouseover(app.research.telemed.mouseOver);
		},
		mouseOver: function(event) {
			event.preventDefault();
			if (this.id) {
				var id = this.id
				if (id.substring(id.length - 4, id.length) == "_svg") {
					id = id.substring(0, id.length - 4);
				}
				app.research.telemed.main[0].className = "";
				app.research.telemed.main.addClass(id);
			} else {
				app.research.telemed.main[0].className = "";
			}
			return false;
		}
	}

}

app.clinical = {
	init: function() {
		$("#abby_readmore a").click(app.clinical.readmoreClick);
	},
	readmoreClick: function(event) {
		event.preventDefault();
		$("#abby_readmore_text").toggleClass("show");
		return false;
	}
}

app.education = {
	init: function() {
		var para = "p.sirlanka,p.mexico,p.usa,p.chile,p.saudiarabia,p.oman,p.kuwait,p.pakistan,p.india,p.netherlands,p.switerland,p.malaysia,p.philippines,p.southkorea,p.australia,p.newzeland,p.signapore,p.sirlanka,p.nigeria,p.egypt,p.ireland,p.unitedkingdom",
			map = "#mexico_svg,#unitedkingdom_svg,#ireland_svg,#egypt_svg,#nigeria_svg,#usa_svg,#chile_svg,#sirlanka_svg,#signapore_svg,#newzeland_svg,#australia_svg,#southkorea_svg,#philippines_svg,#malaysia_svg,#switerland_svg,#netherlands_svg,#india_svg,#pakistan_svg,#kuwait_svg,#oman_svg,#saudiarabia_svg,#canada_svg,#colombia_svg,#guyana_svg,#germany_svg,#iran_svg,#israel_svg";
		app.education.mapmessage = $("#mapmessage h3 span");
		app.education.mapmessage_default = app.education.mapmessage.html();
		$(map).click(app.education.countryclick).mouseover(app.education.countryclick); //.mouseout(app.map.nocountry)
		// $(para).click(app.map.countryclick).mouseover(app.map.countryclick);
		$("table a").click(app.education.readmore);
	},
	current: "",
	makeClear: null,
	readmore: function(event) {
		event.preventDefault()
		// $("table .show").removeClass("show");
		var parent = this.parentNode;
		if (parent.nodeType != "TD") {
			parent = parent.parentNode;
		}
		$(parent).addClass("show");
		return false;
	},
	countryclick: function(event) {
		var country = this.id.split("_"),
			parent = $("#map");
		if (country.length > 1) {
			country = country[0]
		} else {
			country = this.className
		}

		var count = parseInt($(this).data("students"));
		var res = " Alumnus"
		if (count > 1) {
			res = " Alumni";
		}
		var fullString = country + ": " + count + res;

		if (app.education.mapmessage[0].innerHTML != fullString) {

			app.education.mapmessage.addClass("countryout");

			setTimeout(function() {
				app.education.mapmessage.removeClass("countryout");
				app.education.mapmessage.addClass("countryin");
				app.education.mapmessage[0].innerHTML = fullString;

				setTimeout(function() {
					app.education.mapmessage.removeClass("countryin");
				}, 150)
			}, 150)

			if (app.education.makeClear) {
				clearTimeout(app.education.makeClear);
			}
			app.education.makeClear = setTimeout(function() {
				app.education.mapmessage.addClass("countryout");
				setTimeout(function() {
					app.education.mapmessage.removeClass("countryout");
					$("#map")[0].className = "";
					app.education.mapmessage[0].innerHTML = app.education.mapmessage_default
				}, 150);
			}, 5000);


			parent.removeClass(app.map.current);
			app.map.current = country;
			parent.addClass(app.map.current);
		}


	} //,
	// nocountry: function(event) {
	// 	$("#map").removeClass(app.map.current);
	// 	app.map.current = "";
	// }
}

app.analytics = {
	init: function() {
		$(".donate_container a").click(app.analytics.bottomArea.click);
		$("a[href='#readmore']").click(app.analytics.readmore);
		$("#logo a").click(app.analytics.sickkidsLogo);
	},
	readmore: function(event) {
		var location = window.location.href.split("/").pop();
		location = (location != "") ? location : "about";
		location = location.split(".")[0];
		ga('send', 'event', 'readmore', 'click', location);
	},
	sickkidsLogo: function(event) {
		ga('send', 'event', 'toSickKids', 'click');
	},
	bottomArea: {
		click: function(event) {
			if (this.href.indexOf("donate") > 0) {
				ga('send', 'event', 'donnateLink', 'click');
			} else if (this.href.indexOf("tel") > -1) {
				ga('send', 'event', 'phone', 'click');
			} else if (this.href.indexOf("mail") > -1) {
				ga('send', 'event', 'mail', 'click');
			} else {
				ga('send', 'event', 'reportDownload', 'click');
			}
		},
		donate: function() {

		},
		download: function() {

		}
	}
}