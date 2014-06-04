var Settings = {};

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
Settings.dhtLimit = 50;
Settings.deleteTmpOnClose = true;

Settings.peerflixPort = 44000;
	
// Hidden endpoints
Settings.updateApiEndpoint = 'http://get-popcorn.com/';

Settings.yifyApiEndpoint = 'https://yts.re/api/';
Settings.yifyApiEndpointMirror = 'https://yts.im/api/';
Settings.connectionCheckUrl = 'http://google.com/';
	
// App Settings
Settings.version = false;
Settings.dbversion = '0.1.0';
Settings.font = 'tahoma';

var AdvSettings = {

    checkApiEndpoint: function (api, callback) {

        try {

            window.plugins.sslCertificateChecker.check(
                  successCallback,
                  errorCallback,
                  Settings[api.original],
                  api.fingerprint);

            function successCallback(message) {
                alert(message);
                callback();
            }

            function errorCallback(message) {
                alert(message);
                Settings[api.original] = Settings[api.mirror];
                callback();
            }

        } catch(err) {
            //alert(err);
            Settings[api.original] = Settings[api.mirror];
            callback();
        }


    }

};