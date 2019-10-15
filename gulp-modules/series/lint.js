/**
 * File: gulp-modules/lint.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const composer = require( '../tasks/lint/composer' );
const css = require( '../tasks/lint/css' );
const js = require( '../tasks/lint/js' );
const php = require( '../tasks/lint/php' );

module.exports = series(
  css,
  js,
  composer,
  php
);
