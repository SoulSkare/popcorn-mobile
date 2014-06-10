(function(App) {
    'use strict';
     
    var MovieItem = Backbone.Marionette.ItemView.extend({
        template: '#movie-item-tpl',

        tagName: 'li',
        className: 'movie-item',

        ui: {
            cover: '.movie-item-cover',
            bookmarkIcon: '.actions-favorites'
        },

        events: {
            'click .movie-item-cover': 'showDetail'
        },

        onShow: function() {
            this.ui.cover.css('background-image', 'url(' + this.model.get('image') + ')');

        },

        onClose: function() {

        },


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