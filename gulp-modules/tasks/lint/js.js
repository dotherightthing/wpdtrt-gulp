/**
 * File: gulp-modules/lint.js
 *
 * Gulp tasks to lint code.
 */
const color = require( 'gulp-color' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const log = require( 'fancy-log' );

const { src } = gulp;

// internal modules
const decorateLog = require( '../../helpers/decorate-log' );
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
const {
  WORDPRESS_CHILD_THEME,
  WORDPRESS_PARENT_THEME,
  WORDPRESS_PARENT_THEME_PATH,
  WORDPRESS_PLUGIN,
  WORDPRESS_PLUGIN_BOILERPLATE,
  WORDPRESS_PLUGIN_BOILERPLATE_PATH
} = env;

// constants
const sources = {
  // note: paths are relative to gulpfile, not this file
  js: [
    './gulpfile.babel.js',
    './gulpfile-loader.js',
    './gulp-modules/*.js',
    './cypress/**/*.js',
    './js/frontend.js',
    './js/backend.js',
    './js/twentysixteen.js' // wpdtrt
  ]
};

if ( WORDPRESS_PLUGIN || WORDPRESS_PLUGIN_BOILERPLATE ) {
  sources.js.push( `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}js/frontend.js` );
  sources.js.push( `./${WORDPRESS_PLUGIN_BOILERPLATE_PATH}js/backend.js` );
}

if ( WORDPRESS_CHILD_THEME || WORDPRESS_PARENT_THEME ) {
  sources.js.push( `./${WORDPRESS_PARENT_THEME_PATH}js/wpdtrt_footer.js` );
  sources.js.push( `./${WORDPRESS_PARENT_THEME_PATH}js/wpdtrt_header.js` );
}

/**
 * Function: js
 *
 * Lint JavaScript files.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function js() {
  console.log( taskHeader(
    'QA',
    'Lint',
    'JavaScript'
  ) );

  // return stream or promise for run-sequence
  return src( sources.js, { allowEmpty: true } )
    .pipe( eslint() )
    .pipe( eslint.result( result => {
      const {
        filePath: textstring, messages, warningCount, errorCount
      } = result;
      const { length: messageCount } = messages;

      console.log( decorateLog( color, log, {
        textstring,
        messageCount,
        warningCount,
        errorCount
      } ) );
    } ) )
    .pipe( eslint.format() );
  // .pipe(eslint.failAfterError());
}

module.exports = js;
