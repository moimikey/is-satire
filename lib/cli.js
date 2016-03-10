'use strict';

var _construct = require('babel-runtime/core-js/reflect/construct');

var _construct2 = _interopRequireDefault(_construct);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var Url = _interopRequireWildcard(_url);

var _cheerio = require('cheerio');

var Cheerio = _interopRequireWildcard(_cheerio);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _bluebird = require('bluebird');

var _fs = require('fs');

var _path = require('path');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-console:0 */


var readFileAsync = _bluebird.Promise.promisify(_fs.readFile);

var IsSatire = function () {
  /**
   * @param  {Array}  uri [ 'http://...', 'extraneous argument', ... ]
   * @return {String}     "http://..."
   */

  function IsSatire() {
    var uri = arguments.length <= 0 || arguments[0] === undefined ? process.argv.slice(2) : arguments[0];
    (0, _classCallCheck3.default)(this, IsSatire);

    var target = typeof uri !== 'string' ? uri.slice(0, 1).toString() : uri;
    return this.init(target).catch(function (err) {
      return console.log(err);
    });
  }

  /**
   * @param  {String} uri 'http://...'
   * @return {*}
   */


  (0, _createClass3.default)(IsSatire, [{
    key: 'init',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(uri) {
        var _Url$parse, protocol;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Url$parse = Url.parse(uri);
                protocol = _Url$parse.protocol;
                _context.next = 4;
                return this.configurationFor(uri);

              case 4:
                this.config = _context.sent;
                return _context.abrupt('return', protocol !== null ? this.scanUrl(uri) : this.displayHelp());

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x2) {
        return ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'configurationFor',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(uri) {
        var config;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = new _map2.default();
                _context2.t0 = config;
                _context2.t1 = _set2.default;
                _context2.t2 = JSON;
                _context2.next = 6;
                return readFileAsync((0, _path.join)(__dirname, '..', 'data', 'known.json'), 'utf-8');

              case 6:
                _context2.t3 = _context2.sent;
                _context2.t4 = _context2.t2.parse.call(_context2.t2, _context2.t3).sites;
                _context2.t5 = new _context2.t1(_context2.t4);

                _context2.t0.set.call(_context2.t0, 'blacklist', _context2.t5);

                _context2.t6 = config;
                _context2.t7 = (0, _create2.default)(null);
                _context2.t8 = JSON;
                _context2.next = 15;
                return readFileAsync((0, _path.join)(__dirname, '..', 'data', 'fingerprint.json'), 'utf-8');

              case 15:
                _context2.t9 = _context2.sent;
                _context2.t10 = _context2.t8.parse.call(_context2.t8, _context2.t9).checks;
                _context2.t11 = (0, _assign2.default)(_context2.t7, _context2.t10);

                _context2.t6.set.call(_context2.t6, 'fingerprint', _context2.t11);

                config.set('uri', uri);
                return _context2.abrupt('return', config);

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function configurationFor(_x3) {
        return ref.apply(this, arguments);
      }

      return configurationFor;
    }()
  }, {
    key: 'displayHelp',
    value: function displayHelp() {
      console.log('usage: is-satire http(s)://...\n');
      return process.exit(0);
    }
  }, {
    key: 'isBlacklisted',
    value: function isBlacklisted(hostname) {
      return this.blacklist.has(hostname);
    }

    /**
     * @param  {String} url   "http://..."
     * @param  {Array}  arr   [ '/about', '/about-us', ... ]
     * @return {Array}        [ '/about', '/terms', ... ]
     */

  }, {
    key: 'analyzePaths',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(url, arr) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return arr.reduce(function () {
                  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(paths, path, data, httpStatus, isValidPath) {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return paths;

                          case 2:
                            paths = _context3.sent;
                            _context3.next = 5;
                            return (0, _nodeFetch2.default)(Url.resolve(url, path));

                          case 5:
                            data = _context3.sent;

                            /* avoid non200's & shortlinks */
                            isValidPath = 200 === data.status && !data.headers.get('link');

                            if (isValidPath) {
                              _context3.next = 9;
                              break;
                            }

                            return _context3.abrupt('return', paths);

                          case 9:
                            _context3.t0 = paths;
                            _context3.t1 = this;
                            _context3.next = 13;
                            return data.text();

                          case 13:
                            _context3.t2 = _context3.sent;
                            _context3.t3 = this.fingerprint.keywords;
                            _context3.next = 17;
                            return _context3.t1.findKeywords.call(_context3.t1, _context3.t2, _context3.t3);

                          case 17:
                            _context3.t4 = _context3.sent;
                            _context3.t5 = path;
                            _context3.t6 = {
                              keywordsFound: _context3.t4,
                              path: _context3.t5
                            };

                            _context3.t0.push.call(_context3.t0, _context3.t6);

                            return _context3.abrupt('return', paths);

                          case 22:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));
                  return function (_x6, _x7, _x8, _x9, _x10) {
                    return ref.apply(this, arguments);
                  };
                }().bind(this), []);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function analyzePaths(_x4, _x5) {
        return ref.apply(this, arguments);
      }

      return analyzePaths;
    }()

    /**
     * @param  {Array} data  [ '<!html><head...', ... ]
     * @param  {Array} arr   [ 'parody', 'satire', ... ]
     * @return {Array}       [ 'satire']
     */

  }, {
    key: 'findKeywords',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data, arr) {
        var $, pageContent, keywordsRegex, maybeHasKeyword;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Cheerio.load(data);

              case 2:
                $ = _context6.sent;
                _context6.next = 5;
                return this.fingerprint.elements.map(function (el) {
                  return $(el).text();
                });

              case 5:
                pageContent = _context6.sent;
                keywordsRegex = new RegExp(this.fingerprint.keywords.join('|'));
                _context6.next = 9;
                return pageContent.some(function (text) {
                  return keywordsRegex.test(text);
                });

              case 9:
                maybeHasKeyword = _context6.sent;

                if (maybeHasKeyword) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 13;
                return [];

              case 13:
                return _context6.abrupt('return', _context6.sent);

              case 14:
                _context6.next = 16;
                return arr.reduce(function () {
                  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(keywords, keyword) {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return keywords;

                          case 2:
                            keywords = _context5.sent;

                            if (new RegExp(keyword).test(pageContent)) keywords.push(keyword);
                            return _context5.abrupt('return', keywords);

                          case 5:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, this);
                  }));
                  return function (_x13, _x14) {
                    return ref.apply(this, arguments);
                  };
                }(), []);

              case 16:
                return _context6.abrupt('return', _context6.sent);

              case 17:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findKeywords(_x11, _x12) {
        return ref.apply(this, arguments);
      }

      return findKeywords;
    }()

    /**
     * @param  {Array} data [ { keywordsFound: [ 'satire', ... ] } ]
     * @return {Array}      [ 'satire', 'fictional', ... ]
     */

  }, {
    key: 'calculateLikelihood',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(data) {
        var keywordsFound;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return data.reduce(function () {
                  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(keywords, key) {
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return keywords;

                          case 2:
                            keywords = _context7.sent;
                            return _context7.abrupt('return', keywords.concat(key.keywordsFound));

                          case 4:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, this);
                  }));
                  return function (_x16, _x17) {
                    return ref.apply(this, arguments);
                  };
                }(), []);

              case 2:
                keywordsFound = _context8.sent;
                _context8.next = 5;
                return [].concat((0, _toConsumableArray3.default)(new _set2.default(keywordsFound)));

              case 5:
                return _context8.abrupt('return', _context8.sent);

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function calculateLikelihood(_x15) {
        return ref.apply(this, arguments);
      }

      return calculateLikelihood;
    }()

    /**
     * @return {String} "there's a ... likelihood that this is..."
     */

  }, {
    key: 'beginScan',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        var analysis;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.analyzePaths(this.target, this.fingerprint.paths);

              case 2:
                analysis = _context9.sent;
                _context9.next = 5;
                return this.calculateLikelihood(analysis);

              case 5:
                return _context9.abrupt('return', _context9.sent);

              case 6:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function beginScan() {
        return ref.apply(this, arguments);
      }

      return beginScan;
    }()

    /**
     * @param  {String} url "http://..."
     * @return {*}
     */

  }, {
    key: 'scanUrl',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(uri) {
        var result;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log('checking ' + Url.parse(uri).hostname + '...');

                if (!this.isBlacklisted(Url.parse(uri).hostname)) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt('return', console.log(uri + ' is a known satire site!'));

              case 3:
                _context10.next = 5;
                return this.beginScan();

              case 5:
                result = _context10.sent;

                console.log('Found Keywords: ' + result.join(', '));
                if (result.length === 0) console.log('this does not seem to be a satire site. but i could be wrong.');
                if (result.length === 1) console.log('there\'s a small likelihood that this is a satire site.');
                if (result.length > 1) console.log('there\'s a strong likelihood that this is a satire site.');
                _context10.next = 12;
                return false;

              case 12:
                return _context10.abrupt('return', _context10.sent);

              case 13:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function scanUrl(_x18) {
        return ref.apply(this, arguments);
      }

      return scanUrl;
    }()
  }, {
    key: 'target',
    get: function get() {
      return this.config.get('uri');
    }
  }, {
    key: 'blacklist',
    get: function get() {
      return this.config.get('blacklist');
    }
  }, {
    key: 'fingerprint',
    get: function get() {
      return this.config.get('fingerprint');
    }
  }]);
  return IsSatire;
}();

(0, _construct2.default)(IsSatire, [process.argv.slice(2)]);