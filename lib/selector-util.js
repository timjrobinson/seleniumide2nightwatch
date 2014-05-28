/**
 * Utility functions for working with selectors
 */

var selectorUtil = {
    /**
     * Analyses the type of selector and returns either css or xpath
     * @param selector
     */
    type: function (selector) {
        if (selector.match(/^\/\//)) {
            return "xpath";
        }
        if (selector.match(/^link=/)) {
            return "link";
        }
        if (selector.match(/^id=|#|css=/)) {
            return "css"
        }
        return "css"
    },

    /**
     * Converts an element selector from selenium ide version to css or xpath if css selector is not possible.
     * @param selector
    **/
    convert:  function (selector) {
        var selectorType = this.type(selector);
        var converted = selector;
        converted = converted.replace(/^id=/g, '#');
        converted = converted.replace(/css=/g, '');
        converted = converted.replace(/&gt;/g, '>');
        if (selectorType == "css") {
            converted = converted.replace(/\[/g, '\\\\[');
            converted = converted.replace(/\]/g, '\\\\]');
        }
        if (selectorType == "link") {
            converted = converted.replace(/link=/g, '');
            converted = "//a[text()='" + converted + "']";
        }


        return converted;
    }
};

module.exports = selectorUtil;