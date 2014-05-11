var assert = require('assert');
var globConvert = require('../lib/glob-convert')

describe("globConvert", function() {
    it("Should remove glob from the beginning", function() {
        var glob = "glob:test";
        assert.equal(globConvert(glob), 'test');
    });
    it("Should convert *'s to .*", function() {
       var glob = "*test*";
       assert.equal(globConvert(glob), '.*test.*');
    });
    it("Should escape any forwardslashes", function() {
        var glob = "one/two";
        assert(globConvert(glob) == 'one\\/two');
    });
});