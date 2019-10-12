/**
 * File: gulp-modules/boilerplate-path.js
 *
 * Gets the path to wpdtrt-plugin-boilerplate.
 */

const env = require( './env' );
const {
  WORDPRESS_CHILD_THEME,
  WORDPRESS_PARENT_THEME,
  WORDPRESS_PLUGIN,
  WORDPRESS_PLUGIN_BOILERPLATE
} = env;

/**
 * Group: Helpers
 * _____________________________________
 */

/**
 * Function: boilerplatePath
 *
 * Get the path to the boilerplate.
 *
 * Returns:
 *   (string) path
 *
 * Example:
 * --- js
 * const boilerplatePath = require( './boilerplate-path' );
 * phpCsXml: `./${boilerplatePath()}phpcs.xml`;
 * ---
 */
function boilerplatePath() {
  let path = '';

  if (
    WORDPRESS_PLUGIN // wpdtrt-plugin-boilerplate 1.7.1+
    || (
      !WORDPRESS_PLUGIN_BOILERPLATE
      && !WORDPRESS_PARENT_THEME
      && !WORDPRESS_CHILD_THEME
    )
  ) {
    path = 'vendor/dotherightthing/wpdtrt-plugin-boilerplate/';
  }

  return path;
}

module.exports = boilerplatePath;
