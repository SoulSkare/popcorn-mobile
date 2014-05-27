(function (App) {
  "use strict";

  var streaming = false;


  var watchState = function (stateModel) {

    if (streaming) {

      $.get('http://localhost:8080/api/streamer', function (data, status, jqXHR) {
        console.log(data);
        var state = data.state;
        var streamInfo = new App.Model.StreamInfo(data.streamInfo);

        if (state == "ready") {
          state = 'ready';
          App.vent.trigger('stream:ready', streamInfo);
          //stateModel.destroy();
        }

        stateModel.set('state', state);
        stateModel.set('streamInfo', streamInfo);

        if (state != 'ready') {
          //console.log("_.delay(watchState, 1000, stateModel);");
          _.delay(watchState, 1000, stateModel);
        }
      });
    }
  };

  var handleTorrent = function (torrent, stateModel) {

    console.log(torrent);
    var options = {
      url: 'http://localhost:8080/api/streamer',
      method: 'post',
      data: {
        torrent: torrent
      },
      success: function (data, success, jqXHR) {
        watchState(stateModel);
      },
      error: function (data, success, jqXHR) {
        console.log(data, success, jqXHR);
      }
    };

    if(torrent.raw) {
      options.method = "put";
      //options.contentType = "application/octet-stream";
      options.data = {
        data: btoa(torrent.raw)
      };
    }
    $.ajax(options);

  };

  var Streamer = {
    start: function (model) {
      streaming = true;


      var stateModel = new Backbone.Model({state: 'connecting', backdrop: model.get('backdrop')});
      App.vent.trigger('stream:started', stateModel);

      var torrentInfo = {
        subtitle: model.get('subtitle'),
        title: model.get('title')
      };

      console.log(model);

      var raw = model.get('raw');

      if(raw) {
        torrentInfo.raw = raw;
      } else {
        torrentInfo.url = model.get('torrent');
      }

      // Same as above

      handleTorrent(torrentInfo, stateModel);
    },

    stop: function () {
      $.ajax({
        url: 'http://localhost:8080/api/streamer',
        method: 'DELETE',
        success: function () {
          streaming = false;
          console.log("Streaming cancelled");
        }
      });
    }
  };

  App.vent.on('stream:start', Streamer.start);
  App.vent.on('stream:stop', Streamer.stop);

})(window.App);