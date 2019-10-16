/**
 * File: test/tasks/documentation.spec.js
 *
 * Test gulp tasks.
 *
 * Note:
 * - Tests are run in project root
 * - In tested code, console.error/warn Prints to stderr with newline, so will cause test to fail when checking against stderr
 * - In tested code, console.log Prints to stdout with newline, so won't cause test to fail when checking against stderr
 *
 * ---
 * yarn run tests
 * ---
 */

const chai = require( 'chai' );
const { expect } = chai;
const execa = require( 'execa' );
const mocha = require( 'mocha' );
const { describe, it } = mocha; // fix eslint no-undef errors

const naturalDocs = require( '../../tasks/documentation/naturalDocs' );

// https://labs.chiedo.com/post/async-mocha-tests/
const mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe.skip( 'documentation', function () {
  this.timeout( 120000 );

  describe( 'series', function () {
    it( 'runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp documentation --gulpfile ./gulpfile.js --cwd ./test/fixtures/theme' );
      // console.log( stdout );
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'naturalDocs', function () {
    it.skip( 'generates documentation', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );
} );
