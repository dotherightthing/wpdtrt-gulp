/**
 * File: exec.js
 *
 * Promisify the node exec function, to be notified when command line calls have completed.
 *
 * See:
 * - <Gist: node-exec: https://gist.github.com/dotherightthing/3a1a33e87fcf3575b8a5b28c77784db2>
 *
 * Example:
 * --- js
 * async function execPromiseTest() {
 *   const { stdout, stderr } = await execa.commandSync( 'echo "execPromise test"' );
 *   console.log( stdout );
 *   console.error( stderr );
 * }
 * ---
 */

const util = require( 'util' );
const { exec: execCallback } = require( 'child_process' );
const exec = util.promisify( execCallback );

module.exports = exec;
