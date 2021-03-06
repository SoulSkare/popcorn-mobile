(function(App) {
    "use strict";

    var API_ENDPOINT = URI('http://api.trakt.tv/');
    var MOVIE_PATH = 'movie';
    var SHOW_PATH = 'show';
    var API_KEY = '515a27ba95fbd83f20690e5c22bceaff0dfbde7c';

    function Trakttv() {
        App.Providers.CacheProvider.call(this, 'metadata');
    }

    Trakttv.prototype = Object.create(App.Providers.CacheProvider.prototype);
    Trakttv.prototype.constructor = Trakttv;

    var querySummaries = function(ids) {
        if(_.isEmpty(ids)) {
            return [];
        }

        var imdbIds = _.map(ids.sort(), function(id){return 'tt'+id;});

        var deferred = Q.defer();

        var uri = API_ENDPOINT.clone()
            .segment([
                MOVIE_PATH,
                'summaries.json',
                API_KEY,
                imdbIds.join(','),
                'full'
            ]);

        $.get(uri.toString(), function(data, status, jqXHR) {
            if(status != "success" || !data) {
                deferred.reject(error);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };

    var resizeImage = function(imageUrl, width) {
        var uri = URI(imageUrl),
            ext = uri.suffix(),
            file = uri.filename().split('.' + ext)[0];

        return uri.filename(file + '-' + width + '.' + ext).toString();
    };

    var formatForPopcorn = function(items) {
        var movies = {};
        _.each(items, function(movie){
            var imdb = movie.imdb_id.replace('tt','');
            movie.image = resizeImage(movie.images.poster, '300');
            movie.bigImage = movie.images.poster;
            movie.backdrop = resizeImage(movie.images.fanart, '940');
            movie.synopsis = movie.overview;
            movies[imdb] = movie;
        });
        return movies;
    };

    // Single element query
    // {title: 'Game of Thrones', season: 4, episode: 6}
    // {title: 'Game of Thrones', season: 04, episode: 06}
    
    var episodeDetail = function(data, callback) {

        var slug = data.title.toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');

        var uri = API_ENDPOINT.clone()
            .segment([
                SHOW_PATH,
                'episode',
                'summary.json',
                API_KEY,
                slug,
                data.season.toString(),
                data.episode.toString()
            ]);

        win.info('Request to TRAKT API');
        win.debug(uri.toString());
        request({url: uri.toString(), json: true}, function(error, response, data) {
            if(error || !data) {
                callback(error, false);
            } else {
                if (data.status === 'failure') {
                    callback(data, false);
                } else {
                    callback(false, data);
                }
            }
        });
    };    

    Trakttv.prototype.query = function(ids) {
        return Q.when(querySummaries(ids))
            .then(formatForPopcorn);
    };

    Trakttv.prototype.episodeDetail = function(data, callback) {
        return episodeDetail(data, callback);
    };    

    App.Providers.Trakttv = Trakttv;

})(window.App);