/**
 * User model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import users from '../sample_data/users';
import {createSpec, idGenerator} from './util';

export const nextUserId = idGenerator(users.length + 1);

const spec = createSpec([
  {field: 'twitter', type: PropTypes.string},
  {field: 'username', type: PropTypes.string}
]);

export const userShape = spec.shape;
export const userProto = spec.proto;

/**
 * Create a new user object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The user model object.
 */
export function createUser(values) {
  if (!values.hasOwnProperty('id')) {
    values.id = nextUserId();
  }
  return _.create(userProto, values);
}

export const unknownUser = createUser({
  id: -1,
  username: 'Unknown'
});
