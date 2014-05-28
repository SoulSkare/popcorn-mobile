if(typeof Nedb == "undefined") Nedb = require('nedb');
    var Datastore = Nedb;
    var db = {};

//    var zlib = require('zlib');
//    var openSRT = require('opensrt_js');

    console.time("App startup time");
    var data_path = "/src/server/tmp";
    var API_ENDPOINT = "http://localhost:8080/api/json?target=http://popcorn-api.com";

// TTL for popcorn-api DB sync
var TTL = 1000 * 60 * 60 * 24;

//process.env.TZ = "America/New_York"; // set same api tz

    db.bookmarks = new Datastore({ filename: 'data/bookmarks.db', autoload: true });
    db.settings = new Datastore({ filename: 'data/settings.db', autoload: true });
    db.tvshows = new Datastore({ filename: 'data/shows.db', autoload: true });
    db.movies = new Datastore({ filename: 'data/movies.db', autoload: true });
    db.queue = new Datastore({ filename: 'data/queue.db', autoload: true });

// Create unique indexes for the various id's for shows and movies
db.tvshows.ensureIndex({fieldName: 'imdb_id' , unique: true });
db.tvshows.ensureIndex({fieldName: 'tvdb_id' , unique: true });
db.movies.ensureIndex({fieldName: 'imdb' , unique: true });
db.movies.removeIndex('imdb_id');
db.movies.removeIndex('tmdb_id');
db.bookmarks.ensureIndex({fieldName: 'imdb_id' , unique: true });

// settings key uniqueness
db.settings.ensureIndex({fieldName: 'key' , unique: true });

var extractIds = function(items) {
	return _.pluck(items, 'imdb_id');
};

