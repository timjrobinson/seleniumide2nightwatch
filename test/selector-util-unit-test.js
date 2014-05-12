var assert = require('assert');
var selectorUtil = require('../lib/selector-util');

describe("selectorUtil unit test", function() {
    describe("type", function() {
        it("Should return css for css selectors", function() {
            assert.equal(selectorUtil.type("#itemName"), "css");
        });
        it("Should return xpath for xpath selectors", function() {
            assert.equal(selectorUtil.type("//form[@id='booking-form']/div[2]/div/button"), "xpath");
        });
    });
    describe("convert", function() {
        it("Should convert id selectors correctly", function() {
            var selector = "id=subscriberCode";
            assert.equal(selectorUtil.convert(selector), "#subscriberCode");
        });
        it("Should convert css selectors correctly", function() {
            var selector = "css=div.section";
            assert.equal(selectorUtil.convert(selector), 'div.section');
        });
        it("Should parse &gt; converting it to >", function() {
            var selector = ".one &gt; .two";
            assert.equal(selectorUtil.convert(selector), '.one > .two');
        });
        it("Should add double backslashes escape square brackets in css selectors", function() {
            var selector = "something[child_one]";
            assert.equal(selectorUtil.convert(selector), 'something\\\\[child_one\\\\]')
        });
    });
});