const _isArray = require('lodash/isArray');
const _isFunction = require('lodash/isFunction');
const _get = require('lodash/get');
const _map = require('lodash/map');
const _reject = require('lodash/reject');
const _castArray = require('lodash/castArray');
const TypeCast = require('./TypeCast');

class Definition {
  constructor({ type, isBlank }) {
    this.isArray = _isArray(type);
    this.isBlank = isBlank || TypeCast._isBlank;
    this.type = _isArray(type) ? type[0] : type;
    // if Schema instance (ducks like Schema)
    this.isCoercable = _isFunction(_get(this.type, 'coerce'));
  }

  cast(el) {
    if (this.isCoercable) {
      return this.type.coerce(el)
    } else {
      return TypeCast.cast(this.type, el)
    }
  }

  coerce(value) {
    if (this.isArray) {
      if (!value) return null;
      const result = _reject(_map(_castArray(value), (el) => { return this.cast(el) }), this.isBlank);
      return result.length ? result : null
    } else {
      return this.cast(value)
    }
  }
}

module.exports = Definition;
