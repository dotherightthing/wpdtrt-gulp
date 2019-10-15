/**
 * File: gulp-modules/dependencies.js
 *
 * Gulp tasks to download dependencies.
 */
const download = require( 'gulp-download' );
const execa = require( 'execa' );
const fs = require( 'fs' );
const ghRateLimit = require( 'gh-rate-limit' );
const gulp = require( 'gulp' );
const unzip = require( 'gulp-unzip' );

const { dest, series } = gulp;

// internal modules
const taskHeader = require( './helpers/task-header' );
const env = require( './helpers/env' );
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

/**
 * Function: github
 *
 * Logs the Github API rate limit, to aid in debugging failed builds.
 *
 * Note:
 * - done() calls the gulp callback, to signal task completion
 */
function github( done ) {
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'Check current Github API rate limit for automated installs'
  ) );

  return ghRateLimit( {
    token: GH_TOKEN
  } ).then( ( status ) => {
    console.log( 'Github API rate limit:' );
    console.log( `API calls remaining: ${status.core.remaining}/${status.core.limit}` );
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
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'Docs'
  ) );

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
