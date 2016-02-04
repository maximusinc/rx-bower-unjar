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
    var aux = path.split('/');
    aux.pop();
    return aux.join('/');
  };

  var bowerFolder = 'bower_components/';
  glob( bowerFolder + "**/*.jar", function (er, files) {
    files.forEach(function (file) {
      var readStream = fs.createReadStream(file);
      var writeStream = fstream.Writer(makeDestFolder(file));
      writeStream.on('close', function () {
          console.log("unjar " + files + " Done!!");
      });
      writeStream.on('error', function () {
          console.log("unjar " + files + " Error!!");
      });
      readStream
        .pipe(unzip.Parse())
        .pipe(writeStream);
    });
  });
};