var Database = {

	addMovie: function(data, cb) {
		db.movies.insert(data, cb);
	},

	deleteMovie: function(imdb_id, cb) {
		db.movies.remove({imdb: imdb_id}, cb);
	},

	getMovie: function(imdb_id, cb) {
		db.movies.findOne({imdb : imdb_id}, cb);
	}, 

	addBookmark: function(imdb_id, type, cb) {
		db.bookmarks.insert({imdb_id: imdb_id, type: type}, cb);
	},

	deleteBookmark: function(imdb_id, cb) {
		db.bookmarks.remove({imdb_id: imdb_id}, cb);
	},

	getBookmark: function(imdb_id, cb) {
		db.bookmarks.findOne({imdb_id : imdb_id}, function(err,data) {
			if (err) {
				cb(true,false);
			}
			
			if (data != null) {
				return cb(false,true);
			} else {
				return cb(false,false);
			}
		});
	},

	deleteBookmarks: function(cb) {
		db.bookmarks.remove({ }, { multi: true }, function (err, numRemoved) {
			return cb(false,true);
		});
	},

	// format: {page: page, keywords: title}
	getBookmarks: function(data, cb) {
		var page = data.page-1;
		var byPage = 30;
		var offset = page*byPage;
		var query = {};
			
		db.bookmarks.find(query).skip(offset).limit(byPage).exec(cb);
	},        

	addMovies: function(data, cb) {
		async.each(data.movies, function(movie, callback) {
			Database.addTVShow({movie: movie}, function(err, show) {
				callback(err);
			});
		},cb);
	},

	markMovieAsWatched: function(data, cb) {
		if (!cb) {
			cb = function () {};
		}
		db.watched.insert({movie_id: data.imdb_id.toString(), date: new Date(), type: 'movie'}, cb);
	},

	markMovieAsNotWatched: function(data, cb) {
		if (!cb) {
			cb = function () {};
		}
		db.watched.remove({movie_id: data.imdb_id.toString()}, cb);
	},

	checkMovieWatched: function(data, cb) {
		db.watched.find({movie_id: data.imdb_id.toString()}, function(err, data){
			return cb((data!=null && data.length > 0), data);
		});
	},

	getMoviesWatched: function(cb) {
		db.watched.find({type: 'movie'}, cb);
	},

	/*******************************
	*******     SHOWS       ********
	*******************************/
	addTVShow: function(data, cb) {
		db.tvshows.insert(data, cb);
	},

	// This calls the addTVShow method as we need to setup a blank episodes array for each
	addTVShows: function(data, cb) {
		async.each(data.shows, function(show, callback) {
			Database.addTVShow({show:show}, function(err, show) {
				callback(err);
			});
		},cb);
	},

	markEpisodeAsWatched: function(data, cb) {
		if (!cb) {
			cb = function () {};
		}
		db.watched.insert({show_id: data.show_id.toString(), season: data.season.toString(), episode: data.episode.toString(), type: 'episode', date: new Date()}, cb);
	},

	markEpisodeAsNotWatched: function(data, cb) {
		if (!cb) {
			cb = function () {};
		}
		db.watched.remove({show_id: data.show_id.toString(), season: data.season.toString(), episode: data.episode.toString()}, cb);
	},

	checkEpisodeWatched: function(data, cb) {
		db.watched.find({show_id: data.show_id.toString(), season: data.season.toString(), episode: data.episode.toString()}, function(err, data){
			return cb((data!=null && data.length > 0), data);
		});
	},

	// return an array of watched episode for this 
	// tvshow
	getEpisodesWatched: function(show_id, cb) {
		db.watched.find({show_id: show_id.toString()}, cb);
	},

	// deprecated: moved to provider 
	// TODO: remove once is approved
	getSubtitles: function(data, cb) {
	},

	// Used in bookmarks
	deleteTVShow: function(imdb_id, cb) {
		db.tvshows.remove({imdb: imdb_id}, cb);
	},	

	// Used in bookmarks
	getTVShow: function(data, cb) {
		db.tvshows.findOne({_id : data.show_id}, cb);
	},

	// Used in bookmarks
	getTVShowByImdb: function(imdb_id, cb) {
		db.tvshows.findOne({imdb_id : imdb_id}, cb);
	},

	// TO BE REWRITTEN TO USE TRAKT INSTEAD
	getImdbByTVShow: function(tvshow, cb) {
		db.tvshows.findOne({title : tvshow}, cb);
	},

	getSetting: function(data, cb) {
		db.settings.findOne({key : data.key}, cb);
	},      

	getSettings: function(cb) {
		db.settings.find({}).exec(cb);
	},

	// format: {key: key_name, value: settings_value}
	writeSetting: function(data, cb) {
		Database.getSetting({key: data.key}, function(err, setting) {
			if (setting == null) {
				db.settings.insert(data, cb);
			} else {
				db.settings.update({'key': data.key}, {$set : {'value': data.value}}, {}, cb);
			}
		});
	},

	resetSettings : function(cb) {
		db.settings.remove({ }, { multi: true }, cb);
	},

	deleteDatabases: function(cb) {
		db.bookmarks.remove({ }, { multi: true }, function (err, numRemoved) {
			db.tvshows.remove({ }, { multi: true }, function (err, numRemoved) {
				db.movies.remove({ }, { multi: true }, function (err, numRemoved) {
					db.settings.remove({ }, { multi: true }, function (err, numRemoved) {
						db.watched.remove({ }, { multi: true }, function (err, numRemoved) {
							return cb(false,true);
						});
					});
				});
			});
		});
	},

	initialize : function(callback){

		// we'll intiatlize our settings and our API SSL Validation
		// we build our settings array
		Database.getSettings(function(err, data) {

            console.log(err, data);
			
			if (data != null) {
				for(var key in data) {
					Settings[data[key].key] = data[key].value;
				}
			}

			// new install?    
			if( Settings.version === false ) {
				window.__isNewInstall = true;
			}

            callback();

//			AdvSettings.checkApiEndpoint(
//				[
//					{
//						original: 'yifyApiEndpoint',
//						mirror: 'yifyApiEndpointMirror',
//						fingerprint: 'D4:7B:8A:2A:7B:E1:AA:40:C5:7E:53:DB:1B:0F:4F:6A:0B:AA:2C:6C'
//					}
//					// TODO: Add get-popcorn.com SSL fingerprint (for update)
//					// with fallback with DHT
//				]
//				, function() {
//
//				// set app language
////				detectLanguage(Settings['language']);
//
//				// set hardware settings and usefull stuff
////				AdvSettings.setup();
//
//
//				// we skip the initDB (not needed in current version)
//
//              callback();
//			});

		});
		App.vent.on('shows:watched',   _.bind(this.markEpisodeAsWatched, this));
		App.vent.on('shows:unwatched', _.bind(this.markEpisodeAsNotWatched, this));
		App.vent.on('movies:watched',  _.bind(this.markMovieAsWatched, this));
	}	
};