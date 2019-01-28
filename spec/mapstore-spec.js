'use strict'

const rewire = require('rewire')

describe('Featureset Client (Map Store)', function() {
  describe('enabled', function() {
    it('should retrieve an unset feature as falsy', function() {
      const featureset = rewire('../featureset')

      const result = featureset.enabled('does-not-exist')
      expect(result).toBeFalsy()
    })
    it('should retrieve an set truthy feature as truthy', function() {
      const featureset = rewire('../featureset')
      const _configuration = featureset.__get__('configuration')
      _configuration.store.set('production', 'should-be-truthy', true)

      const result = featureset.enabled('should-be-truthy')
      expect(result).toBeTruthy()
    })
    it('should retrieve an set falsy feature as falsy', function() {
      const featureset = rewire('../featureset')
      const _configuration = featureset.__get__('configuration')
      _configuration.store.set('production', 'should-be-falsy', false)

      const result = featureset.enabled('should-be-falsy')
      expect(result).toBeFalsy()
    })
  })
})
