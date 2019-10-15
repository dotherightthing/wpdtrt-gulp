/**
 * File: gulp-modules/compile.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const css = require( './compile/css' );
const js = require( './compile/js' );

module.exports = series(
  css,
  js
);
