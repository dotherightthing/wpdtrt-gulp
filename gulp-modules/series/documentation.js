/**
 * File: gulp-modules/documentation.js
 *
 * Gulp tasks to generate documentation.
 */

// internal modules
const naturalDocs = require( '../tasks/documentation/naturalDocs' );

const env = require( '../helpers/env' );
const {
  TAGGED_RELEASE
} = env;

const getDocumentation = () => {
  let docs = async function() {
    await console.log( 'Documentation' );
  };

  if ( TAGGED_RELEASE ) {
    docs = naturalDocs;
  }

  return docs;
};

module.exports = getDocumentation();
