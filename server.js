var http = require('http');
var https = require('https');
var router = require('./router.js');
var port = process.env.port || 7777;

var server = function(req, res) {
  router(req, res);
  console.log("server listning on port 7777");
};

var server = http.createServer(server).listen(port);
