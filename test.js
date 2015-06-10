'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var tsconfig = require('./');

it('tsConfig should create a tsConfig.json file with a file array', function (cb) {
	var stream = tsconfig({/* default options */})();

	stream.on('data', function (file) {
        var tsConfig = JSON.parse(file.contents.toString());
		assert.strictEqual(tsConfig.files.length, 1);
        assert.strictEqual(tsConfig.files[0], "utils.ts");
	});

	stream.on('end', cb);

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/utils.ts',
		contents: new Buffer('module Utils {}')
	}));

	stream.end();
});
