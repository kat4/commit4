var shot = require('shot');
var test = require('tape');
var router = require("../router.js");



test('basic mathematics', function(t){
    t.equal(1+1,2, 'wicked, you got this right!!!~!~!');
    t.end();
});

test('"/" url should use handlers.home and return index page', function(t){
    shot.inject(router, {
        method: "GET",
        url: "/"
    }, function(res) {
        t.equal(res.statusCode,200);
        t.end();
    });
});

test('unhandled url should return resource not found', function(t){
    shot.inject(router, {
        method: "GET",
        url: "/ducktales/"
    }, function(res) {
        t.equal(res.payload, 'Resource not found');
        t.end();
    });
});

test('testing general handler with style.css', function(t){
    shot.inject(router, {
        method: "GET",
        url: "/css/style.css"
    }, function(res) {
        t.equal(res.statusCode, 200);
        t.end();
    });
});

test('endpoint commit4 returning "hello"', function(t){
    shot.inject(router, {
        method: "GET",
        url: "/commit4/"
    }, function(res) {
        t.equal(res.payload, 'hello');
        t.end();
    });
});
