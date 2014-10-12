angular.module('publications.controllers')
.controller('PublicationsController', 
	function($scope, $state) {

		var publications = [
			{name: 'Izz Abudaka',       since: 1997, id: 1 },
			{name: 'Gregory Samochwala', since: 2005, id: 2 },
			{name: 'Izz Abudaka', since: 1997, id: 3 },
		];

		$scope.publications = publications;

		$scope.goToPublication = function(id) {
			$state.go('publication', {'id': id});
		}

	}
);