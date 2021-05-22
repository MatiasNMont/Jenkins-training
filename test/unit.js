var assert = require('assert');
var user = require('../src/operations/checkUser').checkValidUser
var amount = require('../src/operations/checkAmount').checkAmount

describe('#Unit Test: Operation module', function() {
  describe('--> checkValidUser function', function() {
    it('1. Usario correcto', function() {
      var name = 'Matias Montiveross'
      assert.equal(user(name),0)
    });

    it('2. Usario no debe venir con solo Nombre', function() {
        var name = 'Matias'
        assert.equal(user(name),'error 2')
      });

    it('3. Usario no debe venir vacio', function() {
        var name = ''
        assert.equal(user(name),'error 1')
      });
  });

  describe('--> checkAmount function', function() {
    it('1. Usario Existente', function() {
      var name = 'Juan Pepe'
      assert.notEqual(amount(name), 3)
    });

    it('2. Usario no existente', function() {
        var name = 'Matias Monti'
        assert.equal(amount(name),3)
      });

    it('3. Usario puede transferir', function() {
        var name = 'Juan Pepe'
        assert.equal(amount(name),0)
      });

      it('4. Usario NO puede transferir', function() {
        var name = 'Jose Jose'
        assert.notEqual(amount(name), 0)
      });
  });
});