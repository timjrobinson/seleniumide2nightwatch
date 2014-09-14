var assert = require('assert');
var side2nw = require('../lib/side2nw.js');

describe("side2nw", function() {
    describe("run", function() {

    });
    describe("processFile", function() {

    });
    describe("getNewPath", function() {

    });
    describe("parse", function() {

    });
    describe("convert", function() {

    });
    describe("createCommands", function() {

    });
    describe("sanitizeCommands", function() {
        it("Should remove extra useCss's", function() {
            var commands = ["useCss()", "test", "useCss()", "anotherTest"];
            var sanitizedCommands = side2nw.sanitizeCommands(commands);
            assert.deepEqual(sanitizedCommands, ["useCss()", "test", "anotherTest"]);
        });

        it("Should remove extra useXPath's", function() {
            var commands = ["useXpath()", "test", "useXpath()", "anotherTest"];
            var sanitizedCommands = side2nw.sanitizeCommands(commands);
            assert.deepEqual(sanitizedCommands, ["useXpath()", "test", "anotherTest"]);
        });
    })

});