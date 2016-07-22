/**
 * Post model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import {createModel, createShape, createSpec} from './util';

const spec = createSpec([
  {field: 'title', type: PropTypes.string},
  {field: 'sourceUrl', type: PropTypes.string},
  {field: 'authorId', type: PropTypes.number},
  {field: 'tagIds', type: PropTypes.arrayOf(PropTypes.number), protoVal: []}
]);

export const postShape = createShape(spec.shape);
export const postProto = createModel(spec.proto);

/**
 * Create a new post object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The post model object.
 */
export function createPost(values) {
  return _.create(postProto, values);
}
