/**
 * File: gulp-modules/env.js
 *
 * Environment Variables.
 *
 * See:
 * - <Set up environmental variables: https://github.com/dotherightthing/generator-wpdtrt-plugin-boilerplate/wiki/Set-up-environmental-variables>
 */
const path = require( 'path' );
const packageJson = require( `${path.resolve( process.cwd() )}/package.json` );

/**
 * Group: Constants
 * _____________________________________
 */

/**
 * Constant: CI
 *
 * CI flag available in Bitbucket and Travis (boolean).
 *
 * See:
 * - <Default Environment Variables: https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables>
 */
const CI = ( typeof process.env.CI !== 'undefined' );

/**
 * Constant: GH_TOKEN
 *
 * Github API token (string).
 */
const GH_TOKEN = process.env.GH_TOKEN || '';

/**
 * Constant: PACKAGE_NAME
 *
 * Get the package name (string).
 */
const PACKAGE_NAME = () => packageJson.name;

/**
 * Constant: RELEASE_TAG
 *
 * Gets the release tag (if deploying a release from the master branch) (string).
 *
 * Note:
 * - if the current build is for a git tag, this variable is set to the tag’s name.
 *
 * See:
 * - <Default Environment Variables: https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables>
 */
const RELEASE_TAG = () => {
  let releaseTag = '';

  if ( typeof process.env.TRAVIS !== 'undefined' ) {
    if ( process.env.TRAVIS_TAG !== '' ) {
      releaseTag = `-${process.env.TRAVIS_TAG}`;
    }
  } else if ( typeof process.env.BITBUCKET_TAG !== 'undefined' ) {
    releaseTag = `-${process.env.BITBUCKET_TAG}`;
  }

  return releaseTag;
};

/**
 * Constant: TAGGED_RELEASE
 *
 * Checks whether we are deploying a release from the master branch.
 *
 * Note:
 * - if the current build is for a git tag, this variable is set to the tag’s name.
 *
 * See:
 * - <Default Environment Variables: https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables>
 */
const TAGGED_RELEASE = process.env.TRAVIS_TAG || false;

/**
 * Constant: TRAVIS
 *
 * Travis CI flag (boolean).
 *
 * See:
 * - <Default Environment Variables: https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables>
 */
const TRAVIS = ( typeof process.env.TRAVIS !== 'undefined' );

/**
 * Constant: WORDPRESS_PLUGIN
 *
 * Test for 'wordpress-plugin' in package keywords (boolean).
 */
const WORDPRESS_PLUGIN = () => packageJson.keywords.includes( 'wordpress-plugin' );

/**
 * Constant: WORDPRESS_PLUGIN_BOILERPLATE
 *
 * Test for 'wordpress-plugin-boilerplate' in package keywords (boolean).
 */
const WORDPRESS_PLUGIN_BOILERPLATE = () => packageJson.name === 'wpdtrt-plugin-boilerplate';

/**
 * Constant: WORDPRESS_CHILD_THEME
 *
 * Test for 'wordpress-theme' in package keywords (boolean).
 */
const WORDPRESS_CHILD_THEME = () => packageJson.keywords.includes( 'wordpress-child-theme' );

/**
 * Constant: WORDPRESS_PARENT_THEME
 *
 * Test for 'wordpress-parent-theme' in package keywords (boolean).
 */
const WORDPRESS_PARENT_THEME = () => packageJson.keywords.includes( 'wordpress-parent-theme' );

/**
 * Constant: WORDPRESS_PARENT_THEME_PATH
 *
 * Path to parent theme within WordPress (string).
 */
const WORDPRESS_PARENT_THEME_PATH = () => !WORDPRESS_PARENT_THEME ? '../wpdtrt/' : '';

module.exports = {
  CI,
  GH_TOKEN,
  PACKAGE_NAME,
  RELEASE_TAG,
  TAGGED_RELEASE,
  TRAVIS,
  WORDPRESS_CHILD_THEME,
  WORDPRESS_PARENT_THEME,
  WORDPRESS_PARENT_THEME_PATH,
  WORDPRESS_PLUGIN,
  WORDPRESS_PLUGIN_BOILERPLATE
};
