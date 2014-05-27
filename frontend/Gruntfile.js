module.exports = function(grunt) {
	"use strict";

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'stylus',
		'jshint'
	]);

	grunt.registerTask('css', [
		'stylus'
	]);

	grunt.registerTask('serve', [
		'connect',
		'watch'
	]);

    grunt.initConfig({

		connect: {
			server: {
					options: {
					port: 8000,
					base: './www/',
					hostname: 'localhost',
					debug: true,
					//keepalive: true,
					livereload: true
				}
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false,
					'resolve url': true,
					use: ['nib'],
					paths: ['./www/styl']
				},
				files: {
					'www/css/app.css' : 'www/styl/app.styl'
				}
			}
		},

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/app/.jshintrc'
				},
				src: ['www/lib/*.js','www/lib/**/*.js','www/*.js','www/*.html']
			}
		},

		watch: {
			options: {
				livereload: true,
				dateFormat: function(time) {
					grunt.log.writeln('Completed in ' + time + 'ms at ' + (new Date()).toLocaleTimeString());
					grunt.log.writeln('Waiting for more changes...');
				},
			},
			scripts: {
				files: ['./www/styl/*.styl','./www/styl/**/*.styl','./www/**/*.js','./www/*.js'],
				tasks: ['css']
			},
		},


	});

};