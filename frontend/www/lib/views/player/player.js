(function(App) {
    'use strict';

    var Player = Backbone.Marionette.ItemView.extend({
        template: '#player-tpl',
        className: 'player',

        events: {
            'click .close-info-player': 'closePlayer',
            'click .vjs-fullscreen-control': 'toggleFullscreen'
        },        

        initialize: function() {
            this.video = false;
            this.inFullscreen = win.isFullscreen;
        },

        closePlayer: function() {
            this.video.dispose();
            App.vent.trigger('player:close');  
        },

        onShow: function() {

          console.log(this.model);
            // Test to make sure we have title
            win.info('Watching:', this.model.get('title'));
            //$('.filter-bar').show(); 
            var _this = this;

            this.video = videojs('video_player', {
                nativeControlsForTouch: false,
                trackTimeOffset: 0,
                plugins: {}
            });
        
            var player = this.video.player();
            this.player = player
            
            // Force custom controls
            player.usingNativeControls(false);
            
            // Had only tracking in, leave it here if we want to do something else when paused.
            player.on('pause', function () {

            });

            player.on('ended', function () {
                // For now close player. In future we will check if auto-play etc and get next episode
                _this.closePlayer();
            });

            player.on('play', function () {

            });

            // There was an issue with the video
            player.on('error', function (error) {
                win.error('video.js error code: ' + $('#video_player').get(0).player.error().code, $('#video_player').get(0).player.error());
            });


            $('.player-header-background').appendTo('div#video_player');
        },

        toggleFullscreen: function() {
            
            this.nativeWindow = window;

            if(this.nativeWindow.isFullscreen) {
                this.player.isFullscreen(false);
                this.player.trigger('fullscreenchange');
                this.nativeWindow.leaveFullscreen();
                this.nativeWindow.focus();
            } else {
                this.player.isFullscreen(true);
                this.player.trigger('fullscreenchange');
                this.nativeWindow.enterFullscreen();
                this.nativeWindow.focus();
            }
        },

        leaveFullscreen: function() {
            this.nativeWindow = require('nw.gui').Window.get();

            if(this.nativeWindow.isFullscreen) {
                this.nativeWindow.leaveFullscreen();
                this.nativeWindow.focus();
            }
        },
 
        onClose: function() {
            App.vent.trigger('stream:stop');            
        }

    });
    App.View.Player = Player;
})(window.App);