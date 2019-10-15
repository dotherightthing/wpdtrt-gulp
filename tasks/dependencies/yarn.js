/**
 * File: dependencies/yarn.js
 *
 * Gulp tasks to download dependencies.
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../../helpers/task-header' );

/**
 * Function: yarn
 *
 * Install Yarn dependencies.
 */
async function yarn() {
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'Yarn'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'yarn install --non-interactive' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

module.exports = yarn;
