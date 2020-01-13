# DTRT Gulp

[![GitHub release](https://img.shields.io/github/release/dotherightthing/wpdtrt-gulp.svg)](https://github.com/dotherightthing/wpdtrt-gulp/releases) [![Build Status](https://travis-ci.org/dotherightthing/wpdtrt-gulp.svg?branch=master)](https://travis-ci.org/dotherightthing/wpdtrt-gulp) [![GitHub issues](https://img.shields.io/github/issues/dotherightthing/wpdtrt-gulp.svg)](https://github.com/dotherightthing/wpdtrt-gulp/issues) [![GitHub wiki](https://img.shields.io/badge/documentation-wiki-lightgrey.svg)](https://github.com/dotherightthing/wpdtrt-gulp/wiki)

Common build tasks.

## Gulp architecture

* Gulp 4 and ES6
* `./gulpfile.js` imports combination tasks from `./gulp-modules/series/*.js`
* Series tasks import single tasks from `./gulp-modules/tasks/{series_name}/*.js`

## Test architecture

* Files under test: `./test/fixtures/theme`
* Tests are run locally and on Travis
* Tests are run in a specific order, so that fixture dependencies are available to subsequent tasks (`composer install`)
* Generated fixture files are hidden in `.gitignore`

* `yarn run test` runs all `*.spec.js` files, from `/test/helpers/`, `/test/series/`, `/test/tasks/`
* `./test/series/build.spec.js` tests that all tasks complete
* `./test/tasks/{series_name}/*.spec.js` tests that tasks complete when run in series
* `./test/tasks/{series_name}/*.spec.js` tests that individual tasks create the expected output (TODO)

## Roadmap

### Current tests

1. Unit test helpers
1. Test that tasks complete when run in `series`

```
  decorateLog
    ✓ decorates a success message
    ✓ decorates a regular message
    ✓ decorates a warning message
    ✓ decorates an error message

  sentenceToCamelCase
    ✓ transforms title case
    ✓ transforms lowercase
    ✓ transforms upper camel case
    ✓ transforms lower camel case

  build
    series
      ✓ runs without error (93299ms)

  compile
    series
      ✓ runs without error (64346ms)
    css
      - compiles scss files into css
    js
      - transpiles ES6 JS files into ES5

  dependencies
    series
      ✓ runs without error (89217ms)
    composer
      - downloads and installs packages
    github
      - displays the Github API rate limit
    naturalDocs
      - downloads the executable
    wpUnit
      - downloads and installs the test suite
    yarn
      - downloads and installs packages

  documentation
    series
      ✓ runs without error (74946ms)
    naturalDocs
      - generates documentation

  documentation
    series
      ✓ runs without error (70039ms)
    composer
      - lints composer.json
    css
      - lints SCSS files
    js
      - lints JS files
    php
      - lints PHP files using phpcs.xml

  release
    series
      ✓ runs without error (76968ms)
    cleanUp
      - deletes files from the previous release
    composer
      - uninstall PHP development dependencies
    copy
      - copies release files to a temporary folder
    yarn
      - uninstalls Yarn/NPM development dependencies
    zipFiles
      - generates a release.zip for deployment to Github/Bitbucket

  test
    series
      ✓ runs without error (74224ms)
    cypressIo
      - runs Cypress tests
    wpUnit
      - runs WordPress unit tests

  version
    series
      ✓ runs without error (78736ms)
    autoloadUpdatedDependencies
      - regenerates the list of PHP classes to be autoloaded
    replaceVersions
      - replaces version strings, using the version set in package.json
    updateDependencies
      - updates the boilerplate dependency to the latest version


  16 passing (10m)
  22 pending
  ```

### TODO

1. Test that individual tasks create the expected output - `development-current-new`
1. Test in each environment type (parent theme, child theme, plugin boilerplate, generated plugin) - `development-current-new`

## Prerequisites

`package.json`:

```json
{
  ...
  "name": "your-package-name",
  "keywords": [
    ...,
    "wordpress-parent-theme" OR "wordpress-child-theme" OR "wordpress-plugin" OR ""
  ],
  "devDependencies": {
    "gulp": "^4.0.2",
    "wpdtrt-gulp": "https://github.com/dotherightthing/wpdtrt-gulp.git"
  },
  "scripts": {
    "build": "./node_modules/.bin/gulp --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "dependencies": "./node_modules/.bin/gulp dependencies --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "docs": "./node_modules/.bin/gulp documentation --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "lint": "./node_modules/.bin/gulp lint --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "release": "./node_modules/.bin/gulp release --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "test": "./node_modules/.bin/gulp test --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "version": "./node_modules/.bin/gulp version --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./",
    "watch": "./node_modules/.bin/gulp compile --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js && gulp watch --gulpfile ./node_modules/wpdtrt-gulp/gulpfile.js --cwd ./"
  },
  ...
}
```

## Tests

Tests are written in [Mocha](https://mochajs.org/), with [Chai](https://www.chaijs.com/) assertions.

[Execa](https://github.com/sindresorhus/execa) is used to verify the output of the [gulp](https://gulpjs.com/) Node [`child process`](https://nodejs.org/api/child_process.html#child_process_child_process).

```bash
yarn run test
```
