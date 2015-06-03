# JavaScript Developer Notes

The application front-end is built with [AngularJS](http://angularjs.org)

## Prerequisites:
* [Node](http://nodejs.org/)
* [Grunt 0.4.0](http://gruntjs.com/): for tasks (e.g. concatenate, minify).
  * Install: `sudo npm install -g grunt-cli`
* [Bower](http://bower.io/): for app dependencies. Dependencies are listed in bower.json file
  * Install: `sudo npm install -g bower`

## Initial Local Development Setup:

The following commands should be run with `application/web/js` as
 the current directory.

1. run `npm install`
2. run `bower install`
3. run `grunt concat`

## Additional Tasks
1. run `grunt watch` to auto build custom app scripts while editing
2. run `grunt karma` to run unit tests


* If you have no idea what any of the above means, now is a good time to learn!