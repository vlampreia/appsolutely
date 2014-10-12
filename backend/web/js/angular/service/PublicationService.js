angular.module('publications.services')
.service('PublicationService', function ($http) {

  var publications = null;

  return {
    getListOfPublications: function (page) { 
      var url = "/get/publications/" + page;

      return $http.get(url).then(function(result) {
      		publications = result.data; 
      		return result.data;
      	});
    },
    getPublicationsForAuthor: function (page) { 
      var url = "/get/publications/" + page;

      return $http.get(url).then(function(result) {
          publications = result.data; 
          return result.data;
        });
    },
  };
});