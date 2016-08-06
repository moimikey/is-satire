// import * as shelljs from 'shelljs'
import tap from 'tap'
import isSatireImport from '..'

tap.test('CLI', { skip: true }, t => {
  // const isSatire = require('../src/cli')
  // t.type(isSatire, 'object')
  t.end()
})

tap.test('Node (require)', { skip: true }, t => {
  // t.plan(2)
  // const isSatire = require('../lib')
  // console.log(isSatire)
  // const checkUrl = isSatire({ url: 'http://google.com' })
  // t.equal(typeof isSatire, 'object')
  // t.equal(checkUrl.url, 'http://google.com')
  t.end()
})

tap.test('Node (import)', { skip: true }, t => {
  // t.equal(typeof isSatireImport, 'function')
  t.end()
})

tap.test('Browser (browserify)', { skip: true }, t => {
  // const isSatire = require('../lib')
  // console.log('output', isSatire)
  // t.equal(typeof isSatire, 'function')
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
