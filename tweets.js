require('dotenv').load();

var Twitter = require('node-tweet-stream')


var stream = new Twitter({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  token:                 process.env.TW_TOKEN,
  token_secret:          process.env.TW_TOKEN_SECRET
});


var urls = [
    {"href": "https://www.eff.org/press/releases/eff-busts-podcasting-patent-invalidating-key-claims-patent-office"},
    {"href": "http://blog.rust-lang.org/2015/04/10/Fearless-Concurrency.html"},
    {"href": "https://code.facebook.com/posts/1639473982937255/updating-our-open-source-patent-grant/"},
    {"href": "http://quantombone.blogspot.com/2015/04/deep-learning-vs-probabilistic.html"},
    {"href": "http://blog.easydns.org/2015/04/10/why-we-will-not-be-registering-easydns-sucks/"},
    {"href": "https://mozilla.github.io/server-side-tls/ssl-config-generator/?1"},
    {"href": "item?id=9356332"},
    {"href": "https://blogs.janestreet.com/building-a-lower-latency-gc/"},
    {"href": "http://jdh.hamkins.org/math-for-eight-year-olds"},
    {"href": "http://educationware.net/introduction-to-linux-free-course-from-the-linux-foundation/"},
    {"href": "http://blog.jgc.org/2015/04/the-one-line-you-should-add-to-every.html"},
    {"href": "http://www.reenigne.org/blog/1k-colours-on-cga-how-its-done/"},
    {"href": "item?id=9358843"},
    {"href": "http://www.reenigne.org/blog/8088-pc-speaker-mod-player-how-its-done/"},
    {"href": "https://tibastral.github.io/markdownify/"},
    {"href": "https://gist.github.com/ImJasonH/c00cdd7aece6945fb8ea"},
    {"href": "http://blog.jetbrains.com/dotnet/2015/04/10/introducing-resharper-cpp/"},
    {"href": "http://home.web.cern.ch/about/updates/2015/04/first-successful-beam-record-energy-65-tev"},
    {"href": "https://in.news.yahoo.com/the-slave-ship-that-ran-from-kerala-to-new-orleans-085329807.html"},
    {"href": "http://www.iflscience.com/space/astronomical-quest-leads-ovens"},
    {"href": "http://www.newstatesman.com/culture/2015/04/short-history-image-manipulation-photoshop"},
    {"href": "http://www.newyorker.com/magazine/2005/09/19/the-lost-city-of-z"},
    {"href": "http://my.teslamotors.com/models/design"},
    {"href": "https://github.com/kgaughan/memoize.py"},
    {"href": "http://www.rentever.com/"},
    {"href": "http://sangaline.com/blog/optimizing_for_swype/"},
    {"href": "https://github.com/bevacqua/hit-that"},
    {"href": "http://www.bayesimpact.org/stories/?name=the-mob-the-money-and-the-mayhem"},
    {"href": "http://www.theatlantic.com/technology/archive/2015/04/the-yo-yo-effect/389868?single_page=true"},
    {"href": "http://thread.gmane.org/gmane.emacs.devel/185268"}
];

var url = require('url');


var urls_to_track = urls.map(function(obj) {
    var parsed_url = url.parse(obj.href)
    if ( parsed_url.host) {
        var hostname = parsed_url.hostname.replace('www.', '')
        var trimmed_url = hostname + parsed_url.path
    }
    else {
        trimmed_url = 'news.ycombinator.com/' + obj.href
    }
    return trimmed_url
})
.filter(function(url) {
    return url.length < 60
})
.join(',')

stream.track(urls_to_track);

stream.on('tweet', function(t){
  console.log(t.text)
});

stream.on('error', function (err) {
  console.log('Oh no')
})
