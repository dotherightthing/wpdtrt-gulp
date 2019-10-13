/**
 * File: gulp-modules/dependencies.js
 *
 * Gulp tasks to download dependencies.
 */
const gulp = require( 'gulp' );
const download = require( 'gulp-download' );
const execa = require( 'execa' );
const fs = require( 'fs' );
const ghRateLimit = require( 'gh-rate-limit' );
const log = require( 'fancy-log' );
const unzip = require( 'gulp-unzip' );
const { dest, series } = gulp;

// internal modules
const exec = require( './exec' );
const taskHeader = require( './task-header' );
const env = require( './env' );
const {
  CI,
  GH_TOKEN,
  TAGGED_RELEASE,
  TRAVIS,
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

// constants
const pluginName = process.cwd().split( '/' ).pop();
const pluginNameSafe = pluginName.replace( /-/g, '_' );

/**
 * Group: Helpers
 * _____________________________________
 */

/**
 * Group: Tasks
 *
 * Order:
 * 1. - yarn (1/5)
 * 2. - github (2/5) - Travis only
 * 3. - composer (3/5) - Dev only
 * 4. - naturalDocs (4/5)
 * 5. - wpUnit (5/5)
 * _____________________________________
 */

/**
 * Function: composer
 *
 * Install the Composer dependencies listed in composer.json.
 */
async function composer() {
  taskHeader(
    '3/5',
    'Dependencies',
    'Install',
    'Composer (PHP)'
  );

  try {
    const { stdout, stderr } = await exec( 'composer install --prefer-dist --no-interaction --no-suggest' );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.error( error.stdout );
  }
}

/**
 * Function: github
 *
 * Logs the Github API rate limit, to aid in debugging failed builds.
 *
 * Note:
 * - done() calls the gulp callback, to signal task completion
 */
function github( done ) {
  taskHeader(
    '2/5',
    'Dependencies',
    'Install',
    'Check current Github API rate limit for automated installs'
  );

  return ghRateLimit( {
    token: GH_TOKEN
  } ).then( ( status ) => {
    log( 'Github API rate limit:' );
    log( `API calls remaining: ${status.core.remaining}/${status.core.limit}` );

    done();
  } ).catch( err => {
    console.error( err );
    console.error( `GH_TOKEN.length = ${GH_TOKEN.length}` );

    done();
  } );
}

/**
 * Function: naturalDocs
 *
 * Install documentation dependencies.
 *
 * Note:
 * - Natural Docs can't be installed via Yarn
 *   as the Github release needs to be compiled,
 *   and the download archive on the website
 *   is in .zip rather than .tar format.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function naturalDocs( done ) {
  taskHeader(
    '4/5',
    'Dependencies',
    'Install',
    'Docs'
  );

  const getNaturalDocs = () => {
    if ( !fs.existsSync( `${process.cwd()}/Natural Docs/NaturalDocs.exe` ) ) {
      const url = 'https://naturaldocs.org/download/natural_docs/'
      + '2.0.2/Natural_Docs_2.0.2.zip';

      return download( url )
        .pipe( unzip() )
        .pipe( dest( './' ) );
    }

    return done();
  };

  return getNaturalDocs();
}

/**
 * Function: wpUnit
 *
 * Install WPUnit test suite.
 *
 * See:
 * - <Testing & Debugging: https://github.com/dotherightthing/wpdtrt-plugin-boilerplate/wiki/Testing-&-Debugging#environmental-variables>
 */
async function wpUnit() {
  taskHeader(
    '5/5',
    'Dependencies',
    'Install',
    'WP Unit'
  );

  const dbName = `${pluginNameSafe}_wpunit_${Date.now()}`;
  const wpVersion = 'latest';
  let installerPath = 'bin/';

  if ( WORDPRESS_PLUGIN_BOILERPLATE_PATH.length ) {
    installerPath = `${WORDPRESS_PLUGIN_BOILERPLATE_PATH}bin/`;
  }

  const shellScript = `${installerPath}install-wp-tests.sh`;

  if ( !fs.existsSync( shellScript ) ) {
    console.log( `${shellScript} does not exist.` );
    console.log( 'Skipping..' );
  }

  try {
    const { stdout, stderr } = await execa.commandSync( `bash ${shellScript} ${dbName} ${wpVersion}` );
    console.log( stdout );
    console.log( stderr );
  } catch ( error ) {
    console.error( error.stdout );
  }
}

/**
 * Function: yarn
 *
 * Install Yarn dependencies.
 */
async function yarn() {
  taskHeader(
    '1/5',
    'Dependencies',
    'Install',
    'Yarn'
  );

  try {
    const { stdout, stderr } = await execa.commandSync( 'yarn install --non-interactive' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( stderr );
  }
}

const dependenciesDev = series(
  // 1/5
  yarn,
  // 3/5
  composer,
  // 4/5
  naturalDocs,
  // 5/5
  wpUnit
);

const dependenciesCi = series(
  // 1/5
  yarn,
  // 2/5
  github,
  // 5/5
  wpUnit
);

const dependenciesTravisTagged = series(
  // 1/5
  yarn,
  // 2/5
  github,
  // 4/5
  naturalDocs,
  // 5/5
  wpUnit
);

const getDependencies = () => {
  let deps;

  if ( TRAVIS && TAGGED_RELEASE ) {
    deps = dependenciesTravisTagged;
  } else if ( CI ) {
    deps = dependenciesCi;
  } else {
    deps = dependenciesDev;
  }

  return deps;
};

module.exports = getDependencies();
