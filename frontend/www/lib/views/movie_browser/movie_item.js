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
            'tap .view_movie': 'showDetail'
        },

        onShow: function() {

            // is boorkmarked or not ?
            var that = this;
            Database.getBookmark(this.model.get('imdb'), function(err, value) {
                if (!err) {

                    that.model.set('bookmarked', value);

                    if (value === true) {
                        that.ui.bookmarkIcon.addClass('selected');
                    }
                } else {
                    that.model.set('bookmarked', false);
                }
                    
            });            
            //this.ui.coverImage.on('load', _.bind(this.showCover, this));
        },

        onClose: function() {
            this.ui.coverImage.off('load');
        },

        showCover: function() {
            this.ui.cover.css('background-image', 'url(' + this.model.get('image') + ')');
            this.ui.cover.css('opacity', '1');
            this.ui.coverImage.remove();
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