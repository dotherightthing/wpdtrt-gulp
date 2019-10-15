/**
 * File: gulp-modules/test.js
 *
 * Gulp tasks to run unit tests.
 */
const gulp = require( 'gulp' );

const { series } = gulp;

// internal modules
const env = require( './helpers/env' );
const execa = require( 'execa' );
const taskHeader = require( './helpers/task-header' );
const {
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

/**
 * Group: Tasks
 *
 * Order:
 * 1. - cypressIo (1/2)
 * 2. - wpUnit (2/2)
 * _____________________________________
 */

/**
 * Function: cypressIo
 *
 * Run Cypress tests
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function cypressIo() {
  console.log( taskHeader(
    'QA',
    'Tests',
    'Cypress'
  ) );

  // only child plugins have tests
  // child plugins run off the boilerplatePath
  if ( WORDPRESS_PLUGIN_BOILERPLATE_PATH.length ) {
    try {
      const { stdout, stderr } = await execa.commandSync( `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}node_modules/.bin/cypress run` );
      console.log( stdout );
      console.log( stderr );
    } catch ( error ) {
      console.log( error.stdout );
    }
  }
}

/**
 * Function: wpUnit
 *
 * Run WPUnit tests
 *
 * See:
 * - <Trouble running PHPUnit in Travis Build: https://stackoverflow.com/a/42467775/6850747>
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function wpUnit() {
  console.log( taskHeader(
    'QA',
    'Tests',
    'WPUnit'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( './vendor/bin/phpunit --configuration phpunit.xml.dist' );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.log( error.stdout );
  }
}

module.exports = series(
  // 1/2
  cypressIo,
  // 2/2
  wpUnit
);
