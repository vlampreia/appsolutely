angular.module('publications.directives')
.directive('mainMenu',
function ($http,$templateCache,$compile, $timeout, $q, $state) {

	function link(scope, element, attrs) {

		var $menu;
		var $menuExtended;

		var isOpened     = false;
		var activeModule = null;
		var prevActiveModule = null;
		// var mainScope    = scope.$parent.$root;

		init();

		function init()   {
			$menu 		  = element.find('#menu-wrapper');
			$menuExtended = element.find('#extended-menu');
			hideExtendedMenu();
		}

		function clickMenuItem(event) {

			var target   = event.currentTarget;
			var targetId = target.id;
		    prevActiveModule = activeModule;

			setActiveModule(targetId);
		}

		function showMenu(event) {

			if(isOpened && prevActiveModule == activeModule) {
				hideExtendedMenu();
			} else {
				showExtendedMenu();
			}

			isOpened = !isOpened;
		}

		function setActiveModule(menuItemId) {

			var baseUrlPath = '/js/angular/template/extendedMenu/'

			switch(menuItemId) {
				case 'menu-toggle':
					if(activeModule != null) break;
				case 'menu-map':
					activeModule = 'map';
					$state.go('map')
					scope.extended = baseUrlPath + 'searchPublications.html'
					break;
				case 'menu-wordle':
					activeModule = 'wordle';
					$state.go('wordle');
					scope.extended = baseUrlPath + 'searchWordle.html'
					break;

				case 'menu-authors':
					activeModule = 'authors';
					$state.go('authors');
					scope.extended = baseUrlPath + 'searchAuthors.html'
					break;

				case 'menu-publications':
					activeModule = 'publications';
					$state.go('publications');
					scope.extended = baseUrlPath + 'searchPublications.html'
					break;

				case 'menu-institutions':
					activeModule = 'institutions';
					$state.go('institutions');
					scope.extended = baseUrlPath + 'searchPublications.html'
					break;

			} 

			scope.$apply();

 		}

		function hideExtendedMenu() {
			if($menuExtended.width() > $menu.width()) {
				valueToChange = -$menuExtended.width();
			} else {
				valueToChange = -($menuExtended.width() - $menu.width());
			}

			$menuExtended.css('left',valueToChange);
		}

		function showExtendedMenu() {
			$menuExtended.css('left', $menu.width());
		}


		$menu.find('li').on('click', clickMenuItem);
		$menu.find('li').on('mouseover',   showMenu);
		
		$('#extended-menu').on('mouseout', showMenu);

		function what() {
			console.log('what');
		}
	}

	return {
    	restrict: 'A',   
    	link: link,
    	scope: {
    		extended : '=',
    	},
    }
});

