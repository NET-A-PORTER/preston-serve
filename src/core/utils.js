var fs		= require('fs');
var glob 	= require('glob');
var mkdirp	= require('mkdirp');
var crypto = require('crypto');

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

function globFunc(pattern, options) {
	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) => {
			if (err) return reject(err);
			resolve(files);
		});
	});
}

function readDir(path, filter) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) return reject(err);
			resolve(files);
		});
	});
}

function readFile(path, options) {
  options = options || { encoding: 'utf-8' };
	return new Promise((resolve, reject) => {
		fs.readFile(path, options, (err, contents) => {
			if (err) return reject(err);
			resolve(contents);
		});
	});
}

function writeFile(path, data) {
	return new Promise((resolve, reject) => {
		var pathFragment = path.split('/');
		pathFragment.pop();
		var directory = pathFragment.join('/');
		mkdirp(directory, err => err ? reject(err) : resolve(true));
	}).then(() => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, err => err ? reject(err) : resolve(true));
		});
	});
}

function yield(gen) {
  var it = gen();
  var value;

  (function iterate(val){
    var nextGen = it.next( val );
    if (!nextGen.done) {
      value = nextGen.value;
      if ("then" in value) {
        value.then( iterate );
      } else {
        setTimeout( function(){
          iterate( value );
        }, 0 );
      }
    } else {
      return value;
    }
  })();
}

module.exports = {
  checksum: checksum,
	glob: globFunc,
	readDir: readDir,
	readFile: readFile,
	writeFile: writeFile,
  yield: yield
};
