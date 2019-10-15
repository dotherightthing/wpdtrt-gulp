/**
 * File: release/cleanUp.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const del = require( 'del' );

// internal modules
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
const {
  PACKAGE_NAME
} = env;

const targets = {
  zipSource: PACKAGE_NAME
};

/**
 * Function: cleanUp
 *
 * Clean up temporary files.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function cleanUp() {
  console.log( taskHeader(
    'Release',
    'Clean up'
  ) );

  return del( [ `./${targets.zipSource}` ] );
}

module.exports = cleanUp;
