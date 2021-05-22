var transfer = require('../src/index').main
var assert = require('assert');

describe('# Component test', function(){
    it('1. Module Tranference', function(){
        assert.notEqual(transfer('Jose Pepe'),3)
    })
})