const Schema = require('../src/Schema');
const assert = require('chai').assert;

const TYPE = Schema.type;
const DEFAULT = Schema.default;
const IS_BLANK = Schema.isBlank;

describe('class redefinitions', function() {
  afterEach(function() {
    Schema.type = TYPE;
    Schema.default = DEFAULT;
    Schema.isBlank = IS_BLANK;
  });

  let schema;

  describe('type', function() {
    beforeEach(function() {
      schema = new Schema({
        status: {
          __type__: Number
        }
      });
    });

    it('works for instance', function() {
      schema.type = '__type__';
      assert.deepEqual(schema.coerce({status: '0'}), {status: 0});
      assert.equal(Schema.type, 'type')
    });

    it('works global', function() {
      Schema.type = '__type__';
      assert.deepEqual(schema.coerce({status: '0'}), {status: 0});
    });
  });

  describe('default', function() {
    beforeEach(function() {
      schema = new Schema({
        status: {
          type: Number,
          __default__: -1
        }
      });
    });

    it('works for instance', function() {
      schema.default = '__default__';
      assert.deepEqual(schema.coerce({status: null}), {status: -1});
      assert.equal(Schema.default, 'default')
    });

    it('works global', function() {
      Schema.default = '__default__';
      assert.deepEqual(schema.coerce({status: null}), {status: -1});
    });
  });

  describe('isBlank', function() {
    beforeEach(function() {
      schema = new Schema({
        status: {
          type: Number
        }
      });
    });

    it('works for instance', function() {
      schema.isBlank = function(val) { return val === 1 };
      assert.deepEqual(schema.coerce({status: 1}), {});
      assert.deepEqual(schema.coerce({status: -1}), {status: -1});
    });

    it('works global', function() {
      Schema.isBlank = function(val) { return val === 1 };
      assert.deepEqual(schema.coerce({status: 1}), {});
      assert.deepEqual(schema.coerce({status: -1}), {status: -1});
    });
  })
});
