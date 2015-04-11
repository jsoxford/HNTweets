require('dotenv').load();
var fs = require('fs');

var Twitter = require('node-tweet-stream')


var stream = new Twitter({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  token:                 process.env.TW_TOKEN,
  token_secret:          process.env.TW_TOKEN_SECRET
});



var data = JSON.parse(fs.readFileSync('links.json'));

data.forEach(function(item){
    item.count = 0;
});


var urls = data.map(function(obj){ return obj.href });

var url = require('url');

var urls_to_track = urls.map(function(link) {
    var parsed_url = url.parse(link)
    if ( parsed_url.host) {
        var hostname = parsed_url.hostname.replace('www.', '')
        var trimmed_url = hostname + parsed_url.path.replace(new RegExp('\/$', 'g'), '')
    }
    else {
        trimmed_url = 'news.ycombinator.com/' + link
    }
    return trimmed_url
})
.filter(function(url) {
    return url.length < 60
})
.join(',')

console.log(urls_to_track);
stream.track(urls_to_track);




var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  // send the current content
  socket.emit('urls', data);
});




stream.on('tweet', function(t){
    var tweet_urls = (t.entities.urls||[]).map(function(url){
        return url.display_url
    });

    console.log(t.text, tweet_urls);

    // update the original object
    data.filter(function(item){
        return tweet_urls.filter(function(display_url){
            return item.href.match(display_url)
        }).length
    }).forEach(function(item){
        item.count = (item.count||0) + 1;
    });


    io.emit('urls', data);

});

stream.on('error', function (err) {
  console.log('Oh no')
})




http.listen(3000);
console.log("http://localhost:3000")