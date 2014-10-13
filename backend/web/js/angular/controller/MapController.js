angular.module('publications.controllers')
.controller('MapController', function($scope, $state, $rootScope) {

	/* 
     * private declarations
     */
	function getAuthorData() { 
		author.lookForAuthor($scope.authorName)
		  .then(function(result){ 
		  	$scope.institutions = result;
		  });
	}

	function appendMarkers(result) {

	}

	function switchExploreMode() {
		$scope.exploreMode = !$scope.exploreMode;
		$scope.map.zoom = 3;

		var map = $scope.map.control.getGMap();

		var newOptions = {
			disableDefaultUI: false,
			scrollwheel: true,
			draggable: true,
		}

		map.setOptions(newOptions);
	}

	var mapOptions = {
		disableDefaultUI: true
	};

	/*
	 * public declarations
	 */

	console.log("Controler");


	$scope.institutions = [{
	        institution: 1,
	        latitude:  53.466372, 
	        longitude: -2.233555,
	        colaborationCount: 55,
	        icon: {
	        	// path:  google.maps.SymbolPath.BACKWARD_OPEN_ARROW
	        }
	}];

	$scope.map = {
	    center: {
	        latitude:  53.466372, 
	        longitude: -2.233555
	    },
	    zoom: 2,
	    control: {}
	};

	console.log($scope.map);

	$scope.switchExploreMode = switchExploreMode;
	$scope.exploreMode       = false;
	$scope.lookForAuthorData = getAuthorData;
	$scope.author            = false;
	
	$scope.options                   = $rootScope.mapOptions;
	$scope.options.scrollwheel      = false;
	$scope.options.disableDefaultUI = true;

	$rootScope.$broadcast('mapApperead',[]);

});

