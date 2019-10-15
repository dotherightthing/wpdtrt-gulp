/**
 * File: gulp-modules/test/wpUnit.js
 *
 * Gulp tasks to run unit tests.
 */
const execa = require( 'execa' );

// internal modules
const taskHeader = require( '../../helpers/task-header' );

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

module.exports = wpUnit;
