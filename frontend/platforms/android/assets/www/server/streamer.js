"use strict";

var
  Vent = require('vent'),
  os = require('os'),
  _ = require('underscore'),
  address = require('network-address'),
  StreamInfo = require('./stream_info').StreamInfo,
  Settings = require('../settings').Settings
;


var App = {};
App.vent = new Vent();

var BUFFERING_SIZE = 10 * 1024 * 1024;

var readTorrent = require('read-torrent');
var peerflix = require('peerflix');
var mime = require('mime');


var engine = null;

var statsUpdater = null;
var active = function (wire) {
  return !wire.peerChoking;
};
var subtitles = null;
var streamInfo = null;

exports.get = function (req, res) {
  var data = {
    state: watchState(),
    streamInfo: streamInfo.shallow()
  };
  console.log(data);
  return res.json(data, 200);
};

function watchState() {

  if (engine != null) {

    var swarm = engine.swarm;
    var state = 'connecting';

    if (swarm.downloaded > BUFFERING_SIZE) {
      state = 'ready';
    } else if (swarm.downloaded) {
      state = 'downloading';
    } else if (swarm.wires.length) {
      state = 'startingDownload';
    }
  }

  return state;
}


exports.addFile = function(req, res) {
  var torrentBuffer = new Buffer(req.body.data, 'base64');
  handleTorrent(torrentBuffer);
  res.send(200, {});
};

exports.add = function (req, res) {
  var torrent = req.body.torrent;

  console.log('handleTorrent: ', torrent);

  readTorrent(torrent.url, function (err, torrent) {

    if (err) {
      console.log(err);
      res.send(500, err);
    } else {
      //console.log(torrent);
      handleTorrent(torrent);
      res.send(200, {});
    }
  });
};

exports.delete = function(req, res) {
  if (engine) {
    engine.destroy();
  }
  engine = null;
  console.log("Streaming cancelled");
  res.send(200);
};

function handleTorrent(torrent) {

  engine = peerflix(torrent, {
    connections: Settings.connectionLimit, // Max amount of peers to be connected to.
    dht: Settings.dhtLimit,
    port: Settings.peerflixPort,
    buffer: (1.5 * 1024 * 1024).toString() // create a buffer on torrent-stream
  });

  streamInfo = new StreamInfo({engine: engine});
  statsUpdater = setInterval(_.bind(streamInfo.updateStats, streamInfo, engine), 1000);
  //stateModel.set('streamInfo', streamInfo);
  //watchState(stateModel);

//    var checkReady = function() {
//        if(stateModel.get('state') === 'ready') {
//
//            // we need subtitle in the player
//            console.log(torrent);
//            streamInfo.set('subtitle', torrent.subtitles);
//            streamInfo.set('title', torrent.title);
//
//            App.vent.trigger('stream:ready', streamInfo);
//            stateModel.destroy();
//        }
//    };

  engine.server.on('listening', function () {
    console.log('listening');
    streamInfo.set('src', 'http://' + address() +  ':' + engine.server.address().port + '/');
    streamInfo.set('type', 'video/mp4');
//        stateModel.on('change:state', checkReady);
//        checkReady();
  });

  engine.on('ready', function () {
    console.log('ready');
    if (engine) {
      engine.server.listen();
    }
  });

  engine.on('uninterested', function () {
    console.log('uninterested');
    if (engine) {
      engine.swarm.pause();
    }

  });

  engine.on('interested', function () {
    console.log('interested');
    if (engine) {
      engine.swarm.resume();
    }
  });

};