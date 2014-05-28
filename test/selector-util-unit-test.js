var assert = require('assert');
var selectorUtil = require('../lib/selector-util');

describe("selectorUtil unit test", function() {
    describe("type", function() {
        it("Should return css for css selectors or selectors that can be converted to css", function() {
            assert.equal(selectorUtil.type("#itemName"), "css");
            assert.equal(selectorUtil.type("css="), "css");
            assert.equal(selectorUtil.type("id="), "css");
        });
        it("Should return xpath for xpath selectors", function() {
            assert.equal(selectorUtil.type("//form[@id='booking-form']/div[2]/div/button"), "xpath");
        });
        it("Should return link for link selectors", function() {
            assert.equal(selectorUtil.type("link="), "link")
        });
    });
    describe("convert", function() {
        it("Should convert id selectors correctly", function() {
            var selector = "id=subscriberCode";
            assert.equal(selectorUtil.convert(selector), "#subscriberCode");
        });
        it("Should only convert id= at the beginning of a selector", function() {
            var selector = "//form[@id=test]";
            assert.equal(selectorUtil.convert(selector), "//form[@id=test]");
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
        it("Should not escape square brackets in xpath selectors", function() {
            var selector = "//something[child_one]";
            assert.equal(selectorUtil.convert(selector), '//something[child_one]')
        });
        it("Should convert link selectors to an xpath of link text", function() {
            var selector = "link=Subscribe";
            assert.equal(selectorUtil.convert(selector), "//a[text()='Subscribe']");
        })
        it("Should convert link selectors with spaces in them to an xpath of link text", function() {
            var selector = "link=Subscribe Here";
            assert.equal(selectorUtil.convert(selector), "//a[text()='Subscribe Here']");
        })
    });
});