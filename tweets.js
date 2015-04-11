require('dotenv').load();

var Twitter = require('node-tweet-stream')


var stream = new Twitter({
  consumer_key:          process.env.TW_KEY,
  consumer_secret:       process.env.TW_SECRET,
  token:                 process.env.TW_TOKEN,
  token_secret:          process.env.TW_TOKEN_SECRET
});


var urls = [
    'http://www.filfre.net/2015/04/the-68000-wars-part-3-we-made-amiga-they-fucked-it-up/',
    'http://thisisvoid.org',
    'https://dncmagazine.blob.core.windows.net/downloads/AngularCheatSheet-DNCMagazine.pdf',
    'https://docs.google.com/document/d/1QZxArgMwidgCrAbuSikcB2iBxkffH6w0YB0C1qCsuH0',
    'http://utcc.utoronto.ca/~cks/space/blog/linux/SystemdAndSyslog',
    'http://www.nytimes.com/2015/04/08/opinion/yes-we-were-warned-about-ebola.html',
    'http://www.devttys0.com/2015/04/hacking-the-d-link-dir-890l/',
    'https://www.eff.org/press/releases/eff-busts-podcasting-patent-invalidating-key-claims-patent-office',
    'http://blog.rust-lang.org/2015/04/10/Fearless-Concurrency.html',
    'https://code.facebook.com/posts/1639473982937255/updating-our-open-source-patent-grant/',
    'http://quantombone.blogspot.com/2015/04/deep-learning-vs-probabilistic.html',
    'https://mozilla.github.io/server-side-tls/ssl-config-generator/?1',
    'https://github.com/dullgiulio/perso/releases/tag/v0.1',
    'http://blog.easydns.org/2015/04/10/why-we-will-not-be-registering-easydns-sucks/',
    'item?id=9356332',
    'http://jdh.hamkins.org/math-for-eight-year-olds',
    'https://blogs.janestreet.com/building-a-lower-latency-gc/',
    'http://educationware.net/introduction-to-linux-free-course-from-the-linux-foundation/',
    'http://blog.jgc.org/2015/04/the-one-line-you-should-add-to-every.html',
    'http://www.reenigne.org/blog/1k-colours-on-cga-how-its-done/',
    'https://tibastral.github.io/markdownify/',
    'http://www.reenigne.org/blog/8088-pc-speaker-mod-player-how-its-done/',
    'item?id=9358843',
    'https://gist.github.com/ImJasonH/c00cdd7aece6945fb8ea',
    'http://home.web.cern.ch/about/updates/2015/04/first-successful-beam-record-energy-65-tev',
    'http://blog.jetbrains.com/dotnet/2015/04/10/introducing-resharper-cpp/',
    'https://in.news.yahoo.com/the-slave-ship-that-ran-from-kerala-to-new-orleans-085329807.html',
    'http://www.newyorker.com/magazine/2005/09/19/the-lost-city-of-z',
    'https://github.com/kgaughan/memoize.py',
    'http://sangaline.com/blog/optimizing_for_swype/'
];

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

stream.on('tweet', function(t){
    var urls = [];
    t.entities.urls.forEach(function(url) {
        urls.push(url.display_url);
    });
    console.log(urls)
});

stream.on('error', function (err) {
  console.log('Oh no')
})
