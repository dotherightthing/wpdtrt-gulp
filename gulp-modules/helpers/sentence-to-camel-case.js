/**
 * File: gulp-modules/helpers/sentence-to-camel-case.js
 */

/**
 * Function: sentenceToCamelCase
 *
 * Parameters:
 *   sentence - One sentence
 *
 * Returns:
 *   OneSentence
 * _____________________________________
 */
const sentenceToCamelCase = ( sentence ) => {
  let s = sentence;
  // 'foo bar'  -> ['foo', 'bar']
  let sArray = s.split( / /g );
  // ['foo', 'bar']  -> ['Foo', 'Bar']
  sArray = sArray.map( ( w ) => w.charAt( 0 ).toUpperCase() + w.slice( 1 ) );
  // ['Foo', 'Bar'] -> 'FooBar'
  const UpperCamelCase = sArray.join( '' );

  return UpperCamelCase;
};

module.exports = sentenceToCamelCase;
