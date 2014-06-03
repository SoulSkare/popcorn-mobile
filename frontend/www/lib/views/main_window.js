(function(App) {
    'use strict';

    var MainWindow = Backbone.Marionette.Layout.extend({
        template: '#main-window-tpl',

        id: 'main-window',

        regions: {
            Header: '#header',
            Content: '#content',
            MovieDetail: '#movie-detail',
            Player: '#player',
            InitModal: '#initializing',
        },

        events: {
            'dragover': 'preventDefault',
            'drop': 'preventDefault',
            'dragstart': 'preventDefault',
        },

        initialize: function() {
            this.nativeWindow = window;

            // Application events
            App.vent.on('movies:list', _.bind(this.showMovies, this));

            // Movies
            App.vent.on('movie:showDetail', _.bind(this.showMovieDetail, this));
            App.vent.on('movie:closeDetail', _.bind(this.MovieDetail.close, this.MovieDetail));

            // Stream events
            App.vent.on('stream:started', _.bind(this.streamStarted, this));
            App.vent.on('stream:ready', _.bind(this.showPlayer, this));
            App.vent.on('player:close', _.bind(this.closePlayer, this));
        },

        onShow: function() {
            //this.Header.show(new App.View.TitleBar());
            // Set the app title (for Windows mostly)
            //this.nativeWindow.title = App.Config.title;

            // Show loading modal on startup
            var that = this;
            this.Content.show(new App.View.InitModal());

            // Make sure our backend is ready           
            Backend.initialize(function() {
                that.showMovies();
                App.vent.trigger('main:ready'); 
            });
        },


        showMovies: function(e) {
            this.MovieDetail.close();
            this.Content.show(new App.View.MovieBrowser());
        },

        preventDefault: function(e) {
            e.preventDefault();
        },
   
        showMovieDetail: function(movieModel) {
            this.MovieDetail.show(new App.View.MovieDetail({
                model: movieModel
            }));
        },


        streamStarted: function(stateModel) {
            this.MovieDetail.close();
            this.Player.show(new App.View.Loading({
                model: stateModel
            }));
        },

        showPlayer: function(streamModel) {
            this.Player.show(new App.View.Player({
                model: streamModel
            }));
            this.Content.$el.hide();
            if(this.MovieDetail.$el !== undefined) {
                this.MovieDetail.$el.hide();
            }
        },

        closePlayer: function(e) {
            this.Player.close();
            this.Content.show(new App.View.MovieBrowser());
        },        

    });

    App.View.MainWindow = MainWindow = MainWindow;
})(window.App);