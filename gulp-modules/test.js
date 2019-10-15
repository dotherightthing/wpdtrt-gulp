/**
 * File: gulp-modules/test.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const cypressIo = require( './test/cypressIo' );
const wpUnit = require( './test/wpUnit' );

module.exports = series(
  cypressIo,
  wpUnit
);
