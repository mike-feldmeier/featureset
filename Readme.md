## Featureset

A small, pluggable library that allows your code to detect if a feature should be enabled or disabled.

Goals for this library included:

- The storage of state is separated from the code that uses the state, so that plugabble backend storage methods can be used to fit the needs of the project
- Features should be scoped within the environment they are running in, so that test-environment features can be toggled separately from production-environment features without code changes

### Usage

    const featureset = require('featureset')

    if(featureset.enabled('my-enabled-feature')) {
      // This will run...
    }

    if(featureset.enabled('my-disabled-feature')) {
      // This won't run...
    }

    if(featureset.enabled('my-undefined-feature')) {
      // This still won't run (undefined is falsy)...
    }

### Configuration

All features are scoped within an environment. The default environment is 'production', but can be set to any environment string you want through the initialize method.

    featureset.initialize({ env: 'development' })

#### Map Store

The included map store can be used to retrieve features from another source and set them programmatically

    const mystore = featureset.stores.map

    mystore.set('production', 'my-enabled-feature', true)
    mystore.set('production', 'my-disabled-feature', false)

    featureset.initialize({ env: 'production', store: mystore })

#### JSON Store

The included JSON store works similarly to the map store, except values can be set by loading a JSON file directly, or Javascript object

    const mystore = featureset.stores.json

    mystore.loadFile('/features.json')

    featureset.initialize({ env: 'production', store: mystore })

where _features.json_ would have the format:

    { "production": { "my-enabled-feature": true, "my-disabled-feature": false } }

or

    const mystore = featureset.stores.json

    mystore.loadJs({
      production: {
        'my-enabled-feature': true,
        'my-disabled-feature': false
      }
    })

    featureset.initialize({ env: 'production', store: mystore })

Note that both the JSON file and the Javascript object have the same format; it is just whether or not it is coming in as JSON content, or an already parsed Javascript object.

### API

#### featureset

- **initialize(options)** - Method to initialize different options
  - _env_: an environment string used to provide scope for all feature requests
  - _store_: a backing store instance to be used for looking up feature requests
- **enabled(key)** - Method for determining if a feature is enabled
- **stores** - A set of included backend stores

#### Map Store (featureset.stores.map)

- **enabled(env, key)** - Used by the library to look up feature values
- **set(env, key, value)** - Sets scoped values on the store

#### JSON Store (featureset.stores.json)

- **enabled(env, key)** - Used by the library to look up feature values
- **loadFile(path)** - Load a JSON file into memory
- **loadJs(object)** - Load the given Javascript object into memory

#### Custom Stores...

To create your own backend store, implement the _enabled(env, key)_ method and pass the object to the _featureset.initialize({ store: <object> })_.

### Change History
|Version|Description|
|---|---|
|1.0.0|Initial Release|
|1.0.1|Security Update|
|1.0.2|Security Update|
