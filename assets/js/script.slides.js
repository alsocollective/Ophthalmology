app.slides = {
	init: function() {
		$('.slideshow').slick({
			dots: false,
			infinite: false,
			arrows: true,
			speed: 300,
			centerMode: true,
			centerPadding: '10%',
			slidesToShow: 1
		});
	}
}