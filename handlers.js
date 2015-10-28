var fs = require('fs');
var index = fs.readFileSync('./views/index.html');

var handlers = module.exports = {};

var headers = {
    'content-type' : 'text/html'
};

handlers.home = function(req, res){
    res.writeHead(200, headers);
    res.end(index);
};

handlers.commit4 = function(req, res){
    var owner = req.url.split("/")[2];
    var repo = req.url.split("/")[3];
    res.end('hello');
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
