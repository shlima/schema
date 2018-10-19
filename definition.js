const _isArray = require('lodash/isArray');
const _map = require('lodash/map');
const TypeCast = require('./TypeCast');

/**
 * Describes object like
 *  {
 *    type: Boolean,
 *    default: 1
 *  }
 *
 *  And cast a a passed value/values using callback function
 */
class Definition {
  constructor(def) {
    this.isArray = _isArray(def.type);
    this.type = this.isArray ? def.type[0] : def.type;
    this.default = def.default;

    /**
     * like "Boolean", " Number", "String", "Function"
     */
    this.name = this.type.name === 'type' ? 'Function' : this.type.name;
    this.isFn = this.name === 'Function'
  }

  castOne(value) {
    if (this.isFn) {
      return this.type(value) || this.default
    } else {
      return TypeCast.cast(value, this.name) || this.default
    }
  }

  castEvery(value) {
    if (this.isArray) {
      if (!_isArray(value)) return this.default;
      if (!value.length) return this.default;
      return _map(value, (el) => { return this.castOne(el) })
    }

    return this.castOne(value)
  }
}

module.exports = Definition;
