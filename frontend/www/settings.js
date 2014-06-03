    var 
    Settings = {};
//    os = require('os'),
//    path = require('path');
    
    /** Default settings **/

    // User interface
	Settings.language = 'en';
	
    // Movies
    Settings.moviesShowQuality = false;
    Settings.movies_quality = 'all';
	
    // Subtitles
    Settings.subtitle_language = 'none';
    Settings.subtitle_size = '28px';
	
    // More options
    Settings.tvshowApiEndpoint = 'http://eztvapi.re/';

    // Advanced options
    Settings.connectionLimit = 100;
    Settings.dhtLimit = 1000;
    Settings.tmpLocation = "/src/app/server/cache"
    Settings.deleteTmpOnClose = false;

    Settings.peerflixPort = 44000;
	
    // Hidden endpoints
    Settings.updateApiEndpoint = 'http://get-popcorn.com/';
    /* TODO: Buy SSL for main domain + buy domain get-popcorn.re for fallback
    Settings.updateApiEndpointMirror = 'https://get-popcorn.re/'; */
    Settings.yifyApiEndpoint = 'https://yts.re/api/';
    Settings.yifyApiEndpointMirror = 'https://yts.im/api/';
    Settings.connectionCheckUrl = 'http://google.com/';
	
    // App Settings
    Settings.version = false;
    Settings.dbversion = '0.1.0';
    Settings.font = 'tahoma';

if(typeof exports != "undefined") exports.Settings = Settings;