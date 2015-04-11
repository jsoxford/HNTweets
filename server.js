var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var urls = [
  {
    url: 'example.com',
    count: 0
  },
  {
    url: 'example2.com',
    count: 6
  },
  {
    url: 'example3.com',
    count: 9
  }
]


io.on('connection', function (socket) {
  // send the current content
  socket.emit('urls', urls);
});


// demo
setInterval(function(){

  urls[(~~(Math.random()*3))].count++;

  // push out all content for now (would be better to give the )
  io.emit('urls', urls);

}, 1000)



http.listen(3000);
console.log("http://localhost:3000")