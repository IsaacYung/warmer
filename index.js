var Crawler = require('./crawler-site.js');

var siteUrl = "https://www.bidu.com.br/sitemap_index.xml";
var crawlerLarge = new Crawler(siteUrl);
var crawlerMobile = new Crawler(siteUrl);

/*
 Configuration

 userAgent
 maxConcurrency - standard 8 threads
 interval - standard 200ms
*/
var userAgent = {
  large: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36 Warmer",
  mobile: "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19 Warmer"
};

crawlerLarge.config({
  userAgent: userAgent['large']
});

crawlerMobile.config({
  userAgent: userAgent['mobile']
});
// ---------

console.log('Loading function ----------------------------');

exports.handler = (event, context, callback) => {
  crawlerLarge.start(crawlerLarge.results);
  crawlerMobile.start(crawlerMobile.results);
  callback(null, `Successfully processed records.`);
}
