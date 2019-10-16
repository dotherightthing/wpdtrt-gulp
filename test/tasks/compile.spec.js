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

/**
 * function: shellCommand
 *
 * Run a shell command.
 *
 * Parameters:
 *   command - the command to run (string)
 *
 * Returns:
 *   err - the error (string)
 */
const shellCommand = async ( command ) => {
  let err = '';

  try {
    await execa.commandSync( command, { shell: true } );
    // const { stdout } = await execa.commandSync( command, { shell: true } );
    // console.log( stdout );
  } catch ( error ) {
    err = error.stderr;
  }

  return err;
};

describe.only( 'compile', function () {
  this.timeout( 120000 );

  const cssFolder = 'css';
  const scssFolder = 'scss';

  describe( 'wordpress-child-theme', function () {
    const theme = './test/fixtures/wordpress-child-theme';

    beforeEach ( 'clean up test files', async function() {
      await del( `${theme}/${cssFolder}` );
      await del( `${theme}/${scssFolder}/_wpdtrt-import.scss` );
    } );

    describe( 'series', function () {
      it( 'runs without error', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compile --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'css', async function () {
      it( 'compiles scss files into css', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compileCss --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${cssFolder}/theme.css` ) ).to.equal( true );
      } );

      it( 'generates _wpdtrt-import.scss', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compileCss --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${scssFolder}/_wpdtrt-import.scss` ) ).to.equal( true );
      } );
    } );
  } );

  describe( 'wordpress-parent-theme', function () {
    const theme = './test/fixtures/wordpress-parent-theme';

    beforeEach ( 'clean up test files', async function() {
      await del( `${theme}/${cssFolder}` );
      await del( `${theme}/${scssFolder}/_wpdtrt-import.scss` );
    } );

    describe( 'series', async function () {
      it( 'runs without error', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compile --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'css', async function () {
      it( 'compiles scss files into css', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compileCss --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${cssFolder}/theme.css` ) ).to.equal( true );
      } );

      it( 'does not generate _wpdtrt-import.scss', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp compileCss --gulpfile ./gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${scssFolder}/_wpdtrt-import.scss` ) ).to.equal( false );
      } );
    } );
  } );

  describe( 'js', function () {
    it.skip( 'transpiles ES6 JS files into ES5', async function() {
      // TODO
      expect( error.stderr.replace( /\n$/, '') ).to.equal( '' );
    } );
  } );
} );
