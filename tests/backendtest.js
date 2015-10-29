var shot = require('shot');
var test = require('tape');
var handler = require("../handlers.js");
var router = require("../router.js");
var server = require("../server.js").server;


test('basic mathematics', function(t){
    t.equal(1+1,2, 'wicked, you got this right!!!~!~!');
    t.end();
});

// test('"/" url should use handlers.home and return index page', function(t){
//     shot.inject(handler, {
//         method: "GET",
//         url: "/"
//     }, function(res) {
//         t.equal(res.statusCode,200);
//         t.end();
//     });
// });

test('unhandled url should return resource not found', function(t){
    shot.inject(server, {
        method: "GET",
        url: "/ducktales/"
    }, function(res) {
        t.equal(res.payload, 'Resource not found!');
        t.end();
    });
});
