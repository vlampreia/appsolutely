angular.module('publications.directives')
.directive('full',
function ($http,$templateCache,$compile, $timeout, $q) {

	var mapType = null;
	
	function link(scope, element, attrs, $scope) {

		var $map;
		var $menu;
		var $menuExtended;

		$( window ).resize(function() {
			resize();
		});

		init();

		function init()   {
			
			scope.$on('mapApperead', function(event,mass) {
				console.log('EVENT APPEREAD');
				bind();
				if(mass.vertical == false) {
					console.log('resize to half');
					Resize().resizeWidthElement($map);
				} else {
					Resize().resizeAll();

				}

			// var resize = new Resize();
				console.log(mass);
			});

			bind();

			var resize = new Resize();
			resize.resizeAll();
		}

		function bind() {
			$map  		  = element.find('.angular-google-map');
			$menu 		  = element.find('#menu-wrapper');
			$menuExtended = element.find('#extended-menu');
		}
 
		function Resize() {

			var newWindowWidth  = $(window).width();
			var newWindowHeight = $(window).height();

			function resizeFullyElement(el, extraWidth) {
				console.log(extraWidth); 
				extraWidth = typeof extraWidth !== 'undefined' ? extraWidth : 0;
				console.log(extraWidth);
				el.width(newWindowWidth - extraWidth);
				el.height(newWindowHeight);
			}

			function resizeHeightElement(el) {
				el.height(newWindowHeight);
			}

			function resizeWidthElement(el) {
				el.width(newWindowWidth);
			}

			function resizeAll() {
				resizeFullyElement(element);
				resizeFullyElement($map, $menu.width());
				$map.css({'margin-left': $menu.width()});
				console.log($map);
				resizeHeightElement($menu);
				resizeHeightElement($menuExtended);
			}

			return {
				resizeAll : resizeAll,
				resizeFullyElement: resizeFullyElement,
				resizeHeightElement: resizeHeightElement,
				resizeWidthElement: resizeWidthElement,
			};
		}

		

	}

	return {
    	restrict: 'A',   
    	link: link
    }
});

