angular.module('draymasterApp')
.filter('errorCount', function() {
    return function(input) {
      var errors = input;
      if(errors > 1) {
        return errors + ' errors were';
      } else {
        return errors + ' error was';
      }
    };
});