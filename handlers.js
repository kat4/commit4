var handlers = module.exports = {};

var headers = {
    'content-type' : 'text/html'
};

handlers.home = function(req, res){
    res.writeHead(200, headers);
    res.end("Hello World");
};

handlers.notFound = function(req, res){
    res.writeHead(404, headers);
    res.end('Resource not found');
};

handlers.general = function(req, res) {
  fs.readFile("./public" + req.url, function(err, file) {
        if (err) {
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
