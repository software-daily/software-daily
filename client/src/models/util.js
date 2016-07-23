/**
 * Model utilities.
 */

import {PropTypes} from 'react';
import moment from 'moment';
import _ from 'lodash';

/**
 * An id generator utility.
 *
 * @param {number} [initialValue] - The initial id value.
 * @return {function} - Id generator function.
 */
export function idGenerator(initialValue = 1) {
  let id = initialValue;
  return () => id++;
}

/**
 * Given an array of fields, return the model spec object.
 *
 * @param {array} fields - The fields for the model.
 * @return {object} - The spec object.
 */
export function createSpec(fields) {
  const spec = fields.reduce((acc, curr) => {
    acc.proto[curr.field] = curr.protoVal;
    acc.shape[curr.field] = curr.type;
    return acc;
  }, {proto: {}, shape: {}});
  spec.proto = createProto(spec.proto);
  spec.shape = createShape(spec.shape);
  return spec;
}

/**
 * @var {object} - The prototype object that all model's inherit from.
 */
const modelProto = {
  id: undefined,
  createdAt: undefined,
  modifiedAt: undefined,
  createdAgo() {
    if (this.createdAt) {
      return moment(this.createdAt).fromNow();
    }
    return '';
  },
  createdFull() {
    if (this.createdAt) {
      return moment(this.createdAt).format('dddd, MMMM Do, YYYY');
    }
    return '';
  }
};

/**
 * Create a new model object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The model object.
 */
function createProto(values) {
  return _.create(modelProto, values);
}

/**
 * Given a partially complete shape object, complete the shape object with
 * inherited properties and their types.
 *
 * @param {object} partialShape - The partially complete model shape.
 * @return {object} - The fully complete model shape.
 */
function createShape(partialShape) {
  return _.assign(partialShape, {
    id: PropTypes.number,
    createdAt: PropTypes.string,
    modifiedAt: PropTypes.string
  });
}
