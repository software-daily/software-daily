/**
 * Tag model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import tags from '../sample_data/tags';
import {createSpec, idGenerator} from './util';

export const nextTagId = idGenerator(tags.length + 1);

const spec = createSpec([
  {field: 'text', type: PropTypes.string}
]);

export const tagShape = spec.shape;
export const tagProto = spec.proto;

/**
 * Create a new tag object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The tag model object.
 */
export function createTag(values) {
  if (!values.hasOwnProperty('id')) {
    values.id = nextTagId();
  }
  return _.create(tagProto, values);
}
