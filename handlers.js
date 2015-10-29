var fs = require('fs');
var index = fs.readFileSync('./views/index.html');
var commits = fs.readFileSync('./views/commits.html');
var githubHandler = require('./githubrequest.js');

var handlers = module.exports = {};

var headers = {
    'content-type' : 'text/html'
};

handlers.home = function(req, res){
    res.writeHead(200, headers);
    res.end(index);
};

handlers.commit4 = function(req, res){
    githubHandler(req,res);
};

handlers.notFound = function(req, res){
    res.writeHead(404, headers);
    res.end('Resource not found');
};

handlers.general = function(req, res) {
  fs.readFile("./public" + req.url, function(err, file) {
        if (err) {
          console.log('errrr', err);
          handlers.notFound(req, res);
        } else {
            var ext = req.url.split(".")[1];
            res.writeHead(200, {
                'Content-type': 'text/' + ext
            });
            res.end(file);
        }
    });
};
