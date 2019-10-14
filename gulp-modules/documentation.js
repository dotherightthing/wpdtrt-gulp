/**
 * File: gulp-modules/documentation.js
 *
 * Gulp tasks to generate documentation.
 */

const execa = require( 'execa' );

// internal modules
const taskHeader = require( './helpers/task-header' );
const env = require( './helpers/env' );
const {
  TAGGED_RELEASE
} = env;

/**
 * Group: Tasks
 *
 * Order:
 * 1. - naturalDocs (1/1)
 * _____________________________________
 */

/**
 * Function: naturalDocs
 *
 * Generate JS & PHP documentation.
 */
async function naturalDocs() {
  console.log( taskHeader(
    '1/1',
    'Documentation',
    'Documentation',
    'Natural Docs (JS & PHP)'
  ) );

  if ( TAGGED_RELEASE ) {
    // Quotes escape space better than backslash on Travis
    const naturalDocsPath = 'Natural Docs/NaturalDocs.exe';

    try {
      const { stdout, stderr } = await execa.commandSync( `mono "${naturalDocsPath}" ./config/naturaldocs` );
      console.log( stdout );
      console.log( stderr );
    } catch( error ) {
      console.error( error.stdout );
    }
  }
}

module.exports = naturalDocs;
