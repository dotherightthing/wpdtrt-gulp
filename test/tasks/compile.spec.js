/**
 * File: test/tasks/compile.spec.js
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

const css = require( '../../gulp-modules/tasks/compile/css' );
const js = require( '../../gulp-modules/tasks/compile/js' );

// https://labs.chiedo.com/post/async-mocha-tests/
const mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe( 'compile', function () {
  this.timeout( 120000 );

  describe( 'series', function () {
    it( 'runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp compile --gulpfile ./gulpfile.js --cwd ./test/fixtures/theme' );
      // console.log( stdout );
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'css', function () {
    it.skip( 'compiles scss files into css', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'js', function () {
    it.skip( 'transpiles ES6 JS files into ES5', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );
} );
