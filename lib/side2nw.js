
var async = require("async"),
    fs = require("fs"),
    path = require("path"),
    htmlparser = require("htmlparser2");

var side2nw = {
    files: [],

    run: function (done) {
        var _this = this;
        var asyncTasks = [];
        this.files.forEach(function(file) {
            asyncTasks.push(function(callback) {
                _this.processFile(file, callback);
            });
        });
        async.parallel(asyncTasks, function(err, results) {
            if (err) throw new Error(err);
            done();
        })
    },

    processFile: function (file, callback) {
        var _this = this;
        fs.readFile(file, function(err, data) {
            if (err) return callback(err);
            var convertedData = _this.convert(data);
            var filePath = _this.getNewPath(file)
            fs.writeFile(filePath, convertedData, function(err, result) {
                if (err) return callback(err)
                callback(null, true)
            });
        });
    },

    getNewPath: function(file) {
        var dirName = path.dirname(file) + "/"
        var newFileName = path.basename(file) + ".js"
        return dirName + newFileName;
    },


    convert: function(data) {
        var parser = new htmlparser.Parser({
            onopentag: function (name, attr) {

            },
            ontext: function (text) {

            },
            onclosetag: function (tagName) {

            }
        });

    }

};



module.exports = side2nw;
