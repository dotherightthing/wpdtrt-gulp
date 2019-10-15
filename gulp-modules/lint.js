/**
 * File: gulp-modules/lint.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const composer = require( './lint/composer' );
const css = require( './lint/css' );
const js = require( './lint/js' );
const php = require( './lint/php' );

module.exports = series(
  css,
  js,
  composer,
  php
);
