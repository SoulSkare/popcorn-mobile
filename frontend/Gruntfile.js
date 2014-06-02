module.exports = function(grunt) {
	"use strict";

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'stylus',
		'connect',
		'watch'
	]);

	grunt.registerTask('init', [
		'exec:addPlatform',
		'exec:plugins_device',
		'exec:plugins_network',
		'exec:plugins_update',
		'exec:prepare',
		'exec:build'
	]);

	grunt.registerTask('css', [
		'stylus'
	]);	

	grunt.registerTask('serve', [
		'stylus',
		'connect',
		'watch'
	]);

    grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
        exec:{
			addPlatform:{
				command:"cordova platforms add android",
				stdout:true,
				stderror:true
			},
			prepare:{
				command:"cordova prepare",
				stdout:true,
				stderror:true
			},
			build:{
				command:"cordova build android",
				stdout:true,
				stderror:true
			},
			run:{
				command:"cordova run android",
				stdout:true,
				stderror:true
			},
			
			plugins_device: 'cordova plugin add org.apache.cordova.device',
			plugins_network: 'cordova plugin add org.apache.cordova.network-information',
			plugins_update: 'cordova plugin add https://github.com/popcorn-official/codova-update-plugin.git'
			
        },

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
				files: ['./www/styl/*.styl','./www/styl/**/*.styl','./www/**/*.js','./www/*.js','./www/templates/*.tpl','./www/index.html'],
				tasks: ['css']
			},
		},


	});

};