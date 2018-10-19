const Schema = require('../index');
const assert = require('chai').assert;

describe('', function() {
  const schema = new Schema({
    status: {
      type: String,
      default: 'review'
    },

    email: {
      type: String,
      default: ''
    },

    nickname: {
      type: String,
      default: ''
    },

    provider: {
      type: String,
      default: ''
    },

    shown: {
      type: Boolean,
      default: false
    }
  });


  it('works', function() {
    assert.deepEqual(schema.coerce({}), {
      status: 'review',
      email: '',
      nickname: '',
      provider: '',
      shown: false
    });
  });
});
