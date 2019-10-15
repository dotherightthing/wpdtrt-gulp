/**
 * File: watch.js
 *
 * Gulp tasks to watch files for changes.
 */
const gulp = require( 'gulp' );

const { series, watch } = gulp;

// internal modules
const compile = require( '../series/compile' );
const env = require( '../helpers/env' );
const taskHeader = require( '../helpers/task-header' );
const {
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

// constants
const sources = {
  // note: paths are relative to gulpfile, not this file
  js: [
    './js/frontend.js',
    './js/backend.js',
    `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}js/frontend.js`,
    `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}js/backend.js`
  ],
  scss: './scss/*.scss'
};

/**
 * Group: Tasks
 *
 * Order:
 * 1. - devWatch (1/1)
 * _____________________________________
 */

/**
 * Function: devWatch
 *
 * Watch for changes to files.
 */
function devWatch() {
  console.log( taskHeader(
    'Watch',
    'Compile',
    'JS & SCSS'
  ) );

  watch( sources.scss, series( compile ) );
  watch( sources.js, series( compile ) );
}

module.exports = series( devWatch );
