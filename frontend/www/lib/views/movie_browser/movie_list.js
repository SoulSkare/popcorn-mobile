(function(App) {
    'use strict';

    var SCROLL_MORE = 300;

    var ErrorView = Backbone.Marionette.ItemView.extend({
        template: '#movie-error-tpl',
        onBeforeRender: function() {
            this.model.set('error', this.error);
        }
    });

    var MovieList = Backbone.Marionette.CompositeView.extend({
        template: '#movie-list-tpl',

        tagName: 'ul',
        className: 'movie-list',

        itemView: App.View.MovieItem,
        itemViewContainer: '.movies',

        events: {
            'touchmove': 'onScroll'
        },

        isEmpty: function() {
            return !this.collection.length && this.collection.state !== 'loading';
        },

        getEmptyView: function() {
            if(this.collection.state === 'error') {
                return ErrorView.extend({error: i18n.__('Error loading data, try again later...')});
            } else {
                return ErrorView.extend({error: i18n.__('No movies found...')});
            }
        },

        ui: {
            spinner: '.spinner'
        },

        initialize: function() {
            var _this = this;
            this.listenTo(this.collection, 'loading', this.onLoading);
            this.listenTo(this.collection, 'loaded', this.onLoaded);
        },

        onShow: function() {
            if(this.collection.state === 'loading') {
                this.onLoading();
            }

        },

        onLoading: function() {

            $('.status-loadmore').hide();
            $('#loading-more-animi').show();
        },


        onLoaded: function() {
			console.timeEnd('App startup time');
            var self = this;
            this.checkEmpty();
            this.ui.spinner.hide();
            $(window).on('orientationchange', this.onThisResize);
            this.onThisResize();

        },
        onThisResize: function() {
            var headerheight = $( "#movie-list-header" ).height();
            $(".movies").css("margin-top", headerheight +"px");
          },
        onScroll: function() {
            if(!this.collection.hasMore) {
                return;
            }

            var totalHeight       = this.$el.prop('scrollHeight');
            var currentPosition = this.$el.scrollTop() + this.$el.height();

            if(this.collection.state === 'loaded' &&
                totalHeight - currentPosition < SCROLL_MORE) {
                this.collection.fetchMore();
            }
        }
    });

    function calculateMoviesInThisRow(selected) {
        var topNumber = selected.position().top;
        var divsInRow = 0;
        $('.movies li').each(function() {
            if($(this).position().top === topNumber){
                divsInRow++;
            }
        });
        return divsInRow;
    }

    App.View.MovieList = MovieList;
})(window.App);