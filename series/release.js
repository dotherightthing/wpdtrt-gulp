/**
 * File: release.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const cleanUp = require( '../tasks/release/cleanUp' );
const composer = require( '../tasks/release/composer' );
const copy = require( '../tasks/release/copy' );
const yarn = require( '../tasks/release/yarn' );
const zipFiles = require( '../tasks/release/zipFiles' );

module.exports = series(
  composer,
  yarn,
  copy,
  zipFiles,
  cleanUp
);
