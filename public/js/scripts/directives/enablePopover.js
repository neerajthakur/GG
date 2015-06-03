angular.module("draymasterApp")
.directive("enablePopover", function() {
  return {
    link: function(scope, element, attrs) {
      element.popover({container: 'body', html: true});
    }
};
});