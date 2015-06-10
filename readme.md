# gulp-tsconfig [![Build Status](https://travis-ci.org/olohmann/gulp-tsconfig.svg?branch=master)](https://travis-ci.org/olohmann/gulp-tsconfig)

> Simple gulp plugin that creates a TypeScript project file ('tsconfig.json') for a given glob of sources. Supports ordering of project files via globs, too.

A sample is provided in the [gulp-tsconfig-sample](https://github.com/olohmann/gulp-tsconfig-sample) repository.

## Install

```
$ npm install --save-dev gulp-tsconfig
```


## Usage

```js
var gulp = require('gulp');
var gulpTsConfig = require('gulp-tsconfig');

gulp.task('default', function() {
    var tsConfig = gulpTsConfig({
        tsOrder: [
            '**/app.module.ts', 
            '**/*.module.ts', 
            '**/*.ts'],
        tsConfig: {            
            "compilerOptions": {
                "target": "ES3",
                "removeComments": true,
                "sourceMap": true,
                "noImplicitAny": true,
                "out": "./dist/app.js"
            }
        }
    });

    return gulp.src(["./**/*.ts"])
        .pipe(tsConfig())
        .pipe(gulp.dest('.'));

    // --> result is a tsconfig.json file.
});
```


## API

### tsConfig(options)

#### options

##### tsConfig

Type: `object`  
Default: `{}`

The tsconfig settings (e.g. "compilerOptions") as specified in the [TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json).

##### tsOrder

Type: `object`  
Default: `['**/*.ts']`

The order glob. The [gulp-order](https://www.npmjs.com/package/gulp-order) plugin is reused for ordering. 

##### jsBeautifyOptions

Type: `object`  
Default: 
```js
{
  indent_size : 4,
  indent_char : ' ',
  preserve_newlines : false,
  wrap_line_length : 80
}
```

The JSON beautifier options. See [js-beautify](https://www.npmjs.com/package/js-beautify) for options.

## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
