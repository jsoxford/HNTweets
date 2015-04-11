require('dotenv').load();

var Twitter = require('node-tweet-stream')


var stream = new Twitter({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  token:                 process.env.TW_TOKEN,
  token_secret:          process.env.TW_TOKEN_SECRET
});


// temp
// stream.filter({track: 'pizza'})

stream.track('nodejs')
stream.track('pizza')


stream.on('tweet', function(t){
  console.log(t.text)
});

stream.on('error', function (err) {
  console.log('Oh no')
})

// stream.on('reconnect', function(reconnect){
//   console.log('reconnected', reconnect);
// });
