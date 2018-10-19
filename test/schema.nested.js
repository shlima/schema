const Schema = require('../index');
const assert = require('chai').assert;

describe("Nested Objects", function() {
  const schema = new Schema({
    foo: {
      bar: {
        baz: {
          type: Number,
          default: 99
        }
      }
    }
  });

  it('works', function() {
    assert.deepEqual(schema.coerce({ foo: {bar: {baz: 33}} }), { foo: {bar: {baz: 33}} });
    assert.deepEqual(schema.coerce({}), { foo: {bar: {baz: 99}} });
  });
});

describe("Nested Array type", function() {
  const schema = new Schema({
    foo: {
      bar: {
        baz: {
          type: [Number],
          default: [0]
        }
      }
    }
  });

  it('works', function() {
    assert.deepEqual(schema.coerce({ foo: {bar: {baz: [1,2,3]}} }), { foo: {bar: {baz: [1,2,3]}} });
    assert.deepEqual(schema.coerce({}), { foo: {bar: {baz: [0]}} });
  });
});
