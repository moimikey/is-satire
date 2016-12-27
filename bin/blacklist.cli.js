#!/usr/bin/env node
const url = require('url')
const jsonfile = require('jsonfile')
const file = require.resolve('../data/known.json')
jsonfile.spaces = 2
require('inquirer').prompt([{
  type: 'input',
  name: 'uri',
  message: 'Add domain to blacklist: (ex. theonion.com)',
  filter: function (uri) {
    return url.parse(uri).host || uri
  },
  validate: function (uri) {
    if (jsonfile.readFileSync(file).sites.includes(uri)) {
      return `${uri} is already blacklisted`
    }
    return true
  }
}, {
  type: 'confirm',
  name: 'isConfirmed',
  default: false,
  message: 'add this domain to the blacklist?',
}]).then(function (answers) {
  const { uri, isConfirmed } = answers
  if (!isConfirmed) return console.log(`${uri} was not added to blacklist`)
  jsonfile.writeFile(file, {
    sites: jsonfile.readFileSync(file).sites.concat(uri).sort()
  }, {
    replacer: true
  })
  console.log(`added ${uri} to blacklist`)
  
})
