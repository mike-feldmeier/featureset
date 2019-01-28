'use strict'

const fs = require('fs')

const data = {}

const loadFile = path => Object.assign(data, JSON.parse(fs.readFileSync(path)))

const loadJs = object => Object.assign(data, object)

const enabled = (env, key) =>
  data.hasOwnProperty(env) ? data[env][key] : undefined

module.exports = { loadFile, loadJs, enabled }
