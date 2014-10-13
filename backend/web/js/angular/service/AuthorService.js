angular.module('publications.services')
.service('AuthorService', function ($http) {
  var authors  = [];

  return {
    getAuthor: function (authorName) { 
      var url = "author/" + authorName;  
      return $http.get(url).then(function(result) {
      		var author = result.data;
          authors[author.id] = author; 
      		return author;
      	});
    },
    getAuthors: function () { 
      var url = "get/authors";  
      return $http.get(url).then(function(result) {
          authors = result.data; 
          return result.data;
        });
    },
    getCachedAuthor: function(id) {
      return authors[id];
    }

  };
});