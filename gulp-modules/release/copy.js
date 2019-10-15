/**
 * File: gulp-modules/release/copy.js
 *
 * Gulp tasks to zip a release.
 *
 * See:
 * - <Globtester: http://www.globtester.com/>
 */
const gulp = require( 'gulp' );
const print = require( 'gulp-print' ).default;

const { dest, src } = gulp;

// internal modules
const env = require( '../helpers/env' );
const taskHeader = require( '../helpers/task-header' );
const {
  PACKAGE_NAME,
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
 * Function: copy
 *
 * Copy release files to a temporary folder.
 *
 * Returns:
 *   A stream - to signal task completion
 */
function copy() {
  console.log( taskHeader(
    'Release',
    'Copy files',
    'To temporary folder'
  ) );

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

module.exports = copy;
