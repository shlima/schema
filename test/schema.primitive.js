const Schema = require('../index');
const assert = require('chai').assert;

describe("Flat", function() {
  const schema = new Schema({
    foo: {
      type: Number,
      default: 1
    },

    bar: {
      type: Number
    }
  });

  it('returns default value if nothing set', function() {
    assert.deepEqual(schema.coerce({}), { foo: 1 });
  });

  it('returns value', function() {
    assert.deepEqual(schema.coerce({ foo: 22.3 }), { foo: 22.3 });
    assert.deepEqual(schema.coerce({ foo: 22.3, bar: 33 }), { foo: 22.3, bar: 33 });
  });
});

describe("Function", function() {
  const schema = new Schema({
    foo: {
      type: function(el) { return el + 1 },
      default: 0
    }
  });

  it('returns value', function() {
    assert.deepEqual(schema.coerce({ foo: 1 }), { foo: 2 });
  });
});

describe("Array", function() {
  const schema = new Schema({
    foo: {
      type: [Number]
    }
  });

  it('returns default value if nothing set', function() {
    assert.deepEqual(schema.coerce({ foo: ['1', 2] }), { foo: [1, 2] });
    assert.deepEqual(schema.coerce({}), {});
  });
});

describe("Array with default", function() {
  const schema = new Schema({
    foo: {
      type: [Number],
      default: [-1]
    }
  });

  it('returns default value if nothing set', function() {
    assert.deepEqual(schema.coerce({ foo: ['1', 2] }), { foo: [1, 2] });
    assert.deepEqual(schema.coerce({}), { foo: [-1] });
  });
});
