/**
 * File: gulp-modules/dependencies/composer.js
 *
 * Gulp tasks to download dependencies.
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../../helpers/task-header' );

/**
 * Function: composer
 *
 * Install the Composer dependencies listed in composer.json.
 */
async function composer() {
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'Composer (PHP)'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'composer install --prefer-dist --no-interaction --no-suggest' );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.error( error.stdout );
  }
}

module.exports = composer;
