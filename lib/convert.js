var selectorUtil = require('./selector-util');
var globToRegExp = require('glob-to-regexp');
var config = require('./config');

var getSelectorUseType = function(selector) {
   return selectorUtil.type(selector) == 'css' ? 'useCss()' : 'useXpath()';
};

convert = {
    base: "",

    assertLocation: {
        parse: function (glob) {
            var value = glob.replace(/^glob:/, '');
            return "url(function(url) { browser.assert.ok(url.value.match(" + globToRegExp(value) + ")); })"
        }
    },

    click: {
        parse: function (selector) {
            return [getSelectorUseType(selector), 'click("' + selectorUtil.convert(selector) + '")'];
        }
    },

    clickAndWait: {
        parse: function (selector) {
            return [getSelectorUseType(selector), 'click("' + selectorUtil.convert(selector) + '")', 'pause(' + config.clickAndWaitTime + ')'];
        }
    },

    check: {
        parse: function () {

        }
    },

    open: {
        parse: function (path) {
            return 'url("' + this.base + path + '")';
        }
    },

    select: {
        parse: function (selector, value) {
            if (value.match(/^index=/)) {
                var index = value.replace(/index=/, '');
                var selector = selectorUtil.convert(selector);
                selector += ' option:nth-child(' + index + ')';
                return ['useCss()', 'click("' + selector + '")'];
            }
            if (value.match(/^label=/)) {
                var label = value.replace(/label=/, '');
                if (selector.match(/^id=/)) {
                   selector = "//select[@id='" + selector.replace(/^id=/, '') + "']";
                }
                selector += "/option[text()='" + label + "']";
                return ['useXpath()', 'click("' + selector + '")'];
            }
        }
    },

    type: {
        parse: function (selector, text) {
            return [getSelectorUseType(selector), 'setValue("' + selectorUtil.convert(selector) + '", "' + text + '")'];
        }
    },

    waitForVisible: {
        parse: function (selector) {
            return [getSelectorUseType(selector), 'waitForElementVisible("' + selectorUtil.convert(selector) + '", ' + config.waitForVisibleTime + ')'];
        }

    }
};

module.exports = convert;

