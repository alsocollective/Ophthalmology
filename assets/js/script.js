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
	makeActive: function() {
		if ($(".touch").length) {
			$("html").removeClass("active-loading").addClass("makeactive");
			app.init();
			return false;
		};
		if ($(".no-cssfilters").length > 0) {
			$(".titlepage .backgroundimage div").attr("data-0-top", "opacity:0.2;").attr("data--300-top", "opacity:1;")
		}
		var el = $(".titlepage .backgroundimage div");
		if (el.length) {
			var css = el.attr("data-0-top").split(";")[0].split(":"),
				out = {};
			out["-webkit-" + css[0]] = css[1];
			out["-moz-" + css[0]] = css[1];
			out["-ms-" + css[0]] = css[1];
			out[css[0]] = css[1];
			el.css(out);
		}
		$("html").removeClass("active-loading").addClass("makeactive");
		app.init();
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
		// app.about.docPics.init();
		app.about.readmore();
	},
	// docPics: {
	// 	init: function() {
	// 		app.about.docPics.target = $("#doctorimages > div");
	// 		$("#doc_image_table tr").mouseover(app.about.docPics.mouseOver);
	// 	},
	// 	mouseOver: function(event) {
	// 		var el = $(this).find(".changeport")
	// 		if (el.length) {
	// 			el = el[0].id;
	// 			app.about.docPics.target.css("background-image", "url(/assets/img/port/" + el + ".jpg)");
	// 		}
	// 	}
	// },
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

		var rightArrow = '<button type="button" class="slick-next"><svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="38.236px" height="81.932px" viewBox="0 0 38.236 81.932" xml:space="preserve"><defs></defs><polyline stroke-width="10" stroke-miterlimit="10" points="4.025,2.966 32.025,40.966 4.025,78.966 "/></svg></button>';
		var leftArrrow = '<button type="button" class="slick-prev"><svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="38.236px" height="81.932px" viewBox="0 0 38.236 81.932" xml:space="preserve"><defs></defs><polyline fill="#FFFFFF" stroke="#000000" stroke-width="10" stroke-miterlimit="10" points="34.211,78.966 6.211,40.966 34.211,2.966 "/></svg></button>';


		if ($(document.body).outerWidth() > 768) {
			$("#research_programs a").click(app.research.researchClick);
			$('.slideshow').slick({
				dots: false,
				infinite: true,
				arrows: true,
				speed: 300,
				centerMode: true,
				centerPadding: '0',
				slidesToShow: 1,
				autoplay: true,
				autoplaySpeed: 20000,
				pauseOnHover: false,
				nextArrow: rightArrow, //'<button type="button" class="slick-next">❯</button>',
				prevArrow: leftArrrow //'<button type="button" class="slick-prev">❮</button>'
			});
			app.research.slides = $('.slides').slick({
				dots: false,
				infinite: true,
				arrows: true,
				speed: 300,
				centerMode: true,
				centerPadding: '0%',
				slidesToShow: 1,
				adaptiveHeight: true,
				autoplay: false,
				autoplaySpeed: 20000,
				pauseOnHover: false,
				nextArrow: rightArrow, //'<button type="button" class="slick-next">❯</button>',
				prevArrow: leftArrrow //'<button type="button" class="slick-prev">❮</button>'
			});
			app.research.slides.on('beforeChange', app.research.afterChange)
		}
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
		count: 1,
		timeout: null,
		targets: $("#neurovision_text tr"),
		init: function() {
			// app.research.nurovision.pie = $("#neurovision");
			app.research.nurovision.span = $("#neurovision span");
			app.research.nurovision.text = $("#neurovision_text tr");

			app.research.nurovision.span.mouseover(app.research.nurovision.mouseOver).click(app.research.nurovision.mouseOver);
			app.research.nurovision.text.mouseover(app.research.nurovision.mouseOver).click(app.research.nurovision.mouseOver);
			app.research.nurovision.timeout = setTimeout(app.research.nurovision.called, 2500);
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

			clearTimeout(app.research.nurovision.timeout);
			app.research.nurovision.timeout = setTimeout(app.research.nurovision.called, 5000);
			return false;
		},
		called: function(event) {
			var target = app.research.nurovision.targets;
			target[app.research.nurovision.count].click();
			if (target.length > app.research.nurovision.count + 1) {
				app.research.nurovision.count += 1
			} else {
				app.research.nurovision.count = 1;
			}
			clearTimeout(app.research.nurovision.timeout);
			app.research.nurovision.timeout = setTimeout(app.research.nurovision.called, 2500);
		}
	},

	piegraph: {
		makeClear: null,
		pie: null,
		count: 1,
		timeout: null,
		targets: $("#piegraph tr"),
		init: function() {
			app.research.piegraph.pie = $("#piegraph");
			$("#piegraph tr").mouseover(app.research.piegraph.mouseOver).click(app.research.piegraph.mouseOver);
			$("#piegraph path").mouseover(app.research.piegraph.mouseOver).click(app.research.piegraph.mouseOver);
			app.research.piegraph.timeout = setTimeout(app.research.piegraph.called, 2500);
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

			clearTimeout(app.research.piegraph.timeout);
			app.research.piegraph.timeout = setTimeout(app.research.piegraph.called, 5000);

			return false;
		},
		called: function(event) {
			// console.log(app.research.piegraph.count);

			var target = app.research.piegraph.targets;
			target[app.research.piegraph.count].click();

			if (target.length > app.research.piegraph.count + 1) {
				app.research.piegraph.count += 1
			} else {
				app.research.piegraph.count = 1;
			}
			if ($(target[app.research.piegraph.count]).children().length == 1) {
				if (target.length > app.research.piegraph.count + 1) {
					app.research.piegraph.count += 1
				} else {
					app.research.piegraph.count = 1;
				}
			}

			clearTimeout(app.research.piegraph.timeout);
			app.research.piegraph.timeout = setTimeout(app.research.piegraph.called, 2500);
		}
	},

	telemed: {
		main: null,
		count: 1,
		targets: $("#telemedicine tr"),
		timeout: null,
		init: function() {
			app.research.telemed.main = $("#telemedicine");
			$("#telemedicine tr").mouseover(app.research.telemed.mouseOver).click(app.research.telemed.mouseOver);
			$("#telemedicine path").mouseover(app.research.telemed.mouseOver).click(app.research.telemed.mouseOver);
			app.research.telemed.timeout = setTimeout(app.research.telemed.call, 2500);
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
			clearTimeout(app.research.telemed.timeout);
			app.research.telemed.timeout = setTimeout(app.research.telemed.call, 5000);
			return false;
		},
		call: function() {
			var target = app.research.telemed.targets;
			target[app.research.telemed.count].click();
			if (target.length > app.research.telemed.count + 1) {
				app.research.telemed.count += 1
			} else {
				app.research.telemed.count = 1;
			}
			clearTimeout(app.research.telemed.timeout);
			app.research.telemed.timeout = setTimeout(app.research.telemed.call, 2500);
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
		var para = "p.sirlanka,p.mexico,p.usa,p.chile,p.saudi-arabia,p.oman,p.kuwait,p.pakistan,p.india,p.netherlands,p.switerland,p.malaysia,p.philippines,p.south-korea,p.australia,p.new-zealand,p.signapore,p.sirlanka,p.nigeria,p.egypt,p.ireland,p.united-kingdom",
			map = "#mexico_svg,#united-kingdom_svg,#ireland_svg,#egypt_svg,#nigeria_svg,#usa_svg,#chile_svg,#sirlanka_svg,#signapore_svg,#new-zealand_svg,#australia_svg,#south-korea_svg,#philippines_svg,#malaysia_svg,#switerland_svg,#netherlands_svg,#india_svg,#pakistan_svg,#kuwait_svg,#oman_svg,#saudi-arabia_svg,#canada_svg,#colombia_svg,#guyana_svg,#germany_svg,#iran_svg,#israel_svg";
		app.education.mapmessage = $("#mapmessage h3 span.mappink");
		app.education.mapmessage_default = app.education.mapmessage.html();

		app.education.targets = $(map)
		app.education.targets.click(app.education.countryclick).mouseover(app.education.countryclick); //.mouseout(app.map.nocountry)
		// $(para).click(app.map.countryclick).mouseover(app.map.countryclick);
		$("table a").click(app.education.readmore);
		clearTimeout(app.education.timeout);
		app.education.timeout = setTimeout(app.education.called, 2500);
	},
	current: "",
	makeClear: null,
	count: 0,
	timeout: null,

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
		var stringCountry = country.split("-");
		if (stringCountry.length > 1) {
			stringCountry = stringCountry[0] + " " + stringCountry[1]
		}

		var count = parseInt($(this).data("students"));
		var res = " Alumnus"
		if (count > 1) {
			res = " Alumni";
		}
		var fullString = stringCountry + ": " + count + res;

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
		clearTimeout(app.education.timeout);
		app.education.timeout = setTimeout(app.education.called, 5000);
	},
	called: function(event) {
		var target = app.education.targets;
		$(target[app.education.count]).click();
		if (target.length > app.education.count + 1) {
			app.education.count += 1
		} else {
			app.education.count = 1;
		}
		clearTimeout(app.education.timeout);
		app.education.timeout = setTimeout(app.education.called, 2500);
	}
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