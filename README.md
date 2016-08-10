# Bubble Mocha Test Plugin

> 0 configuration mocha testing with [bubbleup](https://github.com/TylorS/bubbleup)

## Usage

```sh
npm install --save-dev bubble-plugin-test-mocha
bubbleup test # defaults to test/ folder
# or 
bubbleup test src/*.test.js
```

## Plugin API

This Bubbleup plugin exposes a plugin API to further extend how you are testing
with mocha.

A bubble mocha plugin looks like this 

```js
module.exports = {
  exec: function (mocha, register) {
    // mocha is a mocha instance
    // register is a way to add global requires like require('babel-register')
  }
}
```

This plugin automatically looks up packages named with the prefix `bubbleup-plugin-test-mocha`.
Though it doesn't exist yet, a plugin for babel-register would look like this

```js
// theorectical bubbleup-plugin-test-mocha-babel-register
module.exports = {
  exec: function (mocha, register) {
    register('babel-register')
  }
}
```

that's it!
