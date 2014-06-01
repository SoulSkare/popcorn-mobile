var express = require('express'),
    app = express(),
    streamer = require('./streamer'),
    bodyParser = require('body-parser');

//app.use(morgan({ format: 'dev', immediate: true }));
app.use(bodyParser());

app.use(function (req, res, next) {
    console.log(req.method, req.path);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json');
    return next();
});

// used by frontend to make sure backend is ready
app.use('/api/status', function (req, res) {
    res.json(200, {status: 'ready'});
});

//Start engine
app.post('/api/streamer', streamer.add);
app.put('/api/streamer', streamer.addFile);

//Get engine status
app.get('/api/streamer', streamer.get);

//Stop engine
app.delete('/api/streamer', streamer.delete);

var ip = require("ip");

var server = app.listen(8080, function () {
    console.log('Listening on '+ ip.address() +':%d', server.address().port);
});