#!/usr/bin/env node

var spawn = require('child_process').spawn
var fs = require('fs')
var path = require('path')
var camel = require('camelcase')

var repo
var oneliner = 'one-liner description of the module'

var pkg = require('./package.json')
if (pkg && pkg.name) {
  repo = pkg.name
  oneliner = pkg.description
}

if (process.argv.length === 3) {
  repo = process.argv[2]
}

if (!repo && process.argv.length !== 3) {
  console.log('USAGE: generate-readme [repo-name]')
  process.exit(0)
}

var repoCamel = camel(repo)

fs.readFileSync(path.join(__dirname, 'template.md')).toString().split('\n')
  .forEach(function (line) {
    line = line.replace(/REPO/, repo)
    line = line.replace(/rePo/, repoCamel)
    line = line.replace(/1LINER/, oneliner)
    console.log(line)
  })
