/**
 * File: test/unit-test.js
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

// allow for .. in
/* eslint-disable no-restricted-syntax */

// https://mochajs.org/#arrow-functions
/* eslint-disable func-names */

const chai = require( 'chai' );
const { expect } = chai;
const mocha = require( 'mocha' );
const { describe, it } = mocha; // fix eslint no-undef errors

// import paths are relative to this file
const decorateLog = require( '../gulp-modules/helpers/decorate-log' );
const sentenceToCamelCase = require( '../gulp-modules/helpers/sentence-to-camel-case' );

describe( 'helpers', function () {
  describe( 'sentence-to-camel-case.js', function () {
    it( 'sentenceToCamelCase correctly transforms strings', function () {
      const expectedResult = 'DoTheRightThing';

      const strings = [
        'Do The Right Thing',
        'do the right thing',
        'DoTheRightThing',
        'doTheRightThing'
      ];

      for ( let str of strings ) {
        expect( sentenceToCamelCase( str ), `'${str}'` ).to.eq( expectedResult );
      }
    } );
  } );

  describe( 'decorate-log.js', function () {
    it( 'decorateLog correctly iconises and colorises', function () {
      // mock of gulp-color
      // see ANSI escape codes @ https://stackoverflow.com/a/5762502/6850747
      const fakeColor = ( text, color ) => {
        // COLOR: code
        const ansiColorCodes = {
          GREEN: 32,
          RED: 31,
          WHITE: 37,
          YELLOW: 33
        };

        const ansiColorCode = ansiColorCodes[ color ];
        const colouredText = `\u001b[${ansiColorCode}m${text}\u001b[0m`;

        return colouredText;
      };

      // mock of fancy-log
      // without the timestamp
      // as we're not testing that
      const fakeLog = ( str ) => {
        return str;
      };

      const configs = [
        {
          textstring: 'A pass'
        },
        {
          textstring: 'A message',
          messageCount: 1
        },
        {
          textstring: 'A warning',
          warningCount: 1
        },
        {
          textstring: 'An error',
          errorCount: 1
        }
      ];

      const expectedResults = [
        '\u001b[32m✔ A pass\u001b[0m',
        '\u001b[37m💬 A message\u001b[0m',
        '\u001b[33m⚠️ A warning\u001b[0m',
        '\u001b[31m✖ An error\u001b[0m'
      ];

      let i = 0;

      for ( let config of configs ) {
        expect( decorateLog( fakeColor, fakeLog, config ), JSON.stringify( config ) ).to.eq( expectedResults[ i ] );
        i += 1;
      }
    } );
  } );
} );
