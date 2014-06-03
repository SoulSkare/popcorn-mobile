(function(App) {
    'use strict';
     
    var MovieItem = Backbone.Marionette.ItemView.extend({
        template: '#movie-item-tpl',

        tagName: 'li',
        className: 'movie-item',

        ui: {
            coverImage: '.cover-image',
            cover: '.cover',
            bookmarkIcon: '.actions-favorites'
        },

        events: {
            'click .view_movie': 'showDetail'
        },

        onShow: function() {},

        onClose: function() {
            this.ui.coverImage.off('load');
        },

        showCover: function() {},

        showDetail: function(e) {
            e.preventDefault();

            this.model.set('imdb_id', 'tt'+this.model.get('imdb'));
            this.model.set('rating', this.model.get('MovieRating'));
            this.model.set('health', false);

            App.vent.trigger('movie:showDetail', this.model);

        }

    });

    App.View.MovieItem = MovieItem;
})(window.App);