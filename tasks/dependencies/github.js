/**
 * File: dependencies/github.js
 *
 * Gulp tasks to download dependencies.
 */
const ghRateLimit = require( 'gh-rate-limit' );

// internal modules
const taskHeader = require( '../../helpers/task-header' );
const env = require( '../../helpers/env' );
const {
  GH_TOKEN,
} = env;

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

module.exports = github;
