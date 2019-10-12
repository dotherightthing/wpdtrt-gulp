# wpdtrt-gulp

Common build tasks.

## Usage

`package.json`:

```json
{
  ...
  "devDependencies": {
    "gulp": "^4.0.2",
    "wpdtrt-gulp": "https://github.com/dotherightthing/wpdtrt-gulp.git"
  },
  "scripts": {
    "build": "./node_modules/.bin/gulp --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "dependencies": "./node_modules/.bin/gulp dependencies --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "docs": "./node_modules/.bin/gulp documentation --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "lint": "./node_modules/.bin/gulp lint --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "release": "./node_modules/.bin/gulp release --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "test": "./node_modules/.bin/gulp test --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "version": "./node_modules/.bin/gulp version --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./",
    "watch": "./node_modules/.bin/gulp compile --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js && gulp watch --gulpfile ./node_modules/wpdtrt-gulp/gulpfile-loader.js --cwd ./"
  },
  ...
}
```
