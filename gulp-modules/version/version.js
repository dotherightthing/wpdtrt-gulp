/**
 * File: gulp-modules/version/version.js
 *
 * Gulp tasks to version files prior to a release.
 */
const execa = require( 'execa' );
const gulp = require( 'gulp' );
const wpdtrtPluginBump = require( 'gulp-wpdtrt-plugin-bump' );

const { series } = gulp;

// internal modules
const taskHeader = require( '../helpers/task-header' );
const env = require( '../helpers/env' );
const {
  TRAVIS,
  WORDPRESS_PLUGIN,
  WORDPRESS_PLUGIN_BOILERPLATE,
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

/**
 * Group: Tasks
 *
 * Order:
 * 1. - updateDependencies (1/3) - Dev only
 * 2. - replaceVersions (2/3)
 * 3. - autoloadUpdatedDependencies (3/3) - Dev only
 * _____________________________________
 */

/**
 * Function: autoloadUpdatedDependencies
 *
 * Regenerate the list of PHP classes to be autoloaded.
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function autoloadUpdatedDependencies() {
  console.log( taskHeader(
    'Version',
    'Generate',
    'List of classes to be autoloaded'
  ) );

  try {
    const { stdout, stderr } = await execa.commandSync( 'composer dump-autoload --no-interaction' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

/**
 * Function: replaceVersions
 *
 * Replace version strings, using the version set in package.json.
 *
 * Parameters;
 *  cb - Callback, for flow control
 *
 * Returns:
 *   call to wpdtrtPluginBump (gulp-wpdtrt-plugin-bump)
 */
function replaceVersions( cb ) {
  console.log( taskHeader(
    'Version',
    'Bump',
    'Replace version strings'
  ) );

  if ( WORDPRESS_PLUGIN || WORDPRESS_PLUGIN_BOILERPLATE ) {
    try {
      wpdtrtPluginBump( {
        inputPathRoot: './',
        inputPathBoilerplate: `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}`
      } );
    } catch( error ) {
      console.error( error );
    }
  } else {
    console.log( 'This repository is not a plugin.' );
    console.log( 'Skipping..\n\n' );
  }

  cb();
}

/**
 * Function: updateDependencies
 *
 * Update the boilerplate dependency to the updateDependencies version.
 *
 * Note:
 * - If wpdtrt-plugin-boilerplate is loaded as a dependency,
 *   get the updateDependencies release of wpdtrt-plugin-boilerplate.
 * - This has to run before replaceVersions,
 *   so that the correct version information is available
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function updateDependencies() {
  console.log( taskHeader(
    'Version',
    'Bump',
    'Update Composer dependencies'
  ) );

  if ( WORDPRESS_PLUGIN_BOILERPLATE_PATH.length ) {
    try {
      const { stdout, stderr } = await execa.commandSync( 'composer update dotherightthing/wpdtrt-plugin-boilerplate --no-interaction --no-suggest' );
      console.log( stdout );
      console.log( stderr );
    } catch( error ) {
      console.error( error.stdout );
    }
  }
}

const versionDev = series(
  // 1/3
  updateDependencies,
  // 2/3
  replaceVersions,
  // 3/3
  autoloadUpdatedDependencies
);

const versionTravis = series(
  // 2/3
  replaceVersions
);

module.exports = ( TRAVIS ? versionTravis : versionDev );
