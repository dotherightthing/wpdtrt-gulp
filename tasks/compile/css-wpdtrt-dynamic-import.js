/**
 * File: tasks/compile/css-dynamic-import.js
 */
const fs = require( 'fs' );

// internal modules
const env = require( '../../helpers/env' );
const taskHeader = require( '../../helpers/task-header' );
const {
  CI
} = env;

/**
 * Function: cssWpdtrtDynamicImport
 *
 * Dynamically import styles into WordPress child theme.
 *
 * Note:
 * - This should only be run by wpdtrt-dbth (a child theme).
 *
 * Returns:
 *   A stream - to signal task completion
 */
const cssWpdtrtDynamicImport = async () => {
  console.log( taskHeader(
    'Compile',
    'CSS',
    'Dynamically import styles into WordPress child theme'
  ) );

  const suffix = CI ? 'ci' : 'wp';

  // generate an importer file
  try {
    await fs.writeFileSync( 'scss/_wpdtrt-import.scss', `@import "wpdtrt/dependencies-${suffix}";\r\n` );
  } catch ( error ) {
    console.error( error.stdout );
  }
}

module.exports = cssWpdtrtDynamicImport;
