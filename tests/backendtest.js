var shot = require('shot');
var test = require('tape');
var handler = require("../handlers.js");


test('basic mathematics', function(t){
    t.equal(1+1,2, 'wicked, you got this right!!!~!~!');
    t.end();
});
