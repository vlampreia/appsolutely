angular.module('publications.controllers')
.controller('AuthorsController', 
	function($scope, $state) {

		var authors = [
			{name: 'Izz Abudaka', since: 1997, id: 1 },
			{name: 'Gregory Samochwala', since: 2005, id: 2 },
			{name: 'Izz Abudaka', since: 1997, id: 3 },
		];

		$scope.authors = authors;

		$scope.goToAuthor = function(id) {
			$state.go('author', {'id': id});
		}

	    $scope.data = [
			{
				value: 300,
				color:'#F7464A',
				highlight: '#FF5A5E',
				label: 'Red'
			},
			{
				value: 50,
				color: '#46BFBD',
				highlight: '#5AD3D1',
				label: 'Green'
			},
			{
				value: 100,
				color: '#FDB45C',
				highlight: '#FFC870',
				label: 'Yellow'
			}
		];

		// Chart.js Options
		$scope.options =  {

			// Sets the chart to be responsive
			responsive: false,

			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke : false,

			//String - The colour of each segment stroke
			segmentStrokeColor : '#fff',

			//Number - The width of each segment stroke
			segmentStrokeWidth : 2,

			//Number - The percentage of the chart that we cut out of the middle
			percentageInnerCutout : 50, // This is 0 for Pie charts

			//Number - Amount of animation steps
			animationSteps : 100,

			//String - Animation easing effect
			animationEasing : 'easeOutBounce',

			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate : true,

			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale : false,

			//String - A legend template
			legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

		};

	}
);