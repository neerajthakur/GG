angular.module('draymasterApp').
filter('selectAllButtonText', function() {
    return function(input) {
      if(input === false) {
        return 'Select All Visible';
      } else {
        return 'Unselect All Visible';
      }
    };
});