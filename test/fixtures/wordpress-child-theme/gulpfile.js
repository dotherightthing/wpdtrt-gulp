/**
 * File: test/fixtures/wordpress-child-theme/gulpfile.js
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
const { parallel, series } = gulp;

/**
 * Import task modules from wpdtrt-gulp.
 *
 * Note:
 * - Test path: ../../../
 * - Integrated path: ./node_modules/wpdtrt-gulp/
 */
const env = require( '../../../helpers/env' );

const compileCss = require( '../../../tasks/compile/css' );
const compileCssWpdtrtDynamicImport = require( '../../../tasks/compile/css-wpdtrt-dynamic-import' );
const compileJs = require( '../../../tasks/compile/js' );

const dependenciesComposer = require( '../../../tasks/dependencies/composer' );
const dependenciesGithub = require( '../../../tasks/dependencies/github' );
const dependenciesNaturalDocs = require( '../../../tasks/dependencies/naturalDocs' );
const dependenciesWpUnit = require( '../../../tasks/dependencies/wpUnit' );
const dependenciesYarn = require( '../../../tasks/dependencies/yarn' );

const documentation = require( '../../../series/documentation' );
const lint = require( '../../../series/lint' );
const release = require( '../../../series/release' );
const test = require( '../../../series/test' );
const version = require( '../../../series/version' );

const {
  CI,
  TAGGED_RELEASE,
  TRAVIS
} = env;

const watched = {
  // note: paths are relative to gulpfile
  js: './js/*.js',
  scss: './scss/*.scss'
};

/**
 * Group: Compose the appropriate tasks for the environment.
 * _____________________________________
 */

const compile = series(
  compileCssWpdtrtDynamicImport,
  parallel( compileCss, compileJs )
);

const watch = () => {
  watch( watched.scss, series( compileCss ) );
  watch( watched.js, series( compileJs ) );
}

/**
 * Function: defaultSeries
 *
 * Returns:
 *   tasks - The default tasks
 */
const defaultSeries = () => {
  let tasks;

  if ( TRAVIS ) {
    tasks = series(
      dependenciesSeries(),
      lint,
      compile,
      version,
      documentation,
      test,
      release
    );
  } else {
    tasks = series(
      dependenciesSeries(),
      lint,
      compile,
      version,
      documentation,
      test
    );
  }

  return tasks;
};

/**
 * Function: dependenciesSeries
 *
 * Returns:
 *   tasks - The dependencies tasks
 */
const dependenciesSeries = () => {
  let tasks;

  if ( TRAVIS && TAGGED_RELEASE ) {
    tasks = series(
      dependenciesYarn,
      dependenciesGithub,
      dependenciesNaturalDocs,
      dependenciesWpUnit
    );
  } else if ( CI ) {
    tasks = series(
      dependenciesYarn,
      dependenciesGithub,
      dependenciesWpUnit
    );
  } else {
    tasks = series(
      dependenciesYarn,
      dependenciesComposer,
      dependenciesNaturalDocs,
      dependenciesWpUnit
    );
  }

  return tasks;
};

/**
 * Fix #1 for: "Task never defined: lint"
 *
 * Expose the public tasks.
 *
 * See:
 * - <Gulp - Creating tasks: https://gulpjs.com/docs/en/getting-started/creating-tasks>
 */
module.exports = {
  default: defaultSeries(),
  compile,
  compileCssWpdtrtDynamicImport, // for testing
  compileCss, // for testing
  compileJs, // for testing
  dependencies: dependenciesSeries(),
  dependenciesComposer, // for testing
  dependenciesGithub, // for testing
  dependenciesNaturalDocs, // for testing
  dependenciesWpUnit, // for testing
  dependenciesYarn, // for testing
  documentation,
  lint,
  release,
  test,
  version,
  watch
};
