var express = require('express'),
    app = express(),
    streamer = require('./streamer'),
    path = require('path'),
    bodyParser = require('body-parser');

//app.use(morgan({ format: 'dev', immediate: true }));
app.use(bodyParser());
app.use('/', express.static(path.join(__dirname, './static')));
app.use(function (req, res, next) {
    console.log(req.method, req.path);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json');
    return next();
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