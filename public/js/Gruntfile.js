module.exports = function (grunt) {
    var now = new Date();

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
          
            uiBootstrap: {
              src: [
                'libs/angular_ui_bootstrap/transition.js',
                'libs/angular_ui_bootstrap/dialog.js',
                'libs/angular_ui_bootstrap/modal.js',
                'libs/angular_ui_bootstrap/buttons.js',
                'libs/angular_ui_bootstrap/popover.js',
                'libs/angular_ui_bootstrap/tabs.js',
                'libs/angular_ui_bootstrap/tooltip.js',
                'libs/angular_ui_bootstrap/typeahead.js'
              ],
              dest: 'libs/ui-bootstrap.js'
            },
            
            vendor: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'libs/jquery-ui-1.9.2.custom.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
					'bower_components/angular/angular-animate.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-ui/build/angular-ui.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'libs/ui-bootstrap.js',
                    'libs/angular-fullscreen/angular-fullscreen.js'
                ],
                dest: 'build/vendor.js'
            },
          
            app: {
                src: [
                    'scripts/bootstrap-template/*.js',
                    'scripts/Main.js',
                    'scripts/controllers/*.js',
                    'scripts/directives/*.js',
                    'scripts/filters/*.js',
                    'scripts/services/*.js'
                ],
                dest: 'build/draymaster.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> Built on: ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: ';',
                mangle: false
            },
            app: {
                src: 'build/draymaster.js',
                dest: 'build/draymaster.min.js'
            }
        },
        
        watch: {
          app: {
            files: ['scripts/**/*.js', '../css/**/*.css'],
            tasks: ['concat:app','uglify', 'cssmin'],
            options: {
              nospawn: true
            }
          }
        },
        
        cssmin: {
            minify: {
              expand: true,
              cwd: '../css/',
              src: ['*.css', '!*.min.css'],
              dest: '../css/min',
              ext: '.min.css'
            },
            
            combine: {
              files: {
                '../css/draymaster.min.css': ['../css/App.css','../css/custom.css']
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:app', 'uglify', 'cssmin']);
};