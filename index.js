var app = require('./crawler-site.js');

console.log('Loading function');

exports.handler = (event, context, callback) => {
  app();

  callback(null, `Successfully processed ${event.key1} records.`);
}
