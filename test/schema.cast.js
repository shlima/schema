const TypeCast = require('../src/TypeCast');
const assert = require('chai').assert;

describe("Number", function() {
  function cast(value) {
    return TypeCast.cast(Number, value);
  }

  it('works', function() {
    assert.strictEqual(cast(0), 0);
    assert.strictEqual(cast(1), 1);
    assert.strictEqual(cast(1.1), 1.1);
    assert.strictEqual(cast('20.33'), 20.33);

    assert.strictEqual(cast(), undefined);
    assert.strictEqual(cast(''), undefined);
    assert.strictEqual(cast(null), undefined);
    assert.strictEqual(cast(undefined), undefined);
    assert.strictEqual(cast(NaN), undefined);
  });
});


describe("String", function() {
  function cast(value) {
    return TypeCast.cast(String, value);
  }

  it('works', function() {
    assert.strictEqual(cast(0), "0");
    assert.strictEqual(cast("ok"), "ok");

    assert.strictEqual(cast(), undefined);
    assert.strictEqual(cast(''), undefined);
    assert.strictEqual(cast(null), undefined);
    assert.strictEqual(cast(undefined), undefined);
    assert.strictEqual(cast(NaN), undefined);
  });
});

describe("Boolean", function() {
  function cast(value) {
    return TypeCast.cast(Boolean, value);
  }

  it('works', function() {
    assert.strictEqual(cast(true), true);
    assert.strictEqual(cast('true'), true);
    assert.strictEqual(cast(false), false);
    assert.strictEqual(cast('false'), false);

    assert.strictEqual(cast(), undefined);
    assert.strictEqual(cast(''), undefined);
    assert.strictEqual(cast('foo'), undefined);
    assert.strictEqual(cast(0), undefined);
    assert.strictEqual(cast(undefined), undefined);
    assert.strictEqual(cast(NaN), undefined);
  });
});
