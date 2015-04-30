app.piegraph = {
	init: function() {
		$(".pie svg path").mouseover(app.piegraph.pathhover);
		$(".pie .left li").mouseover(app.piegraph.lihover);
	},
	pathhover: function(event) {
		console.log($(this).prevAll().length);
		$(".pie").removeClass().addClass("pie active" + ($(this).prevAll().length - 1));
	},
	lihover: function(event) {
		console.log($(this).prevAll().length);
		$(".pie").removeClass().addClass("pie active" + $(this).prevAll().length);
	}
}