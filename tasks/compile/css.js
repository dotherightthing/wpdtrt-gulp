/**
 * File: compile.js
 *
 * Gulp tasks to compile code.
 */
const autoprefixer = require( 'autoprefixer' );
const gulp = require( 'gulp' );
const postcss = require( 'gulp-postcss' );
const pxtorem = require( 'postcss-pxtorem' );
const sass = require( 'gulp-sass' );

const { dest, src } = gulp;

// internal modules
const taskHeader = require( '../../helpers/task-header' );

// constants
const sources = {
  // note: paths are relative to gulpfile, not this file
  scss: './scss/*.scss'
};

const targets = {
  // note: paths are relative to gulpfile, not this file
  css: './css'
};

/**
 * Function: css
 *
 * Compile CSS.
 *
 * Returns:
 *   A stream - to signal task completion
 */
const css = ( done ) => {
  console.log( taskHeader(
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

  src( sources.scss, { allowEmpty: true } )
    .pipe( sass( { outputStyle: 'expanded' } ) )
    .pipe( postcss( processors ) )
    .pipe( dest( targets.css ) );

  done();
}

module.exports = css;
