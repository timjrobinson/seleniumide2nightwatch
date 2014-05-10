
var program = require('commander')
    , path = require('path')
    , resolve = path.resolve
    , fs = require('fs')
    , glob = require('glob')
    , exists = fs.existsSync || path.existsSync
    , side2nw = require('./side2nw')

program.version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version);
program.name = 'side2nw';
program.parse(process.argv);

var files = []
    , args = program.args;

args.forEach(function(arg){
    files = files.concat(lookupFiles(arg, program.recursive));
});

files = files.map(function(path){
    return resolve(path);
});

side2nw.files = files
side2nw.run(process.exit);


function lookupFiles(path, recursive) {
    var files = [];

    if (!exists(path)) {
        if (exists(path + '.js')) {
            path += '.js'
        } else {
            files = glob.sync(path);
            if (!files.length) throw new Error("cannot resolve path (or pattern) '" + path + "'");
            return files;
        }
    }

    var stat = fs.statSync(path);
    if (stat.isFile()) return path;

    fs.readdirSync(path).forEach(function(file){
        file = join(path, file);
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            if (recursive) files = files.concat(lookupFiles(file, recursive));
            return
        }
        if (!stat.isFile() || !re.test(file) || basename(file)[0] == '.') return;
        files.push(file);
    });

    return files;
}
