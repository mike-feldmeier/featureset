'use strict'

const rewire = require('rewire')

describe('Featureset Client (JSON Store)', function() {
  describe('enabled', function() {
    it('should retrieve an unset feature as falsy', function() {
      const featureset = rewire('../featureset')
      featureset.initialize({ store: featureset.stores.json })

      const result = featureset.enabled('does-not-exist')
      expect(result).toBeFalsy()
    })
    it('should retrieve an set truthy feature as truthy', function() {
      const featureset = rewire('../featureset')
      featureset.stores.json.loadJs({
        production: { 'should-be-truthy': true }
      })
      featureset.initialize({ store: featureset.stores.json })

      const result = featureset.enabled('should-be-truthy')
      expect(result).toBeTruthy()
    })
    it('should retrieve an set falsy feature as falsy', function() {
      const featureset = rewire('../featureset')
      featureset.stores.json.loadJs({
        production: { 'should-be-falsy': false }
      })
      featureset.initialize({ store: featureset.stores.json })

      const result = featureset.enabled('should-be-falsy')
      expect(result).toBeFalsy()
    })
  })
})
