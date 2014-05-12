var selectorUtil = require('./selector-util');
var minimatch = require('minimatch');
var config = require('./config');

var getSelectorUseType = function(selector) {
   return selectorUtil.type(selector) == 'css' ? 'useCss()' : 'useXpath()';
};

convert = {
    base: "",

    assertLocation: {
        parse: function (glob) {
            return "url(function(url) { assert(url.match(" + minimatch.makeRe(glob) + ")); })"
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
        parse: function (path, index) {
            //Can't find a way to convert this to nightwatch yet :(
        }
    },

    type: {
        parse: function (selector, text) {
            return [getSelectorUseType(selector), 'setValue("' + selectorUtil.convert(selector) + '", "' + text + '")'];
        }
    },

    waitForVisible: {
        parse: function (selector) {
            return [getSelectorUseType(selector), 'waitForElementVisible("' + selectorUtil.convert(selector) + '", 1000)'];
        }

    }
};

module.exports = convert;

