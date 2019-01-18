const _isNumber = require('lodash/isNumber');
const _isUndefined = require('lodash/isUndefined');
const _isNaN = require('lodash/isNaN');
const _isNil = require('lodash/isNil');
const _isFunction = require('lodash/isFunction');
const _isBoolean = require('lodash/isBoolean');
const _trim = require('lodash/trim');
const _isEmpty = require('lodash/isEmpty');
const _isPlainObject = require('lodash/isPlainObject');

function _isNone(value) {
  return _isUndefined(value) || _isNaN(value) || _isNil(value) || _trim(value) === ''
}

function _isBlank(value) {
  return _isNone(value) || (_isPlainObject(value) && _isEmpty(value))
}

const TYPES = {};

TYPES[Number] = function(value) {
  if (_isNone(value)) return;
  if (_isNumber(value)) return value;

  return Number(value)
};

TYPES[String] = function(value) {
  if (_isNone(value)) return;

  return String(value)
};

TYPES[Boolean] = function(value) {
  if (_isNone(value)) return;
  if (_isNumber(value)) return;
  if (_isBoolean(value)) return value;

  const trim = _trim(value);

  if (trim === 'true' || trim === 'false') return value ===  'true'
};

module.exports = {
  TYPES,
  _isBlank,

  cast(type, value) {
    const fn = TYPES[type] || (_isFunction(type) ? type : null);

    if (!fn) {
      throw `Coerce function for type '${type}' not exists, please implement your custom coerce function`
    }

    return fn(value)
  }
};
