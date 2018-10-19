const _isNumber = require('lodash/isNumber');
const _isUndefined = require('lodash/isUndefined');
const _isNaN = require('lodash/isNaN');
const _isNil = require('lodash/isNil');
const _isBoolean = require('lodash/isBoolean');
const _trim = require('lodash/trim');

function _isNone(value) {
  return _isUndefined(value) || _isNaN(value) || _isNil(value) || _trim(value) === ''
}

module.exports = {
  Number(value) {
    if (_isNone(value)) return;
    if (_isNumber(value)) return value;
    return Number(value)
  },

  String(value) {
    if (_isNone(value)) return;
    return String(value)
  },

  Boolean(value) {
    if (_isNone(value)) return;
    if (_isNumber(value)) return;
    if (_isBoolean(value)) return value;

    const trim = _trim(value);

    if (trim === 'true' || trim === 'false') {
      return value === 'true'
    }
  },

  cast(value, as) {
    if (!this[as]) {
      throw `Coerce function for '${as}' not exists, please implement your custom coerce function`
    }

    return this[as](value)
  }
};
