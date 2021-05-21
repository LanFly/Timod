import isArray from 'lodash-es/isArray'
import isString from 'lodash-es/isString'
import isBoolean from 'lodash-es/isBoolean'
import isPlainObject from 'lodash-es/isPlainObject'
import isNumber from 'lodash-es/isNumber'

function generateTypeDefine(type) {
  const typeDefine = {
    type: '',
    construct: null,
    default: null,
    format: null,
    mapto: null,
  };
  if (isBoolean(type) || type === Boolean) {
    Object.assign(typeDefine, {
      type: 'Boolean',
      construct: Boolean
    });
  } else if (isString(type) || type === String) {
    Object.assign(typeDefine, {
      type: 'String',
      construct: String
    });
  } else if (isNumber(type) || type === Number) {
    Object.assign(typeDefine, {
      type: 'Number',
      construct: Number
    });
  } else if (isArray(type) || type === Array) {
    if (type.length === 0) {
      throw new RangeError('Type Array can not be empty.');
    }
    const _baseType = generateTypeDefine(type[0]);
    Object.assign(typeDefine, {
      ..._baseType,
      type: 'Array'
    });
  } else if (type instanceof Model) {
    Object.assign(typeDefine, {
      type: 'Model',
      construct: type
    });
  } else if (isPlainObject(type)) {
    if (isPlainObject(type.type)) {
      const _modelType = new Model(type.type);
      Object.assign(typeDefine, {
        type: 'Model',
        construct: _modelType,
        default: type.default || null,
        format: type.format || null,
        mapto: type.mapto || null
      });
    } else {
      const _baseType = generateTypeDefine(type.type);
      Object.assign(typeDefine, {
        ..._baseType,
        default: type.default || null,
        format: type.format || null,
        mapto: type.mapto || null
      });
    }
  } else {
    throw new TypeError(`Unknow type: ${Object.prototype.toString.call(type)}.\nReceive: ${type}`);
  }
  return typeDefine;
}

function generateTypeValue(typeDefine, value) {
  const { default: defaultValue, format } = typeDefine;
  let typeValue = value;

  switch (typeDefine.type) {
    case 'Model':
      return typeDefine.construct.parse(value);
  }

  if (typeof format === 'function') {
    typeValue = format(typeValue);
  }
  if (typeValue === undefined) {
    typeValue = defaultValue;
  }
  return typeValue;
}

class Model {
  definition;
  constructor(definition) {
    if (!isPlainObject(definition)) {
      throw new TypeError('The definition must be an Object.');
    }

    this.definition = Object.keys(definition).map((key) => {
      const type = definition[key];
      return {
        key,
        typeDefine: generateTypeDefine(type)
      };
    }).reduce((collect, typeDefines) => {
      collect[typeDefines.key] = typeDefines.typeDefine;
      return collect;
    }, {});
  }
  parse(data) {
    const _data = data || {};
    const result = {};
    Object.keys(this.definition).forEach((key) => {
      const typeDefine = this.definition[key];
      const { mapto } = typeDefine;
      result[key] = generateTypeValue(typeDefine, _data[mapto || key]);
    });
    return result;
  }
}

export function define(definition) {
  return new Model(definition);
}