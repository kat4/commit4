var handlers = require('./handlers.js');

var routes = {
    'commit4': handlers.commit4,
    '/'   : handlers.home,
    '404' : handlers.notFound
};

var router = function(req, res) {
  console.log(req.url.split('/'));
    if (routes[req.url]) {
	routes[req.url](req, res);
} else if(routes[req.url.split('/')[1]] ) {
  routes[req.url.split('/')[1]](req, res);
} else {
	handlers.general(req, res);
    }
};

module.exports = router;
