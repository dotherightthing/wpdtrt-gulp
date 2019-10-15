/**
 * File: gulp-modules/lint/composer.js
 *
 * Gulp tasks to lint code.
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../helpers/task-header' );

/**
 * Function: composer
 *
 * Lint composer.json.
 */
async function composer() {
  console.log( taskHeader(
    '3/5',
    'QA',
    'Lint',
    'composer.json'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'composer validate' );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.error( error.stdout );
  }
}

module.exports = composer;
