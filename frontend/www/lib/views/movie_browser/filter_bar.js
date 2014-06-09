(function(App) {
    'use strict';

    App.View.FilterBar = Backbone.Marionette.ItemView.extend({
        className: 'filter-bar',
        ui: {
            searchForm: '.search form',
            search:     '.search input'
        },
        events: {
            'hover  @ui.search-input': 'focus',
            'submit @ui.search-check': 'search',
            'click .sorters .dropdown-menu a': 'sortBy',
            'click .menu-genre a': 'changeGenre',
            'click .showMovies': 'showMovies',
            'click .icon-search': 'showSearch',
            'click .close-search-menu': 'hideSearch'
        },

        focus: function (e) {
            console.error ('here');
            e.focus();
        },

        onShow: function() {
            var that = this;

            // MENU
            that.$(".filter-bar-menu").on("click tap", function(e){
                that.$(".menu").animate({right: 0}, 500)
                that.$(".menu-overlay").css('display', 'block')
            })

            that.$(".menu-overlay").on("click tap", function(e){
                that.$(".sub-menu").animate({right: "-60%"}, 500)
                that.$(".menu").animate({right: "-70%"}, 500)
                that.$(".menu-overlay").css('display', 'none')
            })

            that.$(".genre-sub-menu").on("click tap", function(e){
                that.$(".menu-sort-by").hide()
                that.$(".sub-menu").animate({right: 0}, 500)
                that.$(".menu-genre ").show()
            })

            that.$(".genre-sort-by").on("click tap", function(e){
                that.$(".menu-genre ").hide()
                that.$(".sub-menu").animate({right: 0}, 500)
                that.$(".menu-sort-by").show()
            })

            that.$(".menu").on("click tap", function(e){
                if (that.$(".sub-menu").css("right") == "0px") {
                    that.$(".sub-menu").animate({right: "-60%"}, 500)
                }
            })

            that.$(".menu-base li").on("click tap", function(e){
                that.$(".menu-base li").removeClass("selected")
                $(this).addClass("selected")
            })




        },

        search: function(e) {
            App.vent.trigger('movie:closeDetail');
            e.preventDefault();
            this.model.set({
                keywords: this.ui.search.val(),
                genre: ''
            });
            this.ui.search.val('');
            this.ui.search.blur();
        },

        showSearch: function(e) {
            e.preventDefault();
            console.log('Show search');
            var that = this;
            // SEARCH SHOW
            that.$(".search-base").animate({right: 0}, 500);
        },

        hideSearch: function(e) {
            e.preventDefault();
            console.log('Hide search');
            var that = this;
            // SEARCH HIDE
            $(".search-base").animate({right: '-100%'}, 500);
        },

        sortBy: function(e) {
            this.$('.sorters .active').removeClass('active');
            $(e.target).addClass('active');

            var sorter = $(e.target).attr('data-value');

            if(this.previousSort === sorter) {
                this.model.set('order', this.model.get('order') * -1);
            } else {
                this.model.set('order', -1);
            }

            $(".genre-sort-by-choosed").text(sorter);

            this.model.set({
                keyword: '',
                sorter: sorter
            });
            this.previousSort = sorter;
        },

        changeGenre: function(e) {
            e.preventDefault();

            this.$('.menu-overlay').click(); // close menu
            this.$(".sub-menu li").removeClass("selected");
            this.$(e.target).parent().addClass("selected");

            var genre = this.$(e.target).attr('data-value');
            $(".genre-choosed").text(genre);

            this.model.set({
                keyword: '',
                genre: genre
            });
        },

        showMovies: function(e) {
            e.preventDefault();
            App.vent.trigger('movies:list', []);
        },


    });

    App.View.FilterBarMovie = App.View.FilterBar.extend({
        template: '#movie-list-header-tpl',
        type: 'movies',
    });

})(window.App);