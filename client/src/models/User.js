/**
 * User model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import {createModel, createShape, createSpec} from './util';

const spec = createSpec([
  {field: 'twitter', type: PropTypes.string},
  {field: 'username', type: PropTypes.string}
]);

export const userShape = createShape(spec.shape);
export const userProto = createModel(spec.proto);

/**
 * Create a new user object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The user model object.
 */
export function createUser(values) {
  return _.create(userProto, values);
}

export const unknownUser = createUser({
  id: -1,
  username: 'Unknown'
});
