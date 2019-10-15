/**
 * File: test/tasks/dependencies.spec.js
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

const composer = require( '../../gulp-modules/tasks/dependencies/composer' );
const github = require( '../../gulp-modules/tasks/dependencies/github' );
const naturalDocs = require( '../../gulp-modules/tasks/dependencies/naturalDocs' );
const wpUnit = require( '../../gulp-modules/tasks/dependencies/wpUnit' );
const yarn = require( '../../gulp-modules/tasks/dependencies/yarn' );

// https://labs.chiedo.com/post/async-mocha-tests/
const mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe( 'dependencies', function () {
  this.timeout( 120000 );

  describe( 'series', function () {
    it( 'runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp dependencies --gulpfile ./gulpfile.js --cwd ./test/fixtures/theme' );
      // console.log( stdout );
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'composer', function () {
    it.skip( 'downloads and installs packages', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'github', function () {
    it.skip( 'displays the Github API rate limit', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'naturalDocs', function () {
    it.skip( 'downloads the executable', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'wpUnit', function () {
    it.skip( 'downloads and installs the test suite', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'yarn', function () {
    it.skip( 'downloads and installs packages', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );
} );
