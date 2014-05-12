var assert = require('assert');
var convert = require('../lib/convert');
var minimatch = require('minimatch');
var config = require('../lib/config');

describe("convert", function() {
    describe("assertLocation", function() {
        it("Should convert to url with an assert inside it", function() {
            assert.equal(convert.assertLocation.parse('test'), 'url(function(url) { assert(url.match(' + minimatch.makeRe('test') + ')); })')
        });
    });
    describe("click", function() {
        it("Should convert to click", function() {
            assert.equal(convert.click.parse('test'), 'click("test")');
        });
    });
    describe("clickAndWait", function() {
        it("Should convert to click and pause for config.clickAndWaitTime milliseconds", function() {
            assert.deepEqual(convert.clickAndWait.parse('test'), ['click("test")', 'pause(' + config.clickAndWaitTime + ')']);
        });
    });
    describe("check", function() {

    });
    describe("open", function() {

    });
    describe("type", function() {
        it("Should convert to setValue", function() {
            assert.equal(convert.type.parse('selector', 'value'), 'setValue("selector", "value")');
        });
    });
    describe("waitForVisible", function() {
        it("Should convert to waitForElementVisible", function() {
            assert.equal(convert.waitForVisible.parse('selector'), 'waitForElementVisible("selector", 1000)')

        });
    });
});