/**
 * Converts a glob from selenium ide to a regex
 */
module.exports = function(glob) {
    var regex = glob;
    regex = regex.replace(/glob:/, '');
    regex = regex.replace(/\*/g, '.*');
    regex = regex.replace(/\//g, '\\/');
    return regex;
};