/**
 * File: gulp-modules/dependencies.js
 *
 * Gulp tasks to download dependencies.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const composer = require( './dependencies/composer' );
const github = require( './dependencies/github' );
const naturalDocs = require( './dependencies/naturalDocs' );
const wpUnit = require( './dependencies/wpUnit' );
const yarn = require( './dependencies/yarn' );

const env = require( './dependencies/composer' );
const {
  CI,
  TAGGED_RELEASE,
  TRAVIS
} = env;

const dependenciesDev = series(
  yarn,
  composer,
  naturalDocs,
  wpUnit
);

const dependenciesCi = series(
  yarn,
  github,
  wpUnit
);

const dependenciesTravisTagged = series(
  yarn,
  github,
  naturalDocs,
  wpUnit
);

const getDependencies = () => {
  let deps;

  if ( TRAVIS && TAGGED_RELEASE ) {
    deps = dependenciesTravisTagged;
  } else if ( CI ) {
    deps = dependenciesCi;
  } else {
    deps = dependenciesDev;
  }

  return deps;
};

module.exports = getDependencies();
