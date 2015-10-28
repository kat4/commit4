var https = require('https');
var qs = require('querystring');
var env = require('env2')('./config.env');


var githubHandler = function(req, res) {
  var query = qs.parse(req.url);
  console.log(query);
  var owner = query.owner;
  var repo = query.repo;
  var credentials = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  };
  var options = {
    host: 'api.github.com',
    method: 'GET',
    path: '/repos/'+owner+'/'+repo+'/commits?' + qs.stringify(credentials),
    headers: {
      'User-agent': 'commit4'
    }
  };
  var commitHistory = {};
  var i = 0;
  var requestCommitHistory = https.request(options, getCommitsfromHistory);

  requestCommitHistory.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  requestCommitHistory.end();

  function getCommitsfromHistory(unparsedCommitHistory) {
    parseBody(unparsedCommitHistory, function(body) {
      JSON.parse(body).forEach(addCommitToHistoryObject);
    });
  }

  function addCommitToHistoryObject(commit) {
    commitHistory[commit.commit.committer.date] = {
      author: {
        username: commit.committer.login,
        avatar: commit.committer.avatar_url
      },
      files: [],
      sha: commit.sha,
      date: commit.commit.committer.date
    };

    options.path = '/repos/kat4/commit4/commits/' + commit.sha + '?' + qs.stringify(credentials);

    var getCommitDetails = https.request(options, function(unparsedFileArray) {
      addCommitFilesToHistoryObject(unparsedFileArray, commit);
    });
    getCommitDetails.end();
  }

  function addCommitFilesToHistoryObject(unparsedFileArray, commit) {

    parseBody(unparsedFileArray, function(body) {
      commitHistory[commit.commit.committer.date].files = JSON.parse(body).files;
      if (++i === Object.keys(commitHistory).length) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(commitHistory));
      }
    });
  }

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
};
