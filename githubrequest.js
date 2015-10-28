var https = require('https');
var qs = require('querystring');
var env = require('env2')('./config.env');

var credentials = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
};

var options = {
  host: 'api.github.com',
  method: 'GET',
  path: '/repos/kat4/commit4/commits?' + qs.stringify(credentials),
  headers: {
    'User-agent': 'commit4'
  }
};

var requestCommitHistory = https.request(options, function(res) {
  var commitHistory = {};
  parseBody(res, function(body) {

    JSON.parse(body).forEach(function(commit) {
      //console.log(commit);
      console.log(commit.sha);
      console.log(commit.committer.login);
      console.log(commit.committer.avatar_url);
      console.log(commit.commit.committer.date);
      console.log(commit.committer.id);

      commitHistory[commit.commit.committer.date] = {
        author:{
          username: commit.committer.login,
          avatar: commit.committer.avatar_url
        },
        files:{

        }
      };
      console.log(commitHistory);
      options.path = '/repos/kat4/commit4/commits/'+commit.sha+'?' + qs.stringify(credentials);
      var getCommitDetails = https.request(options, function(res) {
        parseBody(res,function(body){
          //console.log(JSON.parse(body).files);
        });
      });
      getCommitDetails.end();


    });
  });
});

requestCommitHistory.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

requestCommitHistory.end();

function parseBody(object, callback) {
  var body = '';
  object.setEncoding('utf8');
  object.on('data', function(chunk) {
    body += chunk;
  });
  object.on('end', function() {
    callback(body);
  });
}
