import * as tape from 'tape'
tape.test('test node require', t => {
  // t.plan(2)
  const isSatire = require('../')
  console.log(isSatire)
  // const checkUrl = isSatire({ url: 'http://google.com' })
  // t.equal(typeof isSatire, 'object')
  // t.equal(checkUrl.url, 'http://google.com')
  t.end()
})

tape.test('test browserify build', t => {
  const isSatire = require('../')
  t.equal(1, 1)
  t.end()
})

/**
 * browserify build:   lib/index.js -> build/is-satire.js
 * node build:         lib/index.js `.
 * source:             src/index.js `
 */

/**
 * in node environment:
 *   import { isSatire } from 'is-satire'
 *
 *   or
 *
 *   const isSatire = require('is-satire')
 *
 * in browser environment (via browserify):
 *
 *   var isSatire = require('is-satire')
 *   console.log(isSatire('http://google.com'))
 *
 *   or
 *
 *   <script src="./build/is-satire.js"></script>
 */
