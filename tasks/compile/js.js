/**
 * File: compile.js
 *
 * Gulp tasks to compile code.
 */
const babel = require( 'gulp-babel' );
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );

const { dest, src } = gulp;

// internal modules
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
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
  ]
};

const targets = {
  // note: paths are relative to gulpfile, not this file
  js: './js'
};

/**
 * Function: js
 *
 * Transpile ES6+ to ES5, so that modern code runs in old browsers.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function js() {
  console.log( taskHeader(
    'Assets',
    'Transpile',
    'ES6+ JS -> ES5 JS'
  ) );

  return src( sources.js, { allowEmpty: true } )
    .pipe( babel( {
      presets: [ '@babel/env' ]
    } ) )
    .pipe( rename( {
      suffix: '-es5'
    } ) )
    .pipe( dest( targets.js ) );
}

module.exports = js;
