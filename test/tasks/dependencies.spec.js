/**
 * File: test/tasks/dependencies.spec.js
 *
 * Test tasks which install dependencies.
 *
 * Note:
 * - Tests are run in project root
 * - In tested code, console.error/warn Prints to stderr with newline, so will cause test to fail when checking against stderr
 * - In tested code, console.log Prints to stdout with newline, so won't cause test to fail when checking against stderr
 */

const chai = require( 'chai' );
const { expect } = chai;
const del = require( 'del' );
const execa = require( 'execa' );
const fs = require( 'fs' );
const mocha = require( 'mocha' );
const { describe, it } = mocha; // fix eslint no-undef errors

/**
 * Function: shellCommand
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

describe.only( 'dependencies', function () {
  this.timeout( 120000 );

  // TODO: Github & WPUnit
  const composerFolder = 'vendor';
  const naturalDocsFolder = 'Natural Docs';
  const yarnFolder = 'node_modules';

  /**
   * Group: WordPress Child Theme
   * _____________________________________
   */
  describe( 'wordpress-child-theme', function () {
    const theme = './test/fixtures/wordpress-child-theme';

    beforeEach ( 'clean up test files', async function() {
      await del( `${theme}/${composerFolder}` );
      await del( `${theme}/${naturalDocsFolder}` );
      await del( `${theme}/${yarnFolder}` );
      await del( `${theme}/yarn.lock` );
    } );

    describe( 'series', function () {
      it( 'runs without error', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp dependencies --gulpfile ${theme}/gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'composer', function () {
      it( 'downloads and installs packages', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp dependenciesComposer --gulpfile ${theme}/gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${composerFolder}` ) ).to.equal( true );
      } );
    } );

    describe( 'github', function () {
      it.skip( 'displays the Github API rate limit', async function() {
        // TODO
        expect( stderr.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'naturalDocs', function () {
      it.skip( 'downloads the executable', async function() {
        // TODO
        expect( stderr.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'wpUnit', function () {
      it.skip( 'downloads and installs the test suite', async function() {
        // TODO
        expect( stderr.replace( /\n$/, '') ).to.equal( '' );
      } );
    } );

    describe( 'yarn', function () {
      it( 'downloads and installs packages', async function() {
        const err = await shellCommand( `./node_modules/.bin/gulp dependenciesYarn --gulpfile ${theme}/gulpfile.js --cwd ${theme}` );
        expect( err.replace( /\n$/, '') ).to.equal( '' );
        expect( fs.existsSync( `${process.cwd()}/${theme}/${yarnFolder}` ) ).to.equal( true );
        expect( fs.existsSync( `${process.cwd()}/${theme}/yarn.lock` ) ).to.equal( true );
      } );
    } );
  } );
} );
