var Crawler = require("simplecrawler");

var crawler = Crawler("http://alien-code.com/")
.on("fetchcomplete", function () {
});

//Configuration
crawler.interval = 500; // Ten seconds
crawler.maxConcurrency = 10;
crawler.maxDepth = 2;
crawler.respectRobotsTxt = true;
crawler.userAgent = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
  console.log("url: %s | %s (%d bytes)", queueItem.url, response.headers['content-type'], responseBuffer.length);
});

crawler.start();

var siteCrawl = function(crawler) {
};

module.exports = siteCrawl;
