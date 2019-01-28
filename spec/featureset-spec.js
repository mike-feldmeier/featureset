'use strict'

const rewire = require('rewire')

describe('Featureset Client', function() {
  describe('initialize', function() {
    it('should use the default production environment', function() {
      const featureset = rewire('../featureset')
      const _configuration = featureset.__get__('configuration')

      expect(_configuration.env).toEqual('production')
    })
    it('should allow the use of and alternate environment', function() {
      const featureset = rewire('../featureset')
      const _configuration = featureset.__get__('configuration')

      featureset.initialize({ env: 'development' })
      expect(_configuration.env).toEqual('development')
    })
  })
})
