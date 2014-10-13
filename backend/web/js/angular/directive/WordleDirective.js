angular.module('publications.directives')
.directive('wordle',
function ($http,$templateCache,$compile, $timeout, $q) {
	
	function link(scope, element, attrs, $scope) {

		var newWindowWidth  = $(window).width();
		var newWindowHeight = $(window).height();

		var wordleWidth  = 0;
		var wordleHeight = 0;

		init();

		function calculateWordleSize() {
			$menu   = $('#menu-wrapper');
			$header = $('.section-header');
			
			wordleWidth  = newWindowWidth  - $menu.width() - 40;
			wordleHeight = newWindowHeight - $header.height() - 70; 

		}


		function init()   {

			console.log("WORDLE directive");
			
			var fill = d3.scale.category20();

			calculateWordleSize();

			d3.layout
			  .cloud().size([wordleWidth, wordleHeight])
		      .words(scope.words)
		      .padding(5)
		      .rotate(function() { return ~~(Math.random() * 2) * 90; })
		      .font("Impact")
		      .fontSize(function(d) { return d.size; })
		      .on("end", draw)
		      .start();

			function draw(words) {

			    var x = d3.select("#wordleWrapper");
		    	console.log(x);

		    	var tranlateHeight = wordleHeight / 2;

			    x.append("svg")
		         .attr("width", wordleWidth)
		         .attr("height", wordleHeight)
			     .append("g")
		         .attr("transform", "translate(600," + tranlateHeight +")")
			     .selectAll("text")
		         .data(words)
			     .enter().append("text")
		         .style("font-size", function(d) { return d.size + "px"; })
		         .style("font-family", "Helvetica Neue")
		         .style("fill", function(d, i) { return fill(i); })
		         .attr("text-anchor", "middle")
		         .attr("transform", function(d) {
		           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		         })
		         .text(function(d) { return d.text; });
		  }


		}


	}

	return {
    	restrict: 'E',   
    	link: link,
    	scope: {
    		words: '='
    	},
    	template: '<div id="wordleWrapper"></div>'
    }
});

