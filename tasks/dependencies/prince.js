/**
 * File: dependencies/prince.js
 *
 * Gulp tasks to download dependencies.
 */
const download = require( 'gulp-download' );
const execa = require( 'execa' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const decompress = require( 'gulp-decompress' );

const { dest } = gulp;

// internal modules
const taskHeader = require( '../../helpers/task-header' );

/**
 * Function: prince
 *
 * Download prince binary.
 *
 * Note:
 * - Prince can't be installed via Yarn
 *   as the Github release needs to be compiled,
 *   and the download archive on the website
 *   is in .zip rather than .tar format.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function prince( done ) {
  console.log( taskHeader(
    'Dependencies',
    'Install',
    'Prince'
  ) );

  try {
    if ( !fs.existsSync( `${process.cwd()}/prince/lib/prince/bin/prince` ) ) {
      const url = 'https://www.princexml.com/download/prince-20191014-macosx.tar.gz';

      await download( url )
        .pipe( decompress( {
          output: 'prince',
          strip: 1
        } ) )
        .pipe( dest( './' ) );

        try {
          const { stdout, stderr } = await execa.commandSync( 'chmod +x ./prince/install.php', { shell: true } );
          console.log( stdout );
          console.log( stderr );
        } catch ( error ) {
          console.error( error.stdout );
        }
  
        const { stdout2, stderr2 } = await execa.commandSync( 'bash ./prince/install.php' );
    }
  } catch ( error ) {
    console.error( error.stdout );
  }

  const getPrince = async () => {


    return done();
  };

  return getPrince();
}

module.exports = prince;
