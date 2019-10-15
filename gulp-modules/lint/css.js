/**
 * File: gulp-modules/lint/css.js
 *
 * Gulp tasks to lint code.
 */
const gulp = require( 'gulp' );
const sassLint = require( 'gulp-sass-lint' );

const { src } = gulp;

// internal modules
const taskHeader = require( '../helpers/task-header' );

// constants
const sources = {
  // note: paths are relative to gulpfile, not this file
  scss: './scss/*.scss'
};

/**
 * Function: css
 *
 * Lint CSS files.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function css() {
  console.log( taskHeader(
    '1/5',
    'QA',
    'Lint',
    'CSS'
  ) );

  return src( sources.scss, { allowEmpty: true } )
    .pipe( sassLint() )
    .pipe( sassLint.format() );
// .pipe(sassLint.failOnError())
}

module.exports = css;
