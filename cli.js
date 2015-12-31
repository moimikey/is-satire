#!/usr/bin/env ./node_modules/.bin/babel-node
import 'babel-polyfill'
import isUrl from 'is-url'
import { isSatire } from './src'
class IsSatire {
  /**
   * `isSatire` as a CLI
   *
   * @param  {Array}  url [ 'http://...', 'extraneous argument', ... ]
   * @return {String}     'http://...'
   */
  constructor(url) {
    this.url = url.slice(0, 1).toString()
    return isUrl(this.url) ? this.scanUrl(this.url) : this.displayHelp()
  }

  /**
   * Display Help
   *
   * @return {Stream}
   */
  displayHelp() {
    return process.stdout.write(
      `usage: is-satire http://...\n`
    )
  }

  /**
   * Factory interface to `isSatire`
   *
   * @param  {String} url 'http://...'
   * @return {Object}     { url: 'http://...', checkUrl: [function], ... }
   */
  createInstance(url) {
    return isSatire({ url })
  }

  /**
   * Scan a URL via `isSatire` API
   *
   * @param  {String} url 'http://...'
   * @return {*}
   */
  scanUrl(url) {
    this.instance = this.createInstance(url)
    process.stdout.write(`checking ${this.instance.url}...\n`)
    process.stdout.write(``)
  }
}
Reflect.construct(IsSatire, [process.argv.slice(2)])
