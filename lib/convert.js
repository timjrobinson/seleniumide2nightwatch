var selectorConvert = require('./selector-convert');
var globConvert = require('./glob-convert');

convert = {
    base: "",

    assertLocation: {
        parse: function (glob) {
            return "url(function(url) { assert(url.match(/" + globConvert(glob) + "/)); })"

        }
    },

    click: {
        parse: function (selector) {
            return 'click("' + selectorConvert(selector) + '")';
        }
    },

    clickAndWait: {
        parse: function (selector) {
            return 'click("' + selectorConvert(selector) + '")';
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
            return 'setValue("' + selectorConvert(selector) + '", "' + text + '")';
        }
    },

    waitForVisible: {
        parse: function (selector) {
            return 'waitForElementVisible("' + selectorConvert(selector) + '", 1000)';
        }

    }
};

module.exports = convert;

