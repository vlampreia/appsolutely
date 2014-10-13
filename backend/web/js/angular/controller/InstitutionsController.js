angular.module('publications.controllers')
.controller('InstitutionsController', 
	function($scope, $state) {

		var institutions = [
			{name: 'University of Warsaw',    since: 1997, id: 1 },
			{name: 'University of Yale',      since: 2005, id: 2 },
			{name: 'University of Something', since: 1997, id: 3 },
		];

		$scope.institutions    = institutions;

		$scope.goToPublication = function(id) {
			$state.go('publication', {'id': id});
		}

	}
);