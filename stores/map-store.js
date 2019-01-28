'use strict'

const data = {}

const enabled = (env, key) =>
  data.hasOwnProperty(env) ? data[env][key] : undefined

const set = (env, key, value) => {
  if (!data.hasOwnProperty(env)) {
    data[env] = {}
  }

  data[env][key] = value
}

module.exports = { enabled, set }
