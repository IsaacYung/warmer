var Crawler = require("simplecrawler");

var SiteCrawl = function(site) {
  this.crawler = Crawler(site);
};

SiteCrawl.prototype.config = function(configs) {
  this.crawler.interval = configs['interval'] || 180; // Ten seconds
  this.crawler.maxConcurrency = configs['maxConcurrency'] || 12;
  this.crawler.maxDepth = 3;
  this.crawler.respectRobotsTxt = true;
  this.crawler.userAgent = configs['userAgent'];
}

SiteCrawl.prototype.start = function(callback) {
  var countPages = 0;
  var countNoCached = 0;
  var cachedPrecentage = 0.0;
  var deviceType;

  this.crawler.addFetchCondition(function(parsedURL) {
    if (parsedURL.path.match(/\.(css|jpg|pdf|docx|js|png|ico)/i)) {
      return false;
    }

    return true;
  });

  this.crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    countPages++;
    cache = ["MISS", "EXPIRED"];
    if(cache.indexOf(response.headers['cf-cache-status']) > -1) {
      countNoCached++;
    }

    deviceType = response.headers['markup-device'];
    cachedPrecentage = (countNoCached/countPages)*100;
    // console.log("%d %s > url: %s | cache: %s",
    //   countPages,
    //   deviceType,
    //   queueItem.url,
    //   response.headers['cf-cache-status']
    // );
  });

  this.crawler.on("complete", function() {
    var results = {
      pagesTotal: countPages,
      coldTotal: countNoCached,
      coldPrecentage: cachedPrecentage.toFixed(2),
      deviceType: deviceType
    }

    callback(results);
  });

  this.crawler.start();
}

SiteCrawl.prototype.results = function(results) {
  console.log("device: %s | urls: %d | cold total: %d | cold percentage total: %d%", results['deviceType'], results['pagesTotal'], results['coldTotal'], results['coldPrecentage']);
}

module.exports = SiteCrawl;
