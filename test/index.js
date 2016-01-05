// import * as shelljs from 'shelljs'
import * as tape from 'tape'

// import isSatireImport from '..'

tape.test('CLI', t => {
  // const isSatire = require('../src/cli')
  // const isSatire = shelljs()
  t.end()
})

tape.test('Node (require)', t => {
  // t.plan(2)
  // const isSatire = require('../lib')
  // console.log(isSatire)
  // const checkUrl = isSatire({ url: 'http://google.com' })
  // t.equal(typeof isSatire, 'object')
  // t.equal(checkUrl.url, 'http://google.com')
  t.end()
})

tape.test('Node (import)', t => {
  // t.equal(typeof isSatireImport, 'function')
  t.end()
})

tape.test('Browser (browserify)', t => {
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
