/**
 * User model.
 */

import {Record} from 'immutable';

const User = Record({
  id: undefined,
  username: undefined
});

export const unknownUser = new User({
  id: 0,
  username: 'Unknown'
});

export default User;
