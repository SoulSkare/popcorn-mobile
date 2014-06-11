(function(App) {
    'use strict';

    App.View.FilterBar = Backbone.Marionette.ItemView.extend({
        className: 'filter-bar',
        ui: {
            search:     '#search_menu',
            btnSearch:  '#search-check'
        },
        events: {
            'keyup @ui.search': 'keyCheck',
            'click .search-check-confirm': 'search',
            'click .search-check-cancel': 'CleanSearch',
            'click .menu-sort-by a': 'sortBy',
            'click .menu-genre a': 'changeGenre',
            'click .showMovies': 'showMovies',
            'click .icon-search': 'showSearch',
            'click .close-search-menu': 'hideSearch'
        },

        keyCheck: function (e) {
            if ( e.which === 13 ) { 
                var keywords = $(e.target).val();
                console.info(keywords);
                if(keywords === '') return;
                App.vent.trigger('movie:closeDetail');
                e.preventDefault();
                this.model.set({
                    keywords: this.ui.search.val(),
                    genre: ''
                });
                this.ui.search.blur();
                this.ui.btnSearch.removeClass('search-check-confirm').addClass('search-check-cancel');
                $("#search-check-icon").removeClass('icon-check').addClass('icon-close');
            }
        },

        search: function(e) {
            var keywords = $(e.target).val();
            if(keywords === '') return;
            App.vent.trigger('movie:closeDetail');
            e.preventDefault();
            this.model.set({
                keywords: this.ui.search.val(),
                genre: ''
            });
            this.ui.btnSearch.removeClass('search-check-confirm').addClass('search-check-cancel');
            $("#search-check-icon").removeClass('icon-check').addClass('icon-close');
        },

        CleanSearch: function(e) {
            App.vent.trigger('movie:closeDetail');
            e.preventDefault();
            this.model.set({
                keywords: '',
                genre: ''
            });
            this.ui.search.val('');
            this.ui.btnSearch.addClass('search-check-confirm').removeClass('search-check-cancel');
            $("#search-check-icon").addClass('icon-check').removeClass('icon-close');
            $(".search-base").animate({right: '-100%'}, 300);
        },

        onShow: function() {
            var that = this;

            // MENU
            that.$(".filter-bar-menu").on("click tap", function(e){
                that.$(".menu").animate({right: 0}, 300)
                that.$(".menu-overlay").css('display', 'block')
            })

            that.$(".menu-overlay").on("click tap", function(e){
                that.$(".sub-menu").animate({right: "-60%"}, 300)
                that.$(".menu").animate({right: "-70%"}, 300)
                that.$(".menu-overlay").css('display', 'none')
            })

            that.$(".genre-sub-menu").on("click tap", function(e){
                that.$(".menu-sort-by").hide()
                that.$(".sub-menu").animate({right: 0}, 300)
                that.$(".menu-genre ").show()
            })

            that.$(".genre-sort-by").on("click tap", function(e){
                that.$(".menu-genre ").hide()
                that.$(".sub-menu").animate({right: 0}, 300)
                that.$(".menu-sort-by").show()
            })

            that.$(".menu").on("click tap", function(e){
                if (that.$(".sub-menu").css("right") == "0px") {
                    that.$(".sub-menu").animate({right: "-60%"}, 300)
                }
            })

            that.$(".menu-base li").on("click tap", function(e){
                that.$(".menu-base li").removeClass("selected")
                $(this).addClass("selected")
            })

        },

        showSearch: function(e) {
            e.preventDefault();
            // SEARCH SHOW
            $(".search-base").animate({right: 0}, 300);
            e.focus();
        },

        hideSearch: function(e) {
            e.preventDefault();
            // SEARCH HIDE
            App.vent.trigger('movie:closeDetail');
            e.preventDefault();
            this.model.set({
                keywords: '',
                genre: ''
            });
            this.ui.search.val('');
            this.ui.btnSearch.addClass('search-check-confirm').removeClass('search-check-cancel');
            $("#search-check-icon").addClass('icon-check').removeClass('icon-close');
            $(".search-base").animate({right: '-100%'}, 300);
        },

        sortBy: function(e) {
            this.$('.menu-overlay').click(); // close menu
            this.$('.menu-sort-by li').removeClass('selected');
            this.$(e.target).parent().addClass("selected");

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