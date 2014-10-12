angular.module('publications.controllers')
.controller('AuthorController', 
	function($scope, $state, $stateParams, $rootScope, AuthorService, PublicationService) {

		_init();

		function _init() {
			$scope.options = $rootScope.mapOptions;
			$rootScope.$broadcast('mapApperead',{vertical: false});

			$scope.map = {
			    center: {
			        latitude:  53.466372, 
			        longitude: -2.233555
			    },
			    zoom: 4,
			    control: {},
			}

			_loadAuthor();
		}

		function _loadAuthor() {
			AuthorService.getAuthor($stateParams.id)
				.then(function(data){
					$scope.author = data;
				}
			);

			PublicationService.getPublicationsForAuthor($stateParams.id)
				.then(function(data){
					$scope.author = data;
				}
			);
		}

	}
);