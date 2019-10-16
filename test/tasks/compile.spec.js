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
const del = require( 'del' );
const execa = require( 'execa' );
const fs = require( 'fs' );
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

describe( 'compile', function () {
  this.timeout( 120000 );

  const expectedFolder = './test/fixtures/theme/css';
  const expectedFile = './test/fixtures/theme/css/theme.css';

  before ( async function() {
    // runs before all tests in this block
    await del( expectedFolder );
  } );

  describe( 'series', function () {
    it( 'runs without error', mochaAsync(async function() {
      const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp compile --gulpfile ./gulpfile.js --cwd ./test/fixtures/theme' );
      // console.log( stdout );
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );

  describe( 'css', async function () {
    it.only( 'compiles scss files into css', mochaAsync(async function() {
      try {
        const { stdout, stderr } = await execa.commandSync( './node_modules/.bin/gulp compileCss --gulpfile ./gulpfile.js --cwd ./test/fixtures/theme' );
        console.log( stdout );
        console.log( stderr );
      } catch ( error ) {
        console.error ( error.stderr );
      }

      expect( fs.existsSync( `${process.cwd()}/${expectedFile}` ) ).to.equal( true );
    } ) );
  } );

  describe( 'js', function () {
    it.skip( 'transpiles ES6 JS files into ES5', mochaAsync(async function() {
      // TODO
      expect( stderr.replace( /\n$/, '') ).to.equal( '' );
    } ) );
  } );
} );
