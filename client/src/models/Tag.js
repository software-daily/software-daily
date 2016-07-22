/**
 * Tag model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import {createModel, createShape, createSpec} from './util';

const spec = createSpec([
  {field: 'text', type: PropTypes.string}
]);

export const tagShape = createShape(spec.shape);
export const tagProto = createModel(spec.proto);

/**
 * Create a new tag object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The tag model object.
 */
export function createTag(values) {
  return _.create(tagProto, values);
}
