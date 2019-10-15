/**
 * File: dependencies/naturalDocs.js
 *
 * Gulp tasks to download dependencies.
 */
const download = require( 'gulp-download' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const unzip = require( 'gulp-unzip' );

const { dest } = gulp;

// internal modules
const taskHeader = require( '../../helpers/task-header' );

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

module.exports = naturalDocs;
