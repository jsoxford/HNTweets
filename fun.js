require('dotenv').load();
var fs = require('fs');

var Twitter = require('node-tweet-stream')

var stream = new Twitter({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  token:                 process.env.TW_TOKEN,
  token_secret:          process.env.TW_TOKEN_SECRET
});


var data = JSON.parse(fs.readFileSync('fun.json'));

data.forEach(function(item){
    item.count = 0;
});

var stuff = data.map(function(obj){ return obj.what });

console.log(stuff);
stream.track(stuff);


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  // send the current content
  socket.emit('fun', data);
});


stream.on('tweet', function(t){
    console.log(t.text);

    // update the original object
    data.filter(function(item){
        return t.text.match(item.what)
    }).forEach(function(item){
        item.count = (item.count||0) + 1;
    });

    io.emit('fun', data);
});

stream.on('error', function (err) {
  console.log('Oh no')
});

http.listen(3000);
console.log("http://localhost:3000")
