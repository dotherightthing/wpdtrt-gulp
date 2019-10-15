/**
 * File: gulp-modules/release.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const cleanUp = require( './release/cleanUp' );
const composer = require( './release/composer' );
const copy = require( './release/copy' );
const yarn = require( './release/yarn' );
const zipFiles = require( './release/zipFiles' );

module.exports = series(
  composer,
  yarn,
  copy,
  zipFiles,
  cleanUp
);
