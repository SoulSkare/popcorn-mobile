var
    // Minimum percentage to open video
    MIN_PERCENTAGE_LOADED = 0.5,

    // Minimum bytes loaded to open video
    MIN_SIZE_LOADED = 10 * 1024 * 1024,

    // Load native UI library
    //gui = require('nw.gui'),

    // Debug flag
  isDebug = window.location.href.indexOf('?debug=1'),

//    // browser window object
    win = $(window),
//
//    // os object
//    os = require('os'),
//
//    // path object
//    path = require('path'),
//
//    // fs object
//    fs = require('fs'),
//
//    // url object
//    url = require('url'),

    // TMP Folder
    tmpFolder = "/";

//    // i18n module (translations)
//    i18n = require("i18n");
//
//    // Mime type parsing
//    mime = require('mime'),
//
//    moment = require('moment');

// Special Debug Console Calls!
win.log = console.log.bind(console);
win.debug = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('%c[%cDEBUG%c] %c' + arguments[0], 'color: black;', 'color: green;', 'color: black;', 'color: blue;');
	console.debug.apply(console, params);
};
win.info = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('[%cINFO%c] ' + arguments[0], 'color: blue;', 'color: black;');
	console.info.apply(console, params);
};
win.warn = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('[%cWARNING%c] ' + arguments[0], 'color: orange;', 'color: black;');
	console.warn.apply(console, params);
};
win.error = function() {
	var params = Array.prototype.slice.call(arguments, 1);
	params.unshift('%c[%cERROR%c] ' + arguments[0], 'color: black;', 'color: red;', 'color: black;');
	console.error.apply(console, params);
};

// Load in external templates
var loading = [];
_.each(document.querySelectorAll('[type="text/x-template"]'), function(el) {
    loading.push(el);
    $.get(el.src, function(res) {
        el.innerHTML = res;
        loading.pop();
    });
});

// Global App skeleton for backbone
var App = new Backbone.Marionette.Application();
_.extend(App, {
    Controller: {},
    View: {},
    Model: {},
    Page: {},
    Scrapers: {},
    Providers: {},
    Localization: {}
});

// set database
//App.db = Database;

// Set settings
//App.advsettings = AdvSettings;
//App.settings = Settings;  

App.addRegions({ Window: '.main-window-region' });

var timeout = setTimeout(init, 1000);
function init() {
    App.addInitializer(function(options){
        if(loading.length == 0) {
            var mainWindow = new App.View.MainWindow();
            try{
                App.Window.show(mainWindow);
                clearTimeout(timeout);
            } catch(e) {
                console.error("Couldn't start app: ", e, e.stack);
            }
        } else {
            console.log("Templates not ready. Try again in 500 ms");
            timeout = setTimeout(init, 1000);
        }
    });
};

App.vent.on('error', function(err) {
    window.alert('Error: ' + err);
});

deleteFolder = function(path) {
  console.log("No temp files on browser version");
  return;
	if( typeof path != 'string' ) return;
	try {
		var files = [];
		if( fs.existsSync(path) ) {
			files = fs.readdirSync(path);
			files.forEach(function(file,index){
				var curPath = path + '\/' + file;
				if(fs.lstatSync(curPath).isDirectory()) {
					deleteFolder(curPath);
				} else {
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	} catch(err) {
		win.error('deleteFolder()', err);
	}
};

// Wipe the tmpFolder when closing the app (this frees up disk space)
win.on('close', function(){
    if( App.settings.deleteTmpOnClose ) {
        deleteFolder(App.settings.tmpLocation);
    }

    win.close(true);
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalizeEach = function() {
    return this.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var i18n = Object;
i18n.__ = function(data) {
    return data
}