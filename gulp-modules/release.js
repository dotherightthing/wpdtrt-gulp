/**
 * File: gulp-modules/release.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const gulp = require( 'gulp' );
const { dest, series, src } = gulp;
const del = require( 'del' );
const print = require( 'gulp-print' ).default;
const zip = require( 'gulp-zip' );

// internal modules
const env = require( './env' );
const exec = require( './exec' );
const taskHeader = require( './task-header' );
const {
  BITBUCKET_TAG,
  PACKAGE_NAME,
  TRAVIS_TAG,
  WORDPRESS_PARENT_THEME,
  WORDPRESS_PLUGIN,
  WORDPRESS_PLUGIN_BOILERPLATE
} = env;

// constants
const sources = {
  // note: paths are relative to gulpfile, not this file
  wordPressPluginReleaseFiles: [
    // Composer file, contains TGMPA dependencies object
    './composer.json',
    // Compiled CSS
    './css/**/*',
    // Cypress.io
    './cypress.json',
    './cypress/**/*',
    // Any icons
    './icons/**/*',
    // Any images
    './images/**/*',
    // Not the project logo
    '!./images/**/*.pxm',
    // Transpiled ES5 JS incl backend-es5.js from boilerplate
    './js/**/*-es5.js',
    // WP i18n .pot files
    './languages/**/*',
    // Yarn front-end dependencies
    './node_modules/**/*',
    // Yarn environment symlink
    '!./node_modules/wpdtrt-plugin-boilerplate',
    // Yarn environment symlink contents
    '!./node_modules/wpdtrt-plugin-boilerplate/**/*',
    // Plugin logic
    './src/**/*',
    // Plugin template partials
    './template-parts/**/*',
    // Any PHP dependencies
    './vendor/**/*',
    // Not binary executables
    '!./vendor/bin/**/*',
    // Not JSON files
    '!./node_modules/**/*.json',
    '!./vendor/**/*.json',
    // Not Less files
    '!./node_modules/**/*.less',
    '!./vendor/**/*.less',
    // Not License files
    '!./node_modules/**/LICENSE',
    '!./vendor/**/LICENSE',
    // Not Markdown files
    '!./node_modules/**/*.md',
    '!./vendor/**/*.md',
    // Not PHP sample files
    '!./node_modules/**/*example*.php',
    '!./vendor/**/*example*.php',
    // Not Sass files
    '!./node_modules/**/*.scss',
    '!./vendor/**/*.scss',
    // Not SCSS folders
    '!./node_modules/**/*/scss',
    '!./vendor/**/*/scss',
    // Not test files
    '!./node_modules/**/test/**/*',
    '!./vendor/**/test/**/*',
    // Not tests files
    '!./node_modules/**/tests/**/*',
    '!./vendor/**/tests/**/*',
    // Not XML files
    '!./node_modules/**/*.xml',
    '!./vendor/**/*.xml',
    // Not Zip files
    '!./node_modules/**/*.zip',
    '!./vendor/**/*.zip',
    // Plugin WP Read Me
    './readme.txt',
    // Plugin WP Uninstaller
    './uninstall.php',
    // Plugin root config
    `./${PACKAGE_NAME}.php`,
    // Not CSS source maps
    '!./css/maps/**/*',
    // Not demo files
    '!./icons/icomoon/demo-files/**/*',
    // Not docs
    '!./docs/**/*'
  ],
  wordPressThemeReleaseFiles: [
    // Theme Cheatsheets
    './cheatsheets/**/*',
    // Theme Config
    './config/**/*',
    // Compiled Theme CSS
    './css/**/*',
    // Icons
    './icons/**/*',
    // Images
    './images/**/*',
    // Transpiled Theme JS
    './js/**/*-es5.js',
    // Theme Logic
    './library/**/*',
    // Yarn front-end dependencies
    './node_modules/**/*',
    // Theme template partials
    './template-parts/**/*',
    // Any Tiny MCE (WYSIWYG) mods
    './tiny-mce/**/*',
    // Any PHP dependencies
    './vendor/**/*',
    // Not wpdtrt 'file'
    '!./node_modules/wpdtrt',
    // Not binary executables
    '!./node_modules/.bin',
    '!./node_modules/**/.bin',
    '!./node_modules/**/bin',
    '!./vendor/**/bin',
    // Not JSON files
    '!./node_modules/**/*.json',
    '!./vendor/**/*.json',
    // Not Less files
    '!./node_modules/**/*.less',
    '!./vendor/**/*.less',
    // Not Authors files
    '!./node_modules/**/AUTHORS',
    '!./vendor/**/AUTHORS',
    // Not Changes files
    '!./node_modules/**/CHANGES',
    '!./vendor/**/CHANGES',
    // Not License files
    '!./node_modules/**/license',
    '!./vendor/**/license',
    '!./node_modules/**/LICENSE',
    '!./vendor/**/LICENSE',
    // Not Markdown files
    '!./node_modules/**/*.md',
    '!./vendor/**/*.md',
    // Not Makefile files
    '!./node_modules/**/Makefile',
    // Not PHP sample files
    '!./node_modules/**/*example*.php',
    '!./vendor/**/*example*.php',
    // Not Sass files
    '!./node_modules/**/*.scss',
    '!./vendor/**/*.scss',
    // Not SCSS folders
    '!./node_modules/**/*/scss',
    '!./vendor/**/*/scss',
    // Not test files
    '!./node_modules/**/test/**/*',
    '!./vendor/**/test/**/*',
    // Not tests files
    '!./node_modules/**/tests/**/*',
    '!./vendor/**/tests/**/*',
    // Not XML files
    '!./node_modules/**/*.xml',
    '!./vendor/**/*.xml',
    // Not Zip files
    '!./node_modules/**/*.zip',
    '!./vendor/**/*.zip',
    // Theme search form
    './_searchform.php',
    // Theme archive page template
    './archive.php',
    // Theme comments partial
    './comments.php',
    // Theme footer partial
    './footer.php',
    // Theme functions
    './functions.php',
    // Theme header partial
    './header.php',
    // Theme post title and content template
    './index.php',
    // Theme maintenance page template
    './maintenance.php',
    // The template for displaying all pages
    './page.php',
    // Theme Read Me
    './README.md',
    // Theme WP Read Me
    './README.txt',
    // Theme Screenshot
    './screenshot.png',
    // Theme Search Template
    './search.php',
    // Theme widget-ready sidebar partials
    './sidebar-widget-tests.php',
    './sidebar.php',
    // Theme Single Post Template
    './single.php',
    // Theme Stylesheet
    './style.css',
    // wpdtrt-dbth child theme templates
    './archive-tourdiaries.php',
    './image.php',
    './page-search.php',
    './single-tourdiaries.php',
    './templates/**/*',
    './taxonomy-wpdtrt_tourdates_taxonomy_tour.php',
    // Not CSS source maps
    '!./css/maps/**/*',
    // Not demo files
    '!./icons/icomoon/demo-files/**/*',
    // Not docs
    '!./docs/**/*',
    // Not Source files
    '!./node_modules/**/src/**/*'
  ]
};
const targets = {
  zipSource: PACKAGE_NAME
};

