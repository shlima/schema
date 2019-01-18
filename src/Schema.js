const Definition = require('./Definition');
const TypeCast = require('./TypeCast');
const _isObject = require('lodash/isObject');

/**
 * 1) Plain objects
 *    new Schema({
 *      user_id: {
 *        type: Number,
 *        default: 1
 *      }
 *    })
 *
 * 2) Arrays
 *    new Schema({
 *      user_ids: {
 *        type: [Number],
 *        default: []
 *      }
 *    })
 *
 * 3) Functions
 *    new Schema({
 *      value: {
 *        type(val) { return val }
 *      }
 *    })
 *
 * 4) Nested keys/schemas
 *  new Schema({
 *    user: {
 *      name: {
 *        type: String
 *      },
 *
 *      interests: [new Schema({})]
 *    }
 *  })
 *
 */
class Schema {
  constructor(definitions) {
    this.definitions = definitions;
  }

  get type() { return this._type || Schema.type };
  set type(val) { this._type = val };
  get isBlank() { return this._isBlank || Schema.isBlank };
  set isBlank(val) { this._isBlank = val };
  get default() { return this._default || Schema.default };
  set default(val) { this._default = val };

  isCoercable(obj) {
    return !!obj[this.type];
  }

  coerce(request) {
    const response = {};
    if (!_isObject(request)) request = {};

    for (let key in this.definitions) {
      if (this.definitions.hasOwnProperty(key)) {
        const subject = this.definitions[key];

        if (this.isCoercable(subject)) {
          const def = new Definition({ type: subject[this.type], isBlank: this.isBlank });
          response[key] = def.coerce(request[key]);
        } else {
          response[key] = new Schema(subject).coerce(request[key])
        }

        if (subject.hasOwnProperty(this.default)) {
          if (this.isBlank(response[key])) response[key] = subject[this.default]
        } else if (this.isBlank(response[key])) {
          delete response[key];
        }
      }
    }

    return response;
  }
}

Schema.type = 'type';
Schema.isBlank = TypeCast._isBlank;
Schema.default = 'default';

module.exports = Schema;
