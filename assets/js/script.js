var app = {
	init: function() {
		app.nav.init();
		// app.map.init();
		// app.blur.init();

		
		app.message.init();
		app.piegraph.init();

		if ($("#about").length) {
			app.about.init();
		} else if($("#research").length){
			// app.slides.init();
			app.research.init();
		} else if($("#clinical").length){
			app.clinical.init();
		} else if($("#education").length){
			console.log("education");
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
				app.about.docPics.target.css("background-image", "url(/assets/img/port/" + el + ".png)");
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
	init: function(){
		app.research.targets = $("#neurovision span");
		app.research.targets.mouseover(app.research.mouseOver);
		app.research.targets.click(app.research.mouseOver);
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
			infinite: false,
			arrows: false,
			speed: 300,
			centerMode: true,
			centerPadding: '0%',
			slidesToShow: 1,
			adaptiveHeight:true
		});
		app.research.slides.on('beforeChange',app.research.afterChange)	
	},
	mouseOver: function(){
		app.research.targets.removeClass("active");
		$("#neurovision_text span").removeClass("active");
		$(this).toggleClass("active");
		$("#"+this.id+"_text").addClass("active");
	},
	researchClick: function(event){
		event.preventDefault();
		var page = parseInt(this.href.split("_")[1]);
		app.research.slides.slick("goTo",page)
		return false;
	},
	afterChange: function(event, slick, currentSlide, nextSlide){
		$("#research_programs .active").removeClass("active");
		$('a[href$="#page_'+nextSlide+'"]').addClass("active");
	}

}

app.clinical = {
	init:function(){
		$("#abby_readmore a").click(app.clinical.readmoreClick);
	},
	readmoreClick: function(event){
		event.preventDefault();
		$("#abby_readmore_text").toggleClass("show");
		return false;
	}
}

app.education = {
	init: function() {
		console.log("init");

		var para = "p.sirlanka,p.mexico,p.usa,p.chile,p.saudiarabia,p.oman,p.kuwait,p.pakistan,p.india,p.netherlands,p.switerland,p.malaysia,p.philippines,p.southkorea,p.australia,p.newzeland,p.signapor,p.sirlanka,p.nigeria,p.egypt,p.ireland,p.unitedkingdom",
			map = "#mexico_svg,#unitedkingdom_svg,#ireland_svg,#egypt_svg,#nigeria_svg,#usa_svg,#chile_svg,#sirlanka_svg,#signapor_svg,#newzeland_svg,#australia_svg,#southkorea_svg,#philippines_svg,#malaysia_svg,#switerland_svg,#netherlands_svg,#india_svg,#pakistan_svg,#kuwait_svg,#oman_svg,#saudiarabia_svg,#canada_svg,#colombia_svg,#guyana_svg,#germany_svg,#iran_svg,#israel_svg";
			app.education.mapmessage = $("#mapmessage h3");
			app.education.mapmessage_default = app.education.mapmessage.html();
		$(map).click(app.education.countryclick).mouseover(app.education.countryclick); //.mouseout(app.map.nocountry)
		// $(para).click(app.map.countryclick).mouseover(app.map.countryclick);
	},
	current: "",
	makeClear:null,
	countryclick: function(event) {
		// console.log("YES");
		var country = this.id.split("_"),
			parent = $("#map");
		if (country.length > 1) {
			country = country[0]
		} else {
			country = this.className
		}

		var count = parseInt($(this).data("students"));
		var res = " Alumnus"
		if(count > 1){
			res = " Alumni";
		}
		app.education.mapmessage[0].innerHTML = country + ": "+count+ res;

		if(app.education.makeClear){
			clearTimeout(app.education.makeClear);
		}
		app.education.makeClear = setTimeout(function(){ 
			$("#map")[0].className="";
			app.education.mapmessage[0].innerHTML = app.education.mapmessage_default
		}, 5000);


		parent.removeClass(app.map.current);
		app.map.current = country;
		parent.addClass(app.map.current);


	}//,
	// nocountry: function(event) {
	// 	$("#map").removeClass(app.map.current);
	// 	app.map.current = "";
	// }
}

app.analytics = {
	init: function() {

	},
}