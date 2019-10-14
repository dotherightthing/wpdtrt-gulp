/**
 * File: gulp-modules/compile.js
 *
 * Gulp tasks to compile code.
 */
const autoprefixer = require( 'autoprefixer' );
const babel = require( 'gulp-babel' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const postcss = require( 'gulp-postcss' );
const pxtorem = require( 'postcss-pxtorem' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );

const { dest, series, src } = gulp;

// internal modules
const env = require( './helpers/env' );
const taskHeader = require( './helpers/task-header' );
const {
  CI,
  WORDPRESS_CHILD_THEME,
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

const targets = {
  // note: paths are relative to gulpfile, not this file
  css: './css',
  js: './js'
};

/**
 * Group: Tasks
 *
 * Order:
 * 1. - css (1/2)
 * 2. - js (2/2)
 * _____________________________________
 */

/**
 * Function: css
 *
 * Compile CSS.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function css() {
  console.log( taskHeader(
    '1/2',
    'Assets',
    'Compile',
    'SCSS -> CSS'
  ) );

  const processors = [
    autoprefixer( {
      cascade: false
    } ),
    pxtorem( {
      rootValue: 16,
      unitPrecision: 5,
      propList: [
        'font',
        'font-size',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'bottom',
        'top',
        'max-width'
      ],
      selectorBlackList: [],
      replace: false,
      mediaQuery: true,
      minPixelValue: 0
    } )
  ];

  // if child theme
  if ( WORDPRESS_CHILD_THEME ) {
    const suffix = CI ? 'ci' : 'wp';

    // generate an importer file
    fs.writeFileSync( 'scss/_wpdtrt-import.scss', `@import "wpdtrt/dependencies-${suffix}";\r\n` );
  }

  return src( sources.scss, { allowEmpty: true } )
    .pipe( sass( { outputStyle: 'expanded' } ) )
    .pipe( postcss( processors ) )
    .pipe( dest( targets.css ) );
}

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
    '2/2',
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

module.exports = series(
  // 1/2
  css,
  // 2/2
  js
);