/**
 * Group: Tasks
 * _____________________________________
 *
 * Order:
 * 1. - composer (1/5)
 * 2. - yarn (2/5)
 * 3. - copy (3/5)
 * 4. - zipFiles (4/5)
 * 5. - cleanUp (5/5)
 */

/**
 * Function: cleanUp
 *
 * Clean up temporary files.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function cleanUp() {
  taskHeader(
    '5/5',
    'Release',
    'Clean up'
  );

  return del( [ `./${targets.zipSource}` ] );
}

/**
 * Function: composer
 *
 * Uninstall PHP development dependencies.
 *
 * See:
 * - <Reduce vendor components required for deployment: https://github.com/dotherightthing/wpdtrt-plugin-boilerplate/issues/47>
 */
async function composer() {
  taskHeader(
    '1/5',
    'Release',
    'Uninstall dev dependencies',
    'Composer (PHP)'
  );

  try {
    const { stdout, stderr } = await exec( 'composer install --prefer-dist --no-interaction --no-dev --no-suggest' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

/**
 * Function: copy
 *
 * Copy release files to a temporary folder.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function copy() {
  taskHeader(
    '3/5',
    'Release',
    'Copy files',
    'To temporary folder'
  );

  const getReleaseFiles = () => {
    let files = [];

    if ( WORDPRESS_PARENT_THEME ) {
      files = sources.wordPressThemeReleaseFiles;
    } else if ( WORDPRESS_PLUGIN || WORDPRESS_PLUGIN_BOILERPLATE ) {
      files = sources.wordPressPluginReleaseFiles;
    }

    return files;
  };

  // return stream or promise for run-sequence
  // https://stackoverflow.com/a/32188928/6850747
  return src( getReleaseFiles(), { allowEmpty: true, base: '.' } )
    .pipe( print() )
    .pipe( dest( targets.zipSource ) );
}

/**
 * Function: yarn
 *
 * Uninstall Yarn development dependencies.
 *
 * Returns:
 *   A stream - to signal task completion
 */
async function yarn() {
  taskHeader(
    '2/5',
    'Release',
    'Uninstall dev dependencies',
    'Yarn'
  );

  try {
    const { stdout, stderr } = await exec( 'yarn install --non-interactive --production' );
    console.log( stdout );
    console.log( stderr );
  } catch( error ) {
    console.error( error.stdout );
  }
}

/**
 * Function: zipFiles
 *
 * Generate release.zip for deployment by Travis/Github.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function zipFiles() {
  taskHeader(
    '4/5',
    'Release',
    'Generate',
    'Zip file'
  );

  let releaseTag = '';

  if ( BITBUCKET_TAG || TRAVIS_TAG ) {
    releaseTag = `-${BITBUCKET_TAG}${TRAVIS_TAG}`;
  }

  return src( [ `./${targets.zipSource}/**/*` ], { base: '.' } )
    .pipe( zip( `release${releaseTag}.zip` ) )
    .pipe( dest( './' ) );
}

module.exports = series(
  // 1/5
  composer,
  // 2/5
  yarn,
  // 3/5
  copy,
  // 4/5
  zipFiles,
  // 5/5
  cleanUp
);
