/**
 * File: gulp-modules/helpers/env.js
 *
 * Environment Variables.
 *
 * See:
 * - <Set up environmental variables: https://github.com/dotherightthing/generator-wpdtrt-plugin-boilerplate/wiki/Set-up-environmental-variables>
 */

/**
 * Group: Constants
 * _____________________________________
 */

/**
 * Constant: CYPRESS_RECORD_KEY
 *
 * Key for recording headless CI tests.
 *
 * Note:
 * - This is in addition to the projectId in cypress.json.
 */
const CYPRESS_RECORD_KEY = process.env.CYPRESS_RECORD_KEY || '';

/**
 * Constant: CI
 *
 * CI CI flag (boolean).
 *
 * See:
 * - <Variables in pipelines: https://confluence.atlassian.com/bitbucket/environment-variables-794502608.html>
 */
const CI = ( typeof process.env.CI !== 'undefined' );

module.exports = {
  CYPRESS_RECORD_KEY,
  CI
};
