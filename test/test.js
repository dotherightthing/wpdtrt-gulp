/**
 * File: test/tests.js
 * Topic: DTRT Gulp
 *
 * Unit tests for wpdtrt-gulp utility.
 * Written in Mocha, with Chai assertions.
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

const chai = require( 'chai' ); //?
const { expect } = chai;
const execa = require( 'execa' );
const mocha = require( 'mocha' );
const { describe, it } = mocha; // fix eslint no-undef errors

// https://labs.chiedo.com/post/async-mocha-tests/
const mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe( 'Tasks', function () {
  this.timeout( 60000 );

  describe( 'build', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'dependencies', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp dependencies --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'compile', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp compile --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'documentation', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp documentation --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'lint', function () {
    it( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp lint --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'release', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp release --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'test', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp test --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );

  describe( 'version', function () {
    it.skip( 'Runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp version --gulpfile ./gulpfile-loader.js --cwd ./test/fixtures/theme' );
      console.log( stdout );
      expect( stderr ).to.equal( '' );
    } ) );
  } );
} );
