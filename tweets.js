require('dotenv').load();

var tweets = require('tweets');

var stream = new tweets({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  access_token:          process.env.TW_TOKEN,
  access_token_secret:   process.env.TW_TOKEN_SECRET
});


// temp
stream.filter({track: 'pizza'})

stream.on('tweet', function(t){
  console.log(t.text)
});

stream.on('reconnect', function(reconnect){
  console.log('reconnected', reconnect);
});
