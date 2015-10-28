var handlers = require('./handlers.js');

var routes = {
    '/'   : handlers.home,
    '404' : handlers.notFound
};

var router = function(req, res) {
    if (routes[req.url]) {
	routes[req.url](req, res);
    } else {
	handlers.general(req, res);
    }
};

module.exports = router;
