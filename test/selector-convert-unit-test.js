var assert = require('assert');
var selectorConvert = require('../lib/selector-convert');

describe("selector convert unit test", function() {
    it("Should convert id selectors correctly", function() {
        var selector = "id=subscriberCode";
        assert.equal(selectorConvert(selector), "#subscriberCode");
    });
    it("Should convert css selectors correctly", function() {
        var selector = "css=div.section";
        assert.equal(selectorConvert(selector), 'div.section');
    });
    it("Should parse &gt; converting it to >", function() {
        var selector = ".one &gt; .two";
        assert.equal(selectorConvert(selector), '.one > .two');
    });
    it("Should add double backslashes escape square brackets in css selectors", function() {
        var selector = "something[child_one]";
        assert.equal(selectorConvert(selector), 'something\\\\[child_one\\\\]')
    });
});