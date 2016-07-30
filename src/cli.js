/* eslint no-console:0 */
import * as Url from 'url'
import * as Cheerio from 'cheerio'
import fetch from 'node-fetch'
import { Promise } from 'bluebird'
import { readFile } from 'fs'
import { join as pathJoin } from 'path'

const readFileAsync = Promise.promisify(readFile)

class IsSatire {
  /**
   * @param  {Array}  uri [ 'http://...', 'extraneous argument', ... ]
   * @return {String}     "http://..."
   */
  constructor(uri = process.argv.slice(2)) {
    const target = typeof uri !== 'string' ? uri.slice(0, 1).toString() : uri
    return this.init(target).catch(err => console.log(err))
  }

  /**
   * @param  {String} uri 'http://...'
   * @return {*}
   */
  async init(uri) {
    const { protocol } = Url.parse(uri)
    this.config = await this.configurationFor(uri)
    return protocol !== null ? this.scanUrl(uri) : this.displayHelp()
  }

  async configurationFor(uri) {
    const config = new Map()
    config.set('blacklist', new Set(
      JSON.parse(await readFileAsync(pathJoin(__dirname, '..', 'data', 'known.json'), 'utf-8')).sites
    ))
    config.set('fingerprint', Object.assign(Object.create(null),
      JSON.parse(await readFileAsync(pathJoin(__dirname, '..', 'data', 'fingerprint.json'), 'utf-8')).checks
    ))
    config.set('uri', uri)
    return config
  }

  displayHelp() {
    console.log(
      `usage: is-satire http(s)://...\n`
    )
    return process.exit(0)
  }

  get target() {
    return this.config.get('uri')
  }

  get blacklist() {
    return this.config.get('blacklist')
  }

  get fingerprint() {
    return this.config.get('fingerprint')
  }

  isBlacklisted(hostname) {
    return this.blacklist.has(hostname)
  }

  /**
   * @param  {String} url   "http://..."
   * @param  {Array}  arr   [ '/about', '/about-us', ... ]
   * @return {Array}        [ '/about', '/terms', ... ]
   */
  async analyzePaths(url, arr) {
    return await arr.reduce(async function(paths, path, data, httpStatus, isValidPath, result) {
      paths = await paths
      data = await fetch(Url.resolve(url, path))
      console.log('*** trying', url, path)
      /* avoid non200's & shortlinks */
      isValidPath = 200 === data.status && !data.headers.get('link')
      if (!isValidPath) return paths
      result = {
        keywordsFound: await this.findKeywords(await data.text(), this.fingerprint.keywords),
        path
      }
      console.log('*** path', result)
      paths.push(result)
      return paths
    }.bind(this), [])
  }

  /**
   * @param  {Array} data  [ '<!html><head...', ... ]
   * @param  {Array} arr   [ 'parody', 'satire', ... ]
   * @return {Array}       [ 'satire']
   */
  async findKeywords(data, arr) {
    const $ = await Cheerio.load(data)
    const pageContent = await this.fingerprint.elements.map(el => $(el).text())
    const keywordsRegex = new RegExp(this.fingerprint.keywords.join('|'))
    const maybeHasKeyword = await pageContent.some(text => keywordsRegex.test(text))

    if (!maybeHasKeyword) return await []

    return await arr.reduce(async function(keywords, keyword) {
      keywords = await keywords
      if (new RegExp(keyword).test(pageContent)) keywords.push(keyword)
      return keywords
    }, [])
  }

  /**
   * @param  {Array} data [ { keywordsFound: [ 'satire', ... ] } ]
   * @return {Array}      [ 'satire', 'fictional', ... ]
   */
  async calculateLikelihood(data) {
    const keywordsFound = await data.reduce(async function(keywords, key) {
      keywords = await keywords
      return keywords.concat(key.keywordsFound)
    }, [])
    const uniqueKeywords = [...new Set(keywordsFound)]
    console.log('*** unique keywords', uniqueKeywords)
    return await uniqueKeywords
  }

  /**
   * @return {String} "there's a ... likelihood that this is..."
   */
  async beginScan() {
    const analysis = await this.analyzePaths(this.target, this.fingerprint.paths)
    console.log('*** analysis', analysis)
    return await this.calculateLikelihood(analysis)
  }

  /**
   * @param  {String} url "http://..."
   * @return {*}
   */
  async scanUrl(uri) {
    console.log(`checking ${Url.parse(uri).hostname}...`)
    if (this.isBlacklisted(Url.parse(uri).hostname))
      return console.log(`${uri} is a known satire site!`)
    const result = await this.beginScan()
    console.log(`Found Keywords: ${result.join(', ')}`)
    if (result.length === 0) console.log('this does not seem to be a satire site. but i could be wrong.')
    if (result.length === 1) console.log('there\'s a small likelihood that this is a satire site.')
    if (result.length > 1) console.log('there\'s a strong likelihood that this is a satire site.')
    return await false
  }
}
Reflect.construct(IsSatire, [process.argv.slice(2)])
