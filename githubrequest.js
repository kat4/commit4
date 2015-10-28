var https = require('https');
var qs = require('querystring');
var env = require('env2')('./config.env');

var credentials = {
  client_id : process.env.CLIENT_ID,
  client_secret : process.env.CLIENT_SECRET
};

var options = {
  host:'api.github.com',
  method:'GET',
  path:'/repos/kat4/commit4/commits?'+qs.stringify(credentials),
  headers:{
    'User-agent':'commit4'
  }
};

var requestCommits = https.request(options, function(res) {
  parseResponse(res, function(body) {
    console.log(body);
  });
});

requestCommits.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

requestCommits.end();

function parseResponse(object, callback) {
  var body = '';
  object.setEncoding('utf8');
  object.on('data', function(chunk) {
    body += chunk;
  });
  object.on('end', function() {
    callback(body);
  });
}
