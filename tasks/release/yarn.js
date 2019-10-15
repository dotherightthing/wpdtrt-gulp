/**
 * File: release/yarn.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../../helpers/task-header' );

/**
 * Function: yarn
 *
 * Uninstall Yarn development dependencies.
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function yarn() {
  console.log( taskHeader(
    'Release',
    'Uninstall dev dependencies',
    'Yarn'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'yarn install --non-interactive --production' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

module.exports = yarn;
