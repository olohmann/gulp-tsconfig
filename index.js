'use strict';

var gulp = require('gulp');
var lazypipe = require('lazypipe');
var gutil = require('gulp-util');
var order = require('gulp-order');
var filenamesToJson = require('gulp-filenames-to-json');
var jeditor = require('gulp-json-editor');
var rename = require('gulp-rename');

var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-tsconfig';

function tsConfig(options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    if (typeof options.tsOrder === 'undefined') {
        options.tsOrder = ['**/*.ts'];
    }

    if (typeof options.tsConfig === 'undefined') {
        options.tsConfig = {};
    }

    if (typeof options.tsConfig.compilerOptions === 'undefined') {
        options.tsConfig.compilerOptions = {}
    }

    if (typeof options.jsBeautifyOptions === 'undefined') {
        options.jsBeautifyOptions = {
            indent_size : 4,
            indent_char : ' ',
            preserve_newlines : false,
            wrap_line_length : 80
        };
    }

    return lazypipe()
        .pipe(order, options.tsOrder)
        .pipe(filenamesToJson)
        .pipe(jeditor, function(files) {
            var tsConfig = options.tsConfig;
            tsConfig.files = files;
            return tsConfig;
        }, options.jsBeautifyOptions)
        .pipe(rename, 'tsconfig.json');
}

module.exports = tsConfig;
