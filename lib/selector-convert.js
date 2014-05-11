/*
    Converts an element selector from selenium ide version to css or xpath if css selector is not possible.
*/
module.exports = function (selector) {
    var converted = selector;
    converted = converted.replace(/id=/g, '#');
    converted = converted.replace(/css=/g, '');
    converted = converted.replace(/&gt;/g, '>');
    converted = converted.replace(/\[/g, '\\\\[');
    converted = converted.replace(/\]/g, '\\\\]');


    return converted;
};