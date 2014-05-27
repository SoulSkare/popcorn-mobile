var express = require('express'),
    app = express(),
    url = require('url'),
    request = require('request'),
    streamer = require('./streamer'),
    path = require('path'),
    bodyParser = require('body-parser');

    //morgan  = require('morgan')
    allowed_hosts = [
        'api.trakt.tv',
        'api.yifysubtitles.com',
        'yts.re',
        'yts.im',
        'popcorn-api.com',
        'eztvapi.re'
    ];


//app.use(morgan({ format: 'dev', immediate: true }));
app.use(bodyParser());
app.use('/', express.static(path.join(__dirname, './static')));
app.use(function (req, res, next) {
    console.log(req.method, req.path);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json');
    return next();
});

app.get('/api/json', function (req, res) {
    console.log(req.url);
    var url_parts = url.parse(req.url, true);
    var allowed = false;

    var query = url_parts.query;

    if (query.target) {
        var target = url.parse(query.target, true)
        allowed_hosts.forEach(function (host) {
            if (host == target.hostname) {
                allowed = true;
                
                request(query.target, function (error, response, body) {
                    res.end(body);
                });
         

            }
        });
    }

    if (!allowed)
        res.send(500);
});

//Start engine
app.post('/api/streamer', streamer.add);
app.put('/api/streamer', streamer.addFile);

//Get engine status
app.get('/api/streamer', streamer.get);

//Stop engine
app.delete('/api/streamer', streamer.delete);

var server = app.listen(8080, function () {
    console.log('Listening on port %d', server.address().port);
});