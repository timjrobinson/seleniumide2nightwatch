var assert = require('assert');
var convert = require('../lib/convert');
var globToRegExp = require('glob-to-regexp');
var config = require('../lib/config');

describe("convert", function() {
    describe("assertLocation", function() {
        it("Should convert to url with an assert inside it", function() {
            assert.equal(convert.assertLocation.parse('test'), 'url(function(url) { browser.assert.ok(url.value.match(' + globToRegExp('test') + ')); })')
        });
    });
    describe("click", function() {
        it("Should convert to click", function() {
            assert.deepEqual(convert.click.parse('test'), ['useCss()', 'click("test")']);
        });
    });
    describe("clickAndWait", function() {
        it("Should convert to click and pause for config.clickAndWaitTime milliseconds", function() {
            assert.deepEqual(convert.clickAndWait.parse('test'), ['useCss()', 'click("test")', 'pause(' + config.clickAndWaitTime + ')']);
        });
    });
    describe("check", function() {

    });
    describe("open", function() {

    });
    describe("select", function() {
        it("Should work with index based selection", function() {

        });
    });
    describe("type", function() {
        it("Should convert to setValue", function() {
            assert.deepEqual(convert.type.parse('selector', 'value'), ['useCss()', 'setValue("selector", "value")']);
        });
    });
    describe("waitForVisible", function() {
        it("Should convert to waitForElementVisible", function() {
            assert.deepEqual(convert.waitForVisible.parse('selector'), ['useCss()', 'waitForElementVisible("selector", ' + config.waitForVisibleTime + ')']);

        });
    });
});