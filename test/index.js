'use strict'

/* global describe, it */

const assert = require('assert')

describe('bubbleup-plugin-test-mocha', function () {
  it('should run mocha tests', function (done) {
    assert(typeof done === 'function')
    done()
  })
})
