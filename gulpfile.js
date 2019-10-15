/**
 * File: gulpfile.js
 *
 * Functions exported from this file
 * can be run as Gulp tasks.
 *
 * Note:
 * - See package.json for scripts, which can be run with:
 *   --- Text
 *   yarn run scriptname
 *   ---
 *
 * See:
 * - <https://gulpjs.com/docs/en/getting-started/creating-tasks>
 */

/**
 * Load Async/Await polyfill
 *
 * As of Babel 7.4.0,
 * @babel/polyfill has been deprecated
 * in favor of directly including
 * core-js/stable
 * (to polyfill ECMAScript features)
 * and
 * regenerator-runtime/runtime
 * (needed to use transpiled generator functions)
 *
 * See:
 * - <Babel 7 - ReferenceError: regeneratorRuntime is not defined: https://stackoverflow.com/a/53559063>
 * - <Migrating a Gulpfile from Gulp 3.9.1 to 4.0.2: https://gist.github.com/dotherightthing/e0639c0c5102993b86362ebe2a651ccc>
 */
require( 'core-js/stable' );
require( 'regenerator-runtime/runtime' );

/**
 * Import gulp methods
 */
const gulp = require( 'gulp' );
const { series } = gulp;

/**
 * Import internal task modules
 */
const env = require( './gulp-modules/helpers/env' );
const { TRAVIS } = env;
const compile = require( './gulp-modules/series/compile' );
const dependencies = require( './gulp-modules/series/dependencies' );
const documentation = require( './gulp-modules/series/documentation' );
const lint = require( './gulp-modules/series/lint' );
const release = require( './gulp-modules/series/release' );
const test = require( './gulp-modules/series/test' );
const version = require( './gulp-modules/series/version' );
const watch = require( './gulp-modules/series/watch' );

/**
 * Define combination build tasks
 */

const buildTravis = series(
  dependencies,
  lint,
  compile,
  version,
  documentation,
  test,
  release
);

const buildDev = series(
  dependencies,
  lint,
  compile,
  version,
  documentation,
  test
);

/**
 * Fix #1 for: "Task never defined: lint"
 *
 * Expose the public tasks.
 *
 * See:
 * - <Gulp - Creating tasks: https://gulpjs.com/docs/en/getting-started/creating-tasks>
 */
module.exports = {
  buildDev,
  buildTravis,
  compile,
  dependencies,
  default: ( TRAVIS ? buildTravis : buildDev ),
  documentation,
  lint,
  release,
  test,
  TRAVIS,
  version,
  watch
};
