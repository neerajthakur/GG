angular.module('draymasterApp')
.filter('accessorialStatus', function() {
    return function(input) {
      if(input > 0) {
        return 'APPLIED (' + input + ')';
      } else {
        return 'UNUSED';
      }
    };
});