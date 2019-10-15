/**
 * File: release.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const gulp = require( 'gulp' );
const zip = require( 'gulp-zip' );

const { dest, src } = gulp;

// internal modules
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
const {
  BITBUCKET_TAG,
  PACKAGE_NAME,
  TRAVIS_TAG
} = env;

const targets = {
  zipSource: PACKAGE_NAME
};

/**
 * Function: zipFiles
 *
 * Generate release.zip for deployment by Travis/Github.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function zipFiles() {
  console.log( taskHeader(
    'Release',
    'Generate',
    'Zip file'
  ) );

  let releaseTag = '';

  if ( BITBUCKET_TAG || TRAVIS_TAG ) {
    releaseTag = `-${BITBUCKET_TAG}${TRAVIS_TAG}`;
  }

  return src( [ `./${targets.zipSource}/**/*` ], { base: '.' } )
    .pipe( zip( `release${releaseTag}.zip` ) )
    .pipe( dest( './' ) );
}

module.exports = zipFiles;
