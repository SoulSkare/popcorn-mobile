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

	grunt.registerTask('fix', [
		'exec:rmPlatform',
		'init'
	]);

	grunt.registerTask('run', [
		'stylus',
		'exec:run'
	]);		

	grunt.registerTask('css', [
		'stylus'
	]);	

	grunt.registerTask('serve', [
		'stylus',
		'exec:serve'
	]);

    grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
        exec:{
			addPlatform:{
				command:"node_modules/.bin/cordova platforms add android",
				stdout:true,
				stderror:true
			},
			rmPlatform:{
				command:"node_modules/.bin/cordova platforms rm android",
				stdout:true,
				stderror:true
			},
			prepare:{
				command:"node_modules/.bin/cordova prepare",
				stdout:true,
				stderror:true
			},
			build:{
				command:"node_modules/.bin/cordova build android",
				stdout:true,
				stderror:true
			},
			run:{
				command:"node_modules/.bin/cordova run android",
				stdout:true,
				stderror:true
			},

			serve:{
				command:"node_modules/.bin/phonegap serve",
				stdout:true,
				stderror:true
			},			
			plugins_device: 'node_modules/.bin/cordova plugin add org.apache.cordova.device',
			plugins_network: 'node_modules/.bin/cordova plugin add org.apache.cordova.network-information',
			plugins_update: 'node_modules/.bin/cordova plugin add https://github.com/popcorn-official/codova-update-plugin.git'

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

	});

};