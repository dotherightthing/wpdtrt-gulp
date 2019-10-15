/**
 * File: gulp-modules/dependencies/wpUnit.js
 *
 * Gulp tasks to download dependencies.
 */
const execa = require( 'execa' );
const fs = require( 'fs' );

// internal modules
const taskHeader = require( '../helpers/task-header' );
const env = require( '../helpers/env' );
const {
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

// constants
const pluginName = process.cwd().split( '/' ).pop();
const pluginNameSafe = pluginName.replace( /-/g, '_' );

/**
 * Function: wpUnit
 *
 * Install WPUnit test suite.
 *
 * See:
 * - <Testing & Debugging: https://github.com/dotherightthing/wpdtrt-plugin-boilerplate/wiki/Testing-&-Debugging#environmental-variables>
 */
async function wpUnit() {
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'WP Unit'
  ) );

  const dbName = `${pluginNameSafe}_wpunit_${Date.now()}`;
  const wpVersion = 'latest';
  let installerPath = '';

  if ( WORDPRESS_PLUGIN_BOILERPLATE_PATH.length ) {
    installerPath = `${WORDPRESS_PLUGIN_BOILERPLATE_PATH}`;
  }

  const shellScript = `${installerPath}bin/install-wp-tests.sh`;

  if ( !fs.existsSync( shellScript ) ) {
    console.log( `${shellScript} does not exist.` );
    console.log( 'Skipping..\n\n' );
  }

  try {
    const { stdout, stderr } = await execa.commandSync( `bash ${shellScript} ${dbName} ${wpVersion}`, { shell: true } );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.error( error.stdout );
  }
}
module.exports = wpUnit;
