const _forEach = require('lodash/forEach');
const _bind = require('lodash/bind');
const _isPlainObject = require('lodash/isPlainObject');

const Definition = require('./definition')

/**
 * new Schema({ user_id: { type: Number, default: 1 } }).coerce(obj)
 * new Schema({ user_ids: { type: [Number], default: [1] } }).coerce(obj)
 * new Schema({ post: { type: new Schema({ active: { type: Boolean } }), default: { active: false } } }).coerce(obj)
 * new Schema({ id: { type: function(el) { return ++el } }}).coerce(obj)
 */
class Schema {
  /**
   * @param definitions {object}
   */
  constructor(definitions) {
    this.definitions = definitions
  }

  /**
   * def is { type: Number, default: 0 }
   * def is { type: [Number], default: 0 }
   */
  cast(value, def) {
    const definition = new Definition(def);
    return definition.castEvery(value)
  }

  isDef(def) {
    return _isPlainObject(def) && !!def.type
  }

  /**
   * Nested arrays:
   *  * definition is { filter: { user: { ids: { type: [Number] }, state: { type: String } } } }
   *  * object is { filter: { user: { ids: [1,2,3], state: "Active" } } }
   */
  coerce(request, definitions = this.definitions) {
    request = request || {};
    const response = {};

    if (this.isDef(definitions)) {
      return this.cast(request, definitions)
    }

    _forEach(definitions, (def, key) => {
        const body = request[key];

        if (this.isDef(def)) {
          response[key] = this.cast(body, def);
          if (!response[key]) delete response[key]
        }

        if (_isPlainObject(def)) {
          response[key] = this.coerce(body, def);
          if (!response[key]) delete response[key]
        }
    });

    return response
  }
}

module.exports = Schema;
