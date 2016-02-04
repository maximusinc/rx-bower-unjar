/**
 * Module extracts .jar archive into bower_components folder
 * @return {[type]} [description]
 */
module.exports = function () {
	var fs = require('fs');
	var Q = require('q');
	var fstream = require('fstream');
	var unzip = require('unzip2');
    var glob = require('glob');
    var makeDestFolder = function (path) {
        var aux = path.explode('/');
        aux.pop();
        return aux.join('/');
    };

	return Q.Promise(function (resolveMain, rejectMain) {
        var bowerFolder = 'bower_components/';
        glob( bowerFolder + "**/*.jar", function (er, files) {
            var promises = [];
            files.forEach(function (file) {

                promises.push(Q.Promise(function (resolve, reject){
                    var readStream = fs.createReadStream(file);
                    var writeStream = fstream.Writer(makeDestFolder(file));
                    writeStream.on('close', function () {
                        resolve();
                        console.log("unjar bower_components/" + folder + "/index.jar Done!!");
                    });
                    writeStream.on('error', function () {
                        reject();
                        console.log("unjar bower_components/" + folder + "/index.jar Error!!");
                    });
                    readStream
                      .pipe(unzip.Parse())
                      .pipe(writeStream);
				}));

           });
          // files is an array of filenames.
          // If the `nonull` option is set, and nothing
          // was found, then files is ["**/*.js"]
          // er is an error object or null.
            Q.all(promises).then(resolveMain, rejectMain);
        });
    }
};
