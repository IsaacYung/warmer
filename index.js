var Crawler = require('./crawler-site.js');

var crawlerLarge = new Crawler("https://www.bidu.com.br/");
var crawlerMobile = new Crawler("https://www.bidu.com.br/");
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

crawlerLarge.start();
crawlerMobile.start();

console.log('Loading function');

exports.handler = (event, context, callback) => {
  console.log();

  callback(null, `Successfully processed ${event.key1} records.`);
}
