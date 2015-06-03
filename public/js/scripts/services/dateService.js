angular.module('draymasterApp')
.factory('dateService', function() {

  return {
    getCurrentDate: function() {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      return month + '-' + day + '-' + year;
    }
  };
          
});