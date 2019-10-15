/**
 * File: gulp-modules/release/composer.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../helpers/task-header' );

/**
 * Function: composer
 *
 * Uninstall PHP development dependencies.
 *
 * See:
 * - <Reduce vendor components required for deployment: https://github.com/dotherightthing/wpdtrt-plugin-boilerplate/issues/47>
 */
async function composer() {
  console.log( taskHeader(
    'Release',
    'Uninstall dev dependencies',
    'Composer (PHP)'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'composer install --prefer-dist --no-interaction --no-dev --no-suggest' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

module.exports = composer;
