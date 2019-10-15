/**
 * File: gulp-modules/test/cypressIo.js
 *
 * Gulp tasks to run unit tests.
 */
const execa = require( 'execa' );

// internal modules
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
const {
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

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

module.exports = cypressIo;
