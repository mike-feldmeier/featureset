'use strict'

const stores = {
  map: require('./stores/map-store'),
  json: require('./stores/json-store')
}

let configuration = {
  env: 'production',
  store: stores.map
}

const initialize = options => Object.assign(configuration, options)
const enabled = key => configuration.store.enabled(configuration.env, key)

module.exports = { initialize, enabled, stores }
