angular.module('ui.bootstrap', ['ui.bootstrap.dialog', 'ui.bootstrap.modal', 'ui.bootstrap.tabs', 'ui.bootstrap.tooltip','ui.bootstrap.typeahead']);
angular.module('draymaster.services', ['ngResource']);
angular.module('draymaster.sanitize', ['ngSanitize']);
angular.module('draymaster.route', ['ngRoute']);
angular.module('draymaster.fullscreen', ['FBAngular']);

var appModule = angular.module('draymasterApp',
  ['draymaster.services', 'draymaster.sanitize', 'draymaster.route', 'draymaster.fullscreen', 'ui', 'ui.bootstrap','ngAnimate']);
