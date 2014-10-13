angular.module('publications.services')
.service('authors', function ($http) {
  var authors  = null;

  return {
    getAuthors: function () { 
      var url = "get/authors";  
      return $http.get(url).then(function(result) {
      		authors = result.data; 
      		return result.data;
      	});
    }
  };
});