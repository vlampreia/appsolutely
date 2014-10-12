/**
 * @author Bartłomiej Siemieniuk
 * @date   2014-06-22
 */

angular.module('publications', [
	'google-maps',
	'publications.controllers',
	'publications.services',
	'publications.directives',
	'ui.router',
	'tc.chartjs',
]);

angular.module('publications.controllers',[]);
angular.module('publications.services',   []);
angular.module('publications.directives', []);

angular.module('publications').run(function($rootScope) {

	$rootScope.extendedTemplate  = '';	
	$rootScope.mapOptions        = {
		backgroundColor: "#FFFFFF",	
		styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":0},{"lightness":-22}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"lightness":52}]},{"featureType":"all","elementType":"all","stylers":[{"weight":0.1},{"saturation":-57}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"on"},{"weight":2.6},{"saturation":-21},{"lightness":0},{"gamma":0.95}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"weight":1.66},{"saturation":0},{"lightness":-30}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"color":"#f2f2f2"}]}],
	};
});

angular.module('publications').config(
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/map");

		$stateProvider
		.state('map', {
			url: "/map",
		 	templateUrl: "/js/angular/template/content/map.html",
		 	controller: 'MapController'
		})
		.state('wordle', {
			url: "/wordle",
		 	templateUrl: "/js/angular/template/content/wordle.html",
		  	controller: 'WordleController'
		})
		.state('authors', {
			url: "/authors",
		 	templateUrl: "/js/angular/template/content/authors.html",
		  	controller: 'AuthorsController'
		})
		.state('author', {
			url: "/author/:id",
		 	templateUrl: "/js/angular/template/content/author.html",
		  	controller: 'AuthorController'
		})
		.state('publications', {
			url: "/publications",
		 	templateUrl: "/js/angular/template/content/publications.html",
		  	controller: 'PublicationsController'
		})
		.state('institutions', {
			url: "/institutions",
		 	templateUrl: "/js/angular/template/content/institutions.html",
		  	controller: 'InstitutionsController'
		});
	}
);
