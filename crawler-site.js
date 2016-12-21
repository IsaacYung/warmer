var Crawler = require("simplecrawler");

var SiteCrawl = function(site) {
  this.crawler = Crawler(site);
};

SiteCrawl.prototype.config = function(configs) {
  this.crawler.interval = configs['interval'] || 200; // Ten seconds
  this.crawler.maxConcurrency = configs['maxConcurrency'] || 8;
  this.crawler.maxDepth = 3;
  this.crawler.respectRobotsTxt = true;
  this.crawler.userAgent = configs['userAgent'];
}

SiteCrawl.prototype.start = function() {
  var countPages = 0;
  var countNoCached = 0;
  var cachedPrecentage = 0.0;

  //this.crawler.userAgent = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19 Warmer";

  this.crawler.addFetchCondition(function(parsedURL) {
      if (parsedURL.path.match(/\.(css|jpg|pdf|docx|js|png|ico)/i)) {
          return false;
      }

      return true;
  });

  this.crawler.on("complete", function(e) {

  });

  this.crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    countPages++;
    cache = ["MISS", "EXPIRED"];
    if(cache.indexOf(response.headers['cf-cache-status']) > -1) {
      countNoCached++;
    }
    cachedPrecentage = (countNoCached/countPages)*100;
    console.log("%d %s > cold: %d% | url: %s | cache: %s", countPages,
                                                           response.headers['markup-device'],
                                                           cachedPrecentage.toFixed(2),
                                                           queueItem.url,
                                                           response.headers['cf-cache-status']
    );
  });

  return this.crawler.start();
}

//Configuration
module.exports = SiteCrawl;
