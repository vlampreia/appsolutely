angular.module('publications.services')
.service('logger', function ($http) {

  var logs       = null;
  var progress   = 0;
  var update     = null;
  var status     = null;
  var idUpdate   = null;
  var inProgress = false;

  return {

    checkUpdater: function() {

      var url = "/get/updater/status";

      return $http.get(url)
        .then(function(result) {
          
        update   = result.data;
        status   = update.status;

        if(status === 1) {
          inProgress = true;
          progress   = update.progress;
        }

        var prepare = {
          'inProgress': inProgress,
          'progress'  : progress,
        }

        return prepare;

      });

    },

    getLogs: function () { 

      var url = "/get/logs";

      return $http.post(url).then(function(result) {
      	logs = result.data; 
      	return result.data;
      });

    },

    getProgress: function () {
      var url = "/get/updater/progress";
      return $http.get(url).then(function(result) {
          progress = result.data.progress;
          return progress;
      });
    },

    updateAll: function () {
      var url = "/updater/update/all";


      return $http.get(url).then(function(result) {
        progress = result.data.progress;
        error    = result.data.error;
        status   = result.data.status;

        var prepare = {
          'progress' : progress,
          'error'    : error,
          'status'   : status
        }

        return prepare;
      }); // end of promise
    
    } // end of updateAll

  };
});