
var async = require("async"),
    fs = require("fs"),
    path = require("path"),
    convert = require("./convert"),
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
        var section = null;
        var currentTag = null;
        var currentItem = [];
        var commands = [];
        var parser = new htmlparser.Parser({
            onopentag: function (name, attr) {
                switch (name) {
                    case 'link':
                        if (attr.rel == "seleniumbase") {
                            convert.base = attr.href;
                        }
                    break;
                    case 'head':
                    case 'body':
                    case 'thead':
                    case 'tbody':
                        section = name;
                    break;
                    case 'tr':
                        if (section == 'tbody') {
                            currentItem = []
                        }
                }
                currentTag = name;
                console.log("Found open tag: ", name, " attrs: ", attr);
            },
            ontext: function (text) {
                if (section == 'tbody' && currentTag == 'td') {
                    currentItem.push(text);
                }
                console.log("Found text: ", text);
            },
            onclosetag: function (tagName) {
                if (section == 'tbody' && tagName == 'tr') {
                    console.log("currentItem is: ", currentItem);
                    var commandName = currentItem.shift();
                    if (!convert[commandName]) {
                        throw new Error("Unexpected command " + commandName + " found in file");
                    }
                    var command = convert[commandName].parse.apply(convert, currentItem);
                    commands.push(command);
                }
                currentTag = null;
                console.log("Found close tag: ", tagName);
            }
        });
        parser.write(data);
        parser.end();

        console.log("Commands is: ", commands);
    }

};



module.exports = side2nw;
