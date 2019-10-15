/**
 * File: compile.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const css = require( '../tasks/compile/css' );
const js = require( '../tasks/compile/js' );

module.exports = series(
  css,
  js
);
