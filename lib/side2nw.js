
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
            var filePath = _this.getNewPath(file);
            fs.writeFile(filePath, convertedData, function(err, result) {
                if (err) return callback(err);
                callback(null, true)
            });
        });
    },

    getNewPath: function(file) {
        var dirName = path.dirname(file) + "/";
        var newFileName = path.basename(file) + ".js";
        return dirName + newFileName;
    },


    convert: function(data) {
        var title = null;
        var section = null;
        var currentTag = null;
        var currentItem = [];
        var nightwatchCommands = [];
        var self = this;
        var parser = new htmlparser.Parser({
            onopentag: function (name, attr) {
                switch (name) {
                    case 'link':
                        if (attr.rel.match(/selenium\.base/)) {
                            convert.base = attr.href.replace(/\/$/, '');
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
            },
            ontext: function (text) {
                if (section == 'tbody' && currentTag == 'td') {
                    currentItem.push(text);
                }
                if (currentTag == 'title') {
                    title = text;
                }
            },
            onclosetag: function (tagName) {
                if (section == 'tbody' && tagName == 'tr') {
                    var commands = self.createCommands(currentItem);
                    nightwatchCommands = nightwatchCommands.concat(commands);
                }
                currentTag = null;
            }
        });
        parser.write(data);
        parser.end();

        var fileData = "module.exports = { '" + title + "': function(browser) { \n\tbrowser.";
        nightwatchCommands = this.sanitizeCommands(nightwatchCommands);
        fileData += nightwatchCommands.join('\n\t.');
        fileData += "; }}";
        return fileData
    },

    /**
     * Takes an item array which is the text of each <td> tag in a selenium file.
     * Then turns that into nightwatch command/s
     * @param Array item - an array of text in the <td> tags in a selenium ide file command.
     * @returns Array nightwatchCommands
     */
    createCommands: function (item) {
        var commandName = item.shift();
        if (!convert[commandName]) {
            throw new Error("Unexpected command " + commandName + " found in file");
        }
        var commands = convert[commandName].parse.apply(convert, item);
        if (Array.isArray(commands)) {
            return commands;
        } else if (commands != null) {
            return [commands];
        }

        return [];
    },

    /**
     * Removes extroneous useCss and useXPath tags
     */
    sanitizeCommands: function (commands) {
        var currentUse = null;
        var sanitizedCommands = [];
        commands.forEach(function(command) {
            if (command == "useCss()") {
                if (currentUse != "css") {
                    currentUse = "css";
                    sanitizedCommands.push(command);
                }
            } else if (command == "useXpath()") {
                if (currentUse != "xpath") {
                    currentUse = "xpath";
                    sanitizedCommands.push(command);
                }
            } else {
                sanitizedCommands.push(command);
            }
        });
        return sanitizedCommands;
    }



};



module.exports = side2nw;
