/**
 * File: gulp-modules/test.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const cypressIo = require( '../tasks/test/cypressIo' );
const wpUnit = require( '../tasks/test/wpUnit' );

module.exports = series(
  cypressIo,
  wpUnit
);
