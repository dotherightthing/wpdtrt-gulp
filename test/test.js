/**
 * File: test/tests.js
 * Topic: DTRT Gulp
 *
 * Unit tests for wpdtrt-gulp utility.
 * Written in Mocha, with Chai assertions.
 *
 * ---
 * yarn run tests
 * ---
 */

const chai = require( 'chai' ); //?
const { expect } = chai;
const execa = require( 'execa' );
const mocha = require( 'mocha' );
const { describe, it } = mocha; // fix eslint no-undef errors

async function testCommand( command, done ) {
  // note: tests appear to be run in root
  try {
    const result = await execa.commandSync( command );
    done();
    console.log( result.stdout );
  } catch ( error ) {
    done( error );
    console.error( error.stderr );
  }
}

describe( 'Tasks', () => {
  describe( 'dependencies', () => {
    it( 'Runs without error', async ( done ) => {
      // note: tests appear to be run in root
      const output = testCommand( './node_modules/.bin/gulp dependencies --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme', done );
  
      // when package.json is missing:
      // EPERM: operation not permitted

      expect( output === {}, 'Output message unexpected' );
    } );
  } );

  // describe( 'dependencies', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp dependencies --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'compile', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp compile --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'docs', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp documentation --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'lint', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp lint --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'release', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp release --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'test', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp test --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'version', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp version --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );

  // describe( 'xxx', function () {
  //   it( 'Runs without error', ( done ) => {
  //     const command = `../../node_modules/.bin/gulp xxx --gulpfile ../../gulpfile-loader.js --cwd ${fixture}`;
  //     runCommand( command, done );
  //   } );
  // } );
} );
